$.fn.flappyBird = function() {
    var $context = $(this);
    var $birdCage = $('.animated-bird__inner',$context);

    $birdCage.each(function(i,e) {
        console.log($(e));
        var $birds = $('img',$(e));
        $birds.hide();
        
        setInterval(function() {
            setTimeout(function() {
                $birds.hide();
                $($birds[0]).show();
            },200);
            setTimeout(function() {
                $birds.hide();
                $($birds[1]).show();
            },400);
            setTimeout(function() {
                $birds.hide();
                $($birds[2]).show();
            },600);
        },600);
        console.log($birds);
    });

    // $birds = $('img',$context);
    // $birds.hide();

    // setInterval(function() {
    //     setTimeout(function() {
    //         $birds.hide();
    //         $($birds[0]).show();
    //     },200);
    //     setTimeout(function() {
    //         $birds.hide();
    //         $($birds[1]).show();
    //     },400);
    //     setTimeout(function() {
    //         $birds.hide();
    //         $($birds[2]).show();
    //     },600);
    // },600);
}

var wagthedog = function() {
    var wagcounter = 0
    var tailrotations = 0;
    var waglimit = 6;
    $dogs = $('.footer-doggers img');
    $dogs.hide();
    $($dogs[0]).show();

    function tailwag1() {
        var tail1 = setInterval(function() {
            tailrotations++;
            // loop through the dogs and show 1 at a time
            setTimeout(function() {
                $dogs.hide();
                $($dogs[0]).show();
            },120);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[1]).show();
            },240);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[2]).show();
            },360);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[1]).show();
            },480);
            setTimeout(function() {
                $dogs.hide();
                $($dogs[0]).show();
            },600);
    
            if (tailrotations >= waglimit)
            {
                clearInterval(tail1);
                tailrotations = 0;
            }
        },525);
    }

    tailwag1();
    setInterval(function() {
        wagcounter++;
        waglimit = wagcounter % 2 ? 6 : 2;
        tailwag1();
    }, 6000);
    
}


