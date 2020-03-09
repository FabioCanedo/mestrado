var openedFacets = []; // placeholder for opened 2nd level facets

/**
 * Sets the 2nd level facet's checkboxes to darken or ticked
 * depending on the ticked children boxes. Also adjusts the arrows
 * accordingly
 */
function setFacetArrowsAndBoxes() {
    $('.webSubjectCb').each(function() {
        var childCount = '.' + $(this).attr('id') + '_child';
        var checkedChildCount = '.' + $(this).attr('id') + '_child:checked';
        var webSubjArrow = $(this).parent().find('i.web-subject-arrow');

        if ($(childCount).length == $(checkedChildCount).length) {
            $(this).attr('checked', 'checked');
            $(this).parent().find('div.dark-checkbox-bg').attr('style', 'visibility: hidden;');
        } else if ($(checkedChildCount).length > 0) {
            $(this).removeAttr('checked');
            $(this).addClass('webSubjectGreyed');
            $(this).parent().find('div.dark-checkbox-bg').removeAttr('style');
        } else {
            webSubjArrow.removeClass('fa-angle-up');
            webSubjArrow.addClass('fa-angle-down');
            $(this).parent().find('div.dark-checkbox-bg').attr('style', 'visibility: hidden;');
        }
    });

    // If any of the facets are ticked, display the global clear all link. Hide if none are ticked
    if ($("input[name='currentTheme']").val() == "Academic_v1") {
        var filters = $(".refineChunk .optionsHidden .options input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        if (filters.length > 0 || $("div.refinePanel div.refineChunk select").val()) {
            $('div.refinePanel div.refineChunk a.clearLink').show();
        } else {
            $('div.refinePanel div.refineChunk a.clearLink').hide();
        }
    } else {
        if ($('input.pivotCb').length === 0 || $('input.pivotCb:checked').length > 0)
            $('div.refinePanel div.refineChunk a.clearLink').removeClass('hide');
        else
            $('div.refinePanel div.refineChunk a.clearLink').addClass('hide');
    }

    // If any of the child facets are ticked for a single lvl 1 facet, display the clear all link. Hide if otherwise
    $('div.webSubject').each(function() {
        var clearAllLink = $(this).find('label.clear-all');

        if ($(this).find('ul.family-name-list li input.pivotCb:checked').length > 0) {
            clearAllLink.parent().show();
        } else
            clearAllLink.parent().hide();
    });

    for (var facetId in openedFacets) {
        var facet = $('#' + openedFacets[facetId]);
        var webSubjArrow = facet.parent().find('i.web-subject-arrow');

        webSubjArrow.removeClass('fa-angle-down');
        webSubjArrow.addClass('fa-angle-up');
        facet.attr('style', 'margin-left: 6%; display:block;');
    }
}

