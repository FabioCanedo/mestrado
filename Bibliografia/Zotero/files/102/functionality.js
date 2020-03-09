// if ($.browser.safari) {
//    // Disable safari caching on back button
//    function invalidateBackCache() { }
//    window.addEventListener("unload",invalidateBackCache, false);
//    // For iOS
//    if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
//      $(window).bind("pageshow", function(event) {
//         if (event.originalEvent.persisted) {
//           window.location.reload();
//         }
//     });
//    }
// }

var base_url    = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
var whiteArrows = base_url + 'packages/cambridge_themes/images/english/hero-nav_white.png'; // path for slider's white arrow assets
var grayArrows  = base_url + 'packages/cambridge_themes/images/english/hero-nav.png'; // path for slider's gray arrow assets
var blueArrows  = base_url + 'packages/cambridge_themes/images/english/hero-nav_blue.png'; // path for slider's gray arrow assets

if (!LEARNING_THEME_HANDLE){
    var LEARNING_THEME_HANDLE;
}

function initListingTypes() {
    if ($('.refinePanel').length > 0) {
        // If Refine results panel exists on a page, this code will make sure that each arrows are correct (WMPCEUSUK-1815)
        $('.refinePanel h3 a').each(function() {
            if ($(this).parent().parent().find('.optionsHidden').css('display') == 'block') {
                $(this).addClass('open');
            }
        });
    }

    $("a.resultsListing").click(function() {
        $(this).parent().parent().parent().removeClass('grid').addClass('listing');
        clearResultsMaxHeight();
        return false;
    });

    var $windowWidth = $(window).width();

    // webkit follows what specified in media query. others (firefox and IE) don't.
    // subtract 27 from media query width
    if (!($windowWidth <= 750) && !($windowWidth <= 767 && $.browser.webkit)) {
        $("a.resultsListing").css('display', 'block');
        $("a.resultsGrid").css('display', 'block');
    }

    $("a.resultsGrid").click(function() {
        $(this).parent().parent().parent().removeClass('listing').addClass('grid');

        // rsaunders 07/10/2013 : add delay to prevent missread of div height (hacky, needs better solution)
        window.setTimeout(function() {
            // reset the max height of all the book covers
            setGridResultsToMaxHeight();
        }, 100);

        return false;
    });

    $(".refinePanel h3 a,.refinePanel p.facet-header a").not('.refineEnabled').click(function() {
        if (this.id == "heading_Subjects") {
            $("#topSubjects").toggle('fast');
            $("#topSubjects").next().toggle('fast');
            $(this).toggleClass('open');

            if ($("#heading_Subjects span").html() == "Show All Subjects") {
                $("#heading_Subjects span").html("Show Top Subjects");
            } else {
                $("#heading_Subjects span").html("Show All Subjects")
            }
        } else {
            $(this).toggleClass('open').parent().next().slideToggle('fast');
        }

        return false;
    }).addClass('refineEnabled');

    $("#topSubjects h3 a").click(function() {
        $(this).toggleClass('open').parent().next().slideToggle('fast');
        return false;
    });
}

/**
 * setGridResultsToMaxHeight.
 *
 * call this when you want to reset the all the results to the same height
 * it determins which page it is called on and adjusts the results using the correct id's and classes for that page
 * its called on the subjects, resources and search pages
 *
 * @author : Richard Saunders
 * @date : 02/10/2013
 */
function setGridResultsToMaxHeight() {
    // set all items same height
    if (CURRENT_THEME == LEARNING_THEME_HANDLE) {
        // Check if we are on the search page
        if ($('#cambridgeenglishTab').length == 1) {
            // Product search tab
            if ($('#cambridgeenglishTab').hasClass('active')) {
                $('#cambridgeenglishTab div.grid .bookCover').setAllToMaxHeight();
            } else {
                // Related results tab
                $('#relatedTab div.relatedSearch.grid h2').setAllToMaxHeight();
                $('#relatedTab div.relatedSearch.grid h3').setAllToMaxHeight();
            }
        } else {
            // else on subjects page
            $('div.grid .bookCover').setAllToMaxHeight();
        }
    } else {
        $('.productsItem').setAllToMaxHeight();
    }

    // Add class to even out buttons position
    $('.productsItem .three .buyProduct:last-child').addClass('marginedBottom');
}

