// navigation hamburger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// FAQ
const items = document.querySelectorAll(".question");

function toggleAccordion() {
  this.classList.toggle("active");
  this.nextElementSibling.classList.toggle("active");
}
items.forEach((item) => item.addEventListener("click", toggleAccordion));

//  Testimonials
const swiper = new Swiper(".swiperCarousel", {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 10,
  keyboard: {
    enabled: true,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1280: {
      slidesPerView: 3,
      spaceBetweenSlides: 10,
    },
  },
});

const slides = document.getElementsByClassName("swiper-slide");

for (const slide of slides) {
  slide.addEventListener("click", () => {
    const { classList } = slide;
    if (classList.contains("swiper-slide-next")) {
      swiper.slideNext();
    } else if (classList.contains("swiper-slide-prev")) {
      swiper.slidePrev();
    }
  });
}

//Show section team
// Blog
$(function () {
  $(".show-more").text("Show more \u21E9");
  $(".show-more").click(function (e) {
    if ($(".show-section").is(":visible")) {
      $(".show-section").hide();
      $(".show-more").text("Show more \u21E9");
    } else {
      $(".show-section").show().css("margin-top", "4rem");
      $(".show-more").text("Show less \u21E7");
    }
  });
});