$(document).ready(function() {
    setFacetArrowsAndBoxes();

    $('.contentToggleContributors').click(function() {
        $(this).parent().find('.contentHiddenContributors').slideToggle("fast", function() {
            $('.contentToggleContributors').text(function(index, text) {
                return (text == 'Hide all contributors' ? 'View all contributors' : 'Hide all contributors');
            });
        });

        return false;
    });

    $(document).on('click', 'i.web-subject-arrow', function() {
        var webSubjArrow = $(this).parent().find('i.web-subject-arrow');
        var familyListId = $(this).parent().find('ul.family-name-list').attr('id');
        var inputId = $(this).parent().find('input.webSubjectCb').attr('id');
        var urlUtil;

        if (webSubjArrow.hasClass('fa-angle-down')) {
            if (typeof UrlUtil !== 'undefined') {
                urlUtil = new UrlUtil();

                urlUtil.updateQueryStringParameter(
                  window.location.href,
                  'thirdLvlFacetsExpand[]',
                  $(this).parent().find('ul.thirdLvlFacets').attr('data-facet-title'),
                  true
                );
            }

            webSubjArrow.removeClass('fa-angle-down');
            webSubjArrow.addClass('fa-angle-up');
            openedFacets.push(familyListId);
        } else {
            if (typeof UrlUtil !== 'undefined') {
                urlUtil = new UrlUtil();

                urlUtil.removeQueryStringParameter(
                  window.location.href,
                  'thirdLvlFacetsExpand[]',
                  $(this).parent().find('ul.thirdLvlFacets').attr('data-facet-title'),
                  true
                );
            }

            webSubjArrow.removeClass('fa-angle-up');
            webSubjArrow.addClass('fa-angle-down');
            openedFacets.splice($.inArray(familyListId, openedFacets), 1);
        }

        $('ul#' + inputId + '_list').slideToggle('fast');
    });

    // rsaunders 11/10/2013 : display correct pricing and buy button for selected format
    // refactored into jquery plugin (located in functionality.js) so can be re bound on page or facet change
    $('.dynamicFormatCartMenu').dropkick(); // apply dropkick styling for components page
    $('.dynamicFormatCartMenu').formatSwitcher().change();

    attachPaginationAjaxFunctionality();

    $('.contributorsPeopleLink').click(function() {
        $(this).parent().find('.contributorsPeopleHidden').slideToggle("fast", function() {
            $(this).parent().find('.contributorsPeopleLink').text(function(index, text) {
                return (text == 'Hide all contributors' ? 'View all contributors' : 'Hide all contributors');
            });
        });

        return false;
    });

    $('.titleLinksLink').click(function() {
        $(this).parent().find('.titleLinksHidden').slideToggle("fast", function() {
            $(this).parent().find('.titleLinksLink').text(function(index, text) {
                return (text == 'Close' ? 'View all links' : 'Close');
            });
        });

        return false;
    });

    // add classes to li tags to lay them out in a 4 column grid
    $("ul.journalsList").addGridLayoutClasses();

    $(".blogWrap a.more").click(function() {
        $(this).parent().prev().slideDown(400);
        $(this).parent().hide().next().show();
        return false;
    });

    $(".blogWrap a.close").click(function() {
        $(this).parent().prev().prev().slideUp(400);
        $(this).parent().hide().prev().show();
        $('.slideArrow').hide();
        return false;
    });

    $(".blogWrap a.more").hover(function() {
        $(this).next().slideToggle(50);
        return false;
    });

    changeLinks();

    $('.cboxAcademicSs').unbind();
    $('.cboxAcademicSs').bind('click', function() {
        var ssId = $(this).attr('class').split(/\s+/)[0];

        if ($(this).is(':checked')) {
            $('.' + ssId).prop('checked', 'checked');
        } else {
            $('.' + ssId).prop('checked', false);
        }
    });
    toggleClearAll();
});

$(window).load(function() {
    $(".orbit-wrapper").parents('.tabs-content.products-slider-tabs').css('overflow', 'visible');
    $(".orbit-wrapper").parents('.tabs-content.products-slider-tabs').parent(":not(.ccm-page-list)").css('overflow-x', 'hidden');
    $(".orbit-wrapper").parents('.tabScroll.product-area.product-details').css('overflow', 'visible');
    $(".orbit-wrapper").parents('.tabScroll.product-area.product-details').parent(":not(.ccm-page-list)").css('overflow-x', 'hidden');

    $(".orbit-slide .product-item")
        .mouseenter(function() {
            $(this).parent('.orbit-slide').css("z-index", "4");
        })
        .mouseleave(function() {
            $(this).parent('.orbit-slide').css("z-index", "3");
        });
});

function changeLinks() {
    // CEW-110
    // fix for the href links before or when book format is changed
    if ((".authorPriceContainer").length) {
        $.each($('.authorPriceContainer > .pretty.dk'), function() {
            var parent = $(this).parent().parent();
            changeDkLabel(parent.find(".dk_container.dk_theme_default"), parent.find(".dk_container.dk_theme_default").find(".dk_label").text());
        });
    }

    $('.callToActions .dk_options_inner > li > a').click(function() {
        var callToActions = $(this).attr("data-dk-dropdown-value");
        var parent = $(this).parent().parent().parent().parent().parent().parent();
        changeHrefFormat(parent, callToActions);
    });

    // Loop to change all href to the right book format
    $.each($('.dynamicFormatCartMenu'), function(a, b) {
        var parent = $(this).parent().parent();
        changeHrefFormat(parent, b.value);
    });
}