function clearResultsMaxHeight() {
    if (CURRENT_THEME == LEARNING_THEME_HANDLE) {
        // Check if we are on the search page
        if ($('#cambridgeenglishTab').length == 1) {
            // Product search tab
            if ($('#cambridgeenglishTab').hasClass('active')) {
                $('#cambridgeenglishTab .bookCover').css('height', '');
            } else {
                // Related results tab
                $('#relatedTab .relatedSearch h2').css('height', '');
                $('#relatedTab .relatedSearch h3').css('height', '');
            }
        } else {
            $('.bookCover').css('height', '');
        }
    } else {
        $('.productsItem').css('height', '');
    }

    $('.marginedBottom').removeClass('marginedBottom');
}

function changeToGrayArrows() {
    // Set flexSlider nav arrows to default (gray)
    $('.homepageHero .flex-direction-nav li a').css('background', 'url(' + grayArrows + ') no-repeat');
    $('.homepageHero .flex-direction-nav li .flex-prev').css('background-position', 'right 0');
}

function changeToWhiteArrows() {
    // Set flexSlider nav arrows to color white
    $('.homepageHero .flex-direction-nav li a').css('background', 'url(' + whiteArrows + ') no-repeat');
    $('.homepageHero .flex-direction-nav li .flex-prev').css('background-position', 'right 0');
}

function changeToBlueArrows() {
    // Set flexSlider nav arrows to color blue
    $('.homepageHero .flex-direction-nav li a').css('background', 'url(' + blueArrows + ') no-repeat');
    $('.homepageHero .flex-direction-nav li .flex-prev').css('background-position', 'right 0');
}

