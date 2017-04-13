'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function() {};
if (!window.console.debug) window.console.debug = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.info) window.console.info = function() {};
if (!window.console.log) window.console.log = function() {};

var ios = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));
var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

if (isMac) {
    $('html').addClass('macOs');
}

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $('html').addClass('firefox');
}
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $('html').addClass('safari');
    svg4everybody();
}
// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function() {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function() {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
        svg4everybody();
    })();
}

$(function() {
    // placeholder
    //-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();
    /* ==============================================
Team Slider
=============================================== */
    // $('.team-img-inner').freetile();

    $('.teamslider-wrap').teamslider();

    //change color of header on index-page
    // if ($('.header--main-page').length) {
    //     var header = $('.header--main-page');
    var header = $('.header');
    $(window).on('scroll load', function() {
        if ($(window).scrollTop() > 10) {
            header.addClass('scrolled')
        } else {
            header.removeClass('scrolled')
        }
    });
    // }

    //mobile teamslide Slider
    if ($(window).outerWidth() < 767) {
        $('.js-teamslide-mobile').slick({
            arrows: false,
        });


        $(document).on('click', '.js-teamslide-arrow', function(e) {
            e.preventDefault();
            $('.js-teamslide-mobile').slick($(this).attr('data-slider'));
        });

        $(window).on('load resize',function(){
            $('.teamslider-mobile-arrows').css({
                'bottom': $('.teamslider-mobile .slick-active .teamslider-mobile__image').outerHeight() + 10,
            })
        });
    }



    //

    $('.js-height').matchHeight();

    //video in pop up - using fancybox
    $(".js-show-pop-up-video").click(function(e) {
        e.preventDefault();


        $.fancybox({
            'padding': 0,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'title': this.title,
            'width': 640,
            'height': 385,
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type': 'swf',
            'swf': {
                'wmode': 'transparent',
                'allowfullscreen': 'true'
            }
        });

        return false;
    });

    $('.js-show-mobile-sub-menu').on('click', function(e) {
        e.preventDefault();
        $(this).next('.mobile-menu__down-menu').slideToggle();
        $(this).toggleClass('active');

    });

    $('.js-show-specif,.js-close-specif').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.specifications-detail').slideToggle();

    })

    $('.js-contact-form').validate({
        rules: {
            name: {
                required: true,
            },
            phone: {
                required: true
            },
            email: {
                required: true
            },
            text: {
                required: true
            }
        },
        messages: {
            name: {
                // required: true,
            },
            phone: {
                // required: true
            },
            email: {
                // required: true
            },
            text: {
                // required: true
            }
        }
    });

    $('.js-scroll').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - $('.header').outerHeight()
        }, 800);
    })
});


$(document).ready(function() {
    $('.teamslider-wrap__image').load(function() {
        setTimeout(function() {
            $('.team-img-inner').freetile();

        }, 850)

    });
});


