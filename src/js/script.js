// Navigation hamburger
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
    autoplaySpeed: 1000,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
});

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const progressBarFront = document.querySelector(".progress-bar-front");

const steps = document.querySelectorAll(".step");
const forms = document.querySelectorAll(".form");

let currentStep = 1;

nextButton.addEventListener("click", () => {
  if (isServiceIsSelected()) {
    currentStep++;
    if (currentStep > steps.length) {
      currentStep = steps.length;
    }
    updateProgress();
  } else {
    document.getElementsByClassName(".message-error-service").textContent =
      "Please chose one service!";
  }
});

prevButton.addEventListener("click", () => {
  currentStep--;
  if (currentStep < 1) {
    currentStep = 1;
  }
  updateProgress();
});

function updateProgress() {
  steps.forEach((step, index) => {
    if (index < currentStep) {
      step.classList.add("checked");
    } else {
      step.classList.remove("checked");
    }
  });

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
  progressBarFront.style.width = `${progressPercentage}%`;

  prevButton.hidden = currentStep === 1;
  nextButton.textContent = currentStep === steps.length ? "Submit" : "Next";

  updateFormVisibility();
}
updateProgress();

function updateFormVisibility() {
  forms.forEach((form, index) => {
    form.style.display = index + 1 === currentStep ? "block" : "none";
  });
}

function selectService(id) {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    card.classList.remove("selected");
  });

  var cardSelected = document.getElementById(id);
  cardSelected.classList.add("selected");
  return cardSelected;
}