$(document).ready(function() {
    // Change color of flexSlider nav arrows in homepage depending on featured content block settings
    $('.post-triage').flexslider({
        animation: "slide",
        slideshow: true,
        after: function() {
            var arrowColour = $('.arrowColour', '.flex-active-slide').val();
            if (arrowColour == 'white') {
                changeToWhiteArrows();
            } else if (arrowColour == 'blue') {
                changeToBlueArrows();
            } else {
                changeToGrayArrows();
            }
        },
    });

    if ($('.arrowColour', '.flex-active-slide').val() == 'white') {
        changeToWhiteArrows();
    } else if ($('.arrowColour', '.flex-active-slide').val() == 'blue') {
        changeToBlueArrows();
    } else {
        changeToGrayArrows();
    }

    // Touch events for ipads & tablets to change color of nav arrows to see that it fires on click
    $('.hubslide ul.flex-direction-nav li a.flex-next').on('touchstart', function() {
        $(this).css('background-color', '#777');
    });
    $('.hubslide ul.flex-direction-nav li a.flex-prev').on('touchstart', function() {
        $(this).css('background-color', '#777');
    });
    $('.hubslide ul.flex-direction-nav li a.flex-next').on('touchend', function() {
        $(this).css('background-color', '#fff');
    });
    $('.hubslide ul.flex-direction-nav li a.flex-prev').on('touchend', function() {
        $(this).css('background-color', '#fff');
    });

    var $elemPageSlide = CCP_ENABLED ? $('#ccpOpenPageSlide') : $('.openPageSlide');
    $elemPageSlide.pageslide();
    $elemPageSlide.click(function() {
        $('#content').toggleClass('contentFixed');
        $(".mainNav").slideUp(400);
        $(".mainNavToggle").removeClass('mainNavToggleOpen');
        $("#ccm-cookiesDisclosure").toggleClass('labelHidden');
    });

    $('#content').click(function() {
        return !$(this).hasClass('contentFixed');
    });

    $("input[name$='searchOption']").click(function() {
        var radio_value = $(this).val();

        if (radio_value == 'dictionary') {
            $(".dictionarySearch").show();
            $(".productsSearch").hide();
        } else if (radio_value == 'products') {
            $(".dictionarySearch").hide();
            $(".productsSearch").show();
        }
    });

    $(".searchTabs").show();

    $(".searchToggle").click(function() {
        $(this).toggleClass('searchToggleOpen');
        $('.searchBox').slideToggle('fast');
        return false;
    });

    $(".mainNavToggle").click(function() {
        $(this).toggleClass('mainNavToggleOpen');
        $('.mainNavWrap > .mainNav').slideToggle('fast');
        return false;
    });

    $('html:not(.touch) .pretty').dropkick();

    $('.dk_toggle').css('width', '100%');

    $(".mainNav li ul").hide();

    $(".mainNav li ul li ul").hide();

    $(".mainNav li a span.navExpander").click(function(event) {
        if ($(window).width() < 768) {
            event.preventDefault();
            $(this).toggleClass("active").parent().next().slideToggle("medium");
        }
    });

    $(".mainNav li h3 span.navExpander").click(function(event) {
        if ($(window).width() < 768) {
            event.preventDefault();
            $(this).toggleClass("active").parent().next().slideToggle("medium");
        }
    });

    $(".pressSearch").hide();

    $(".pressToggle").click(function() {
        $('.pressSearch').slideToggle('fast');
        return false;
    });

    $('.contentToggle').click(function() {
        $(this).parent().find('.contentHidden').slideToggle("fast", function() {
            $('.contentToggle').text(function(index, text) {
                return (text == 'Close' ? 'Read more' : 'Close');
            });
        });

        return false;
    });

    $('.contentToggleReviews').click(function() {
        $(this).parents("#descriptionTab").find('.contentHiddenReviews').slideToggle("fast", function() {
            $('.contentToggleReviews').text(function(index, text) {
                return (text == 'Close' ? 'See all reviews' : 'Close');
            });
        });

        return false;
    });

    $('.contentToggleCustomerReviews').click(function() {
        $(this).parent().find('.contentHiddenCustomerReviews').slideToggle("fast", function() {
            $('.contentToggleCustomerReviews').text(function(index, text) {
                return (text == 'Close' ? 'See all reviews' : 'Close');
            });
        });

        return false;
    });

    $('.bookPeopleLink').click(function() {
        $(this).parent().find('.bookPeopleHidden').slideToggle("fast", function() {
            $('.bookPeopleLink').text(function(index, text) {
                return (text == 'Close' ? 'See all' : 'Close');
            });
        });

        return false;
    });

    $('.bookPeopleLink2').click(function() {
        $(this).parent().find('.bookPeopleHidden').slideToggle("fast", function() {
            $('.bookPeopleLink2').text(function(index, text) {
                return (text == 'Close' ? 'See all' : 'Close');
            });
        });

        return false;
    });

    $('.htmlToggle').click(function() {
        $(this).parent().find('.contentHidden').slideToggle("fast", function() {
            $('.htmlToggle').text(function(index, text) {
                return (text == 'Hide HTML' ? 'View HTML' : 'Hide HTML');
            });
        });

        return false;
    });

    if (CCM_EDIT_MODE == true) {
        $('#landingContent').orbit({
            bullets: true,
            directionalNav: false,
            timer: false,
            fluid: '965x348',
            captions: true,
            pauseOnHover: true,
            startClockOnMouseOut: true
        });
    } else {
        $('#landingContent').orbit({
            bullets: true,
            directionalNav: false,
            advanceSpeed: 6000,
            fluid: '965x348',
            captions: true,
            pauseOnHover: true,
            startClockOnMouseOut: true
        });
    }

    if (CCM_EDIT_MODE == true) {
        $('#homepageSliderButtons').orbit({
            bullets: true,
            directionalNav: true,
            captions: true,
            timer: false,
            pauseOnHover: true,
            startClockOnMouseOut: true
        });
        $('#place-holder').remove();
    } else {
        $('#homepageSliderButtons').orbit({
            bullets: true,
            directionalNav: true,
            advanceSpeed: 6000,
            captions: true,
            pauseOnHover: true,
            startClockOnMouseOut: true
        });
    }

    $(".topicsListHidden").hide();
    $(".topicsListHiddenBottom").hide();

    // cdeocampo 12/16/2013 - New logic below
    /*$('a.seeMore').click(function() {
        if( $(this).hasClass("seeMoreTop")) {
            $('.topicsListHidden').slideToggle("fast");
            $(this).text(function (index, text) {
                return (text == 'See fewer topics' ? 'See more topics' : 'See fewer topics');
            });

            $('.topTopics').slideToggle("fast");
            $('.topicsListSpecial').slideToggle("fast");
        } else {
            $('.topicsListHiddenBottom').slideToggle("fast");
            $(this).text(function (index, text) {
                return (text == 'See fewer topics' ? 'See more topics' : 'See fewer topics');
            });
        }

        return false;
    });*/

    initListingTypes();

    $(".seeSubjects").click(function() {
        var $topicsListWrapper = $(this).parents('div.seeMoreWrapper').prev('div.subjectTitlesWrapper.main-topics');

        if ($topicsListWrapper.length > 0) {
            jQuery('.subjectTitlesWrapper.main-topics').toggle();
        } else {
            $topicsListWrapper = $(this).parents('div.seeMoreWrapper').prev('div.subjectTitlesWrapper');
            var $topicsArray = new Array();
            var topicsCount = 0;

            var isExpanded = $topicsListWrapper.hasClass('expanded');

            $topicsListWrapper.find(".topicsList .topTopics").each(function() {
                var $topic = $(this);
                $topicsArray[$topic.data('col-index')] = $topic;
                topicsCount++;
            });

            var noCols = 3;
            var totalRows = Math.ceil(topicsCount / noCols);
            var noRows = isExpanded ? 4 : Math.ceil(topicsCount / noCols);

            for (var row = 0; row < noRows; row++) {
                var $rowTo = $topicsListWrapper.find("div#row" + row);

                if ($rowTo.length <= 0) {
                    // create new row
                    if (!isExpanded) {
                        var $newRow = "<div class='row topicsList' id='row" + row + "'></div>";
                        $topicsListWrapper.append($newRow);
                        $rowTo = $topicsListWrapper.find("div#row" + row);
                    }
                }

                // remaining columns
                var extraCols = topicsCount % noCols;
                var remCols = (row == (noRows - 1) && !isExpanded && extraCols != 0) ? extraCols : noCols;

                for (var column = 0; column < remCols; column++) {
                    var index = row + (column * noRows);

                    if (column > extraCols && extraCols != 0 && !isExpanded) index = index - 1;

                    $topicsArray[index].appendTo($rowTo);
                };
            };

            if (isExpanded) {
                // move to hidden topicList
                for (var i = noRows * noCols; i < topicsCount; i++) {
                    var $rowTo = $topicsListWrapper.find(".topicsList.hidden");
                    $topicsArray[i].appendTo($rowTo);
                }
            }

            $topicsListWrapper.toggleClass('expanded');
        }

        $(this).text(function(index, text) {
            return (text == 'See fewer topics' ? 'See more topics' : 'See fewer topics');
        });
    });

    $(window).load(function() {
        $('.seriesGrid li').setAllToMaxHeight();
    });

    // add classes to li tags to lay them out in a 4 column grid
    $("ul.productsList").addGridLayoutClasses();

    $(".refineResultsButton").click(function() {
        $(".refinePanel").slideToggle('fast');
        return false;
    });

    $(".refineResultsButton2").click(function() {
        $(".mobileRefine").slideToggle('fast');
        return false;
    });

    $("a.removeButton").click(function() {
        $(this).parent().parent().parent().parent().slideUp();
        return false;
    });

    $(".rowReveal").hide();

    $(".formRevealButton").click(function() {
        $(this).addClass('open').parent().hide().next().slideDown('fast');
        return false;
    });

    $("#change-password-save").click(function() {
        $(this).parent().slideUp('fast').prev().show().children().next().removeClass('open');
        return false;
    });

    $("#change-password-cancel").click(function() {
        $(this).parent().slideUp('fast').prev().show().children().next().removeClass('open');
        return false;
    });

    $('.video-play').on('click', function() {
        var $this = $(this);
        var video = $(this).data('video');
        $this.siblings('iframe').attr('src', video + '?autoplay=1');
        $this.hide().siblings('img').hide();
        return false;
    });

    $(".review-preview").click(function() {
        $(".createReviewWrapper").hide();
        $(".previewReviewWrapper").show();
        return false;
    });

    $(".edit-review").click(function() {
        $(".previewReviewWrapper").hide();
        $(".createReviewWrapper").show();
        return false;
    });

    $(".button.share").show();

    $(".button.share").click(function() {
        $('.shareWrap').not($(this).next()).hide();
        $(this).next().fadeToggle('fast');
        return false;
    });

    // close share button
    $(document.body).on('click', function(e) {
        var $share = $('.shareWrap');
        if ($share.is(':visible') && !!!$(e.target).closest('.shareWrap').length) {
            $share.fadeOut('fast');
        }
    });

    $(document).on('keyup', function(e) {
        var $share = $('.shareWrap');
        if ($share.is(':visible') && e.keyCode == 27) {
            $share.fadeOut('fast');
        }
    });

    $(".footerShareWrap").show();

    // rsaunders 03/10/2013 : refactored into jquery plugin
    $(".optionsHidden .options li input").showSpinnerOnClick();

    $(".mainHero").hover(function() {
            $(".mainHero .orbit-wrapper .slider-nav").fadeIn("fast");
        },
        function() {
            $(".mainHero .orbit-wrapper .slider-nav").fadeOut("fast");
    });

    $(".orderDetailsToggle").click(function() {
        $(this).parent().parent().parent().next().slideToggle('fast');
        return false;
    });

    $('.videos-slider').flexslider();

    // Nick Ingarsia, 22/10/13, this needs to be fleshed out so the user is
    // put through the SalesForce process
    $('#requestTeacherAccessButton').click(function() {
        $.ajax({
            type: 'post',
            data: data,
            dataType: 'json',
            url: CCM_BASE_URL + '/tools/packages/cambridge_themes/requestTeacherAccess'
        });
        $("#requestTeacherAccess h3").text('Thank you. Your request is now being processed.');
        $("#requestTeacherAccess .formRow.lastRow.fullRow").html(' ');
        setTimeout(function() {
            $("#requestTeacherAccess").trigger('reveal:close');
        }, 5000);
    });

    // Rsaunders: 20/09/2013 - removed functionality, too buggy
    // IPAD carousel HOVER FIX
    /*if (navigator.userAgent.match(/iPad/i) != null) {
        $('a.book-link:not(.currentlink)').on('click', function() {
            var $this = this;
            $(this).addClass('currentlink');
            setTimeout(function() {
                $($this).removeClass('currentlink');
            }, 800);
            return false;
        });

        $("div.product-item").on('mouseover', function(index, obj) {
            alert("mouseover item " + index);
            $(this).addClass("current-item");
        });

        $("div.product-item").on('mouseout', function(index, obj) {
            alert("mouseout item " + index);
            $(this).removeClass("current-item");
        });
    }*/

    // make boxes correct sizes
    $.fn.setAllToMaxHeight = function(options) {
        var settings = $.extend({
            debug: false
        }, options);

        var height = Math.max.apply(this, $.map(this, function(e) {
            return $(e).outerHeight();
        }));

        if (settings.debug) {
            console.log('[.fn.setAllToMaxHeight] Setting height to ' + height + 'px');
        }
        return this.height(height);
    };

    var layout = getCookieValue("layout");

    // rsaunders 07/10/2013 : added check if it has the class of grid even if the cookie hasn't been set yet
    if (layout == "grid" || $('#result-container').hasClass('grid')) {
        if (layout == "grid") {
            $('#result-container').removeClass('listing').addClass('grid');
        }

        //rsaunders 07/10/2013 : add delay to prevent missread of div height (hacky, needs better solution)
        window.setTimeout(function() {
            //reset the max height of all the book covers
            setGridResultsToMaxHeight();
        }, 100);
    } else if (layout == "listing") {
        $('#result-container').removeClass('grid').addClass('listing');
        clearResultsMaxHeight();
    }

    // Set layout in cookie when view changed
    $("a.resultsGrid").click(function() {
        document.cookie = "layout=grid";
    });

    $("a.resultsListing").click(function() {
        document.cookie = "layout=listing";
    });

    $('#ccpOpenPageSlide').click(function(e) {
        $(this).toggleClass('globalnav_close');
    });

    $('#pageslide').on('click', '.submenu:not(.expanded)', function(e) {
        $(this).toggleClass('open');
        $(this).next().slideToggle(250);
        return false;
    });
});

