$.fn.handleHero = function() {
    function setHeroHeight() {
        var $hero = $('#homeHero');
        $hero.height(window.innerHeight);
    }
    setHeroHeight();
    window.addEventListener('resize', setHeroHeight);
}


$(function(){    
    $('#homeHero').handleHero();
});