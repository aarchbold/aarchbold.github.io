/* eslint-disable */

// global vars
window.shyft = {
  curSlide: 1
}

// Handle the features carousel states
$.fn.handleFeatureSlides = function() {
  var context = $(this),
    sectionHeight = 200,
    $slideBackground = $('.features-top', context),
    $quotes = $('.features-controls__text p', context),
    $featureSlides = $('.feature-slide', context),
    $prevButton = $('.features-controls__prev', context),
    $nextButton = $('.features-controls__next', context);

  function resizeFeatures() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var windowOffset = 60;
    var imgHeight = Math.floor($(window).height() / 1.65);

    if (windowHeight > 1200) {
      windowHeight = 1200;
    }

    if (windowHeight > (windowWidth * 0.8)) {
      imgHeight = 372;
    }

    // context.height(windowHeight + windowOffset);
    if (windowHeight < (windowWidth * 0.8)) {
      context.css('min-height', function(){ 
        return windowHeight + windowOffset;
      });
    }
    $('.features-item img').each(function(i,e) {

      $(e).show();
      $(e).height(imgHeight);
    })
  }
 
  function updateSlide(slide) {
    $slideBackground.attr('class','');
    $slideBackground.addClass('features-top -slide' + slide);
    $quotes.each(function(i,e) {
      $(e).hide();
      if ($(e).hasClass('features-controls__slide' + slide)) {
        $(e).fadeIn();
      }
    });
    $featureSlides.each(function(i,e) {
      $(e).hide();
      if ($(e).hasClass('features-slide' + slide)) {
        $('.features-item').each(function(i,element) {
          $(element).css('transform','translateY(100%)');
        })
        $(e).show();
        $('.features-item', $(e)).each(function(i,element) {
          if (i === 0) {
            window.setTimeout(function() {
              $(element).css('transform','translateY(0)');
            },100)
          } else if (i === 1) {
            window.setTimeout(function() {
              $(element).css('transform','translateY(0)');
            },200)
          } else if (i === 2) {
            window.setTimeout(function() {
              $(element).css('transform','translateY(0)');
            },300)
          }
        })
      }
    })
  }

  $prevButton.click(function(e) {
    e.preventDefault();
    // scroll to features section
    $('html, body').animate({
        scrollTop: context.offset().top + 30
    }, 0);
    if (window.shyft.curSlide === 1) {
      window.shyft.curSlide = 3;
    } else {
      window.shyft.curSlide = window.shyft.curSlide - 1;
    }
    updateSlide(window.shyft.curSlide);
  });

  $nextButton.click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: context.offset().top + 30
    }, 0);
    if (window.shyft.curSlide === 3) {
      window.shyft.curSlide = 1;
    } else {
      window.shyft.curSlide = window.shyft.curSlide + 1;
    }
    updateSlide(window.shyft.curSlide);
  });

  // force height of section
  // context.attr('style','');
  // context.height(context.height() + 100);
  resizeFeatures();
  $(window).resize(function() {
    resizeFeatures();
  });
}

// JS from branch for sending texts
function sendSMS(form) {
  var $entry = $('.section-intro__form.-entry');
  var $success = $('.section-intro__form.-success');
  var $fail = $('.section-intro__form.-fail');
  var $shiffy = $('.intro-shiffy');
  var $spinner = $('.section-intro__spinner');
  var $button = $('.button__signup');
  var phone = form.phone.value;
  var linkData = {
    tags: [],
    channel: 'Website',
    feature: 'TextMeTheApp',
    data: {
      'foo': 'bar'
    }
  };
  var options = {};

  $button.prop('disabled', true);
  $spinner.show();

  var callback = function(err, result) {
    if (err) {
      $fail.show();
      $shiffy.hide();
      $button.prop('disabled', false);
      $spinner.hide();
    }
    else {
      $fail.hide();
      $success.show();
      $shiffy.hide();
      $button.prop('disabled', false);
      $spinner.hide();
      // Facebook tracking
      fbq('trackCustom', 'CompleteTextLink');
      ga('send', 'event', 'Shyft For Teams', 'User requested a text link to the app', 'Marketing Site');
    }
  };
  branch.sendSMS(phone, linkData, options, callback);
  form.phone.value = "";
}

