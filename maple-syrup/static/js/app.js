function isElementInViewport (el) {

    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

$.fn.flyInFromRight = function() {
    $this = $(this);

    $(window).on('DOMContentLoaded load resize scroll', function() {
        var delay = 100;
        $this.each(function(i,e) {
            if (isElementInViewport($(e).parent())) {
                delay = delay + 100;
                window.setTimeout(function() {
                    $(e).removeClass('fly-from-right');
                },delay);
            }
        })

    }); 
}

$.fn.flyInFromLeft = function() {
    $this = $(this);

    $(window).on('DOMContentLoaded load resize scroll', function() {
        var delay = 100;
        $this.each(function(i,e) {
            if (isElementInViewport($(e).parent())) {
                delay = delay + 100;
                window.setTimeout(function() {
                    $(e).removeClass('fly-from-left');
                },delay);
            }
        })

    }); 
}

$(function(){    
    $('.animate-slide').flyInFromRight();
    $('.animate-slide').flyInFromLeft();
    //$('.home-solutions').flyInFromRight();
});
$(function(){    
    $('.home-testimonials .tile-row').slick({
        dots: true,
        slidesToShow: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
            breakpoint: 770,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });
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


$.fn.handleTextLink = function() {
    var $container = $(this),
        $formContainer = $('.footer-download-link__form--show', $container),
        $button = $('.button', $container),
        $spinner = $('#newsletterSpinner', $container),
        $form = $('input', $container),
        $success = $('.-success', $container),
        $fail = $('.-error', $container),
        linkData = {
            tags: [],
            channel: 'Website',
            feature: 'TextMeTheApp',
            data: {
              'foo': 'bar'
            }
        },
        options = {};
    
    var submitting = function() {
        $button.hide();
        $spinner.css('display','inline-block');
        $form.prop('disabled',true);
        $success.hide();
        $fail.hide();
    }

    var complete = function(hasError) {
        if (hasError) {
            $spinner.hide();
            $form.prop('disabled',false);
            $fail.show();
            $button.show();
        } else {
            $formContainer.hide();
            $success.show();
        }
    }
    
    var callback = function(err, result) {
        if (err) {
            complete(true);
        }
        else {
            complete(false);
        }
      };

    $button.click(function(e){
        submitting();
        branch.sendSMS($form.val(), linkData, options, callback);
    });

}

$(function(){
    $('#downloadLinkForm').handleTextLink({
        dots: true
    });
});
// Handles all the stuffs with the request demo modal
$.fn.handleModal = function() {
    var $requestDemoButton = $(this);

    // handle the form and interactions with the modal
    function doFormStuff(modal) {
        var $context = modal,
            $closeButton = $('.modal-button__close', $context),
            $headerCloseButton = $('.modal-header__close', $context),
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

        function closeSlider() {
            $('.modal-contents', modal).removeClass('-active');
            setTimeout(function() {
                modal.removeClass('-active');
                modal.empty();
                modal.remove();
                $('body').css('overflow','visible');
                window.location.hash = 'close';
            },300)
        }

        $closeButton.click(function(e) {
            e.preventDefault();
            closeSlider();
        });

        $headerCloseButton.click(function(e) {
            e.preventDefault();
            closeSlider();
        });

        $thanksCloseBtn.click(function(e) {
            e.preventDefault();
            closeSlider();
        })

        modal.click(function(e) {
            // close the modal when user clicks on the overlay
            if ($(e.target).hasClass('modal-overlay')) {
                closeSlider();
            }
        })

        $(window).on('hashchange', function() {
            if (window.location.has !== 'requestInfo') {
                $closeButton.trigger('click');
            }
        });

    }

    // inject the modal inside the <body> tag
    function addModalToDom() {
        // create an instance of the overlay
        var $overlay = $('<div class="modal-overlay"></div>');
        $('body').prepend($overlay);
        $overlay.addClass('-active');
        $('body').css('overflow','hidden');
        // load the modal content
        $.get('includes/request-demo.html?cache=bust1', function(data) {
            $overlay.html(data);
            setTimeout(function() {
                $('.modal-contents', $overlay).addClass('-active');
            },50)
            doFormStuff($overlay);
        });
    }

    $requestDemoButton.click(function(e) {
        e.preventDefault();
        window.location.hash = '#requestInfo';
        addModalToDom();
    });
};

$(function(){  
    // modal hook
    $('.modal-request-demo').handleModal();
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