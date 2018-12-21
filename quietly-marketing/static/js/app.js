$.fn.handleBlogFeature = function() {
    var $container = $(this),
        windowThreshold = 840
        windowWidth = $(window).width(),
        $content = $('.blog-feature__meta', $container),
        $col2 = $('.blog-feature__col2', $container);

    var optimize = function() {
        $content.prependTo($container);
    }

    var checkWindowWidth = function() {
        windowWidth = $(window).width()
        if (windowWidth <= windowThreshold) {
            optimize();
        } else {
            $content.prependTo($col2);
        }
    }

    if (windowWidth <= windowThreshold) {
        optimize();
    }

    window.addEventListener('resize', checkWindowWidth);
}

$(function(){    
    $('.blog-feature').handleBlogFeature();
});
$.fn.handleCarousel = function(reset) {
    var $container = $(this),
        $tiles = $('.tile',$container),
        $tileScroller = $('.tiles__scroller--inner',$container); 

    console.log(reset);

    if (reset) {
        $tiles.each(function(i,e) {
            //$('.tile-inner',$(e)).height($container.height());
            console.log('huh?');
            $(e).removeAttr('style');
        })
        $tileScroller.width('100%');
        return false;
    }
    function setTileWidth() {
        var winWidth = $(window).width();
        var offset = 65;
        $tiles.each(function(i,e) {
            //$('.tile-inner',$(e)).height($container.height());
            $(e).width(winWidth - offset);
        })
        $tileScroller.width(winWidth * $tiles.length);
        console.log(winWidth);
    }

    // var hammertime = new Hammer($tileScroller, {});
    // $tileScroller.hammertime.on('swipe', function(ev) {
    //     console.log(ev);
    // });
    $tiles.each(function(index,elem) {
        $(elem).hammer().bind('swiperight', function(ev) {
            if (index === 0) {
                return false;
            }
            $container.scrollTo($($tiles[index - 1]),{
                duration: 230,
                easing: 'linear'
            });
        });
        $(elem).hammer().bind('swipeleft', function(ev) {
            if (index === $tiles.length - 1) {
                return false;
            }
            $container.scrollTo($($tiles[index + 1]),{
                duration: 230,
                easing: 'linear'
            });
        });
    })




    //$tiles.swiperight()

    setTileWidth();
}

$(function(){
    if ($(window).width() < 650) {
        $('#caseStudiesScroller').handleCarousel();
    }
    var resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){    
            if ($(window).width() < 650) {
                $('#caseStudiesScroller').handleCarousel();
            } else {
                $('#caseStudiesScroller').handleCarousel(true);
            }
        }, 500);
    });
});
$.fn.handleScroll = function() {
    var $link = $(this);
    var offset = 40;
    $link.click(function() {
        target = '#' + $(this).attr('data-scroll-target');
        if ($(window).width() < 800) {
            offset = 80;
        }
        $('html, body').animate({
            scrollTop: $(target).offset().top - offset
        }, 400);
    });
}

$(function(){    
    $('.inline-scroll').handleScroll();
});
$.fn.handleMobileServicesFeatures = function() {
    var $feature = $(this),
        $h3 = $('h3',$feature),
        $text = $('.feature-description',$feature);

    
    $h3.click(function() {
        if ($(window).width() < 675) {
            var $currentFeature = $('.feature-description', $(this).parent());
            console.log($(this));
            $(this).hasClass('-active') ? $(this).removeClass('-active') : $(this).addClass('-active');
            $currentFeature.hasClass('-active') ? $currentFeature.removeClass('-active') : $currentFeature.addClass('-active');
        }
    });
}

$(function(){    
    $('.services-feature').handleMobileServicesFeatures();
});
// function getParam(name) {
//     SCH = document.location.search;
//     if(window['W3T'] && (W3T['MORE_ARGS'] != "")) {
//         SCH += "&" + W3T['MORE_ARGS'];
//     }
//     SCH = "?&" + SCH.substring(1,SCH.length);
//     // alert('SCH = ' + SCH);
//     var start = SCH.indexOf("&" + name+"=");
//     var len = start+name.length+2;
//     if ((!start) && (name != SCH.substring(0,name.length))) return("");
//     if (start == -1) return "";
//     var end = SCH.indexOf("&",len);
//     if (end == -1) end = SCH.length;
//     // alert('finished getting parm ' + name);
//     return unescape(SCH.substring(len,end));
// }


$.fn.handleTopNav = function() {
    var $container = $(this),
        $mainMenu = $('.topnav-main-menu', $container),
        $toggle = $('.topnav-mobile__menu', $container),
        $openIcon = $('.topnav-mobile__menu .-open', $container),
        $closeIcon = $('.topnav-mobile__menu .-close', $container);

    $toggle.click(function() {
        if ($toggle.hasClass('-open')) {
            $toggle.removeClass('-open');
            $openIcon.show();
            $closeIcon.hide();
            $mainMenu.hide();
        } else {
            $toggle.addClass('-open');
            $openIcon.hide();
            $closeIcon.show();
            $mainMenu.show();
        }
    });
}

$(function(){    
    $('.topnav-container').handleTopNav();
});