// handles the mobiles slideshow
function handleMobileSlider() {
  var carousel = $('.features-slider--mobile');
  carousel.slick({
    prevArrow: $('.features-controls__prev--mobile'),
    nextArrow: $('.features-controls__next--mobile')
  });

  carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if (nextSlide < 4) {
      carousel.removeClass('-slide2');
      carousel.removeClass('-slide3');
      carousel.addClass('-slide1');
    } else if (nextSlide > 3 && nextSlide < 8) {
      carousel.removeClass('-slide1');
      carousel.removeClass('-slide3');
      carousel.addClass('-slide2');
    } else if (nextSlide > 7 && nextSlide < 12) {
      carousel.removeClass('-slide1');
      carousel.removeClass('-slide2');
      carousel.addClass('-slide3');
    }
  });
}

$(function(){
  // animate shiffy
  window.setTimeout(function(){
    $('.intro-shiffy').addClass('-show-shiffy').delay(500).queue(function(next) {
      $('.intro-shiffy__quote').addClass('-animate');
      next();
    });
  }, 800)
  window.setTimeout(function(){
    $('.intro-shiffy__quote-text').show();
  }, 1600)
  
  $('.section-features').handleFeatureSlides();
  $( window ).resize(function() {
    // $('.section-features').handleFeatureSlides();
  });
  // mobile slider
  handleMobileSlider();
});

// $("#div").addClass("error").delay(1000).queue(function(next){
//     $(this).removeClass("error");
//     next();
// });
/* eslint-disable */

$.fn.handleMenu = function() {
    var context = $(this),
        $menuBtn = $('.topnav-links__mobile-button', context),
        $menu = $('.topnav-links-container', context);

    $menuBtn.click(function(e) {
        e.preventDefault();
        if ($menuBtn.hasClass('fa-bars')) {
            $menuBtn.addClass('fa-times');
            $menuBtn.removeClass('fa-bars');
            $menu.fadeIn();
            $menu.css('display','inline-block');
        } else {
            $menuBtn.addClass('fa-bars');
            $menuBtn.removeClass('fa-times');
            $menu.fadeOut();
        };
    });
};

