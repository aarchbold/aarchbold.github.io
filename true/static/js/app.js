$.fn.handleSignUp = function() {
    var $context = $(this);
    var $entryPanel = $('.home-signup__form-entry',$context),
        $successPanel = $('.home-signup__form-success',$context),
        $firstName = $('#formFirstName',$context),
        $lastName = $('#formLastName',$context),
        $email = $('#formEmail',$context),
        $submit = $('#formSubmit',$context),
        $error = $('.home-signup__error',$context),
        $throbber = $('.home-signup__throbber',$context),
        $emailHolder = $('.home-signup__success-email');
    
    if (localStorage.getItem('trueSignUpEmail')) {
        $emailHolder.html(localStorage.getItem('trueSignUpEmail'));
        $successPanel.fadeIn();
    } else {
        $entryPanel.fadeIn();
    }

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
        postData = {
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            email: $email.val(),
            currency: $('#signupCurrency',$context).val(),
            range: $('#signupCurrencyRange',$context).val()
        }
        console.log('form post data:');
        console.log(postData);
        
    };

    function validateForm() {
        if ($firstName.val() === '' ||
            $lastName.val() === '' ||
            $email.val() === '') {
            $error.show(); 
        } else {
            $throbber.css('height',$entryPanel.outerHeight() + 'px');
            $throbber.show();
            submitForm();
            window.setTimeout(function() {
                $entryPanel.hide();
                $successPanel.show();
                $emailHolder.html($email.val());
                localStorage.setItem('trueSignUpEmail',$email.val());
            },2000);
        }
    };
    

    console.log($context);

    $submit.click(function(e) {
        e.preventDefault();
        validateForm();
    })
}