function renameProductLink(element) {
    if (element.attr('href').indexOf('?format') !== -1) {
        element.attr('href', element.attr('href').substring(0, element.attr('href').indexOf('?format')));
    }

    if (element.attr('data-url').indexOf('?format') !== -1) {
        element.attr('data-url', element.attr('data-url').substring(0, element.attr('data-url').indexOf('?format')));
    }
}

function changeHrefFormat(parent, callToActions) {
    if (parent != undefined && callToActions != undefined) {

        var bookCover = parent.find('.bookCover > a');
        var bookDetails = parent.find('.bookDetailsWrap > h2 > a');

        renameProductLink(bookCover);
        renameProductLink(bookDetails);

        parts = callToActions.split('_');
        var isbn = $.isArray(parts) ? parts[0] : '';
        if (CURRENT_THEME == 'Learning') {
            bookCover.attr("href", bookCover.attr('data-url') + '?format=' + parts[1] + '&isbn=' + isbn);
            bookDetails.attr("href", bookDetails.attr('data-url') + '?format=' + parts[1] + '&isbn=' + isbn);

        } else {
            var has_param = GetURLParameter("format", bookCover.attr('data-url'));
            if (typeof(has_param) == "undefined") {
                var new_bookCover = bookCover.attr('data-url') + '?format=' + parts[1];
                var new_bookDetails = bookDetails.attr('data-url') + '?format=' + parts[1];
            } else {
                var new_bookCover = bookCover.attr('data-url').replace('?format=' + has_param, '?format=' + parts[1]);
                var new_bookDetails = bookDetails.attr('data-url').replace('?format=' + has_param, '?format=' + parts[1]);
            }

            if ($.inArray(parts[1].toUpperCase(), ["WW", "WX"]) !== -1) {
                new_bookCover += "&isbn=" + isbn;
                new_bookDetails += "&isbn=" + isbn;

                changeDkLabel(parent.find(".dk_container.dk_theme_default"), parent.find(".dk_container.dk_theme_default").find(".dk_label").text());
            }

            bookCover.attr("href", new_bookCover);
            bookDetails.attr("href", new_bookDetails);

            $(bookCover).find('img').attr('src', $("#" + callToActions).val());
        }

        var date = parent.find('#date_' + callToActions).val();
        if (date == undefined || date == "") {
            date = "No date available";
        }

        parent.find('.publicationDate').html('<strong>Publication date</strong>: ' + date);
        // update ISBN in view
        parent.find('.ean').html('<strong>ISBN</strong>: ' + isbn);
    }
}

function updateShareLinks(url, title) {
    $("#share-link").val(url);

    if (url != '')
        url = escape(url);

    if (title != undefined && title != '') {
        title = escape(title);
    } else {
        title = '';
    }

    var defaultShareLinks = [{
        'service': 'StumbleUpon',
        'className': 'shareStumbleUpon',
        'url': 'http://www.stumbleupon.com/submit?url=' + url + '&title=' + title
    }, {
        'service': 'Facebook',
        'className': 'shareFacebook',
        'url': 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + url + '&p[title]=' + title
    }, {
        'service': 'Pinterest',
        'className': 'sharePinterest',
        'url': 'http://pinterest.com/pin/create/button/?url=' + url + '&description=' + title
    }, {
        'service': 'Twitter',
        'className': 'shareTwitter',
        'url': 'http://twitter.com/home?status=' + title + ' ' + url
    }, {
        'service': 'Digg',
        'className': 'shareDigg',
        'url': 'http://www.digg.com/submit?url=' + url + '&title=' + title
    }, {
        'service': 'Google+',
        'className': 'shareGoogle',
        'url': 'https://plus.google.com/share?url=' + url
    }, {
        'service': 'Delicious',
        'className': 'shareDelicious',
        'url': 'http://del.icio.us/post?url=' + url + '&title=' + title
    }];

    for (var i in defaultShareLinks) {
        link = defaultShareLinks[i];
        $("li." + link.className + " a").attr('href', link.url);
    }
}

