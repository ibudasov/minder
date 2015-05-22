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
            if(!thoughtToAdd.length) {
                minder.showError('Forgot to specify thought?');
                return false;
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
            $('#thoughtInput').val("");
        });
    },

    renderStatsPage: function () {
        $.ajax({
            type: 'GET',
            url: "/statistic/top"
        }).done(function (thoughts) {
            var maximumNumberOfThoughts = 0;
            thoughts.topThoughts.forEach(function (thought) {

                maximumNumberOfThoughts = (thought.numberOfEntries > maximumNumberOfThoughts)
                    ? thought.numberOfEntries
                    : maximumNumberOfThoughts;

                var percentsOfProgressBar = 100 / maximumNumberOfThoughts * thought.numberOfEntries;

                $('div#statsPage')
                    .append($('<h4/>', {
                        'text': thought._id
                    }))
                    .append($('<div class="progress"/>', {})
                        .append($('<div/>', {
                            'class': 'progress-bar progress-bar-info progress-bar-striped',
                            'text': thought.numberOfEntries,
                            'aria-valuenow': thought.numberOfEntries,
                            'style': 'width: ' + percentsOfProgressBar + '%',
                            'role': 'progressbar',
                            'aria-valuemin': '0',
                            'aria-valuemax': maximumNumberOfThoughts
                        })));
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
            if(!thoughtToAdd.length) {
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

