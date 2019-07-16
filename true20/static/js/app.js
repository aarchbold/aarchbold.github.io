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
    var title = encodeURIComponent('Welcome to our Happy Valley :: True');
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
    var title = encodeURIComponent('Welcome to our Happy Valley :: True');
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
    $('#waitListButton').click(function(e) {
        e.preventDefault();
        $(window).animate({
            scrollTop: ($('#joinUs').offset().top)
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
            //$('#friendsSection').addClass('-animate');
        }
        if (isElementInViewport($('#secureSection'))) {
            //$('#secureSection').addClass('-animate');
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
    $heroContainer = $('#heroStage');
    $mainSite = $('.main-site__container');
    $sun = $('.hero-stage__sun',$heroContainer);
    $fogs = $('.hero-stage__fog',$mainSite);
    $header = $('.hero-stage__header',$heroContainer);
    $clouds = $('.animated-cloud',$heroContainer);
    $birds = $('.animated-bird',$mainSite);
    $baloon1 = $('.main-site__balloon1',$heroContainer);
    $baloon2 = $('.main-site__balloon2',$heroContainer);
    var $window = $(window);
    
    // set the fog to the screen height
    $fogs.height($(window).height());
    
    startAnimations = function() {
        $sun.addClass('-animate');
        $fogs.addClass('-animate');
        $heroContainer.addClass('-animate');
        $clouds.addClass('-animate');
        $birds.addClass('-animate');
        $baloon1.addClass('-animate');
        $baloon2.addClass('-animate');
    }
    startHeaderTextAnimation = function() {
        $header.addClass('-animate');
    }

    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      if (scrollTop > 20) {
        $header.addClass('-fade');
      } else {
        $header.removeClass('-fade');
      }
    });
    // start animations
    setTimeout(function() {
        startAnimations();
    },1000)
    setTimeout(function() {
        startHeaderTextAnimation();
    },2500)
    setTimeout(function() {
        //make body scrollable 
        $('body').removeClass('-static');
    },2500)
},250);

// function throttle(fn, wait) {
//   var time = Date.now();
//   return function() {
//     if ((time + wait - Date.now()) < 0) {
//       fn();
//       time = Date.now();
//     }
//   }
// }

// function scrollToSection() {
//   let docHeight = $(document).height();
//   console.log('is scrolling');
//   console.log('whole height');
//   console.log(docHeight);
//   console.log($(window).scrollTop());
//   console.log(scrollDirection);
//   // $(window).scrollTo('23%', 1200);
// }

$(function() {
    initHero();
    // window.addEventListener('resize', setHeroHeight);
    // var scene = document.getElementById('scene');
    // var parallaxInstance = new Parallax(scene);
    // console.log(parallaxInstance)
    // $('.main-site__container').paroller();
    
    
    $('[data-scroll-speed]').moveIt();
    
    
    // $.scrollSpeed(100, 800, 'easeOutCubic');


    // $.scrollify({
    //   section : '.scroll-me',
    //   sectionName : 'section-name',
    //   setHeights: false,
    //   //standardScrollElements: '.no-scroll',
    //   scrollSpeed: 1600,
    //   touchScroll: false,
    //   offset: 0
    // });

    $('#scroll-test-1').click(function(e) {
      e.preventDefault();
      //$.scrollTo($("#sharingSection"), 1200);
      $(window).scrollTo('23%', 1200)
      // $(window).scrollTo({top:'50%'}, 800);
    });
    $('#scroll-test-2').click(function(e) {
      e.preventDefault();
      //$.scrollTo($("#sharingSection"), 1200);
      $(window).scrollTo('44%', 1200)
      // $(window).scrollTo({top:'50%'}, 800);
    });
    $('#scroll-test-3').click(function(e) {
      e.preventDefault();
      //$.scrollTo($("#sharingSection"), 1200);
      $(window).scrollTo('65%', 1200)
      // $(window).scrollTo({top:'50%'}, 800);
    });



    // // scroll fun
    // var lastScrollTop = 0;
    // // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    // window.addEventListener('scroll', function(){ // or window.addEventListener("scroll"....
    //   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    //   if (st > lastScrollTop){
    //       scrollDirection = 'down';
    //   } else {
    //     scrollDirection = 'up';
    //   }
    //   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    // }, false);

    //window.addEventListener('scroll', throttle(scrollToSection, 1000));
});