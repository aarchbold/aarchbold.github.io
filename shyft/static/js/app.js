window.shyft={curSlide:1},$.fn.handleFeatureSlides=function(){function e(e){console.log(e),s.attr("class",""),s.addClass("features-top -slide"+e),n.each(function(t,s){$(s).hide(),$(s).hasClass("features-controls__slide"+e)&&$(s).fadeIn()}),i.each(function(t,s){console.log($(s)),$(s).hide(),$(s).hasClass("features-slide"+e)&&($(".features-item").each(function(e,t){$(t).css("transform","translateY(100%)")}),$(s).show(),$(".features-item",$(s)).each(function(e,t){0===e?window.setTimeout(function(){$(t).css("transform","translateY(0)")},100):1===e?window.setTimeout(function(){$(t).css("transform","translateY(0)")},200):2===e&&window.setTimeout(function(){$(t).css("transform","translateY(0)")},300)}))})}var t=$(this),s=$(".features-top",t),n=$(".features-controls__text p",t),i=$(".feature-slide",t),o=$(".features-controls__prev",t),f=$(".features-controls__next",t);console.log(this),o.click(function(t){t.preventDefault(),1===window.shyft.curSlide?window.shyft.curSlide=3:window.shyft.curSlide=window.shyft.curSlide-1,e(window.shyft.curSlide)}),f.click(function(t){t.preventDefault(),3===window.shyft.curSlide?window.shyft.curSlide=1:window.shyft.curSlide=window.shyft.curSlide+1,e(window.shyft.curSlide)}),console.log(t.height())},$(function(){window.setTimeout(function(){$(".intro-shiffy").addClass("-show-shiffy").delay(500).queue(function(e){$(".intro-shiffy__quote").addClass("-animate"),$(),e()})},800),window.setTimeout(function(){$(".intro-shiffy__quote-text").show()},1600),$(".section-features").handleFeatureSlides(),$(window).resize(function(){})});