function attachPaginationAjaxFunctionality() {
    if ($('.ajaxPagination').size() > 0) {
        // RSAUNDERS WMPCEUSUK-1631: changed way pagination is bound.
        // rather than binding to every link by default then excluding excluding specific links,
        // it now binds the other way around, binding to what is needed only. This is much safer.
        $('div.listingPagination a').not('.ajaxEnabled').click(function() {
            var tab = $("dl.tabs dd.active > a").first().attr("id");
            var url = $(this).attr('href');
            var layout = $('#layout').val();

            var foundTab = false;
            var foundLayoutParam = false;

            var urlSplit = Array();
            var urlParts = Array();

            if (url.indexOf('?') !== -1) {
                urlSplit = url.split('?');
                urlParts = urlSplit[1];
                urlParts = urlParts.split('&');

                for (var i in urlParts) {
                    var fieldParts = urlParts[i].split('=');
                    if (fieldParts[0] == "tab") {
                        urlParts[i] = 'tab=' + tab;
                        foundTab = true;
                    }

                    // update layout param with current layout (grid or listing)
                    if (fieldParts[0] == 'layout') {
                        urlParts[i] = 'layout=' + layout;
                        foundLayoutParam = true;
                    }

                    if (foundLayoutParam && foundTab) {
                        break;
                    }
                }
            } else {
                urlSplit.push(url);
            }

            if (!foundLayoutParam) {
                urlParts.push('layout=' + layout);
            }

            if (!foundTab) {
                urlParts.push('tab=' + tab);
            }

            if (typeof UrlUtil !== 'undefined') {
                var urlUtil = new UrlUtil();
                var urlParams = urlUtil.getUrlParams();

                var addParameters = function(paramKey) {
                    // Clear all in urlParams for show more/less
                    $.each(urlParts, function(index, val) {
                        if (val !== null && typeof val !== 'undefined' && val.indexOf(paramKey) !== -1) {
                            urlParts.splice(index, 1);
                        }

                        if ($.isArray(urlParams[paramKey])) {
                            // Clear the urlParams for the paramKey then rebuild it later
                            $.each(urlParts, function(index, val) {
                                if (typeof val === "string" && val.indexOf(paramKey) !== -1) {
                                    urlParts.splice(index, 1);
                                }
                            });
                        }
                    });

                    // Read urlParams for each then add them to urlParts for show more/less
                    if ($.isArray(urlParams[paramKey])) {
                        $.each(urlParams[paramKey], function (index, val) {
                            if ($.inArray(paramKey + '=' + val, urlParts) === -1) {
                                urlParts.push(paramKey + '=' + val);
                            }
                        });
                    }
                };

                addParameters('expandedMoreOptions[]');
                addParameters('thirdLvlFacetsExpand[]');
                addParameters('openOptions[]');
            }

            url = urlSplit[0] + '?' + urlParts.join('&');

            // nabbed this from the Mozernizer section
            if (!!(window.history && history.pushState)) {
                window.history.pushState('Cambridge Search', $(document).attr("title"), url);
            }

            updateShareLinks(url, $(document).attr("title"));

            $.ajax({
                url: url,
                dataType: "html"
            }).done(function(out) {
                if (url.indexOf("cambridgeenglish/contact") !== -1) {
                    // WMPCEUSUK-1392. Attach ajax pagination for elt contacts page
                    $("#filtersForm").replaceWith($(out).find("#filtersForm"));
                    $(".ajaxPagination").replaceWith($(out).find(".ajaxPagination"));
                    $.scrollTo(0, $("#filtersForm").parent().offset().top - 50);
                } else if ($("#" + tab + "Form").size() > 0) {
                    $("#" + tab + "Form").replaceWith(out);
                    if ($("div.headerPagination").not(":in-viewport").length > 0 && !isTablet && !isMobile) {
                        $.scrollTo(0, $("#" + tab + "Form").offset().top - 50)
                    }
                } else {
                    if ($("div.headerPagination").not(":in-viewport").length > 0 && !isTablet && !isMobile) {
                        $.scrollTo(0, $("#filtersForm").parent().offset().top - 50)
                    }
                    $("#filtersForm").replaceWith(out)
                }

                $(".optionsHidden .options li input").showSpinnerOnClick();

                $(".refineResultsButton").not('.refineEnabled').click(function() {
                    $(".refinePanel").slideToggle('fast');
                    return false;
                }).addClass('refineEnabled');

                $(".refinePanel h3 a").not('.refineEnabled').click(function() {
                    $(this).toggleClass('open').parent().next().slideToggle('fast');
                    return false;
                }).addClass('refineEnabled');

                attachPaginationAjaxFunctionality();
                initListingTypes();

                $('html:not(.touch) .pretty').dropkick();

                // add classes to li tags to lay them out in a 4 column grid
                $("ul.productsList").addGridLayoutClasses();

                // display correct pricing and buy button for selected format
                $('.dynamicFormatCartMenu').formatSwitcher().change();

                changeLinks();
                toggleClearAll();
                if (typeof applyFacetFilters !== 'undefined') {
                    applyFacetFilters();
                }

                // rsaunders 07/10/2013 : add delay to prevent missread of div height (hacky, needs better solution)
                window.setTimeout(function() {
                    // reset the max height of all the book covers
                    setGridResultsToMaxHeight();
                }, 100);
            });

            return false;
        }).addClass('ajaxEnabled');
    }
}

