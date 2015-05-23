/**
 * Init section.
 * Separate execution depending on page
 */
$(function () {
    if ($('#cloudPage').length !== 0) {
        minder.getCloudOfThoughts();
    }
    if ($('#addPage').length !== 0) {
        minder.addThought();
    }
    if ($('#statsPage').length !== 0) {
        minder.renderStatsPage();
    }
    if ($('#quickAdd').length !== 0) {
        minder.quickAdd();
    }
});

minder = {

    showError: function (err) {
        $('<div/>', {
            'class': 'alert alert-danger custom-alert',
            'role': 'alert',
            'text': err
        }).appendTo('div.container-fluid').fadeOut(5000);
    },

    showNotice: function (err) {
        $('<div/>', {
            'class': 'alert alert-success custom-alert',
            'role': 'alert',
            'text': err
        }).appendTo('div.container-fluid').fadeOut(2000);
    },

    getCloudOfThoughts: function () {
        $.ajax({
            type: 'GET',
            url: "/thought"
        }).done(function (thoughts) {
            if (thoughts.list.length > 0) {
                $('#cloudPage').html("");
            }
            thoughts.list.forEach(function (thought) {
                $('<span/>', {
                    'class': 'label label-margin label-info',
                    'text': thought
                }).appendTo('#cloudPage');
            });
        }).fail(function () {
            minder.showError('Can not get Cloud of Thoughts. Sorry.');
        });
    },

    addThought: function () {
        $('#addThoughtForm').submit(function (e) {
            e.preventDefault();
            var thoughtToAdd = $('#thoughtInput').val().toString();
            if (!thoughtToAdd.length) {
                minder.showError('Forgot to specify thought?');
                return false;
            }
            $.ajax({
                type: "POST",
                url: "/thought",
                data: {thought: thoughtToAdd}
            }).done(function (msg) {
                minder.showNotice('Well done!');
                minder.quickAdd();
            }).fail(function () {
                minder.showError('Can not add tought. Sorry.');
            });
            $('#thoughtInput').val("");
        });
    },

    renderStatsPage: function () {
        $.ajax({
            type: 'GET',
            url: "/statistic/top"
        }).done(function (thoughts) {
            var maximumNumberOfThoughts = 0;
            if (thoughts.topThoughts.length > 0) {
                $('#statsPage').html("");
            }
            $('div#statsPage').append($('<div class="progress"/>', {}));

            var sumOfAllThoughts = thoughts.topThoughts.map(function (thought) {
                return thought.numberOfEntries;
            }).reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });

            var colorsForProgressBar = [
                    'progress-bar-danger',
                    'progress-bar-warning',
                    'progress-bar-success',
                    'progress-bar-info',
                    'progress-bar'
                ],
                colorsForBadges = [
                    'label-danger',
                    'label-warning',
                    'label-success',
                    'label-info',
                    'label-primary'
                ];

            thoughts.topThoughts.forEach(function (thought, i) {
                var percentsOfProgressBar = 100 / sumOfAllThoughts * thought.numberOfEntries;
                $('div.progress')
                    .append($('<div/>', {
                        'class': 'progress-bar ' + colorsForProgressBar[i],
                        'text': Math.round(percentsOfProgressBar) + '%',
                        'aria-valuenow': thought.numberOfEntries,
                        'style': 'width: ' + percentsOfProgressBar + '%',
                        'role': 'progressbar',
                        'aria-valuemin': '0',
                        'aria-valuemax': maximumNumberOfThoughts
                    }));

                $('div#statsPage')
                    .append($('<h4/>', {'text': thought._id})
                        .append($('<span class="label pull-right ' + colorsForBadges[i] + '"/>').text(thought.numberOfEntries))
                );
            });
        }).fail(function () {
            minder.showError('Can not get Stats. Sorry.');
        });
    },

    quickAdd: function () {
        $.ajax({
            type: 'GET',
            url: "/thought/distinct"
        }).done(function (thoughts) {
            if (thoughts.list.length > 0) {
                $('#quickAdd').html("");
            }
            thoughts.list.forEach(function (thought) {
                $('<span/>', {
                    'class': 'label label-margin label-warning',
                    'text': thought
                }).appendTo('#quickAdd');
            });
            minder.quickAddClickProcessor();
        }).fail(function () {
            minder.showError('Can not get quick thoughts. Sorry.');
        });
    },

    quickAddClickProcessor: function () {
        $('span.label.label-warning').click(function (e) {
            e.preventDefault();
            var thoughtToAdd = $(this).html().toString();
            if (!thoughtToAdd.length) {
                minder.showError('Forgot to specify thought?');
            }
            $.ajax({
                type: "POST",
                url: "/thought",
                data: {thought: thoughtToAdd}
            }).done(function (msg) {
                minder.showNotice('Well done!')
            }).fail(function () {
                minder.showError('Can not add tought. Sorry.');
            });
        });
    }
};

