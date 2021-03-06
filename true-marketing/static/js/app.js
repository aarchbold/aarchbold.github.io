// $.fn.localizr = function() {
//     var $context = $(this),
//         $current = $('.language-selector__current', $context),
//         $arrow = $('.language-selector__arrow', $context),
//         $layer = $('.language-selector__layer', $context),
//         $languages = $('.language-selector__item', $context);

//     function toggleLayer() {
//         if ($layer.hasClass('-active')) {
//             $arrow.removeClass('-active');
//             $layer.removeClass('-active');
//             $layer.hide();
//         } else {
//             $layer.show();
//             setTimeout(function() {
//                 $arrow.addClass('-active');
//                 $layer.addClass('-active');
//             },100)
//         }
//     }

//     $current.click(function() {
//         toggleLayer();
//     });

//     $languages.click(function(e) {
//         // var currentLang = $(e.target).data('language');
//         // localStorage.setItem('trueLanguage2',currentLang);
//         // handleLocalizaion(currentLang);
//         toggleLayer();
//     });
// }

$.fn.handleNav = function() {
    var $topnavLinks = $('.top-nav__link');
    var $footerLinks = $('.footer-link');
    var $mobileToggle = $('.mobile-nav-toggle');
    var $openIcon = $('.-open', $mobileToggle);
    var $closeIcon = $('.-close', $mobileToggle);
    var $mobileNav = $('.top-nav__menu');

    $mobileToggle.click(function(e) {
        if ($(this).hasClass('-open')) {
            $closeIcon.hide();
            $openIcon.show();
            $(this).removeClass('-open');
            $mobileNav.hide();
        } else {
            $closeIcon.show();
            $openIcon.hide();
            $(this).addClass('-open');
            $mobileNav.show();
        }
    })

    function scrollToElement(clickedElement) {
        var idAttr = '#' + clickedElement.attr('data-scroll-to');
        //console.log(idAttr);
        $([document.documentElement, document.body]).animate({
            scrollTop: $(idAttr).offset().top - 80
        }, 800);
    }

    $topnavLinks.click(function(e) {
        e.preventDefault();
        scrollToElement($(this));
    });
    $footerLinks.click(function(e) {
        e.preventDefault();
        scrollToElement($(this));
    });
}

$.fn.fadeOnScroll = function() {
    console.log($(this));
    var $element = $(this);
    var $win = $(window);
    // var $countdown = $('#countdownContainer');
    $(window).scroll(function(){
        // console.log($countdown.offset().top - $win.scrollTop());
        // if ($countdown.offset().top - $win.scrollTop() < 300) {
        //     $countdown.css('transform','translateX(0)');
        // }
        $element.css({
            'opacity': 1 - $(window).scrollTop() / 400,
            // 'transform': 'translateY('+($win.scrollTop() - $element.offset().top) / -4+'px)'
        });
    });
}

$.fn.rotateGraphs = function() {
    var $leftGraph = $('.roadmap-graphs__svg.-left-graph'),
        $rightGraph = $('.roadmap-graphs__svg.-right-graph'),
        rotation = 0, 
        scrollLoc = $(document).scrollTop();
    $(window).scroll(function() {
        var newLoc = $(document).scrollTop();
        var diff = scrollLoc - newLoc;
        rotation += diff, scrollLoc = newLoc;
        var rotationStr = "rotate(" + rotation + "deg)";
        $leftGraph.css({
            "-webkit-transform": rotationStr,
            "-moz-transform": rotationStr,
            "transform": rotationStr
        });
        $rightGraph.css({
            "-webkit-transform": rotationStr,
            "-moz-transform": rotationStr,
            "transform": rotationStr
        });
    });
}

function doHeaderParallax() {
    console.log('ya?');
    var $win = $(window);
    $('div.home-parallax').each(function(){
        console.log($(this));
        var scroll_speed = 2;
        if ($(this).hasClass('header-bg-4')) {
            scroll_speed = 3;
        } else if ($(this).hasClass('header-bg-3')) {
            scroll_speed = 4;
        } else if ($(this).hasClass('header-bg-2')) {
            scroll_speed = 5;
        }
        var $this = $(this);
        $(window).scroll(function() {
            var bgScroll = (($win.scrollTop() - $this.offset().top) / scroll_speed);
            var layerPosition = bgScroll + 'px';
            //var bgPosition = '20% '+ bgScroll + 'px';
            $this.css({ transform: 'translateY(' + layerPosition + ')' });
        });
    });
}