$(function() {
    if ($('body').hasClass('true-home')) {
        wagthedog();
        $('.animated-bird__container').flappyBird();
    }
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var handleContact = function() {
    var $modal = $('.modal-waitlist'),
        $closeModal = $('#closeOverlay'),
        $closeBtn = $('.modal-close__button'),
        $feedbackOpen = $('#shareStoryFeedback'),
        $submitFeedback = $('#submitFeedback'),

        $pressOpen = $('.button-press'),
        $investorsOpen = $('.button-investors'),
        $pressFirstName = $('#pressFirstName'),
        $pressLastName = $('#pressLastName'),
        $pressEmail = $('#pressEmail'),
        $pressOutlet = $('#pressOutlet'),
        $pressComments = $('#pressComments'),
        $submitPress = $('#submitPress'),
        $investorsFirstName = $('#investorsFirstName'),
        $investorsLastName = $('#investorsLastName'),
        $investorsEmail = $('#investorsEmail'),
        $investorsFirm = $('#investorsFirm'),
        $submitInvestors = $('#submitInvestors'),
        $spinner = $('#contactPreloader'),
        $success = $('#successModal'),
        $successClose = $('#successClose'),
        emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    function resetInvestorsForm() {
        $investorsFirstName.val('');
        $investorsLastName.val('');
        $investorsEmail.val('');
        $investorsFirm.val('');
    }

    function validateInvestorsForm() {
        if ($investorsFirstName.val() !== '' && 
            $investorsLastName.val() !== '' && 
            emailPattern.test($investorsEmail.val()) &&
            $investorsFirm.val() !== '') {
            $submitInvestors.removeClass('-disabled')
        } else {
            $submitInvestors.addClass('-disabled')
        }
    }

    $investorsFirstName.keyup(function() {
        validateInvestorsForm(); 
    })
    $investorsLastName.keyup(function() {
        validateInvestorsForm(); 
    })
    $investorsEmail.keyup(function() {
        validateInvestorsForm(); 
    })
    $investorsFirm.keyup(function() {
        validateInvestorsForm(); 
    })

    $investorsFirstName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsFirstName.focus()
        },100)
    });
    $investorsLastName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsLastName.focus()
        },100)
    });
    $investorsEmail.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsEmail.focus()
        },100)
    });
    $investorsFirm.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $investorsFirm.focus()
        },100)
    });


    $submitFeedback.click(function(e) {
        alert('hi');
        var postData = {
            email: $investorsEmail.val(),
            first_name: $investorsFirstName.val(),
            last_name: $investorsLastName.val(),
            firm: $investorsFirm.val()
        }
        e.preventDefault();
        if (!$submitInvestors.hasClass('-disabled')) {
            $spinner.show();
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/investorInfo',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {

                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                    $spinner.hide();
                },
                complete: function(data) {
                    console.log(data);
                    $success.show();
                    $submitInvestors.hide();
                    $spinner.hide();
                    resetInvestorsForm();
                }
            });
        }
    })

    $submitInvestors.click(function(e) {
        var postData = {
            email: $investorsEmail.val(),
            first_name: $investorsFirstName.val(),
            last_name: $investorsLastName.val(),
            firm: $investorsFirm.val()
        }
        e.preventDefault();
        if (!$submitInvestors.hasClass('-disabled')) {
            $spinner.show();
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/investorInfo',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {

                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                    $spinner.hide();
                },
                complete: function(data) {
                    console.log(data);
                    $success.show();
                    $submitInvestors.hide();
                    $spinner.hide();
                    resetInvestorsForm();
                }
            });
        }
    })

    function resetPressForm() {
        $pressFirstName.val('');
        $pressLastName.val('');
        $pressEmail.val('');
        $pressOutlet.val('');
        $pressComments.val('');
    }

    function validatePressForm() {
        if ($pressFirstName.val() !== '' && 
            $pressLastName.val() !== '' && 
            emailPattern.test($pressEmail.val()) &&
            $pressOutlet.val() !== '' &&
            $pressComments.val()) {
            $submitPress.removeClass('-disabled')
        } else {
            $submitPress.addClass('-disabled')
        }
    }

    $pressFirstName.keyup(function() {
        validatePressForm(); 
    })
    $pressLastName.keyup(function() {
        validatePressForm(); 
    })
    $pressEmail.keyup(function() {
        validatePressForm(); 
    })
    $pressOutlet.keyup(function() {
        validatePressForm(); 
    })
    $pressComments.keyup(function() {
        validatePressForm(); 
    })

    $pressFirstName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressFirstName.focus()
        },100)
    });
    $pressLastName.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressLastName.focus()
        },100)
    });
    $pressEmail.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressEmail.focus()
        },100)
    });
    $pressOutlet.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressOutlet.focus()
        },100)
    });
    $pressComments.on('click', function(){
        $(window).off('resize');
        setTimeout(function() {
            $pressComments.focus()
        },100)
    });

    $submitPress.click(function(e) {
        var postData = {
            email: $pressEmail.val(),
            first_name: $pressFirstName.val(),
            last_name: $pressLastName.val(),
            media_outlet: $pressOutlet.val(),
            comments: $pressComments.val()
        }
        e.preventDefault();
        if (!$submitPress.hasClass('-disabled')) {
            $spinner.show();
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/pressKit',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {

                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                    $spinner.hide();
                },
                complete: function(data) {
                    console.log(data);
                    $success.show();
                    $submitPress.hide();
                    $spinner.hide();
                    resetPressForm();
                }
            });
        }
    })

    $modal.click(function(e) {
        if(e.target == this){
            $modal.fadeOut();
        }
    })
    $closeModal.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
    $closeBtn.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
    $successClose.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
    $pressOpen.click(function(e) {
        e.preventDefault(e);
        $success.hide();
        $submitPress.show();
        $('#investorsModal').hide();
        $('#pressModal').show();
        $modal.fadeIn();
    })

    $feedbackOpen.click(function(e) {
        e.preventDefault(e);
        $success.hide();
        $submitPress.show();
        $('#investorsModal').hide();
        $('#pressModal').hide();
        $('#feedbackModal').show();
        $modal.fadeIn();
    })


    
    $investorsOpen.click(function(e) {
        e.preventDefault(e);
        $success.hide();
        $submitInvestors.show();
        $('#pressModal').hide();
        $('#investorsModal').show();
        $modal.fadeIn();
    }) 
}