function showSelectedTab(tabName) {
    $('#' + tabName + 'Tab').closest('.tabs-content').children('li').removeClass('active').hide();
    $('#' + tabName + 'Tab').css('display', 'block').addClass('active');
    $('#product-tabs').children('dd').removeClass('active');

    ucTabeName = tabName.charAt(0).toUpperCase() + tabName.slice(1);
    $('.tab' + ucTabeName).parent().addClass('active');

    // For mobile: Change selected tab label.
    if ($(window).width() < 768) {
        if (tabName == 'contents') {
            $('#selected-tab').text('CONTENTS');
        } else if (tabName == 'authors') {
            $('#selected-tab').text('ABOUT THE AUTHORS');
        }
    }
}

// For mobile: In title pages,
// scroll to tabbed details when title page detail is clicked.
if ($(window).width() < 768) {
    $('.productDetails li span a').attr('href', '#selected-tab');
}

// CREATES THE 5 TOP SUBJECT ON SEARCH RESULTS PAGE.
$(document).ready(function() {
    if ($("#academicSearchListings").val() == "true") {
        var ovdiv = document.createElement('div');
        ovdiv.className = "optionsHidden";
        ovdiv.id = "topSubjects";

        var oul = document.createElement('ul');
        oul.className = "options";
        oul.id = "facet_webSubjects";

        var topSubjCount = 1;
        for (i = 1; i <= 5; i++) {
            var topSubject = document.querySelector('li[data-subject-rank="' + i + '"]');
            if (topSubject) {
                var topSubjectClone = topSubject.cloneNode(true);
                oul.appendChild(topSubjectClone);
                topSubjCount = i;
            }
        }

        ovdiv.appendChild(oul);

        $('a.refineEnabled:contains("Subjects")').parent(1).after(ovdiv);
        initListingTypes();

        if (topSubjCount < 5) {
            $("#heading_Subjects span").hide();
            $("#heading_Subjects").removeAttr("id");
        } else {
            if ($("#academicSubjectsShowAll").val() == "false") {
                $("#topSubjects").show();
                $("#topSubjects").next().hide();
                $("#heading_Subjects span").html("Show All Subjects");
                $('a.refineEnabled:contains("Subjects")').removeClass('open');
            } else {
                $("#topSubjects").hide();
                $("#topSubjects").next().show();
                $("#heading_Subjects span").html("Show Top Subjects");
                $('a.refineEnabled:contains("Subjects")').addClass('open');
            }
        }
    }
});


