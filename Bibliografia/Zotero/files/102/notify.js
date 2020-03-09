/**
 * Created by jyu on 11/10/2015.
 */
var loaded = false;

$(document).ready(function() {
    $('#notifyTitleModalRemoveContinue').click(function() {
        var post = lastPost;
        var btn = lastBtn;

        if (post && btn) {
            doNotifyPost(post, btn);
        }

        lastPost = null;
        lastBtn = null;
    });

    // if not signed in
    var oldText = $('#signIn p').text();

    $('#sign_in_button').click(function() {
        if ($('input#dynamicPageUrl').length > 0) {
            $('input#dynamicPageUrl').val(removeURLParameter($('input#dynamicPageUrl').val(), 'notifyTitle'));
        }
        $('#signIn p').text(oldText); // set login text back to original

        var date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = 'notifyTitle=' + expires;
    });

    $('#sign_in_button_mobile').click(function() {
        $('#signIn p').text(oldText); // set login text back to original
        if ($('input#dynamicPageUrl').length > 0) {
            $('input#dynamicPageUrl').val(removeURLParameter($('input#dynamicPageUrl').val(), 'notifyTitle'));
        }

        var date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = 'notifyTitle=' + expires;
    });
});

var lastPost = '';
var lastBtn = '';
var removeNotifyText = 'You have removed this title from your notification list.';
var addNotifyText = "Thank you.<p></p><p>You will now receive email communications regarding the availability of this product.</p>";
var removeNotifyButton = 'Stock notification on';
var addNotifyButton = 'Notify me when available';

function revealLoginDialog() {
    $('#signIn').reveal({
        close: function() {
            if ($('input#dynamicPageUrl').length > 0) {
                $('input#dynamicPageUrl').val(removeURLParameter($('input#dynamicPageUrl').val(), 'notifyTitle'));
            }
            // document.cookie = 'notifyTitle=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    });
}

function doNotifyPost(post, btn) {
    $.get(post, function (r) {
        $('#notifyTitleModalContinue').show();
        if ($(btn).attr('title') == 'add') {
            $('#notifyTitleMessage').html(addNotifyText);
            $("#notifyTitleModal").reveal();
            $(btn).attr('title', 'remove');
            $(btn).addClass('remove');
            $(btn).html('<span></span>' + removeNotifyButton);

        } else {
            $(btn).attr('title', 'add');
            $(btn).removeClass('remove');
            $(btn).html('<span></span>' + addNotifyButton);
        }
    });
}

function removeURLParameter(url, parameter) {
    // prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        // reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            // idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0] + '?' + pars.join('&');
    }

    return url;
}

function clickNotifyButton(titleCode, val) {
    var date = new Date();
    date.setTime(date.getTime() + (60 * 1000));
    var expires = "; expires=" + date.toGMTString();

    if (titleCode) {
        document.cookie = 'notifyTitle=productsItem' + titleCode + expires;
    } else {
        document.cookie = 'notifyTitle=productsItem' + val + expires;
    }

    $('#signIn p').text('Please sign in to add title to notify list.'); // set login text to notifyTitle specific
    dynamicPageUrl = $('input#dynamicPageUrl').val();

    if (dynamicPageUrl && dynamicPageUrl.indexOf('notifyTitle') == -1) {
        dynamicPageUrl = removeURLParameter(dynamicPageUrl, 'notifyTitle');
        dynamicPageUrl = removeURLParameter(dynamicPageUrl, 'wishlist');

        if (dynamicPageUrl.indexOf('?') == -1) {
            var queryString = '?notifyTitle=' + val;
        } else {
            var queryString = '&notifyTitle=' + val;
        }

        if ($("#authorCurrentPage").length) {
            if (dynamicPageUrl.indexOf('&page') == -1) {
                queryString += '&page=' + $("#authorCurrentPage").val();
            } else if (dynamicPageUrl.indexOf('&page') !== -1) {
                dynamicPageUrl = removeURLParameter(dynamicPageUrl, 'page');
                queryString += '&page=' + $("#authorCurrentPage").val();
            }
        }

        $('input#dynamicPageUrl').val(dynamicPageUrl + queryString);
    }
}

function notify(el, cookieNotify) {
    lastPost = $(el).attr('rel');
    lastBtn = $(el);

    if ($(lastBtn).attr('title') == 'add') {
        doNotifyPost(lastPost, lastBtn);
    } else {
        $('#notifyTitleModalRemovePrompt').reveal();
    }

    // URL cleanup; for when refresh
    var dpU = '';
    if ($('input#dynamicPageUrl').length > 0) {
        var dpU = $('input#dynamicPageUrl').val();
        var pageTitle = $('title').text();

        dpU = removeURLParameter(dpU, 'notifyTitle');
        $('input#dynamicPageUrl').val(dpU);
    }

    if (history.pushState && dpU != '') {
        window.history.pushState('', pageTitle, dpU);
    }

    if (cookieNotify && $("#" + cookieNotify).length) {
        $('html, body').animate({
            scrollTop: $("#" + cookieNotify).offset().top
        }, 500);
    }

    return false;
}