$(function() {
    if ($('body').hasClass('true-FAQ')) {
        handleContact();
    }
});
$(function() {
    if ($('body').hasClass('true-home')) {
        $('.go-to-footer').click(function(e) {
            e.preventDefault();
            $(window).animate({
                scrollTop: ($('#joinUs').offset().top - 100)
            },1000);
        })

        // slow down video playback
        // var $firstVideo = $('#firstVideo');
        // $firstVideo[0].playbackRate = 0.65;
        // $firstVideo[0].play();

        // var $secondVideo = $('#secondVideo');
        // $secondVideo[0].playbackRate = 0.65;
        // $secondVideo[0].play();

        // var $thirdVideo = $('#thirdVideo');
        // $thirdVideo[0].playbackRate = 0.65;
        // $thirdVideo[0].play();

        $(window).on('DOMContentLoaded load resize scroll', function() {

            if (isElementInViewport($('#sharingSection'))) {
                //$('#sharingSection').addClass('-animate');
            }
            if (isElementInViewport($('#friendsSection'))) {
                // $('#friendsSection').addClass('-animate');
            }
            if (isElementInViewport($('.footer-waterfall__mist'))) {
                // $('.footer-container').addClass('-animate');
            } 
        });
    }
});

$.fn.handlePhoneQuote = function() {
    var $context = $(this),
        $quotes = $('.phone-features__quote--slide',$context),
        $screenshots = $('.phone-features__video',$context),
        timer = 5000,
        currentIndex = 0;

    $quotes.hide();
    $screenshots.hide();
    $($quotes[currentIndex]).fadeIn();
    $($screenshots[currentIndex]).show();

    console.log(currentIndex);

    setInterval(function() {
        if (currentIndex === 3) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        $quotes.hide();
        $screenshots.hide();
        $($screenshots[currentIndex]).show();
        $($quotes[currentIndex]).show();
        // setTimeout(function() {
        //     $($quotes[currentIndex]).fadeIn();
        // },500)
        
        console.log(currentIndex);
    },timer);

    console.log($quotes);
}

$(function() {

    if ($('.phone-features').length > 0) {
        $('.phone-features').handlePhoneQuote();
    }
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
    var $header = $('.hero-stage__header',$heroContainer);
    var $clouds = $('.animated-cloud',$heroContainer);
    var $birds = $('.animated-bird',$mainSite);
    var $baloon1 = $('.main-site__balloon1',$heroContainer);
    var $baloon2 = $('.main-site__balloon2',$heroContainer);
    var $nav = $('.topnav-container');
    var $navInner = $('.navigation-inner');
    var $heroClouds = $('.hero-sky',$heroContainer);
    var $downloadButtonsAnimateOnly = $('#downloadButtons');
    var $downloadButtons = $('#downloadActualButtons');
    var $window = $(window);
    
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
    // startHeaderTextAnimation = function() {
    //     if (!$header.hasClass('-fixed')) {
    //       $downloadButtonsAnimateOnly.addClass('-animate');
    //       $header.addClass('-animate');
    //     }
    // }

    window.addEventListener('scroll', function(){
      var scrollTop = $window.scrollTop();
      if (scrollTop > 40) {
        $nav.addClass('-compact');
        // $header.addClass('-fade');
        // $downloadButtons.addClass('-fade');
      } else {
        $nav.removeClass('-compact');
        // $header.removeClass('-fade');
        // $downloadButtons.removeClass('-fade');
      }
    });
    // start animations
    setTimeout(function() {
        startAnimations();
    },1600)
    // setTimeout(function() {
    //     startHeaderTextAnimation();
    // },2000)
    setTimeout(function() {
        //make body scrollable 
        $('body').removeClass('-static');
    },5000)
},250);

function trackFBClick(eventName) {
  fbq('trackCustom', eventName);
}