// Handles all the stuffs with the request demo modal
$.fn.handleRequestDemo = function() {
    var $requestDemoButton = $(this),
        $body = $('body');
        $sliderOverlay = $('.page-slider__overlay'),
        $slider = $('.page-slider');

    // handle the form and interactions with the modal
    function doFormStuff(modal) {
        var $context = modal,
            $closeButton = $('.modal-button__close', $context),
            $thanksCloseBtn = $('.-close', $context),
            $inputs = $('.modal-input', $context),
            $fullname = $('#fullName', $context),
            $jobtitle = $('#jobTitle', $context),
            $workEmail = $('#workEmail', $context),
            $phoneNumber = $('#phoneNumber', $context),
            $companyName = $('#companyName', $context),
            $numEmployees = $('#numEmployees', $context),
            $submit = $('#requestDemo', $context),
            validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|jobs|name|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            $headerRequest = $('.modal-header.-request', $context),
            $headerThanks = $('.modal-header.-thanks', $context),
            $bodyRequest = $('.modal-content.-request', $context),
            $bodyThanks = $('.modal-content.-thanks', $context),
            $successName = $('.form-firstname', $context);

        function sendToMixPanel() {
            var postData = {
                'Fullname': $fullname.val(),
                'Jobtitle': $jobtitle.val(),
                'Email': $workEmail.val(),
                'Phone': $phoneNumber.val(),
                'Company': $companyName.val(),
                'Employees': $numEmployees.val()
            };
            var apiData = {
                "FullName": $fullname.val(),
                "JobTitle": $jobtitle.val(),
                "Email": $workEmail.val(),
                "Phone": $phoneNumber.val(),
                "Company": $companyName.val(),
                "Employees": $numEmployees.val()
            };
            apiData =  JSON.stringify(apiData);
            $.ajax({
              type: "POST",
              url: 'https://a3uz2ncpl3.execute-api.us-west-2.amazonaws.com/prod/send_email',
              data: apiData,
              success: function(resp){
                  console.log("got message");
              },
              error: function () {
                    console.log("error in the api call");
                },
              dataType: 'json'
            });
            mixpanel.track(
                'DemoRequest',
                postData,
                function(e){
                    console.log('Mixpanel tracked!');
                    console.log(e);
                    $successName.html($fullname.val());
                    $headerRequest.hide();
                    $bodyRequest.hide();
                    $headerThanks.show();
                    $bodyThanks.show();
                    // go to the thank you page
                }
            );
        }

        function validateForm() {
            var valid = true;

            if ($fullname.val() === '') {
                $fullname.addClass('-error');
            } else {
                $fullname.removeClass('-error');
            }
            if ($jobtitle.val() === '') {
                $jobtitle.addClass('-error');
            } else {
                $jobtitle.removeClass('-error');
            }
            if ($workEmail.val() === '' || !validEmail.test($workEmail.val())) {
                $workEmail.addClass('-error');
            } else {
                $workEmail.removeClass('-error');
            }
            if ($phoneNumber.val() === '') {
                $phoneNumber.addClass('-error');
            } else {
                $phoneNumber.removeClass('-error');
            }
            if ($companyName.val() === '') {
                $companyName.addClass('-error');
            } else {
                $companyName.removeClass('-error');
            }
            if ($numEmployees.val() === '0') {
                $numEmployees.addClass('-error');
            } else {
                $numEmployees.removeClass('-error');
            }

            $inputs.each(function(i,e) {
                console.log(e);
                if ($(e).hasClass('-error')) {
                    valid = false;
                }
            })
            if ($numEmployees.val() === '0') {
                valid = false;
            }

            if (valid === true) {
                sendToMixPanel()
            }
        }

        $submit.click(function(e) {
            e.preventDefault();
            // verify that fields are filled
            validateForm();
        })

        $thanksCloseBtn.click(function(e) {
            e.preventDefault();
            closeSlider();
        })

        modal.click(function(e) {
            // close the modal when user clicks on the overlay
            if ($(e.target).hasClass('modal-overlay')) {
                modal.empty();
                modal.removeClass('-active');
                modal.remove();
                $('body').css('overflow','visible');
                window.location.hash = '#close';
            }
        })

        $(window).on('hashchange', function() {
            if (window.location.hash !== '#requestInfo') {
                $closeButton.trigger('click');
            }
        });

        $closeButton.click(function(e) {
            e.preventDefault();
            closeSlider();
        });

    }

    // inject the modal inside the <body> tag
    function openSlider() {
        // create an instance of the slider
        window.location.hash = '#requestInfo';
        $sliderOverlay.addClass('-show');
        $slider.addClass('-show');
        $body.css('overflow', 'hidden');
        $slider.load('includes/request-demo.html',function() {
            // load request demo specific javascript here
            doFormStuff($slider);
        });
        // var $overlay = $('<div class="modal-overlay"></div>');
        // $('body').prepend($overlay);
        // $overlay.addClass('-active');
        // $('body').css('overflow','hidden');
        // // load the modal content
        // $.get('business/includes/request-demo.html?cache=bust', function(data) {
        //     $overlay.html(data);
        //     doFormStuff($overlay);
        // });
    }
    // close slider
    function closeSlider() {
        window.location.hash = '#close';
        $sliderOverlay.removeClass('-show');
        $slider.removeClass('-show');
        $body.css('overflow', 'visible');
    }

    $requestDemoButton.click(function(e) {
        e.preventDefault();
        window.location.hash = '#requestInfo';
        openSlider();
    });

    $sliderOverlay.click(function() {
        closeSlider();
    });


};

// handle the request demo slider
// $.fn.handleSlider = function() {
//     var $requestDemo = $(this),
//         $body = $('body');
//         $sliderOverlay = $('.page-slider__overlay'),
//         $slider = $('.page-slider');
//
//     function openSlider() {
//         $sliderOverlay.addClass('-show');
//         $slider.addClass('-show');
//         $body.css('overflow', 'hidden');
//         $slider.load('../../includes/request-demo.html',function() {
//             // load request demo specific javascript here
//             $('.request-demo-content').handleRequestDemo();
//         });
//     }
//
//     function closeSlider() {
//         $sliderOverlay.removeClass('-show');
//         $slider.removeClass('-show');
//         $body.css('overflow', 'visible');
//     }
//
//     $requestDemo.click(function() {
//         openSlider();
//     });
//
//     $sliderOverlay.click(function() {
//         closeSlider();
//     });
// };

$(function(){
    $('.button-rquest-demo').handleRequestDemo();
    $('.topnav-container').handleMenu();
});
