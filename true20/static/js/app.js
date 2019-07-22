var wagthedog = function() {
    $dogs = $('.footer-doggers img');
    $dogs.hide();
    $($dogs[0]).show();
    

    setInterval(function() {
        // loop through the dogs and show 1 at a time
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },100);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },200);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[2]).show();
        },300);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },400);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },400);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },500);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[2]).show();
        },600);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[1]).show();
        },700);
        setTimeout(function() {
            $dogs.hide();
            $($dogs[0]).show();
        },800);
    },8000);



    console.log($dogs[0])
}


$(function() {
    wagthedog();
});
var getWindowOptions = function() {
    var width = 500;
    var height = 450;
    var left = (window.innerWidth / 2) - (width / 2);
    var top = (window.innerHeight / 2) - (height / 2);
  
    return [
      'resizable,scrollbars,status',
      'height=' + height,
      'width=' + width,
      'left=' + left,
      'top=' + top,
    ].join();
  };

var shareOnFacebook = function() {
    var fbBtn = $('.facebook-share');
    var title = encodeURIComponent('Just joined the waitlist for a private social network called True. Check it out. #DeleteFacebook #BeTrue');
    var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + location.href + '&title=' + title;
    fbBtn.href = shareUrl; // 1

    fbBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareOnTwitter = function() {
    var tweetBtn = $('.twitter-share');
    var title = encodeURIComponent('Just joined the waitlist for a private social network called True. Check it out. #DeleteFacebook #BeTrue');
    var shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + location.href;
    tweetBtn.href = shareUrl; // 1

    tweetBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null; // 2
    });
}

var initCopyToClip = function() {
    var $input = $('#clipboardCopy');
    var $button = $('#copyUrl');

    $input.attr('value',window.location.href);

    $button.click(function(e) {
        e.preventDefault();
        $input.select();
        document.execCommand('copy');
        $button.text('Link Copied!');
    });
}


$(function() {
    $('.go-to-footer').click(function(e) {
        e.preventDefault();
        $(window).animate({
            scrollTop: ($('#joinUs').offset().top - 100)
        },1000);
    })

    shareOnFacebook();
    shareOnTwitter();
    initCopyToClip();

    $(window).on('DOMContentLoaded load resize scroll', function() {

        if (isElementInViewport($('#sharingSection'))) {
            //$('#sharingSection').addClass('-animate');
        }
        if (isElementInViewport($('#friendsSection'))) {
            // $('#friendsSection').addClass('-animate');
        }
        if (isElementInViewport($('.footer-waterfall__mist'))) {
            $('.footer-container').addClass('-animate');
        } 
        // else {
        //     console.log('not in view');
        //     $('#sharingSection').removeClass('-animate');
        // }
    }); 
});
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

function isElementInViewport (el) {
    if (!el || el.length < 1) {
        return false;
    }
    //special bonus for those using jQuery
    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

    var rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}
var isScrollingDown = false;
var scrollDirection;

$.fn.moveIt = function(){
    var $window = $(window);
    var instances = [];
    
    $(this).each(function(){
      instances.push(new moveItItem($(this)));
    });
    
    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      instances.forEach(function(inst){
        inst.update(scrollTop);
      });
    }, {passive: true});
  }
  
var moveItItem = function(el){
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};


initHero = debounce(function() { 
    var $heroContainer = $('#heroStage');
    var $mainSite = $('.main-site__container');
    var $sun = $('.hero-stage__sun',$heroContainer);
    var $shine = $('.main-site__shine',$mainSite);
    var $fogs = $('.hero-stage__fog',$mainSite);
    var $header = $('.hero-stage__header',$heroContainer);
    var $clouds = $('.animated-cloud',$heroContainer);
    var $birds = $('.animated-bird',$mainSite);
    var $baloon1 = $('.main-site__balloon1',$heroContainer);
    var $baloon2 = $('.main-site__balloon2',$heroContainer);
    var $nav = $('.topnav-container');
    var $navInner = $('.navigation-inner');
    var $heroClouds = $('.hero-sky',$heroContainer);
    var $window = $(window);
    
    // set the fog to the screen height
    $fogs.height($(window).height());
    
    startAnimations = function() {
        $sun.addClass('-animate');
        $shine.addClass('-animate');
        // $heroContainer.addClass('-animate');
        $clouds.addClass('-animate');
        $birds.addClass('-animate');
        $baloon1.addClass('-animate');
        $baloon2.addClass('-animate');
        // $heroClouds.addClass('-animate');
    }
    startHeaderTextAnimation = function() {
        $header.addClass('-animate');
    }

    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      if (scrollTop > 20) {
        $header.addClass('-fade');
        $nav.addClass('-show');
      } else {
        $header.removeClass('-fade');
        $nav.removeClass('-show');
      }
      if (scrollTop > 400) {
        $navInner.addClass('-compact');
        $heroContainer.addClass('-animate');
      } else {
        $navInner.removeClass('-compact');
        $heroContainer.removeClass('-animate');
      }
    });
    // start animations
    setTimeout(function() {
        startAnimations();
    },1600)
    setTimeout(function() {
        startHeaderTextAnimation();
    },2000)
    setTimeout(function() {
      // fade fogs
      // $fogs.addClass('-animate');
    },3000)
    setTimeout(function() {
        //make body scrollable 
        $('body').removeClass('-static');
    },5000)
},250);

$(function() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth' 
   });

   
});

// $(window).unload(function() {
//   $('body').scrollTop(0);
// });

$(window).on('load', function (e) {
  // executes when complete page is fully loaded, including all frames, objects and images
  // fade out the preload spinner.
  $('.preloader-shim').addClass('-animate');

  initHero();    
  if ($(window).width() > 800) {
    $('[data-scroll-speed]').moveIt();
  }
})

var handleWaitlist = function() {
    var $modal = $('.modal-waitlist');
    var $closeModal = $('#closeOverlay');
    var $modalSpinner = $('.modal-waitlist__preloader');
    var $formInput = $('.footer-input input');
    var $formSubmit = $('.footer-input .footer-signup');
    var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    $formInput.keyup(function() {
        if (emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })

    $formSubmit.click(function(e) {
        e.preventDefault();
        if (!$formSubmit.hasClass('-disabled')) {
            console.log($modal);
            $modal.fadeIn();
            // do the waitlist functionality
            setTimeout(function() {
                $modalSpinner.fadeOut();
            },2000)
        }
    })

    $modal.click(function(e) {
        $modal.fadeOut();
    })
    $closeModal.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
}


$(function() {
    handleWaitlist();
});