var handleTryTrueButton  = function(){
  var $button = $('#tryTrueNav');
  var $contentButton1 = $('#waitListButton');
  var $contentButton2 = $('#beRealButton');
  var $contentButton3 = $('#letsDoItButton');
  var fbEventProp = 'appleStore';
  var appStoreLink = 'https://apps.apple.com/us/app/true-private-social-network/id834451429';
  var playStoreLink = 'https://play.google.com/store/apps/details?id=hellomobile.hello';
  var realLink = '#';
  var userAgent = navigator.userAgent.toLowerCase(); 
  var isAndroid = userAgent.indexOf('android') > -1;

  if (isAndroid) {
    realLink = playStoreLink;
    fbEventProp = 'googleStore';
  } else {
    realLink = appStoreLink;
    fbEventProp = 'appleStore';
  }

  $button.attr('href',realLink);
  $contentButton1.attr('href',realLink);
  $contentButton2.attr('href',realLink);
  $contentButton3.attr('href',realLink);

  $button.click(function() {
    trackFBClick('TopNavButtonClick');
    fbq('trackCustom', 'TopNavTryTrueButtonClick', {store: fbEventProp});
    ga('send', 'event', 'Try True Topnav', 'clicked Try True', fbEventProp);
  })
  $contentButton1.click(function() {
    fbq('trackCustom', 'TryItButtonClick', {store: fbEventProp});
    ga('send', 'event', 'Landing Page Buttons', 'clicked Try It button', fbEventProp);
  })
  $contentButton2.click(function() {
    fbq('trackCustom', 'BeRealButtonClick', {store: fbEventProp});
    ga('send', 'event', 'Landing Page Buttons', 'clicked Be Real button', fbEventProp);
  })
  $contentButton3.click(function() {
    fbq('trackCustom', 'LetsDoItButtonClick', {store: fbEventProp});
    ga('send', 'event', 'Landing Page Buttons', 'clicked Lets do It button', fbEventProp);
  })
}

$(function() {
  if ($('body').hasClass('true-home')) {
    if (window.location.hash !== '#waitlist') {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });  
    }
    if (window.location.hash === '#waitlist') {
      $('.footer-container').addClass('-animate');
    }
  }
});

$(window).on('load', function (e) {
  handleTryTrueButton();
  initHero(); 

  // try and get the position of the download buttons.
  var $downloadButtons = $('#downloadButtons');
  // var $actualButtons = $('#downloadActualButtons');
  var $buttonsOffset = 16; 


  if ($('body').hasClass('true-home')) {
    if (window.location.hash === '#waitlist') {
      $('.footer-container').addClass('-animate');
      $(window).animate({
          //scrollTop: ($('#joinUs').offset().top - 100)
          scrollTop: $(document).height()
      },100);
    }

    if (getParameterByName('waitlist')) {
      $('.footer-container').addClass('-animate');
      $(window).animate({
          //scrollTop: ($('#joinUs').offset().top - 100)
          scrollTop: $(document).height()
      },100);
    }

    // executes when complete page is fully loaded, including all frames, objects and images
    // fade out the preload spinner.
    $('.preloader-shim').addClass('-animate');
    
    

    var ogWidth = $(window).width();

    if ($(window).width() > 800) {
      $('[data-scroll-speed]').moveIt();
    }
    if ($(window).width() < 1200) {
      $buttonsOffset = 17;
    }
    if ($(window).width() < 1000) {
      $buttonsOffset = 22;
    }
    if ($(window).width() < 750) {
      $buttonsOffset = 30;
      // move footer
      $('.section-footer').appendTo('.section-starts');
    }
    if ($(window).width() < 520) {
      $buttonsOffset = 28;
    }

    // $actualButtons.css({
    //   top: $downloadButtons.offset().top + $buttonsOffset + 'px'
    // })
  
    // setTimeout(function(){
    //   $actualButtons.addClass('-fixed');
    // },4040)
    
    var resizeTimeout;
    $(window).resize(function(){
        $downloadButtons.removeClass('-animate');
        $downloadButtons.css({
          opacity: 1
        })
        // $actualButtons.css({
        //   top: $downloadButtons.offset().top + $buttonsOffset + 'px',
        //   opacity: 0
        // })

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){   
            $downloadButtons.css({
              opacity: 0
            }) 
            // $actualButtons.css({
            //   top: $downloadButtons.offset().top + $buttonsOffset + 'px',
            //   opacity: 1
            // })
            if (ogWidth < 800 && $(window).width() > 800) {
              // init the parallax if the site starts at mobile and resizes to not mobile
              $('[data-scroll-speed]').moveIt();
            }
            if (ogWidth < 750 && $(window).width() > 750) {
              // check if the footer has been moved.
              $('.section-footer').appendTo('#ogFooterPosition');
            } else if (ogWidth > 750 && $(window).width() < 750) {
              $('.section-footer').appendTo('.section-starts');
            } else if (ogWidth < 750 && $(window).width() < 750) {
              $('.section-footer').appendTo('.section-starts');
            } else {
              $('.section-footer').appendTo('#ogFooterPosition');
            }
        }, 1000);
    });

  }

})

