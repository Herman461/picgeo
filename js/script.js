const $popularSlider = $('.popular-slider');


$popularSlider.on('init reInit afterChange', function(event, slick) {
    console.log(slick.options.slidesToShow)
    if (slick.slideCount > slick.options.slidesToShow) {
        $('.popular .slick-list').css("padding-right", "10%")
    }
});


$popularSlider.slick({
    speed: 300,
    slidesToShow: 4,
    // infinite: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
})