if (navigator.userAgent.match(/iPad/i)) {
    // On first load, when iPad in portrait mode, display the country changer, but fix the CSS first so it does not
    // look broken when loading
    $(document).ready(function() {
        if ($(window).width() == 768) {
            $("ul#nav > li.right").css({
                'display': 'none'
            });
            $("ul#nav > li.right > ul > li.navLocation").css({
                'text-indent': '-9999px',
                'width': '20px',
                'display': 'block'
            });
            $("ul#nav > li.right").css({
                'display': 'block'
            });
        }
    });
    // Catch any orientation changes and fix the CSS on the country changer
    window.onorientationchange = function() {
        // Rest the grid layout for table orientation change
        if ($('#filtersForm > div').hasClass('grid') == true) {
            $('.bookCover').css('height', '');
            $('.bookCover').setAllToMaxHeight();
            $('.relatedSearch h2').setAllToMaxHeight();
            $('.relatedSearch h3').setAllToMaxHeight();
        }

        var orientation = window.orientation;
        if ($(window).width() == 1024) {
            $("ul#nav > li.right > ul > li.navLocation").css({
                'text-indent': '0',
                'width': 'auto'
            });
            $("ul#nav > li.right").css({
                'display': 'block'
            });
        } else if ($(window).width() == 768) {
            $("ul#nav > li.right > ul > li.navLocation").css({
                'text-indent': '-9999px',
                'width': '20px',
                'display': 'block'
            });
            $("ul#nav > li.right").css({
                'display': 'block'
            });
        }

        //rsaunders - 24/09/2013 - make books carosel change page to correct width issue after changing from portrait to landscape on ipad
        $('div.products-slider.orbit').trigger('orbit.goto', 0);
    };
}

