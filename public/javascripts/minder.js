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
});

minder = {

    showError: function (err) {
        $('<div/>', {
            'class': 'alert alert-danger custom-alert',
            'role': 'alert',
            'text': err
        }).appendTo('div.container-fluid');
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
        $('#addThoughtForm').submit(function(e){
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "/thought",
                data: {thought: $('#thoughtInput').val()}
            }).done(function (msg) {
                minder.showNotice('Well done!')
            }).fail(function () {
                minder.showError('Can not add tought. Sorry.');
            });
            $('#thoughtInput').val("");
        });
    }
};

