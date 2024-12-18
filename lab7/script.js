$(document).ready(function(){
    let gallery = $('.gallery');
    gallery.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite:true,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function updatePager() {
        let currentSlide = gallery.slick('slickCurrentSlide') + 1;
        let totalSlides = gallery.slick('getSlick').slideCount;
        $('.current-page').text(currentSlide);
        $('.total-pages').text(Math.ceil(totalSlides));
    }

    gallery.on('afterChange', (event, slick, currentSlide) => {
        updatePager();
    });

    updatePager();
});