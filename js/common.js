
;$.fn.capiPolicy = function (options) {
    var o = $.extend({
        insertLink: true,
        textBox: '#capi-policy-text',
        position: 1,
        margin_vert: 40,
        title: 'Политика конфиденциальности',
        url: '/policy',
        tpl: '<div class="capiPolicy capiActive"><span class="capiCheckbox"><input type="checkbox" value="1" required="required" checked></span>Согласен с <a href="jav * ascript:void(0);" class="capiShowPolicy">политикой конфиденциальности</a></div>',
        tplText: '<div id="overlayCapiPolicy" style="display:none;" data-flag-open="0"><div id="capi-policy-text" class="vert-center" style="opacity:0"><span id="modal_close"></span><div id="capi-policy-content"></div></div></div>'
    }, options);
    var th = $(this);
    var sub = th.find('input[type="submit"]');
    var tplTextObj = $(o.tplText);
    var flag = false;

    function funcAjaxData(url) {
        if (url != '') {
            $.ajax({
                type: "POST", cache: false, url: url, success: function (data) {
                    $('#capi-policy-content').html('');
                    $('#capi-policy-content').append(data);
                    $('#capi-policy-content').prepend('<h2>' + o.title + '</h2>');
                    funcPosWin();
                }, error: function () {
                    console.log('error ' + url);
                }
            });
        }
    }

    function funcPosWin() {
        var w_window = $(window).width(), h_window = $(window).height(), w_win = $('#capi-policy-text').outerWidth(), h_win = $('#capi-policy-text').outerHeight();
        if (o.margin_vert > 0) {
            w_win += o.margin_vert * 2;
            h_win += o.margin_vert * 2;
        }
        $('#capi-policy-text').css({marginLeft: o.margin_vert, marginRight: o.margin_vert});
        if (h_window < h_win) {
            $('html').addClass('capi-policy-lock');
            $('#capi-policy-text').removeClass('vert-center');
            if (o.margin_vert > 0) {
                $('#capi-policy-text').css('margin-bottom', o.margin_vert);
            }
            $('#capi-policy-text').animate({opacity: 1, top: o.margin_vert}, 200);
        } else {
            $('html').removeClass('capi-policy-lock');
            $('#capi-policy-text').addClass('vert-center').css('margin-bottom', '');
            $('#capi-policy-text').animate({opacity: 1, top: '50%'}, 200);
        }
    }

    if (o.insertLink == true) {
        if (o.position == 1)
            sub.before(o.tpl); else if (o.position == 3)
            th.append(o.tpl); else
            sub.parent().after(o.tpl);
    }
    if (!$('#overlayCapiPolicy').is('div')) {
        $('body').append(tplTextObj);
    }
    $('.capiShowPolicy').each(function (index, obj) {
        $(obj).click(function (e) {
            e.preventDefault();
            if (flag == false && ($('#overlayCapiPolicy').attr('data-flag-open') == '0')) {
                flag = true;
                $('#overlayCapiPolicy').attr('data-flag-open', '1');
                $('#overlayCapiPolicy').fadeIn(400, function () {
                    funcAjaxData(o.url);
                });
            }
        });
    });
    $('#modal_close, #overlayCapiPolicy').click(function () {
        flag = false;
        $('#capi-policy-content').html('');
        $('#capi-policy-text').animate({opacity: 0, top: '45%'}, 200, function () {
            $('#overlayCapiPolicy').fadeOut(400);
            $('#overlayCapiPolicy').attr('data-flag-open', '0');
        });
    });
};