/* Select location form */
(function($) {
    'use strict';
    var isLocationFormLoaded = false;

    /* Load location options modal */
    $(document).on('click.cmbrdg', '.navLocation a[data-ajax-reveal-id], .mobileHeader a[data-ajax-reveal-id], a.countryChooser[data-ajax-reveal-id], .mobile-icons a[data-ajax-reveal-id]', function(event) {
        event.preventDefault();
        var $containerId = $(this).data('ajax-reveal-id');
        var $container = $('#' + $containerId);

        if (!isLocationFormLoaded) {
            /* prep data */
            // 'data' is now set in the learning footer, line 118, as we also need to include the current values in the query string
            // var data = {'hHandle': 'global_navbar', 'pHandle': 'cambridge_themes', 'action': 'renderLocaleRevealForm', 'locale': LOCALE};
            if (typeof(uID) != 'undefined') data['uID'] = uID;

            var $opt = {
                url: CCM_REL + '/tools/packages/cambridge_themes/ajax_load_helper',
                data: data,
                success: renderAndReveal($container)
            };
            $.ajax($opt);
        } else {
            $container.reveal({
                animation: 'none',
                open: function() {
                    $("#featuredContent").trigger('orbit.stop');
                },
                close: function() {
                    $("#featuredContent").trigger('orbit.start');
                },
                opened: function() {
                    //RSaunders - 19/09/2013 - added check that window.opera is defined, android complains about it
                    if (!($.browser.msie || ((window.opera) && typeof(window.opera.buildNumber) == 'function') || (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1))) {
                        $('#localeText').focus();
                    }
                },
                closed: function() {
                    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i)) {
                        // clear input text values
                        $("#localeText").val('');
                        $("#locale").val('');
                        $("#localeForm").validationEngine('hide');
                    }
                }
            });
        }
    });

    var renderAndReveal = function($container) {
        return function(data, textStatus) {
            var $anchor = CCP_ENABLED ? $('#global-nav .mobile-icons') : $('.mobileHeader');

            $anchor.before(data).queue(function() {
                $("#locationOptions").appendTo('body');

                // Change the method to post if the current url has "index.php", otherwise the country change will
                // lose the current page.
                var currentURL = $(location).attr('href');
                if (currentURL.indexOf('index.php') > 0) {
                    $('#localeForm').attr('method', 'post');
                }

                $("#locationOptions").reveal({
                    animation: 'none',
                    open: function() {
                        var $localeText = $('#localeText');

                        // RSaunders - 18/09/2013 - added check that window.opera is defined, android complains about it
                        if (!($.browser.msie || ((window.opera) && typeof(window.opera.buildNumber) == 'function') || (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1))) {
                            $localeText.focus();
                        }

                        $localeText.placeholder();

                        $("#featuredContent").trigger('orbit.stop');
                    },
                    close: function() {
                        $("#featuredContent").trigger('orbit.start');
                    },
                    closed: function() {
                        if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i)) {
                            // clear input text values
                            $("#localeText").val('');
                            $("#locale").val('');
                            $("#localeForm").validationEngine('hide');
                        }
                    }
                });

                var customErrorMessages = {
                    '#localeText': {
                        'required': {
                            'message': 'Please select a country.'
                        }
                    }
                };

                // country autocomplete
                $(".autocomplete-suggestions").css('width', $("#localeText").width() + 18);
                $("#localeForm").validationEngine('attach', {
                    promptPosition: 'inline',
                    validationEventTrigger: "submit",
                    'custom_error_messages': customErrorMessages
                });

                $("#localeText").change(function() {
                    if ($(this).val() === '')
                        $("#locale").val('');
                });

                isLocationFormLoaded = true;
            });
        };
    };
}(jQuery));

