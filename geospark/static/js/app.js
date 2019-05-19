function isAnyPartOfElementInViewport(el) {

    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}

$.fn.handleAnimatedText = function() {
    var $context = $(this),
        $textBlocks = $('.text-animation', $context),
        position = $(window).scrollTop();

    function doTheAnimation(element) {
        if (isAnyPartOfElementInViewport(element[0])) {
            element.removeClass('-animate');
        } else {
            // element.addClass('-animate');
        }
    }

    $textBlocks.each(function(i,e) {
        $(e).addClass('-animate');
        $(window).on('scroll', function() {
            doTheAnimation($(e));
        });
        doTheAnimation($(e));
    });
}

$(function(){
    $('.text-animation-group').handleAnimatedText();
})
$.fn.handleScreenHeight = function() {
    var $context = $(this);

    $context.height($(window).height());
    $(window).resize(function() {
        $context.height($(window).height());
    });
}

$(function(){
    $('.screen-height').handleScreenHeight();
})
function getParam(name) {
    SCH = document.location.search;
    if(window['W3T'] && (W3T['MORE_ARGS'] != "")) {
        SCH += "&" + W3T['MORE_ARGS'];
    }
    SCH = "?&" + SCH.substring(1,SCH.length);
    // alert('SCH = ' + SCH);
    var start = SCH.indexOf("&" + name+"=");
    var len = start+name.length+2;
    if ((!start) && (name != SCH.substring(0,name.length))) return("");
    if (start == -1) return "";
    var end = SCH.indexOf("&",len);
    if (end == -1) end = SCH.length;
    // alert('finished getting parm ' + name);
    return unescape(SCH.substring(len,end));
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
$(function(){
    $('#homeTestimonial').slick({
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        fade: true,
        cssEase: 'linear',
        dotsClass: 'home-carousel__dots'
      });
})


$.fn.handleHomeVideo = function() {
    var $trigger = $(this),
        $videoContainer = $('.home-video-container'),
        $overlay = $('.home-video-overlay', $videoContainer),
        $content = $('.home-video-content', $videoContainer),
        $closeBtn = $('.home-overlay-close', $videoContainer);

    $trigger.click(function() {
        $videoContainer.show(0,function(){
            $content.fadeIn();
        });
    });

    $closeBtn.click(function() {
        $content.fadeOut(400,function() {
            $videoContainer.hide();
        })
    });
}

$(function(){
    $('.home-video-open').handleHomeVideo();
})


$.fn.handleHyperionMap = function() {
    var $context = $(this),
        $triggers = $('.home-hyperion__list--item', $context),
        $panels = $('.hyperion-panel', $context),
        $outlines = $('.-outline', $context),
        $days = $('.hyperion-forecast__label', $context);

    function initOutlineFade() {
        var timer = 0;
        $outlines.each(function(i,e) {
            $(e).hide();
        })
        $outlines.each(function(i,e) {
            timer = timer + 750;
            setTimeout(function() {
                $(e).fadeIn('slow');
            },timer)
        })

    }

    function initForecastFade() {
        var timer = 0;
        $days.each(function(i,e) {
            $(e).css('opacity','0');
        })
        $days.each(function(i,e) {
            timer = timer + 200;
            setTimeout(function() {
                $(e).css('opacity','1');
            },timer)
        })
    }


    $triggers.click(function() {
        $triggers.each(function(i,e) {
            $(e).removeClass('-active');
        })
        $panels.each(function(i,e) {
            $(e).removeClass('-active');
        })
        $(this).addClass('-active');
        $('#' + $(this).attr('data-target')).addClass('-active');
        console.log($(this).attr('data-target'));
        if ($(this).attr('data-target') === 'panelPulse') {
            initOutlineFade();
        }
        if ($(this).attr('data-target') === 'panelForecast') {
            initForecastFade();
        }
    });
}

$(function(){
    $('.home-hyperion__container').handleHyperionMap();
})
$.fn.handleTopNav = function() {
    var $context = $(this),
        $nav = $('.topnav-links-container', $context),
        $open = $('.topnav-mobile-cta__open', $context),
        $close = $('.topnav-mobile-cta__close', $context),
        breakpoint = 860;

    $open.click(function(e) {
        e.preventDefault();
        $nav.fadeIn();
        $open.hide();
        $close.fadeIn();
    })

    $close.click(function(e) {
        e.preventDefault();
        $nav.fadeOut();
        $open.fadeIn();
        $close.hide();
    })

    var initNav = debounce(function() {        
        if (window.innerWidth > breakpoint) {  
            $nav.show();
        } else {
            $nav.hide();
            $close.hide();
            $open.show();
        }
    }, 250);

    window.addEventListener('resize', initNav);

    // do the scroll
    var lastScrollTop = 0;
    window.addEventListener('scroll', function(){ 
        var st = window.pageYOffset || document.documentElement.scrollTop; 
        if (st > 20) {
            $context.addClass('-slim');
        } else {
            $context.removeClass('-slim');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}

$.fn.handleDropDowns = function() {
    var $context = $(this),
        $triggers = $('.topnav-dropdown__trigger', $context);

    $triggers.click(function() {
        var $parent = $(this).parent();
        console.log($parent);
        if ($parent.hasClass('-active')) {
            $parent.removeClass('-active');
            $('.topnav-dropdown', $parent).fadeOut('fast');
        } else {
            $parent.addClass('-active');
            $('.topnav-dropdown', $parent).fadeIn('fast');
        }
    });
}

$(function(){
    $('.topnav-container').handleTopNav();
    $('.topnav-links-container').handleDropDowns();
})
$.fn.handleAlerts = function() {
    var $context = $(this),
        $texts = $('.text-alert',$context),
        delay = 4000;
    
    $texts.each(function(i,e){
        setInterval(function() {
            var className = $(e).attr('class');
            var currentIndex = className.substr(className.length-1);
            var newIndex = parseInt(currentIndex) + 1;
            if (newIndex > 3) {
                newIndex = 1;
            }

            $(e).attr('class','text-alert -position'+newIndex);
        },delay)
    });
}

$(function(){
    $('.text-alerts__container').handleAlerts();
})