$(function(){
    // $('.language-selector').localizr();
    $('body').handleNav();
    // $('.home-header-scroller').fadeOnScroll();
    $('.roadmap-graphs').rotateGraphs();

    
    doHeaderParallax();
});

$(document).ready(function(){
    $('#newsCarousel').slick({
        prevArrow: $('.news-carousel__nav.-previous'),
        nextArrow: $('.news-carousel__nav.-next'),
        slidesToShow: 2,
        responsive: [
            // {
            //     breakpoint: 1050,
            //     settings: {
            //       slidesToShow: 2,
            //     }
            // },
            {
                breakpoint: 815,
                settings: {
                  slidesToShow: 1,
                }
            }
        ]
    });
});
$.fn.initCountdown = function() {
    var $context = $(this),
        $counterDays = $('#counterDays',$context),
        $counterHours = $('#counterHours',$context),
        $counterMinutes = $('#counterMinutes',$context),
        $counterSeconds = $('#counterSeconds',$context),
        countDownDate = new Date("Jan 27, 2019 00:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();
    
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
    
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        // Display the result in the element with id="demo"
        $counterDays.text(days < 10 ? '0'+days : days);
        $counterHours.text(hours < 10 ? '0'+hours : hours);
        $counterMinutes.text(minutes < 10 ? '0'+minutes : minutes);
        $counterSeconds.text(seconds < 10 ? '0'+seconds : seconds);
    
        // If the count down is finished, write some text 
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}

$(function(){
    console.log('Hello Countdown!');
    console.log($);
    $('#countdownContainer').initCountdown();
});
var english = {
    topnavhowitworks: "How It Works",
    topnavfeatures: "Features",
    topnavtokensale: "Token Sale",
    topnavroadmap: "Roadmap",
    topnavvideos: "Videos",
    topnavteam: "Team",
    topnavtrytrue: "Try True",
    topnavwhitepaper: "Whitepaper",
    header: "Facebook can't be fixed, so we're going to replace it.",
    subheader: "Our mission is to create a better social community that focuses on authenticity, meaningful connections, and helping the world share their experiences in a meaningful way that respects thier privacy.",
    formbutton: "I'm Interested, Sign Me Up",
    presaleintro: "Pre Sale Starts In",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    learnmore: "Learn More",
    spinnertext: "Guaranteeing your discount...",
    signuptext: "Sign up to receive token sale updates & be the first to know about promotions & discounts.",
    formfirstname: "First Name",
    formlastname: "Last Name",
    formemail: "Email Address",
    formcurrencytype: "How would you like to invest?",
    formamount: "Amount Interested in Investing",
    formerror: "Please enter a first name, last name, and valid email address.",
    submissionerrormssg: "We couldn't validate your data. Please re-check your information and try again.",
    formbutton2: "Sign Me Up",
    success: "Success",
    successbody1: "Your 25% discount is now guaranteed. We’ll send an email to <email> with your discount code before the sale goes live.",
    successbody2: "Have a great day.",
    successbody3: "- The Team @ True",
    feature3header: "TRU Tokens",
    feature3body: "We're creating a new social media economy.Tru tokens will allow users to interact on social network with a built-in end-to-end decentralized privacy solution. User’s data will always be owned & governed by the user. Period.",
    feature1header: "The promise of social media to connect the whole world was a wonderful idea... but it has come at a cost.",
    feature1body: "In pursuit of growth at all costs, social media platforms have made you the product. The only way they can maintain this growth is through monetization of your personal data by intrusive data mining & harvesting techniques with no regards to privacy.",
    feature2header: "True has an honest data agreement guaranteed by blockchain.",
    feature2body: "Our users own and control access to their personal data powered by blockchain technology. We’re building a decentralized system that bakes privacy and trust into our core features.",
    feature4header: "Our users want TRUE!",
    feature4body: "True has already raised $10M in venture capital and is a real company with a real product with thousands of users using the application daily. We’re changing the paradigm to an honest solution that protects & safeguards users privacy & data from deep intrusive harvesting techniques & data mining.",
    howitworks: "How It Works",
    socialheader: "Why is Social Networking Broken?",
    socialsubheader: "The largest social media platforms have become surveillance empires that prepetually manipulate your attention, secretly harvest your personal data and influence your behavior in order to profit.",
    bigbrother: "Big Brother",
    bigbrother2: "Surveillance",
    privacy: "Privacy",
    privacy2: "Leaks",
    influence: "Influence",
    influence2: "Fake News",
    features: "Features",
    feature1: "Be Real",
    feature1body1: "True is about sharing genuine moments with your best friends.",
    feature1body2: "It’s not a place for news or political arguments, it's for connecting and staying in touch with the people you care most about.",
    feature2: "Stay True",
    feature2body1: "Social media has become a phony place. Fake news, fake friends and big brands paying for your eyeballs.",
    feature2body2: "We don't do that.",
    feature3: "Moments",
    feature3body1: "True is original content and real sharing by real people, with features you haven't seen before like Days - an automatic story built by your location and motion to share.",
    feature4: "Be Honest",
    feature4body1: "What's the best part about checking your feed? Updates from real friends.",
    feature4body2: "That's all we do.",
    feature5: "It's Free",
    feature5body1: "Live location sharing with total privacy controls are included for the first time in a social network to keep up and stay connected to the ones you love.",
    feature6: "Private & Safe",
    feature6body1: "Respect for privacy and sharing control are cornerstones of the user experience. Powerful controls allow you to be sure how you share and who sees your posts.",
    trytrue: "Try True & See The Difference",
    tokensalestage1: "Stage 1: 5M (Soft Cap)",
    tokensalestage2: "Current Stage: Private Pre-sale",
    tokensalestage3: "5M Allocated In Private Pre-Sale",
    tokensalestage4: "44M To Be Distributed In Public Sale",
    tokensalestage5: "STARTING PRICE: $0.20",
    tokensalestage6: "UPPER BOUND: TBD",
    theroadmap: "The Roadmap",
    theroadmap1: "DEC 2018",
    theroadmap2: "Private Pre-Sale",
    theroadmap3: "Q2 2019",
    theroadmap4: "Public Token Sale",
    theroadmap5: "Q4 2019",
    theroadmap6: "Testnet Launch",
    theroadmap7: "Q4 2019",
    theroadmap8: "Consensus Network Launch",
    theroadmap9: "Q1 2020",
    theroadmap10: "Integration with Wallets",
    theroadmap11: "Q2 2020",
    theroadmap12: "Phase 2 Launch",
    theroadmap13: "Q3 2020",
    theroadmap14: "Future Releases",
    distributionheader: "Token Distribution",
    distributionbullet1: "35% Crowds",
    distributionbullet2: "25% Foundation",
    distributionbullet3: "24% Corporation",
    distributionbullet4: "10% Reward Pool",
    distributionbullet5: "7% Teams & Advisors",
    distributionbullet6: "1% Transation Cost",
    proceedsheader: "Use of Proceeds",
    proceedsbullet1: "30% R&D Software",
    proceedsbullet2: "25% Ecosystem Development",
    proceedsbullet3: "20% Partnerships & Marketing",
    proceedsbullet4: "10% Reserve",
    proceedsbullet5: "10% Legal",
    proceedsbullet6: "5% Operations",  
    theteam: "The Team",
    footer: "© 2018 Hello Mobile Inc. All rights reserved."
}
$.fn.handlePhoneCarousel = function() {
    var $container = $(this),
        $phones = $('.phone-item',$container),
        delay = 3000,
        start = 1;
    
    function resetPhones() {
        $phones.each(function(i,e) {
            $(e).removeClass('phone-bring-to-front');
        })
    }

    function bringToFront() {
        $('.phone-'+start,$container).addClass('phone-bring-to-front');
        if (start === 5) {
            start = 1;
        } else {
            start = start+1;
        }
    }

    window.setInterval(function() {
        resetPhones();
        bringToFront();
    }, delay);

}


$(document).ready(function(){
    $('.phone-carousel').handlePhoneCarousel();
});
function handleLocalizaion(language) {
    var currentLang;
	var flag;
    $('.language-selector__item').each(function(i,e){
        $(e).removeClass('-active');
    });
    $('[data-language='+language+']').addClass('-active');
    //$('.language-selector__current span').text(language);
	
	// 
    if (language === 'EN') {
        currentLang = english;
		flag = "us";
    } else if (language === 'KO') {
        currentLang = korean;
		flag = "korea";
    } else if (language === 'RU') {
        currentLang = russian;
		flag = "russia";
    } else if (language === 'JP') {
        currentLang = japanese;
		flag = "japan";
    } else if (language === 'CH') {
        currentLang = chinese;
		flag = "china";
    }
    for (key in currentLang) {
        if (key === 'formfirstname' ||
            key === 'formlastname' ||
            key === 'formemail') {
                $('[data-text='+key+']').attr('placeholder', currentLang[key]);
        } else {
            $('[data-text='+key+']').text(currentLang[key]);
        }
    }
	$('.language-selector__current span').html('<img src="static/images/icons/'+ flag +'.png" class="flag" /> ' + language);
   
}

$.fn.localizr = function() {
    var $context = $(this),
        $current = $('.language-selector__current', $context),
        $arrow = $('.language-selector__arrow', $context),
        $layer = $('.language-selector__layer', $context),
        $languages = $('.language-selector__item', $context);

    function toggleLayer() {
        if ($layer.hasClass('-active')) {
            $arrow.removeClass('-active');
            $layer.removeClass('-active');
            $layer.hide();
        } else {
            $layer.show();
            setTimeout(function() {
                $arrow.addClass('-active');
                $layer.addClass('-active');
            },100)
        }
    }

    $current.click(function() {
        toggleLayer();
    });

    $languages.click(function(e) {
        e.preventDefault();
        var currentLang = $(e.target).data('language');
        localStorage.setItem('trueLanguage2',currentLang);
        handleLocalizaion(currentLang);
        toggleLayer();
    });
}

var getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

$(function(){
    console.log('Localizer');
    if (localStorage.getItem('trueLanguage')) {
        localStorage.removeItem('trueLanguage');
    }
    if (getParameterByName('lang')) {
        localStorage.setItem('trueLanguage2',getParameterByName('lang').toLocaleUpperCase());
        handleLocalizaion(getParameterByName('lang').toUpperCase());
    } else if (localStorage.getItem('trueLanguage2')) {
        handleLocalizaion(localStorage.getItem('trueLanguage2'));
    }
    $('.language-selector').localizr();
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

$.fn.handleSignup = function() {
    var $context = $(this),
        $overlay = $('.home-signup__overlay'),
        $button = $('.home-header__cta a'),
        $closeButton = $('.home-signup__close',$context),
        $entryPanel = $('.home-signup__form-entry',$context),
        $successPanel = $('.home-signup__form-success',$context),
        $firstName = $('#formFirstName',$context),
        $lastName = $('#formLastName',$context),
        $email = $('#formEmail',$context),
        $submit = $('#formSubmit',$context),
        $error = $('.home-signup__error',$context),
        $throbber = $('.home-signup__throbber',$context),
        $emailHolder = $('.home-signup__success-email');;

    var openSlider = function() {
        $overlay.fadeIn();
        $context.addClass('-active');
        $('body').css('overflow','hidden');
    }

    var closeSlider = function() {
        $context.removeClass('-active');
        $overlay.hide();
        $('body').css('overflow','visible');
    }

    $overlay.click(function() {
        closeSlider();
    });
    $closeButton.click(function() {
        closeSlider();
    });
    $button.click(function(e) {
        e.preventDefault();
        openSlider();
    });

    $entryPanel.fadeIn();
    $firstName.keyup(function(){
        $error.hide();
    })
    $lastName.keyup(function(){
        $error.hide();
    })
    $email.keyup(function(){
        $error.hide();
    })

    function submitForm() {
        debug = false;
	if(getParam('debug_post') == "Y") { debug = true; }
        postData = {
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            email: $email.val(),
            currency: $('#signupCurrency',$context).val(),
            range: $('#signupCurrencyRange',$context).val()
        }
       
        if(debug) console.log('form post data:');
        if(debug) console.log(postData);
	var urlstr = ""; 
  	for (var key in postData) { 
	   urlstr += escape(key) + "=" + escape(postData[key]) + "&";
	}
	urlstr += "debug_post=Y";
        if(debug) console.log('as URLARGS: ' + urlstr);

        var myUrl = $email.closest("form").prop("action");
        if(debug) console.log('myUrl=' + myUrl);
        window['SUBSCRIBE_SUCCESS']="";
        $.ajax({
            type: "POST",
            url: myUrl,
            data: postData,
            success: function(msg) {

                if(msg.indexOf($("#responseRegex").html()) >= 0) {
                    if(debug) console.log('GOT GOOD(' + $("#responseRegex").html() + ' from:');
                    if(debug) console.log(msg);
                    window['SUBSCRIBE_SUCCESS'] = 'Y';

                } else {
                    if(debug) console.log('GOT FAILURE from:');
                    if(debug) console.log(msg);

                    window['SUBSCRIBE_SUCCESS'] = 'N';
                }
                // console.log(msg);
                // alert("Form Submitted: " + msg);
            },
            error: function() {
                window['SUBSCRIBE_SUCCESS'] = 'N';
            }
        });



    };

    function validateForm() {
        if ($firstName.val() === '' ||
            $lastName.val() === '' ||
            $email.val() === '') {
            $error.show();
            return false;
        } else {
            $throbber.css('height',$entryPanel.outerHeight() + 'px');
            $throbber.show();

            var isGood = submitForm();

            displayResultOfSubscribe();
            /*
             window.setTimeout(function() {
             $entryPanel.hide();
             $successPanel.show();
             $emailHolder.html($email.val());
             // localStorage.setItem('trueSignUpEmail',$email.val());
             },2000);
             */
            return true;
        }
    };
    

    console.log($context);

    $submit.click(function(e) {
        var debug = false;

        if(debug) console.log('submit.click occurs.');
        if(debug) console.log(e);

        e.preventDefault();

        var rv = validateForm();
        if(debug) console.log('after validateForm');
        if(rv) {
            return true;
        } else {
            return false;
        }
    })
}

function displayResultOfSubscribe() {
    var debug = false;

    try { clearTimeout(window['_ST_displayResultOfSubscribe']); } catch(e) { }
    var myAnswer = window['SUBSCRIBE_SUCCESS'];
    if(myAnswer && (myAnswer != "") ) {
        if(debug) console.log('got myAnswer: ' + myAnswer);
        if(myAnswer == "Y") {
            window.setTimeout(function() {

                $('.home-signup__form-entry').hide();
                $('.home-signup__form-success').show();
                var successHtml =  $('.home-signup__form-success').html();
                successHtml = successHtml.replace("&lt;email&gt;", "<span class='home-signup__success-email'>" + $('#formEmail').val() + "</span>");
                //console.log('new text: ' + successHtml);
                $('.home-signup__form-success').html(successHtml);
                $('.home-signup__success-email').html($('#formEmail').val());
                // localStorage.setItem('trueSignUpEmail',$email.val());
                
                if(window.handleLeadConversion) {
                  //console.log('DO handleLeadConversion');
                  
                  handleLeadConversion($('#formEmail').val());
                } else {
                  //console.log('NO FUNC handleLeadConversion');
                }
                
            },1000);
        }
        else {
            window.setTimeout(function() {
				//html($("#submissionFailureMessage").html()).
                $('.home-signup__error').html($('#submissionErrorMssg').html()).show();
                $('.home-signup__form-entry').show();

                $('.home-signup__throbber').hide();
                // $('.home-signup__form-failure').show();
            },1000);
        }
    } else {
        if(debug) console.log('no result yet. try again shortly.');

        window['_ST_displayResultOfSubscribe'] = setTimeout(displayResultOfSubscribe,100);
    }
}

$.fn.handleCurrency = function(currencyOption) {
    var $context = $(this),
        $currencySelector = $('#signupCurrency',$context),
        $currencyRangeContainer = $('#rangeContainer',$context);
    var usdOptions = [
        {
            value: '< 100',
            label: '< $100',
        },
        {
            value: '100-1000',
            label: '$100 - $1,000',
        },
        {
            value: '1000-10000',
            label: '$1,000 - $10,000',
        },
        {
            value: '10000-50000',
            label: '$10,000 - $50,000',
        },
        {
            value: '50000+',
            label: '$50,000 +',
        }
    ];
    var euroOptions = [
        {
            value: '< 90',
            label: '< €90',
        },
        {
            value: '90-900',
            label: '€90 - €900',
        },
        {
            value: '900-9000',
            label: '€900 - €9,000',
        },
        {
            value: '9000-45000',
            label: '€9,000 - €45,000',
        },
        {
            value: '45000+',
            label: '€45,000 +',
        }
    ];
    var yenOptions = [
        {
            value: '< 10000',
            label: '< ¥10,000',
        },
        {
            value: '10000-100000',
            label: '¥10,000 - ¥100,000',
        },
        {
            value: '100000-1000000',
            label: '¥100,000 - ¥1,000,000',
        },
        {
            value: '1000000-5000000',
            label: '¥1,000,000 - ¥5,000,000',
        },
        {
            value: '5000000+',
            label: '¥5,000,000 +',
        }
    ];
    var wonOptions = [
        {
            value: '< 110000',
            label: '< ₩110,000',
        },
        {
            value: '110000-1100000',
            label: '₩110,000 - ₩1,100,000',
        },
        {
            value: '1100000-11000000',
            label: '₩1,100,000 - ₩11,000,000',
        },
        {
            value: '11000000-55000000',
            label: '₩11,000,000 - ₩55,000,000',
        },
        {
            value: '55000000+',
            label: '₩55,000,000 +',
        }
    ];
    var rubOptions = [
        {
            value: '< 6000',
            label: '< ₽6,000',
        },
        {
            value: '6000-60000',
            label: '₽6,000 - ₽¥60,000',
        },
        {
            value: '60000-600000',
            label: '₽60,000 - ₽600,000',
        },
        {
            value: '600000-3000000',
            label: '₽600,000 - ₽3,000,000',
        },
        {
            value: '3000000+',
            label: '₽3,000,000 +',
        }
    ];
    var yuanOptions = [
        {
            value: '< 700',
            label: '< ¥700',
        },
        {
            value: '700-7000',
            label: '¥700 - ¥7,000',
        },
        {
            value: '7000-70000',
            label: '¥7,000 - ¥70,000',
        },
        {
            value: '70000-350000',
            label: '¥70,000 - ¥350,000',
        },
        {
            value: '350000+',
            label: '¥350,000 +',
        }
    ];

    function updateCurrencyOptions(currency) {
        var looper = [];
        if (currency === 'USD') {
            looper = usdOptions;
        } else if (currency === 'EURO') {
            looper = euroOptions;
        } else if (currency === 'WON') {
            looper = wonOptions;
        } else if (currency === 'RUB') {
            looper = rubOptions;
        } else if (currency === 'YEN') {
            looper = yenOptions;    
        } else if (currency === 'YUAN') {
            looper = yuanOptions;    
        }
        // remove select
        $('#signupCurrencyRange',$context).remove();

        var $newSelect = $('<select id="signupCurrencyRange" name="MERGE5" class="home-signup__select"></select>');
        $currencyRangeContainer.append($newSelect);
        looper.forEach(function(amount,index) {
            var option;
            if (index === 0) {
                option = '<option selected="selected" value="'+ amount.value +'">'+ amount.label +'</option>';
            } else {
                option = '<option value="'+ amount.value +'">'+ amount.label +'</option>';
            }
            $newSelect.append(option);
        })
        

        window.setTimeout(function() {
            $('#signupCurrencyRange',$context).minimalect({
                placeholder: '',
                class_container: 'minict_wrapper signup-select -full'
            });
        })
    }

    $currencySelector.change(function(){
        $('#signupCurrencyRange',$context).minimalect('destroy');
        updateCurrencyOptions($(this).val());
    })

    updateCurrencyOptions(currencyOption);
}

$(function(){
    $('.home-signup').handleSignup();
    $('.home-signup__form').handleCurrency('USD');
    $("#signupCurrency").minimalect({
        placeholder: null,
        class_container: 'minict_wrapper signup-select -full'
    });
});