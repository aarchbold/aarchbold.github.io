$.fn.handleNewsletter=function(){function e(e){console.log("signs up for email service");var n="http://www.someurl.com/api/capture_email",o={email:e};$.post(n,JSON.stringify(o),function(){t.show(),l.hide()}).fail(function(e){t.hide(),l.show(),s.addClass("-error")})}var n=$(this),s=$(".newsletter-signup__input",n),o=$(".button__signup",n),t=$(".newsletter-signup__form.-success",n),l=$(".newsletter-signup__form.-fail",n);$(".newsletter-signup__spinner",n);console.log(s),console.log(o),console.log(t),console.log(l),o.click(function(n){n.preventDefault(),s.removeClass("-error"),e(s.val())})},$(function(){$(".newsletter-signup").handleNewsletter()});