//mobile menu
var tempPosition = 0;
var menu = {
    init: function() {
        this.$btn = $('.js-show-menu');
        this.$html = $('html');
        this.$menuWrapper = $('.mobile-menu-wrapper');
        this.$menu = $('.mobile-menu');
        // this.tempPosition = 0;
        this.events();
    },
    open: function($this) {
        var menu = this.$menu;
        var btn = this.$btn;
        btn.addClass('active animation');
        this.$menuWrapper.show();
        this.$html.addClass('hidden');
        this.$menuWrapper.addClass('hidden');

        setTimeout(function() {
            menu.addClass('active');
        }, 10);
        setTimeout(function() {
            btn.removeClass('animation');
        }, 650);

        if (ios) {
            tempPosition = $(window).scrollTop();
            $('.page-wrapper').css({
                'height': $(window).outerHeight(),
                'overflow': 'hidden'
            });
            $('.page-wrapper').scrollTop(tempPosition);
        }
    },
    close: function() {
        var menuWrapper = this.$menuWrapper;
        var html = this.$html;
        var btn = this.$btn;
        btn.addClass('animation');
        btn.removeClass('active');
        this.$menu.removeClass('active');
        setTimeout(function() {
            menuWrapper.hide();
            html.removeClass('hidden');
            btn.removeClass('animation');
        }, 650);
        if (ios) {
            $('.page-wrapper').css({
                'height': 'auto',
                'overflow': 'inherit'
            });
            $(window).scrollTop(tempPosition);
        }
    },
    events: function() {
        var btn = this.$btn;
        btn.on('click', function(e) {
            e.preventDefault();
            if (btn.hasClass('animation')) {
                return false;
            }

            if (btn.hasClass('active')) {
                menu.close();
            } else {
                menu.open();
                if ($('.js-show-search').hasClass('active')) {
                    console.log('close search');
                    search.close();
                }
            }

        })
    }
}
menu.init();
//search
var search = {
    init: function() {
        this.$searchBtn = $('.js-show-search');
        this.$header = $('.header');
        this.$html = $('html');
        this.$searchOverlay = $('.search-overlay');
        this.$searchPopUp = $('.search-pop-up');
        this.$searchWrapper = $('.search-wrapper');
        this.$pageWrapper = $('.page-wrapper');
        this.events();
    },

    open: function() {
        var $searchWrapper = this.$searchWrapper;
        var $searchBtn = this.$searchBtn;
        var $searchPop = $('.search-pop-up');
        this.$html.addClass('hidden');
        $searchBtn.addClass('animation');
        this.$pageWrapper.addClass('scroll');
        this.$searchWrapper.show();
        $searchBtn.addClass('active');
        this.$header.addClass('search-active');
        this.$header.css({
            'position': 'absolute',
            'top': $(window).scrollTop()
        });

        setTimeout(function() {
            $searchWrapper.addClass('active');

            if ($(window).outerWidth() > 767) {
                $searchPop.css({
                    'top': $(window).scrollTop() + 150,
                })
            }
        }, 10);
        setTimeout(function() {
            $searchBtn.removeClass('animation');
        }, 500);
    },
    close: function() {
        var $header = this.$header;
        var $searchWrapper = this.$searchWrapper;
        var $searchBtn = this.$searchBtn;
        this.$html.removeClass('hidden');
        this.$pageWrapper.removeClass('scroll');
        $searchBtn.addClass('animation');
        $searchBtn.removeClass('active');
        this.$searchWrapper.removeClass('active');
        setTimeout(function() {
            $header.removeClass('search-active');
        }, 100)
        setTimeout(function() {
            $searchWrapper.hide();
            $searchBtn.removeClass('animation');
            $header.css({
                'position': 'fixed',
                // 'top': '-6px'
            })
        }, 200);
    },
    events: function() {
        var $searchBtn = this.$searchBtn;
        $searchBtn.on('click', function(e) {
            e.preventDefault();
            if ($searchBtn.hasClass('animation')) {
                return false;
            }
            if ($searchBtn.hasClass('active')) {
                search.close();
            } else {
                search.open();
                if ($('.js-show-menu').hasClass('active')) {
                    menu.close();
                }
            }
        })
    },

}

search.init();


//tabs & fancybox function
var galleryTabs = (function() {
    var $tabBtn = $('.js-gallery-tabs');
    var $galleryBody = $('.detail-gallery__body');
    var $fancyLink = $('.js-fancybox');


    //show tabs
    $tabBtn.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var tabTarget = $this.attr('href');
        $tabBtn.removeClass('active');
        $this.addClass('active');
        $galleryBody.removeClass('active');
        $(tabTarget).addClass('active');
    });

    //fancyLink
    $fancyLink.on('click', function() {
        //get array of images in visible tab
        var images = [];
        var $this = $(this);

        var imagesList = $this.closest('.detail-gallery__body').find('.js-fancybox');

        var startImage = $this.attr('data-image');

        imagesList.each(function() {
            var targetImageLink = $(this).attr('data-big-photo');

            images.push(targetImageLink);
        });

        $.fancybox(images, {
            index: startImage,
            type: 'image'
        });
    });


})();

