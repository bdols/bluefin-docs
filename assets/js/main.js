---
exclude_in_search: true
layout: null
---
(function($) {
    'use strict';
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('.popover-dismiss').popover({
            trigger: 'focus'
        })
    });

    function bottomPos(element) {
        return element.offset().top + element.outerHeight();
    }
    $(function() {
        var promo = $(".js-td-cover");
        if (!promo.length) {
            return
        }
        var promoOffset = bottomPos(promo);
        var navbarOffset = $('.js-navbar-scroll').offset().top;
        var threshold = Math.ceil($('.js-navbar-scroll').outerHeight());
        if ((promoOffset - navbarOffset) < threshold) {
            $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
        }
        $(window).on('scroll', function() {
            var navtop = $('.js-navbar-scroll').offset().top - $(window).scrollTop();
            var promoOffset = bottomPos($('.js-td-cover'));
            var navbarOffset = $('.js-navbar-scroll').offset().top;
            if ((promoOffset - navbarOffset) < threshold) {
                $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
            } else {
                $('.js-navbar-scroll').removeClass('navbar-bg-onscroll');
                $('.js-navbar-scroll').addClass('navbar-bg-onscroll--fade');
            }
        });
    });
}(jQuery));
(function($) {
    'use strict';
    var Search = {
        init: function() {
            $(document).ready(function() {
                $(document).on('keypress', '.td-search-input', function(e) {
                    if (e.keyCode !== 13) {
                        return
                    }
                    var query = $(this).val();
                    var searchPage = "{{ site.url }}{{ site.baseurl }}/search/?q=" + query;
                    document.location = searchPage;
                    return false;
                });
            });
        },
    };
    Search.init();
}(jQuery));
(function ($) {
    'use strict';
    var Theme = {
        init: function() {
            const htmlClasses = document.documentElement.classList;
            const savedTheme = localStorage.theme;
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const klass = "dark";
            
            if (savedTheme === klass || (!savedTheme && prefersDark)) {
                htmlClasses.add(klass);
            } else {
                htmlClasses.remove(klass);
            }

            $(document).ready(function() {
                $(document).on("click", "[data-theme-toggle]", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const mode = e.currentTarget.dataset.themeToggle;
                    htmlClasses.remove(klass);
                    htmlClasses.toggle(mode);

                    localStorage.theme = mode;
                });
            });
        },
    };
    Theme.init();
}(jQuery));
