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

// Back to top button
$(function () {
  $(".back-to-top").hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn(1);
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});

//Rating stars
const stars = document.querySelectorAll(".stars i");

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});

// Circle Progress Bar
$(function () {
  $("#form").addClass("active");
  const svgCircleBar = $(".radial-progress");
  $(svgCircleBar).find($(".complete")).removeAttr("style");
  $.validator.addMethod(
    "lettersOnly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
    },
    "Please enter letters only."
  );

  $("#form").validate({
    rules: {
      fullName: {
        required: true,
        minlength: 3,
        lettersOnly: true,
      },
      email: {
        required: true,
        email: true,
      },
      Review: {
        required: true,
      },
    },
    messages: {
      fullName: {
        minlength: "Please enter at least 3 characters.",
      },
    },
    submitHandler: function (form) {
      $("#circle-bar").prop("disabled", true);

      $(".radial-progress").toggleClass("active");
      $(".member").toggleClass("active");
      percent = $(svgCircleBar).data("percentage");
      radius = $(svgCircleBar).find("circle.complete").attr("r");
      circumference = 2 * Math.PI * radius;
      strokeDashOffset = circumference - (percent * circumference) / 100;
      $("#percentage-text").text(strokeDashOffset);

      $(svgCircleBar)
        .find("circle.complete")
        .animate(
          { "stroke-dashoffset": strokeDashOffset },
          {
            duration: 3000,
            progress: function (promise, progress, ms) {
              $(".percentage").text(Math.round(progress * 100) + "%");
            },
            complete: function () {
              saveDataToLocalStorage();
              form.submit();
            },
          }
        );
    },
  });

  function saveDataToLocalStorage() {
    var fullName = $("#fullName").val();
    var email = $("#email").val();
    var rating = $(".stars").find(".active").length;
    var review = $("textarea[name='Review']").val();

    var existingData = JSON.parse(localStorage.getItem("formData"));
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    existingData.push({
      fullName: fullName,
      email: email,
      rating: rating,
      review: review,
    });

    localStorage.setItem("formData", JSON.stringify(existingData));
  }
});

$(function () {
  $("#form-contact").addClass("active");
  const svgCircleBar = $(".radial-progress");
  $(svgCircleBar).find($(".complete")).removeAttr("style");

  $.validator.addMethod(
    "lettersOnly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
    },
    "Please enter letters only."
  );

  $("#form-contact").validate({
    rules: {
      fullName: {
        required: true,
        minlength: 3,
        lettersOnly: true,
      },
      email: {
        required: true,
        email: true,
      },
      Message: {
        required: true,
      },
    },
    messages: {
      fullName: {
        minlength: "Please enter at least 3 characters.",
      },
    },
    submitHandler: function (form) {
      $("#circle-bar").prop("disabled", true);

      $(".radial-progress").toggleClass("active");
      $(".member").toggleClass("active");
      percent = $(svgCircleBar).data("percentage");
      radius = $(svgCircleBar).find("circle.complete").attr("r");
      circumference = 2 * Math.PI * radius;
      strokeDashOffset = circumference - (percent * circumference) / 100;
      $("#percentage-text").text(strokeDashOffset);

      $(svgCircleBar)
        .find("circle.complete")
        .animate(
          { "stroke-dashoffset": strokeDashOffset },
          {
            duration: 3000,
            progress: function (promise, progress, ms) {
              $(".percentage").text(Math.round(progress * 100) + "%");
            },
            complete: function () {
              saveDataToLocalStorage();
              form.submit();
            },
          }
        );
    },
  });

  function saveDataToLocalStorage() {
    var fullName = $("#fullName").val();
    var email = $("#email").val();
    var message = $("textarea[name='Message']").val();

    var existingData = JSON.parse(localStorage.getItem("formDataContact"));
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    existingData.push({
      fullName: fullName,
      email: email,
      message: message,
    });

    localStorage.setItem("formDataContact", JSON.stringify(existingData));
  }
});