//slider Tabs

var sliderTabs = (function() {
    var $galleryBtns = $('.js-slider-tabs');
    var $galleryTabWrapper = $('.arrangement__slider-tab-wrapper');

    //functions
    $galleryBtns.on('click', function(e) {
        e.preventDefault();
        $('.arrangement').css({
            'height': $('.arrangement').outerHeight(),
            'overflow': 'hidden'
        });
        var $this = $(this);
        var galleryTarget = $this.attr('href');
        $galleryBtns.removeClass('active');
        $this.addClass('active');

        $galleryTabWrapper.removeClass('active');
        $(galleryTarget).addClass('active');

        $('.arrangement__slide').css('width', $('.arrangement .container').outerWidth());

        $('.arrangement__slider-tab-wrapper.active .js-arrangement').slick('setPosition', 0);
        setTimeout(function() {
            $('.arrangement').attr('style', '');
        }, 15)

    });

    //slider init
    //js-arrangement

    function sliderInit() {
        $('.js-arrangement').slick({
            arrows: false
        });

        $(document).on('click', '.js-slider-arrow', function(e) {
            e.preventDefault();
            $('.arrangement__slider-tab-wrapper.active .js-arrangement').slick($(this).attr('data-slider'));
        });;
    }

    function sliderDestroy() {
        $('.js-arrangement').slick('unslick');
    }

    sliderInit();

}());

//dropdown-menu
var dropdown = (function() {
    var $dropdownlink = $('.js-show-dropdown');
    var $dropdown = $('.dropdown-menu');

    $dropdownlink.on('mouseover', function() {
        $dropdown.fadeIn(300);
        $dropdown.css({
            'top': $('.header').outerHeight(),
            'overflow': 'auto',
            'max-height': 662
        });

        if ($(window).outerHeight() < ($('.header').outerHeight() + 692)) {
            $('.dropdown-menu__wrapper').css({
                'height': 'calc(100% - ' + ($('.header').outerHeight()) + 'px)',
            });
        } else {
            $('.dropdown-menu__wrapper').css({
                'height': 'auto',

            });
        }



        $('html').addClass('hidden');
        $('.page-wrapper').addClass('scroll');

    });

    $dropdownlink.on('mouseout', function() {
        setTimeout(function() {
            if ($('.dropdown-menu:hover').length != 0) {
                // do something ;)
            } else {
                hidemenu();
            }
        }, 500)
    });

    $dropdown.on('mouseout', function() {

        if ($('.dropdown-menu:hover').length != 0) {
            // do something ;)
        } else {
            hidemenu();
        }
    });

    function hidemenu() {
        $dropdown.fadeOut(300);
        $('html').removeClass('hidden');
        $('.page-wrapper').removeClass('scroll');
    }

})();

//principles

var principlesSlider = (function() {
    var slider = $('.js-principles-slider');
    var btns = $('.js-change-slide');
    var arrows = $('.js-principles-slider-arrow');

    slider.slick({
        arrows: false
    });

    slider.on('afterChange', function(event, currentSlide) {
        btns.removeClass('active');
        var tempTarget = (currentSlide.currentSlide);
        $('.js-change-slide[data-slider-target="' + tempTarget + '"]').addClass('active');
    });

    btns.on('click', function(e) {
        e.preventDefault();
        btns.removeClass('active');
        var tempTarget = $(this).attr('data-slider-target');
        $(this).addClass('active');
        slider.slick('slickGoTo', tempTarget);
    });

    arrows.on('click', function(e) {
        e.preventDefault();
        slider.slick($(this).attr('data-slider'));
    })

})();

/* ==============================================
Сustom select
=============================================== */

$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    // $(this).hide();
    $(this).after(template);
});

$(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
}, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
});

$(".custom-select-trigger").on("click", function(event) {
    $('html,body').one('click', function() {
        $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
});

$(".custom-option").on("click", function() {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});
