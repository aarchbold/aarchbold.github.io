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
$.fn.handleHero = function() {
    var $hero = $(this);

    function setHeight() {
        if ($(window).height() > 600) {
            $hero.height($(window).height())
        }
    }

    setHeight();

    $(window).resize(function() {
        setHeight();
    });
}

$.fn.handleGetApp = function() {
    console.log('=== get the app stuff ===');
    console.log($(this));
    var $button = $(this);
    var appStoreLink = 'https://testflight.apple.com/join/la1hIfJy';
    var playStoreLink = 'https://play.google.com/store/apps/details?id=com.helios.party';
    var userAgent = navigator.userAgent.toLowerCase(); 
    var isAndroid = userAgent.indexOf('android') > -1;
    var realLink = '#';

    if (isAndroid) {
        realLink = playStoreLink;
      } else {
        realLink = appStoreLink;
      }
      $button.attr('href',realLink);
}

$(function(){    
    $('.home-hero').handleHero();
    $('#getTheApp').handleGetApp();
    $('#getTheAppFooter').handleGetApp();
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


$.fn.handleScroll = function() {
    var $link = $(this);
    var offset = 40;

    function doTheScroll(target, isDeepLink) {
        // if ($(window).width() < 421) {
        //     offset = 100;
        //     if (addBuffer) {
        //         offset = 730;
        //     }
        // }
        if (isDeepLink) {
            if ($(window).width() < 421) {
                offset = 20;
            } 
        }
        $('html, body').animate({
            scrollTop: $(target).offset().top - offset
        }, 400);
    }

    $link.click(function() {
        target = '#' + $(this).attr('data-scroll-target');
        doTheScroll(target);
    });

    // check for #contact in the url
    if (window.location.hash === '#contact') {
        target = '#contactContainer';
        doTheScroll(target, true);
    } else if (window.location.hash) {
        target = window.location.hash;
        doTheScroll(target);
    }
}

$(function(){    
    $('.inline-scroll').handleScroll();
});
$.fn.handleSignUp = function() {
    var $signUpButton = $('.button-signup'),
        $modal = $('.modal-container'),
        $closeButton = $('.modal-close'),
        $email = $('#emailSignup'),
        $firstname = $('#firstnameSignup'),
        $lastname = $('#lastnameSignup'),
        $joinButton = $('#joinButton'),
        $formInputs = $('.form-inputs'),
        $formLoading = $('.form-loading'),
        $formSuccess = $('.form-success');

    $joinButton.click(function(e) {
        e.preventDefault();
        if ($email.val() === '') {
            alert('Please enter a valid email.');
        } else {
            $formInputs.hide();
            $formLoading.show();
            let payload = {
                firstname: $firstname.val(),
                lastname: $lastname.val(),
                email: $email.val(),
                path: 'waitlist'
            }
            $.post('https://zdtqrwuc01.execute-api.us-west-2.amazonaws.com/production/waitlist', JSON.stringify(payload), function() {
                // displayError('success', 'Thank you for your interest! We will get back to you shortly.');
                $formSuccess.show();
                $formLoading.hide();
                setTimeout(function() {
                    $firstname.val('');
                    $lastname.val('');
                    $email.val('');
                },500);
            })
            .fail(function(response) {
                $formInputs.show();
                $formSuccess.hide();
                console.log('fail');
                console.log(response);
                //displayError('error', errorMsg);
            });
        }
        // alert('submit');
    })

    $signUpButton.click(function(e) {
        e.preventDefault();
        $('body').css({
            overflow: 'hidden'
        })
        $modal.fadeIn();
    })

    $closeButton.click(function(e) {
        $formInputs.show();
        $formLoading.hide();
        $formSuccess.hide();
        e.preventDefault();
        $('body').css({
            overflow: 'visible'
        })
        $modal.fadeOut();
    })
}


$(function(){    
    $('#signUp').handleSignUp();
});