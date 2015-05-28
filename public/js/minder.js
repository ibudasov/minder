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
        }).appendTo('div.pleaseShowMessagesHere').fadeOut(5000);
    },

    showNotice: function (err) {
        $('<div/>', {
            'class': 'alert alert-success custom-alert',
            'role': 'alert',
            'text': err
        }).appendTo('div.pleaseShowMessagesHere').fadeOut(2000);
    },

    showLoader: function (parent) {
        $('.pleaseShowLoaderHere').prepend(
            $('<div/>', {class: 'ajax-loader progress'})
                .append($('<div/>', {
                    class: 'progress-bar progress-bar-success progress-bar-striped active',
                    'role': "progressbar",
                    'aria-valuenow': "45",
                    'aria-valuemin': "0",
                    'aria-valuemax': "100",
                    'style': "width: 100%"
                }))
        );
    },

    hideLoader: function (parent) {
        $('.ajax-loader').slideUp();
    },

    getCloudOfThoughts: function () {
        $.ajax({
            type: 'GET',
            url: "/thought",
            beforeSend: function () {
                minder.showLoader();
            }
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
        }).complete(function () {
            minder.hideLoader();
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
                data: {thought: thoughtToAdd},
                beforeSend: function () {
                    minder.showLoader();
                }
            }).done(function (msg) {
                minder.showNotice('Well done!');
                minder.quickAdd();
            }).fail(function () {
                minder.showError('Can not add tought. Sorry.');
            }).complete(function () {
                minder.hideLoader();
            });
            $('#thoughtInput').val("");
        });
    },

    renderStatsPage: function () {
        $.ajax({
            type: 'GET',
            url: "/statistic/top",
            beforeSend: function () {
                minder.showLoader();
            }
        }).done(function (thoughts) {
            var maximumNumberOfThoughts = 0;

            if (thoughts.topThoughts.length > 0) {
                $('#statsPage').html("");
                $('div#statsPage').append($('<div class="progress"/>', {}));
            } else {
                return;
            }

            var sumOfAllThoughts = thoughts.topThoughts.map(function (thought) {
                return thought.numberOfEntries;
            }).reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });

            var colorsForProgressBar = [
                    'progress-bar-danger',
                    'progress-bar-warning',
                    'progress-bar-success',
                    'progress-bar',
                    'progress-bar-info'
                ],
                colorsForBadges = [
                    'label-danger',
                    'label-warning',
                    'label-success',
                    'label-primary',
                    'label-info'
                ]
            thoughtsWithPercents = [];

            thoughts.topThoughts.forEach(function (thought, i) {
                var percentsOfProgressBar = Math.round(100 / sumOfAllThoughts * thought.numberOfEntries);
                thoughtsWithPercents.push({
                    thought: thought._id,
                    numberOfEntries: thought.numberOfEntries,
                    percents: percentsOfProgressBar
                });
                $('div.progress')
                    .append($('<div/>', {
                        'class': 'progress-bar ' + colorsForProgressBar[i],
                        'text': percentsOfProgressBar + '%',
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
            minder.showAdvice(thoughtsWithPercents);
        }).fail(function () {
            minder.showError('Can not get Stats. Sorry.');
        }).complete(function () {
            minder.hideLoader();
        });
    },

    quickAdd: function () {
        $.ajax({
            type: 'GET',
            url: "/thought/distinct",
            beforeSend: function () {
                minder.showLoader();
            }
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
        }).complete(function () {
            minder.hideLoader();
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
                data: {thought: thoughtToAdd},
                beforeSend: function () {
                    minder.showLoader();
                }
            }).done(function (msg) {
                minder.showNotice('Well done!')
            }).fail(function () {
                minder.showError('Can not add tought. Sorry.');
            }).complete(function () {
                minder.hideLoader();
            });
        });
    },

    showAdvice: function (thoughtsWithPercents) {
        // if >30 + (15<20<25 * 2) -- success
        // + if >30 * 2 -- success
        // if 15<20<25 * 3 -- warning
        // if 15<20 * 4 -- fail
        // else 'try to concentrate on one or two targets'
        var thoughtsBiggerThan30 = [],
            thoughtsFrom20To30 = [],
            thoughtsLowerThan20 = [],
            status = '',
            title = '',
            message = '';
        thoughtsWithPercents.forEach(function (t, i) {
            if (t.percents >= 30) {
                thoughtsBiggerThan30.push(t.thought);
            } else if (20 <= t.percents && t.percents <= 30) {
                thoughtsFrom20To30.push(t.thought);
            } else if (t.percents <= 20) {
                thoughtsLowerThan20.push(t.thought);
            }
        });

        if (thoughtsBiggerThan30.length >= 2) {
            status = 'success';
            title = 'Good job!';
            message = 'Looks like you heavy working on ' + thoughtsBiggerThan30.toString() + '! Keep going!';
            minder.renderAdvice(status, title, message);
            return;
        }
        if ((thoughtsBiggerThan30.length == 1) &&
            (2 <= thoughtsFrom20To30.length && thoughtsFrom20To30.length <= 3)) {
            status = 'warning';
            title = 'Heads up!';
            message = 'You have to work on one primary target and one secondary. There are some secondary: ' + thoughtsFrom20To30.toString();
            minder.renderAdvice(status, title, message);
            return;
        }
        if (thoughtsFrom20To30.length == 4) {
            status = 'danger';
            title = 'Beware!';
            message = 'Try to concentrate on one main target and one secondary';
            minder.renderAdvice(status, title, message);
            return;
        }
    },

    renderAdvice: function (status, title, message) {
        $('#statsPage')
            .append($('<br/>'))
            .append($('<div/>', {class: 'alert alert-' + status + ' minder-advice'})
                .append($('<h4/>', {text: title}))
                .append($('<p/>', {text: message}))
        )

    }
};

