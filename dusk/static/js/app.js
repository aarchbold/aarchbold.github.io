function scrollyStuff(){var o=0,t=$("html"),s=$(window),i=($(".home-feedback"),$(".main-footer"));$(".section-feedback__cta-slack"),$(".section-feedback__cta-twitter");t.hasClass("no-touch")?s.scroll(function(t){var s=$(this).scrollTop();s>o&&i.addClass("-show-footer"),s<50&&i.removeClass("-show-footer"),o=s}):($(window).on("scrollstop",_.debounce(function(t){var s=$(this).scrollTop();s>o?$(this).scrollTop()>200&&($("html").hasClass("iphone")?i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-40}):i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-130}),i.show()):$(this).scrollTop()>200&&($("html").hasClass("iphone")?i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-110}):i.css({opacity:1,top:$(window).height()+$(this).scrollTop()-130}),i.show()),o=s},100)),$(window).on("scrollstart",function(o){$(window).height()+$(this).scrollTop()<$("body").height()&&i.hide()}))}$.fn.moveIt=function(){var o=$(window),t=[];$(this).each(function(){t.push(new moveItItem($(this)))}),window.onscroll=function(){var s=o.scrollTop();t.forEach(function(o){o.update(s)})}};var moveItItem=function(o){this.el=$(o),this.speed=parseInt(this.el.attr("data-scroll-speed"))};moveItItem.prototype.update=function(o){var t=o/this.speed;this.el.css("transform","translateY("+-t+"px)")},$.fn.setSectionHeight=function(){function o(){i>=e?s.height(e):s.height(i+n)}var t=$(this),s=$(".main-hero",t),i=($(".section-dusk",t),$(window).height()),e=1080,n=($(".main-footer",t).height(),200);o(),$(window).on("resize",_.debounce(function(){o("main-hero")},500))},$.fn.scrolltoSection=function(){var o=$(this),t=$("html, body"),s=$("a[data-goto]",o),i=50;s.click(function(o){o.preventDefault();var s=$("section[data-target='"+$(this).data("goto")+"']");setTimeout(function(){t.stop(!0,!0).animate({scrollTop:s.offset().top-i},600)},50)})},$(function(){Modernizr.addTest("iphone",function(){return!!navigator.userAgent.match(/iPhone/i)}),$("html").hasClass("no-touch")?$("[data-scroll-speed]").moveIt():setTimeout(function(){window.scrollTo(0,1)},100),$(".main-footer").scrolltoSection(),scrollyStuff()});