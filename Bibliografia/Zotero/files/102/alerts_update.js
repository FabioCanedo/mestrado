/**
 * Created by ebaluyo on 1/20/2016.
 */

$(document).ready(function () {
    $('.alerts_update').click(function () {
        var cTitle = $(this).attr('alertsdata');
        var alertEId = $(this).attr('id').split('_');

        var cId = alertEId[1];
        var cCode = alertEId[2];

        doAlertsUpdate(cId, cCode, cTitle);
    });

    //$('#alertsUpdateModalContinue').click(function() {
    //    location.reload();
    //});

    $('.alerts_link').click(function() {
        location.href = '/alerts_new';
    });
});

function doAlertsUpdate(cID, cCode, cTitle) {
    var postLink = '/tools/packages/academic/alerts_update?';
    postLink += 'cID=' + cID;
    postLink += '&cCode=' + cCode;
    postLink += '&cTitle=' + cTitle;

    $.get(postLink, function (data) {
        var msg = '<span style="display: block">Thank you.</span> <span style="display: block">You are now subscribed to "'  + cTitle + '".</span>';
        $('#alertsUpdateMessage').html(msg);
        $("#alertsUpdateModal").reveal({ close: function () { resetAlertsButton(cID, cCode, cTitle); } });
    });
}

function resetAlertsButton (cID, cCode, cTitle) {
    var btn = $('#alertsUpdate_' + cID + '_' + cCode);

    $('.alerts_update').unbind('click');

    btn.removeClass('alerts_update button_alerts_subscribe');
    btn.addClass('alerts_link button_alerts');

    btn.attr('href', '/alerts_new');
    btn.attr('title', 'Update your preferences');
    btn.html('Update');

    $('.promoDetails h3').text('Update your Cambridge Alerts preferences.');
    $('.promoDetails p').text('You are subscribed to receive alerts in "' + cTitle + '". ');
}