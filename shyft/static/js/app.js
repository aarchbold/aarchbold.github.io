window.shyft={curSlide:1},$.fn.handleFeatureSlides=function(){function t(){var t=$(window).height(),e=Math.floor($(window).height()/1.5);console.log("resize this guy"),console.log(Math.floor(e)),t>1200&&(t=1200),o.height(t+40),$(".features-item img").each(function(t,o){console.log($(o)),$(o).show(),$(o).height(e)})}function e(t){console.log(t),s.attr("class",""),s.addClass("features-top -slide"+t),i.each(function(e,o){$(o).hide(),$(o).hasClass("features-controls__slide"+t)&&$(o).fadeIn()}),n.each(function(e,o){console.log($(o)),$(o).hide(),$(o).hasClass("features-slide"+t)&&($(".features-item").each(function(t,e){$(e).css("transform","translateY(100%)")}),$(o).show(),$(".features-item",$(o)).each(function(t,e){0===t?window.setTimeout(function(){$(e).css("transform","translateY(0)")},100):1===t?window.setTimeout(function(){$(e).css("transform","translateY(0)")},200):2===t&&window.setTimeout(function(){$(e).css("transform","translateY(0)")},300)}))})}var o=$(this),s=$(".features-top",o),i=$(".features-controls__text p",o),n=$(".feature-slide",o),f=$(".features-controls__prev",o),a=$(".features-controls__next",o);console.log(this),f.click(function(t){t.preventDefault(),$("html, body").animate({scrollTop:o.offset().top+30},0),1===window.shyft.curSlide?window.shyft.curSlide=3:window.shyft.curSlide=window.shyft.curSlide-1,e(window.shyft.curSlide)}),a.click(function(t){t.preventDefault(),$("html, body").animate({scrollTop:o.offset().top+30},0),3===window.shyft.curSlide?window.shyft.curSlide=1:window.shyft.curSlide=window.shyft.curSlide+1,e(window.shyft.curSlide)}),t(),$(window).resize(function(){t()})},$(function(){window.setTimeout(function(){$(".intro-shiffy").addClass("-show-shiffy").delay(500).queue(function(t){$(".intro-shiffy__quote").addClass("-animate"),t()})},800),window.setTimeout(function(){$(".intro-shiffy__quote-text").show()},1600),$(".section-features").handleFeatureSlides(),$(window).resize(function(){})});