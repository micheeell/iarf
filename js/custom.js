
"use strict"; // Start of use strict

/**************
 *   slider   *
 **************/
function revolutionSliderActiver() {
    if ($('.rev_slider_wrapper #slider1').length) {
        jQuery("#slider1").revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            delay: 5000,
            navigation: {
                arrows: { enable: true }
            },
            gridwidth: 1170,
            gridheight: 1000
        });
    }
}

function stickyHeader() {
    if ($('.sticky').length) {
        var stickyScrollPos = 100;
        if ($(window).scrollTop() > stickyScrollPos) {
            $('.sticky').addClass('sticky-fixed');
            $('.scroll-to-top').fadeIn(500);
        } else if ($(this).scrollTop() <= stickyScrollPos) {
            $('.sticky').removeClass('sticky-fixed');
            $('.scroll-to-top').fadeOut(500);
        }
    }
}

/********************
 *   contact form   *
 ********************/
function contactFormValidation() {
    if ($('.contact-form').length) {
        $('.contact-form').validate({
            rules: {
                name: {
                    required: true
                },
                _replyto: {
                    required: true,
                    email: true
                },
                celular: {
                    required: false
                },
                message: {
                    required: true
                }
            },
            submitHandler: function(form) {
                // sending value with ajax request
                form.submit();
                alert('Gracias por tu consulta! Nos estaremos comunicando a la brevedad.');
                return false;
            }
        });
    }
}

function menuActive() {
    if ($("#menuzord").length) {
        $("#menuzord").menuzord({
            indicatorFirstLevel: '<em></em><em></em><em></em>',
            indicatorSecondLevel: '<em></em><em></em><em></em>'
        });
    }
}

function scrollToTarget() {
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });
    }
}
// instance of fuction while Document ready event
jQuery(document).on('ready', function() {
    (function($) {
        revolutionSliderActiver();
        contactFormValidation();
        menuActive();
        scrollToTarget();
    })(jQuery);
});

// instance of fuction while Window Scroll event
jQuery(window).on('scroll', function() {
    (function($) {
        stickyHeader();
    })(jQuery);
});
