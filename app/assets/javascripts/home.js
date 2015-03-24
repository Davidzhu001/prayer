$(window).scroll(function () {

    if ($(this).scrollTop() > 1) {
        $('header').addClass("sticky");
        $('.logo').css('font-size', '0.5em');
        $('.menu').css('padding', '10px 0px');
        $('.menu a').css('font-size', '0.75em');
    } else {
        $('header').removeClass("sticky");
        $('.logo').css('font-size', '1em');
        $('.menu').css('padding', '30px 0px');
        $('.menu a').css('font-size', '1em');
    }
});