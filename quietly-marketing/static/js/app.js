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

    // for mobile swiping
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
/**
 * Validate Contact
 * Add submit handler that validates the contact form information.
 */
$.fn.validateContact = function() {
    var logPrefix = '[Validator]',
        form = this,
        errorContainer = $('.form-error', form),
        successContainer = $('.form-success', form),
        spinner = $('button', form),
        inProgress = false,
        errorMsg = '';

    function clearFlyout() {
        errorContainer.fadeOut();
        successContainer.fadeOut();
    }

    function displayError(type, msg) {
        // Displays errors or success messages in a flyout
        if (type === 'error') {
            errorContainer.show();
            successContainer.hide();
            if (!msg) {
                var msg = 'Error contacting server. Please try again later.';
            }
            errorContainer.text(msg);
        } else {
            errorContainer.hide();
            successContainer.success();
            successContainer.text(msg);
        }
        setTimeout(function() {
            clearFlyout();
        }, 5000);
    }

    // custom validation rules
    $.validator.addMethod('laxUrl', function(value, element) {
        return this.optional(element) || /([\w\.]+\.[^,\s]*)/i.test(value);
    }, 'Please enter a valid URL');

    $.validator.addMethod('laxEmail', function(value, element) {
        return this.optional(element) || /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value);
    }, 'Please enter a valid email address.');

    form.validate({
        rules: {
            name: {
                required: true
            },
            telephone: {
                required: true
            },
            website: {
                required: true,
                laxUrl: true
            },
            email :{
                required: true,
                laxEmail: true
            },
            company: {
                required: true
            }
        },
        errorPlacement: function(error, element) {
            // This ensures that the error label is not inserted into the
            // select box itself.
            if (element.attr('name') == 'budget') {
                error.insertAfter('div.marketing__contact-form-select');
            } else {
                error.insertAfter(element);
            }
        }
    });

    form.submit(function(e) {
        e.preventDefault();
        spinner.addClass('-is-loading');

        if (form.valid() && !inProgress) {
            var postData = {
                name: $('input[name=name]', form).val(),
                email: $('input[name=email]', form).val(),
                phone: $('input[name=telephone]', form).val(),
                website: $('input[name=website]', form).val(),
                message: $('textarea[name=comments]', form).val(),
                company: $('input[name=company]', form).val(),
                budgetRange: $('input[name=budget]', form).val(),
                requestType: 'brand'
            };
            inProgress = true;
            $.post('https://www.quiet.ly/api/request_info', JSON.stringify(postData), function() {
                inProgress = false;
                spinner.removeClass('-is-loading');
                displayError('success', 'Thank you for your interest! We will get back to you shortly.');
                dataLayer.push({
                    'event': 'requestInfo'
                });
                setTimeout(function() {
                    form[0].reset();
                },500);
            })
            .fail(function(response) {
                if (response && response.responseText) {

                    if (typeof JSON.parse(response.responseText).message === 'object') {
                        var errors = JSON.parse(response.responseText).message;
                        for(var key in errors) {
                            errorMsg += errors[key] + ' ';
                            console.log(logPrefix, errorMsg);
                        }

                    } else {
                        errorMsg = JSON.parse(response.responseText).message;
                    }
                }
                displayError('error', errorMsg);
                spinner.removeClass('-is-loading');
                inProgress = false;
            });
        } else {
            // show errors
            displayError('error', 'Oops. There was a problem submitting this form. Please check that the required fields are filled.');
            // stop spinner
            spinner.removeClass('-is-loading');
        }
    });

};

$(function(){    
    $('#contactForm').validateContact();
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
/**
 * Newsletter Sign Up
 * Sends a request to the BE for subscribing to our mailchimp email
 */
$.fn.newsletterSignUp = function() {
    var logPrefix = '[Newsletter Sign Up]',
        form = this,
        email = $('input[type=email]', form),
        button = $('button', form),
        emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        errorText = '',
        inProgress = false,
        errorContainer = $('.form-error', form),
        formFields = $('.footer-newsletter-signup__form', form),
        successMessage = $('.form-success', form);

    console.log(logPrefix, this);

    function resetError() {
        email.removeClass('error');
        errorText = '';
        errorContainer.html(errorText);
        errorContainer.hide();
    }

    // remove error on email field if one exists
    email.on('input', function() {
        if(emailPattern.test(email.val())) {
            resetError();
        }
    });

    form.submit(function(e) {
        e.preventDefault();
        button.addClass('-is-loading');
        email.prop('disabled',true);
        button.prop('disabled',true);
        if (!inProgress && email.val() !== '' && emailPattern.test(email.val())) {
            var postData = {
                email: email.val(),
                type: 'newsletter'
            };

            resetError();
            inProgress = true;


            $.post('https://www.quiet.ly/api/capture_email', JSON.stringify(postData), function() {
                inProgress = false;
                button.removeClass('-is-loading');
                email.prop('disabled',false);
                button.prop('disabled',false);
                form[0].reset();
                formFields.hide();
                successMessage.show();
            })
            .fail(function(response) {
                console.log(response);
                if (response && response.responseText) {

                    if (typeof JSON.parse(response.responseText).message === 'object') {
                        var errors = JSON.parse(response.responseText).message;
                        for(var key in errors) {
                            errorText += errors[key] + ' ';
                            console.log(logPrefix, errorText);
                        }

                    } else {
                        errorText = JSON.parse(response.responseText).message;
                    }
                }

                if (!errorText) {
                    errorText = "Error contacting server. Please try again later."
                }

                errorContainer.html(errorText);
                errorContainer.show();
                email.addClass('error');
                button.removeClass('-is-loading');
                email.prop('disabled',false);
                button.prop('disabled',false);
                inProgress = false;
            });
        } else {
            // stop spinner
            button.removeClass('-is-loading');
            email.addClass('error');
            email.prop('disabled',false);
            button.prop('disabled',false);
            errorText = 'Please enter a valid email';
            errorContainer.html(errorText);
            errorContainer.show();
        }
    });
};

$(function(){    
    $('#newsletterSignupForm').newsletterSignUp();
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