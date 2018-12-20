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
$.fn.handleScroll = function() {
    var $link = $(this);
    $link.click(function() {
        target = '#' + $(this).attr('data-scroll-target');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 40
        }, 400);
    });
}

$(function(){    
    $('.inline-scroll').handleScroll();
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