/**
 * @author     : richard saunders
 * @date     : 17/09/2012
 * @version : 1.0
 * @description : loads more books for the tab its on.
 * on click of a load-more-books button,
 * it finds the wrapping div and hides it
 * then removes the last-product-item class from the book above it (as its no longer the last book)
 * then traverses up to the parent products-slider div to find the next hidden div to slide open
 */
(function($) {
    $(".load-more-books").on('click', function() {
        $(this).closest('.loadMoreWrap').hide()
            .siblings('div.last-product-item')
            .removeClass('last-product-item')
            .closest('.products-slider')
            .children(':hidden:first').slideDown();
    });
}(jQuery));

/**
 * @author     : richard saunders
 * @date     : 25/09/2012
 * @version  : 1.0
 * @issue     : WMPCEUSUK-681
 * @description : make whole homepage slide clickable.
 * Only run this for mobile devices : WMPCEUSUK-1257
 */
(function($) {
    if (!isTablet && isMobile) {
        $(".homepageSlide").on('click', function(event) {
            if ($(event.target).not('a.heroButton').length) {
                window.location = $(this).find('a.heroButton').attr('href');
            }
        });
    }
}(jQuery));

/**
 * @author     : richard saunders
 * @date     : 26/09/2012
 * @version  : 1.0
 * @issue     : GAW-17
 * @description : test if 2x size sprites can be loaded,
 * if not it finds all elements with a sprite@2x.png background and swaps it out for the low res sprite.png
 */
(function($) {
    $.extend($.expr[':'], {
        hasHiResSprite: function(el) {
            return ($(el).css('background-image').indexOf('images/sprite@2x.png') !== -1);
        }
    });

    $('<img>').attr('src', '/packages/cambridge_themes/images/sprite@2x.png').error(function() {
        // alert('failed to load high res sprites. updating ' + $(':hasHiResSprite').length + ' references');
        $(':hasHiResSprite').each(function() {
            var newUrl = $(this).css('background-image').replace('sprite@2x.png', 'sprite.png');
            $(this).attr('style', ($(this).attr('style') ? $(this).attr('style') : "") + 'background-image: ' + newUrl + ' !important;');
        });
    });
}(jQuery));

