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


$.fn.handleTextLink = function() {
    var $container = $(this),
        $button = $('.button', $container),
        $form = $('input', $container);
    
    $button.click(function(e){
        alert('TODO: add functionality for sending text links')
    });
}

$(function(){
    console.log($);
    console.log('hello');
    
    $('#downloadLinkForm').handleTextLink();
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
        $mainMenu = $('#topnavMenu', $container),
        $toggle = $('#topnavToggle', $container),
        $openIcon = $('.topnav-toggle__open', $container),
        $closeIcon = $('.topnav-toggle__close', $container),
        $topLinks = $('.topnav-menu__top', $container);

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

    $topLinks.click(function(e) {
        e.preventDefault();
        console.log($(this));
        if ($(this).hasClass('-open')) {
            $(this).removeClass('-open');
        } else {
            $topLinks.each(function(i,e) {
                $(e).removeClass('-open')
            })
            $(this).addClass('-open');
        }
    });
}

$(function(){    
    $('#topnavContainer').handleTopNav();
});