// WMPCEH-132
// Nick Ingarsia, 10/5/14
// Added check for selectedFormat variable type before perform split() method
// For learning, add the ISBN to the query string
function splitFormatAndJump(el, ref, format) {
    var selectedFormat = $('#' + ref).val();
    var oldHref = el.attr('href');

    if (typeof selectedFormat == 'string') {
        var parts = selectedFormat.split('_');
        if (CURRENT_THEME == 'Learning') {
            $(el).attr('href', oldHref + '?format=' + parts[1] + '&isbn=' + parts[0]);
        } else {
            var has_param = GetURLParameter("format", $(el).attr('href'));
            if (typeof(has_param) == "undefined") {
                $(el).attr('href', oldHref + '?format=' + parts[1]);
            } else {
                var new_href = $(el).attr('href').replace('?format=' + has_param, '?format=' + parts[1]);
                $(el).attr('href', new_href);
            }
        }
    } else {
        var has_param = GetURLParameter("format", $(el).attr('href'));
        if (typeof(has_param) == "undefined" && format) {
            $(el).attr('href', oldHref + '?format=' + format);
        } else {
            var new_href = $(el).attr('href').replace('?format=' + has_param, '?format=' + format);
            $(el).attr('href', new_href);
        }
    }

    $(el).click();
}

