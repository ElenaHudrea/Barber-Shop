// Slider hero
$(document).ready(function () {
  $(".slider-inner").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    autoplay: false,
    autoplay: true,
    autoplaySpeed: 1700,
    speed: 700,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
});