$(document).ready(function () {
    $('form').capiPolicy({insertLink: false});
    $('.b-rec-slider').slick({
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 3,
        dots: true,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 1430,
            settings: {arrows: true, centerMode: true, centerPadding: '40px', slidesToShow: 1}
        }, {breakpoint: 700, settings: {arrows: true, centerMode: false, slidesToShow: 1}}, {
            breakpoint: 460,
            settings: {arrows: false, centerMode: false, slidesToShow: 1}
        }]
    });
    $(".b-details__disc").on("click", function () {
        var top = $(".b-disc__title").offset().top - 140;
        $('body,html').animate({scrollTop: top}, 1500);
    });
    $(".b-rec-slider").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var index = nextSlide;
        $('.rec__main').html(index + 1);
    });
    $(".b-portf__slider").each(function () {
        $(this).find('.p-slider__for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: $(this).find('.p-slider__nav'),
            responsive: [{breakpoint: 590, settings: {arrows: true,}}, {
                breakpoint: 590,
                settings: {arrows: false, dots: true}
            }]
        });
        $(this).find('.p-slider__nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: $(this).find('.p-slider__for'),
            dots: false,
            focusOnSelect: true,
            arrows: false,
            vertical: true,
            useTransform: false,
            responsive: [{
                breakpoint: 1070,
                settings: {slidesToShow: 3, vertical: false, centerMode: true}
            }, {breakpoint: 981, settings: {centerMode: false, vertical: false, slidesToShow: 3}}, {
                breakpoint: 875,
                settings: {slidesToShow: 5, vertical: false,}
            }, {breakpoint: 765, settings: {slidesToShow: 3, vertical: false, centerMode: true,}}, {
                breakpoint: 590,
                settings: {slidesToShow: 2, vertical: false,}
            }]
        });
    });
    if ($(".tooltip").is("*")) {
        $('.tooltip').tooltip({
            position: {
                my: "left-230 top+40",
                at: "right center",
                collision: "flip",
                using: function (position, feedback) {
                    $(this).addClass(feedback.vertical).css(position);
                }
            }
        })
    }
    function onScrollInit(items, trigger) {
        items.each(function () {
            var osElement = $(this), osAnimationClass = osElement.attr('data-os-animation'), osAnimationDelay = osElement.attr('data-os-animation-delay');
            osElement.css({
                '-webkit-animation-delay': osAnimationDelay,
                '-moz-animation-delay': osAnimationDelay,
                'animation-delay': osAnimationDelay
            });
            var osTrigger = (trigger) ? trigger : osElement;
            osTrigger.waypoint(function () {
                osElement.addClass('animated').addClass(osAnimationClass);
            }, {triggerOnce: true, offset: '100%'});
        });
    }

    onScrollInit($('.os-animation'));
    onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));
    $('.b-advantages__item').waypoint(function (direction) {
        $(this).addClass("type-an")
    }, {offset: '90%'});
    $('.parallax-window').parallax()
    if ($('.i-slider').is("*")) {
        $('.i-slider').slick({slidesToShow: 1, dots: true, adaptiveHeight: true,});
    }
    $('.js-num__main').html(1);
    $(".i-slider").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var index = nextSlide;
        console.log(nextSlide)
        $('.js-num__main').html(index + 1);
    });
    if ($('.b-disc__slider').is("*")) {
        $('.b-disc__slider').slick({
            slidesToShow: 3,
            adaptiveHeight: true,
            responsive: [{breakpoint: 769, settings: {slidesToShow: 2,}}, {
                breakpoint: 590,
                settings: {slidesToShow: 1,}
            }]
        });
        $(".b-disc__slider").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var index = nextSlide;
            $('.disc-num__main').html(index + 1);
        });
    }
    $(window).scroll(function () {
        if ($(this).scrollTop > 350) {
            $(".b-reviews__inner").addClass("b-reviews__fix")
        } else {
            $(".b-reviews__inner").removeClass("b-reviews__fix")
        }
    });
    if ($(".b-order__inner_hide").is("*")) {
        $('.b-order__inner_hide').slick({slidesToShow: 1, dots: true})
    }


    $(".b-burger").click(function () {
        if ($(".b-burger__item").hasClass("b-burger-show")) {
            $(".b-burger__item").removeClass("b-burger-show");
            $(".b-menu__adap").removeClass("b-menu__adap_show");
            $("body").removeClass("show-modal")
        }
        else {
            $(".b-burger__item").addClass("b-burger-show");
            $(".b-menu__adap").addClass("b-menu__adap_show");
            $("body").addClass("show-modal")
        }
    });
    var $header = $('.b-menu__scr_hid');
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 200) {
            $header.addClass('is-show');
        } else {
            $header.removeClass('is-show');
        }
    })
    $('[data-modal-close]').on('click', function (e) {
        e.preventDefault();
        $('[data-modal]').hide();
        $('body').css({overflow: 'auto', height: 'auto'})
    });
    $('[data-modal-show]').on('click', function (e) {
        e.preventDefault();
        $('body').css({overflow: 'hidden', height: '100vh'});
        $(".b-modal").show();
    })
});