$.fn.handleCurrency = function(currencyOption) {
    var $context = $(this),
        $currencySelector = $('#signupCurrency',$context),
        $currencyRangeContainer = $('#rangeContainer',$context);
    var usdOptions = [
        {
            value: '0-100',
            label: '$0 - $100',
        },
        {
            value: '100-1000',
            label: '$100 - $1,000',
        },
        {
            value: '1000-5000',
            label: '$1000 - $5,000',
        }
    ];
    var euroOptions = [
        {
            value: '0-100',
            label: '€0 - €100',
        },
        {
            value: '100-1000',
            label: '€100 - €1,000',
        },
        {
            value: '1000-5000',
            label: '€1000 - €5,000',
        }
    ];
    var yenOptions = [
        {
            value: '0-100',
            label: '¥0 - ¥100',
        },
        {
            value: '100-1000',
            label: '¥100 - ¥1,000',
        },
        {
            value: '1000-5000',
            label: '¥1000 - ¥5,000',
        }
    ];

    function updateCurrencyOptions(currency) {
        var looper = [];
        if (currency === 'USD') {
            looper = usdOptions;
        } else if (currency === 'EURO') {
            looper = euroOptions;
        } else if (currency === 'YEN') {
            looper = yenOptions;
        }
        // remove select
        $('#signupCurrencyRange',$context).remove();

        var $newSelect = $('<select id="signupCurrencyRange" class="home-signup__select"></select>');
        $currencyRangeContainer.append($newSelect);
        looper.forEach(function(amount,index) {
            var option;
            if (index === 0) {
                option = '<option selected="selected" value='+ amount.value +'>'+ amount.label +'</option>';
            } else {
                option = '<option value='+ amount.value +'>'+ amount.label +'</option>';
            }
            $newSelect.append(option);
        })
        

        window.setTimeout(function() {
            $('#signupCurrencyRange',$context).minimalect({
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
    console.log('Hello World!');
    console.log($);
    $("#signupCurrency").minimalect({
        placeholder: null,
        class_container: 'minict_wrapper signup-select -full'
    });

    $('.home-signup').handleSignUp();
    $('.home-signup__form').handleCurrency('USD');


    var $win = $(window);

    $('div.scrollerino').each(function(){
        var scroll_speed = 4;
        var $this = $(this);
        $(window).scroll(function() {
            var bgScroll = (($win.scrollTop() - $this.offset().top)/ scroll_speed);
            var bgPosition = '20% '+ bgScroll + 'px';
            $this.css({ backgroundPosition: bgPosition });
        });
    });
});
var english = {
    header: "Facebook can't be fixed, so we're going to replace it.",
    body1: "What the world needs now is a new generation social media platform that is fundamentally different in it’s incentives. A new kind of mobile community focused on authenticity, intimate sharing and personal data privacy.",
    body2: "Are you interested in supporting True?",
    body3: "Shortly, we’ll be launching the biggest token sale for a new social media platform in history, led by the biggest names in Silicon Valley.",
    body4: "We already have 2 million users, how would you like to share in our financial success?",
    contact: "Contact Us",
    footer: "Copyright 2018 Hello Mobile Inc.",
    signupheader: "Save 25%",
    signuptext: "Sign up today to stay updated and get the same 25% discount the VCs get when the sale goes live later in 2018.",
    formfirstname: "First Name",
    formlastname: "Last Name",
    formemail: "Email Address",
    formamount: "Amount Interested in Investing",
    formerror: "Please enter a first name, last name, and valid email address.",
    formbutton: "I'm Interested, Sign Me Up",
    success: "Success",
    successbody1: "Your 25% discount is now guaranteed. We’ll send an email to <email> with your discount code before the sale goes live.",
    successbody2: "Have a great day.",
    successbody3: "- The Team @ True"
}
var korea = {
    header: "페이스북의 문제점은 쉽게 고쳐질수 없습니다, 그래서 저희가 그 역활을 대신하고자 합니다.",
    body1: "지금 세계가 필요로 하는건 인센티브가 근본적으로 다른 새로운 세대의 소셜 미디어 플렛폼 입니다. 진실성, 친밀감 공유, 그리고 개인 사생활 자료를 초점으로 한 새로운 종류의 모빌 커뮤니티 (유동 공동체).",
    body2: "True (진실) 를 지지하는데 동참할 생각이 있으십니까?",
    body3: "곧 실리콘 밸리의 유명인사들이 이끄는 새로운 미디어 플렛폼을 위한 역사상 가장 큰 토큰 세일을 출시할 예정입니다.",
    body4: "저희는 벌써 이백만명의 회원이 가입되어 있습니다. 우리의 사업적 성공을 함께 나누시겠습니까?",
    contact: "고객 문의",
    footer: "Copyright 2018 Hello Mobile Inc.",
    signupheader: "25% 절약하세요",
    signuptext: "오늘 가입하시고 가장 최신정보를 받으세요.  그리고 2018년 후반부 세일이 시작될때 벤처사업 자본가들이(VCs) 받는 것과 똑같은 25%의 디스카운트를 받으세요.",
    formfirstname: "이름",
    formlastname: "성",
    formemail: "이메일 주소",
    formamount: "투자하고 싶으신 금액",
    formerror: "Please enter a first name, last name, and valid email address.",
    formbutton: "관심 있습니다. 가입하겠습니다.",
    success: "Success",
    successbody1: "Your 25% discount is now guaranteed. We’ll send an email to <email> with your discount code before the sale goes live.",
    successbody2: "Have a great day.",
    successbody3: "- The Team @ True"
}
function handleLocalizaion(langObj) {
    var currentLang;
    $('.language-selector__current span').text(langObj.short);
    if (langObj.full.toLowerCase() === 'english') {
        currentLang = english;
    } else if (langObj.full.toLowerCase() === 'korea') {
        currentLang = korea;
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
        var currentLang = {
            full: $(e.target).html(),
            short: $(e.target).data('language')
        }
        localStorage.setItem('trueLanguage',JSON.stringify(currentLang));
        handleLocalizaion(currentLang);
        toggleLayer();
    });
}

$(function(){
    console.log('Localizer');
    if (localStorage.getItem('trueLanguage')) {
        handleLocalizaion(JSON.parse(localStorage.getItem('trueLanguage')));
    }
    $('.language-selector').localizr();
});