function GetURLParameter(sParam, href) {
    var sPageURL = href;
    var sURLVariables = sPageURL.split('?');
    var sURLVariables1 = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }

    if (typeof(sURLVariables1) != undefined) {
        for (var i = 0; i < sURLVariables1.length; i++) {
            var sParameterName = sURLVariables1[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
}

function getCookieValue(key) {
    currentcookie = document.cookie;
    if (currentcookie.length > 0) {
        firstidx = currentcookie.indexOf(key + "=");
        if (firstidx != -1) {
            firstidx = firstidx + key.length + 1;
            lastidx = currentcookie.indexOf(";", firstidx);
            if (lastidx == -1) {
                lastidx = currentcookie.length;
            }
            return unescape(currentcookie.substring(firstidx, lastidx));
        }
    }
    return "";
}

var facetTimeoutObj;
var facetTimeout = 750; // delay before submitting form to allow clicking multiple facets

// Title facet function - override for external pagination
function facetFieldChange(form, delay, checkBoxId) {
    // rsaunders 03/10/2013 : delay submitting form to allow clicking multiple facets
    if (typeof delay == 'undefined') {
        delay = true;
    };

    // dont use delay for msie8, it doesn't like it (WMPCEUSUK-1044)
    if ($.browser.msie && $.browser.version == '8.0') {
        delay = false;
    }

    // clear the previous delayed click if another facet clicked before delay is up
    window.clearTimeout(facetTimeoutObj);

    if (delay) {
        facetTimeoutObj = window.setTimeout(function() {
            facetFieldChange(form, false, checkBoxId);
        }, facetTimeout);
        return;
    }

    var formData = form.serializeArray();

    var searchAjax = false;
    var listingAjax = false;

    var tab = '';

    for (var ff in formData) {
        ff = formData[ff];

        if (ff.name == "currentTheme") {
            if (ff.value == "Learning") {
                searchAjax = true;
            }
        }

        if (ff.name == "tab") {
            tab = ff.value;
        }
    }

    var currentUrl = window.location.href.split('?')[0];
    var urlParts = currentUrl.split("/");
    for (var i in urlParts) {
        if (urlParts[i] == "cambridgeenglish") {
            listingAjax = true;
            break;
        }
    }

    if (searchAjax || listingAjax) {
        var open = new Array();
        var closed = new Array();
        var openOptions = '';
        var closedOptions = '';
        var otherOptions = '';

        $(".refinePanel h3 a").each(function() {
            if ($(this).parent().next().css("display") == "" || $(this).parent().next().css("display") == "block") {
                open.push($(this).parent().next().find("ul").first().attr("id"));
            } else {
                closed.push($(this).parent().next().find("ul").first().attr("id"));
            }
        });

        if (typeof UrlUtil !== 'undefined') {
            var urlUtil = new UrlUtil();
            var urlParams = urlUtil.getUrlParams();
            var addOtherOptions = function(keyParam) {
                if ($.isArray(urlParams[keyParam])) {
                    $.each(urlParams[keyParam], function (index, moreOption) {
                        // Ensure we don't duplicate url param values
                        if ($.inArray(moreOption, open) === -1 && $.inArray(moreOption, closed) === -1) {
                            otherOptions += '&' + keyParam + '=' + moreOption;
                        }
                    });
                }
            };

            addOtherOptions('expandedMoreOptions[]');
            addOtherOptions('thirdLvlFacetsExpand[]');
            addOtherOptions('openOptions[]');
        }

        for (var id in open) {
            openOptions += '&openOptions[]=' + open[id];
        }

        for (var id in closed) {
            closedOptions += '&closedOptions[]=' + closed[id];
        }

        var url = window.location.href.split('?')[0];
        var formParams = $(form).serializeArray();
        var clickedCheckBox = $('#' + checkBoxId);
        var buildUrl = $(form).serialize();

        if (typeof checkBoxId != 'undefined' && typeof clickedCheckBox.attr('checked') == 'undefined') {
            buildUrl = '';
            if (clickedCheckBox.hasClass('noChildFacet')) {
                var cleanClickedCheckBox = clickedCheckBox.attr('value').replace(/[\s,&]/g, '-').toLowerCase();
                var childrenBoxes = $('.' + cleanClickedCheckBox + '-child');
                var filteredValues = [];

                for (var c = 0; c < childrenBoxes.length; c++) {
                    for (var param in formParams) {
                        if (formParams[param].value === childrenBoxes[c].value)
                            filteredValues.push(childrenBoxes[c].value);
                    }
                }

                for (var param in formParams) {
                    if ($.inArray(formParams[param].value, filteredValues) === -1)
                        buildUrl += '&' + formParams[param].name + '=' + formParams[param].value;
                }
            } else if (checkBoxId.indexOf('pivot_') !== -1) {
                // If user unticks on 3rd level facet (e.g. Cambridge Discovery Educ for non US locale)
                for (var param in formParams) {
                    if (formParams[param].value != clickedCheckBox.attr('value'))
                        buildUrl += '&' + formParams[param].name + '=' + formParams[param].value;
                }

            } else if (clickedCheckBox.attr('name') === 'webSubjAll[]') {
                // If user un-ticks the show all checkbox, then un-check all of its children facets recursively
                var webSubjectBoxes = clickedCheckBox.parent().parent().find($('input.webSubjectCb:checkbox'));
                var pivotBoxes = clickedCheckBox.parent().parent().find($('input.pivotCb:checkbox'));
                var filteredValues = [];

                for (var c = 0; c < webSubjectBoxes.length; c++) {
                    for (var param in formParams) {
                        if (formParams[param].value == webSubjectBoxes[c].value)
                            filteredValues.push(webSubjectBoxes[c].value);
                    }
                }

                for (var c = 0; c < pivotBoxes.length; c++) {
                    for (var param in formParams) {
                        if (formParams[param].value == pivotBoxes[c].value)
                            filteredValues.push(pivotBoxes[c].value);
                    }
                }

                for (var param in formParams) {
                    if ($.inArray(formParams[param].value, filteredValues) === -1)
                        buildUrl += '&' + formParams[param].name + '=' + formParams[param].value;
                }
            } else {
                // If user un-ticks checkbox on 2nd level facet (e.g. Adult Education), un-tick all its children too
                var filteredFamilies = [];
                var childBoxes = $('.' + checkBoxId + '_child');
                for (var c = 0; c < childBoxes.length; c++) {
                    for (var param in formParams) {
                        if (formParams[param].value == childBoxes[c].value)
                            filteredFamilies.push(childBoxes[c].value);
                    }
                }

                for (var param in formParams) {
                    if ($.inArray(formParams[param].value, filteredFamilies) === -1)
                        buildUrl += '&' + formParams[param].name + '=' + formParams[param].value;
                }
            }
        } else if (typeof checkBoxId != 'undefined' && typeof clickedCheckBox.attr('checked') != 'undefined') {
            if (clickedCheckBox.hasClass('noChildFacet')) {
                // If user ticks facets without children (e.g. Primary, Secondary)
                var cleanClickedCheckBox = clickedCheckBox.attr('value').replace(/[\s,&]/g, '-').toLowerCase();
                var childrenBoxes = $('.' + cleanClickedCheckBox + '-child');

                for (var c = 0; c < childrenBoxes.length; c++) {
                    if (buildUrl.indexOf(childrenBoxes[c].value) === -1)
                        buildUrl += '&familyName[]=' + encodeURIComponent(childrenBoxes[c].value);
                }
            } else if (checkBoxId.indexOf('pivot_') !== -1) {
                // If user clicked on an individual 3rd level facet pivot
                $('#' + clickedCheckBox.attr('class').replace('_child pivotCb', '')).addClass('webSubjectGreyed');
                buildUrl += '&familyName[]=' + clickedCheckBox.attr('value');

            } else if (clickedCheckBox.attr('name') === 'webSubjAll[]') {
                // If user ticks the show all checkbox, check all its children facets recursively
                var webSubjectBoxes = clickedCheckBox.parent().parent().find($('input.webSubjectCb:checkbox'));
                var pivotBoxes = clickedCheckBox.parent().parent().find($('input.pivotCb:checkbox'));

                for (var c = 0; c < webSubjectBoxes.length; c++) {
                    if (buildUrl.indexOf(webSubjectBoxes[c].value) === -1)
                        buildUrl += '&' + webSubjectBoxes[c].name + '=' + encodeURIComponent(webSubjectBoxes[c].value);
                }

                for (var c = 0; c < pivotBoxes.length; c++) {
                    if (buildUrl.indexOf(pivotBoxes[c].value) === -1)
                        buildUrl += '&' + pivotBoxes[c].name + '=' + encodeURIComponent(pivotBoxes[c].value);
                }
            } else {
                // If user ticks checkbox on 2nd level facet, then check all its children facets
                var childrenBoxes = $('.' + checkBoxId + '_child');
                for (var c = 0; c < childrenBoxes.length; c++) {
                    // ensure parameters are unique
                    if (buildUrl.indexOf(childrenBoxes[c].value) === -1)
                        buildUrl += '&' + childrenBoxes[c].name + '=' + encodeURIComponent(childrenBoxes[c].value);
                }
            }
        }

        var fullUrl = url + '?' + buildUrl + openOptions + closedOptions + otherOptions;

        updateShareLinks(fullUrl, $(document).attr("title"));

        // nabbed this from the Mozernizer section
        if (!!(window.history && history.pushState))
            window.history.pushState('Cambridge Univesity Press - Products', $(document).attr("title"), url + '?' + buildUrl + openOptions + closedOptions + otherOptions);

        $.ajax({
            url: url,
            dataType: "html",
            data: buildUrl + openOptions + closedOptions
        }).done(function(out) {
            if (searchAjax) {
                $("#" + tab + "Tab").html(out);
                if ($('div.headerPagination').not(':in-viewport').length > 0 && (!isTablet && !isMobile)) {
                    $.scrollTo(0, $("#" + tab + "Tab").offset().top - 50);
                }

            } else if (listingAjax) {
                $("#filtersForm").replaceWith(out);
            }

            $(".optionsHidden .options li input").showSpinnerOnClick();
            $(".singleChildParentFacet").click(function() {
                $(this).parent().addClass('spinner');
            });

            $(".refineResultsButton").not('.refineEnabled').click(function() {
                $(".refinePanel").slideToggle('fast');
                return false;
            }).addClass('refineEnabled');

            $(".refinePanel h3 a").not('.refineEnabled').click(function() {
                $(this).toggleClass('open').parent().next().slideToggle('fast');
                return false;
            }).addClass('refineEnabled');

            attachPaginationAjaxFunctionality();
            initListingTypes();
            $('html:not(.touch) .pretty').dropkick();

            //add classes to li tags to lay them out in a 4 column grid
            $("ul.productsList").addGridLayoutClasses();

            //display correct pricing and buy button for selected format
            $('.dynamicFormatCartMenu').formatSwitcher().change();


            //rsaunders 07/10/2013 : add delay to prevent missread of div height (hacky, needs better solution)
            window.setTimeout(function() {
                //reset the max height of all the book covers
                setGridResultsToMaxHeight();
            }, 100);

            setFacetArrowsAndBoxes();
            changeLinks();
            toggleClearAll();

            // This function is only defined and used for Cambridge English
            if (typeof applyFacetFilters !== 'undefined') {
                applyFacetFilters();
            }
        });

    } else {
        $(form).submit();
    }
}

function toggleClearAll() {
    if($('.refinePanel input[type=checkbox]:checked').not('.hide').length > 0) {
        $(".clearLink").show();
    } else {
        $(".clearLink").hide();
    }
}

// Used in Cambridge English Resources and Search Page for their facets
function loadExtTable(subject, id, checked, form) {
    $('#' + id).parent().parent().addClass('spinner');
    $('#' + id).parent().find('h3').find('a').css({
        'background': 'none'
    });
    if (checked !== 'checked')
        $('#' + id).attr('checked', 'true');
    else
        $('#' + id).removeAttr('checked');
    facetFieldChange($('#' + form), 'true', id);
    return false;
}

function checkSubSubjects(id, checked) {
    var $container = $("#" + id);

    if ($container.hasClass(id)) {
        $('.' + id).find("input:checkbox").prop("checked", checked);
    } else {
        $container.find("input:checkbox").prop("checked", checked);
    }
}

function uncheckShowAll(id) {
    var $cboxShowAll = $("#" + id);
    var $ulParent = $cboxShowAll.parent().parent();

    if ($ulParent.hasClass($ulParent.prop('id'))) {
        var ulParentClass = $ulParent.attr('class').split(/\s+/)[1];
        $('.' + ulParentClass).find('.cboxShowAll').prop('checked', false);
    } else {
        $cboxShowAll.prop("checked", false);
    }
}

function changeDkLabel(dk, label) {
    var isMixedMedia = dk.prev().hasClass('mixed-media');
    label = $.trim(label);

    if (isMixedMedia == true) {
        if ($(".mixed-media").parents(".authorPriceContainer").length) {
            var shortText = label.substring(0, 18) + "...";
        } else {
            var shortText = label.substring(0, 14) + "...";
        }
        dk.find('.dk_label').text(shortText);
    }
}