(function($) {
    /**
     * $.fn.showSpinnerOnClick
     *
     * adds a class of 'spinner' to the parent object for an optionally set period of time
     *
     * @author : Richard Saunders <rsaunders@cambridge.org>
     * @version : 1.0
     * @date : 03/10/2013
     *
     * @param : options {
     *      targetElem: null, //add to parent element by default
     *      spinnerClass: 'spinner',
     *      timeout: 0,
     *      debug: false
     *  }
     */
    $.fn.showSpinner = function(options) {
        var settings = $.extend({
            targetElem: null, //add to parent element by default
            spinnerClass: 'spinner',
            timeout: 0,
            debug: false
        }, options);


        if (!settings.targetElem) settings.targetElem = $(this).parent();
        if (settings.debug) console.log('[.fn.showSpinnerOnClick] Adding  \'' + settings.spinnerClass + '\'');

        settings.targetElem.addClass(settings.spinnerClass);

        if (settings.timeout) {
            setTimeout(function() {
                settings.targetElem.removeClass(settings.spinnerclass);
            }, settings.timeout);
        }

        return this;
    };

    /**
     * $.fn.showSpinnerOnClick
     *
     * binds a click event to the element which adds a class of 'spinner'
     * to the parent object for an optionally set period of time
     *
     * @author : Richard Saunders <rsaunders@cambridge.org>
     * @version : 1.0
     * @date : 03/10/2013
     *
     * @param : options {
     *      targetElem: null, //add to parent element by default
     *      spinnerClass: 'spinner',
     *      timeout: 0,
     *      debug: false
     *  }
     */
    $.fn.showSpinnerOnClick = function(options) {
        var settings = $.extend({
            targetElem: null, //add to parent element by default
            spinnerClass: 'spinner',
            timeout: 0,
            debug: false
        }, options);

        if (settings.debug) console.log('[.fn.showSpinnerOnClick] binding event to click');

        $(this).bind('click', function() {
            $(this).showSpinner(options);
        });

        return this;
    };

    /**
     * $.fn.addGridLayoutClasses jquery plugin
     *
     * adds noMargin, clearLeft and lastChunk classes to the appropriate li tags of the specified parent ul tag
     * to make them align in a grid of a specified number of columns
     *
     * @author: Richard Saunders <rsaunders@cambridge.org>
     * @version: 1.0
     * @date: 01/10/2013
     *
     * @param options {
     *      elem: 'li',
     *      numCols: 4,
     *      breakClass: 'noMargin',
     *      clearClass: 'clearLeft',
     *      lastClass: 'lastChunk',
     *      debug: false
     * }
     */
    $.fn.addGridLayoutClasses = function(options) {
        var settings = $.extend({
            elem: 'li',
            numCols: 4,
            breakClass: 'noMargin',
            clearClass: 'clearLeft',
            lastClass: 'lastChunk',
            debug: false
        }, options);

        if (settings.debug) console.log('[.fn.addGridLayoutClasses] Adding grid layout classes');

        $(settings.elem + ":nth-child(" + settings.numCols + "n+" + settings.numCols + ")", this).addClass(settings.breakClass);
        $(settings.elem + ":nth-child(" + settings.numCols + "n+" + (settings.numCols + 1) + ")", this).addClass(settings.clearClass);
        $(settings.elem + ":last-child", this).addClass(settings.lastClass);

        return this;
    };

    /**
     * $.fn.formatSwitcher jquery plugin
     *
     * finds all the elements of the specified class, hides all those not selected
     * and shows the one that was selected
     *
     * @author: Richard Saunders <rsaunders@cambridge.org>
     * @modified: <jmagallanes@cambridge.org>
     * @version: 2.0
     * @date: 11/10/2013
     * @modifiedDate: 06/09/2014
     *
     * @param options {
     *      selectorClass: '.addCartButton',
     *      optionPrefix: '.addCart_',
     *      debug: false
     */
    $.fn.formatSwitcher = function(options) {
        var settings = $.extend({
            selectorClass: '.addCartButton',
            optionPrefix: 'addCart_',
            debug: false
        }, options);

        if (settings.debug) {
            console.log('[.fn.formatSwitcher] binding on change event');
        }

        $(this).change(function() {
            var selectedVal = $(this).val();

            if (settings.debug) {
                console.log('[.fn.formatSwitcher] option ' + $(this).val() + ' selected');
            }

            $(this).siblings(settings.selectorClass).each(function() {
                if ($(this).hasClass(settings.optionPrefix + selectedVal)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            // GAW-1509: hides all pubDate spans then shows the appropriate pubDate span
            var pubDateWrapper = $(this).parent().prev('.bookDetailsWrap').find('h3 > span.pubDate_' + selectedVal);

            if (pubDateWrapper.length > 0) {
                $(pubDateWrapper).siblings('.pubDateButton').each(function() {
                    $(this).hide();
                });
                pubDateWrapper.show();
            }
        });

        return this;
    };

    /**
     * @function
     * @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
     * @param {function} handler A function to execute at the time when the element is inserted
     * @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
     * @example $(selector).waitUntilExists(function);
     */
    $.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
        var found = 'found';
        var $this = $(this.selector);
        var $elements = $this.not(function () {
            return $(this).data(found);
        }).each(handler).data(found, true);

        if (!isChild) {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
              window.setInterval(function () {
                  $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
              }, 1500)
            ;
        } else if (shouldRunHandlerOnce && $elements.length) {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }

        return $this;
    };
}(jQuery));