$.fn.handleLegalNav = function() {
    var $items = $('.legal-nav a'),
        $privacyPanel = $('#privacy'),
        $termsPanel = $('#terms');

    $items.click(function(e) {
        e.preventDefault();
        $items.removeClass('-selected');
        console.log($(this).data('target') === 'privacy');
        $privacyPanel.hide();
        $termsPanel.hide();

        if ($(this).data('target') === 'privacy') {
            $('a[data-target="privacy"]').addClass('-selected');
            $privacyPanel.fadeIn();
        } else {
            $('a[data-target="terms"]').addClass('-selected');
            $termsPanel.fadeIn();
        }
        // $(window).animate({
        //     scrollTop: ($('#'+$(this).data('target')).offset().top - 80)
        // },400);
    })
}

if ($('body').hasClass('true-legal')) {
    $(window).on('load', function(){
        $('.true-legal').handleLegalNav();

        if (window.location.hash === '#section=terms') {
            // $(window).animate({
            //     scrollTop: ($('#terms').offset().top - 80)
            // },400);
            $('a[data-target="privacy"]').removeClass('-selected');
            $('a[data-target="terms"]').addClass('-selected');
            $('#terms').fadeIn();
        } else {
            $('#privacy').fadeIn();
        }
    });
}

$.fn.handleMobileNav = function() {
    var $context = $(this),
        $mobileBtn = $('.mobile-nav-icon',$context),
        $mobileMenu = $('.topnav-links',$context);

    console.log($context);

    $mobileBtn.click(function() {
        $(this).toggleClass('open');
        $mobileMenu.toggleClass('open');
    })
    
}

$(function() {

    if ($('.navigation-inner').length > 0) {
        $('.navigation-inner').handleMobileNav();
    }
});
var shareBlogOnTwitter = function(message) {
    var url = window.location.href;
    var tweetBtn = $('.twitter-share');
    var title = message;
    var shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
    tweetBtn.href = shareUrl; // 1

    tweetBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareBlogOnLinkedIn = function(message) {
    var url = escape(window.location.href);
    var linkedInBtn = $('.linkedin-share');
    var title = message;
    var shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
    linkedInBtn.href = shareUrl; // 1

    linkedInBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnLinkedIn', getWindowOptions());
        win.opener = null; // 2
    });
}

var shareBlogOnReddit = function(message) {
    var url = escape(window.location.href);
    var redditBtn = $('.reddit-share');
    var title = escape('Check out this blog post at trytrue.com');
    var shareUrl = 'http://www.reddit.com/submit?url='+url+'&title='+title;
    //var shareUrl = 'http://www.reddit.com/submit?url=https://stackoverflow.com/questions/24823114/post-to-reddit-via-url&title=Post%20to%20Reddit%20via%20URL';
    redditBtn.href = shareUrl; // 1

    redditBtn.click(function(e) {
        // alert(encodeURI(shareUrl));
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnReddit', getWindowOptions());
        win.opener = null; // 2
    });
}
$(function() {
    if ($('.testimonials-container').length > 0) {
        $('.testimonial-card').slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 6000,
        });
    }
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

var shareOnFacebook = function(inviteCode) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var fbBtn = $('.facebook-share');
    // var title = 'Just signed up to try this new app, check it out. #DeleteFacebook #BeTrue';
    var title = 'Just signed up to try this new app, check it out.';
    var shareUrl = url + inviteCode + '&title=' + title;
    fbBtn.href = shareUrl; // 1

    fbBtn.click(function(e) {
        // e.preventDefault();
        // var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
        // win.opener = null; // 2

        FB.ui({
            method: 'share',
            href: shareUrl,
            // hashtag: '#BeTrue',
            // quote: title,
        }, function(response){});
    });
}

var shareOnTwitter = function(inviteCode) {
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    var tweetBtn = $('.twitter-share');
    var title = encodeURIComponent('Come beta test True with me, it’s for sharing privately with friends 😎 ');
    var shareUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url + inviteCode;
    tweetBtn.href = shareUrl; // 1

    tweetBtn.click(function(e) {
        e.preventDefault();
        var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null; // 2
    });
}

var initCopyToClip = function(inviteCode) {
    var $input = $('#clipboardCopy');
    var $button = $('#copyUrl');
    var url = [location.protocol, '//', location.host, location.pathname].join('');

    $input.attr('value',url + inviteCode);

    $button.click(function(e) {
        e.preventDefault();
        // $input.select();
        $button.text('Link Copied!');
        $input.focus();
        setTimeout(function() {
            $input[0].setSelectionRange(0, 9999);
        }, 1);
        setTimeout(function() {
            document.execCommand('copy');
        }, 100);
    });
}



var initEmailShare = function(inviteCode) {
    var $button = $('.button-send-email');
    var url = [location.protocol, '//', location.host, location.pathname].join('');

    $button.attr('href','mailto:?subject=Let\'s beta test True together&body=Come beta test True with me, it’s for sharing privately with friends 😎 %0D%0A%0D%0A'+url+inviteCode)
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var handleWaitlist = function() {
    var $modal = $('.modal-waitlist');
    var referrerCode = getParameterByName('inviteCode') || null;
    var showModal = getParameterByName('showModal') || false;
    var $closeModal = $('#closeOverlay');
    var $modalSpinner = $('.modal-waitlist__preloader');
    var $formFirstName = $('.footer-input #trueFirstName');
    var $formLastName = $('.footer-input #trueLastName');
    var $formInput = $('.footer-input #trueEmail');
    var $formSubmit = $('.footer-input .footer-signup');
    var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    if (showModal) {
        $('#emailModal').show();
        $modal.fadeIn();
        $modalSpinner.fadeOut();
        shareOnFacebook('?inviteCode='+referrerCode);
        shareOnTwitter('?inviteCode='+referrerCode);
        initCopyToClip('?inviteCode='+referrerCode);
        initEmailShare('?inviteCode='+referrerCode);
    } else {
        $('#inviteModal').show();
    }

    $formInput.on('click', function(){
        $(window).off('resize');
    });
    $formFirstName.on('click', function(){
        $(window).off('resize');
    });
    $formLastName.on('click', function(){
        $(window).off('resize');
    });

    $formInput.keyup(function() {
        if ($formLastName.val() !== '' && $formFirstName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })
    $formFirstName.keyup(function() {
        if ($formLastName.val() !== '' && $formFirstName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })
    $formLastName.keyup(function() {
        if ($formLastName.val() !== '' && $formFirstName.val() !== '' && emailPattern.test($formInput.val())) {
            $formSubmit.removeClass('-disabled')
        } else {
            $formSubmit.addClass('-disabled')
        }
    })

    $formSubmit.click(function(e) {
        var postData = {
            email: $formInput.val(),
            first_name: $formFirstName.val(),
            last_name: $formLastName.val(),
            referrer_code: referrerCode
        }
        e.preventDefault();
        if (!$formSubmit.hasClass('-disabled')) {
            $.ajax({
                url: 'https://us-central1-trytruecom-website.cloudfunctions.net/waitlist',
                type: 'POST',
                data: postData,
                dataType: 'json',
                cache: false,
                beforeSend: function() {
                    $('#emailModal').hide();
                    $('#inviteModal').show();
                    $modal.fadeIn();
                },
                success: function(data) {
                },
                error: function(xhr, ajaxOptions, thrownError) { // if error occured
                },
                complete: function(data) {
                    fbq('track', 'CompleteRegistration');
                    let inviteCode = '';
                    console.log(data.responseJSON);
                    if (data.responseJSON && data.responseJSON.inviteCode) {
                        inviteCode = data.responseJSON.inviteCode;
                    }
                    shareOnFacebook(inviteCode);
                    shareOnTwitter(inviteCode);
                    initCopyToClip(inviteCode);
                    initEmailShare(inviteCode);
                    $modalSpinner.fadeOut();
                    $formInput.val('');
                    $formFirstName.val('');
                    $formLastName.val('');
                }
            });
        }
    })

    $modal.click(function(e) {
        if(e.target == this){
            $modal.fadeOut();
        }
    })
    $closeModal.click(function(e) {
        e.preventDefault();
        $modal.fadeOut();
    })
}


$(function() {
    if ($('body').hasClass('true-home')) {
        handleWaitlist();
    }
});