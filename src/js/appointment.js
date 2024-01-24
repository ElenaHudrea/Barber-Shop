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

    if (localStorage.getItem("salonMembersInfo")) {
      var salonMembers = JSON.parse(localStorage.getItem("salonMembersInfo"));
      var x = localStorage.getItem("ServiceSelected");
      var membersServiceSelected = [];

      var container = document.querySelector(".stylist-cards");
      for (var i = 0; i < salonMembers.length; i++) {
        if (salonMembers[i].services.includes(x)) {
          membersServiceSelected.push(salonMembers[i]);

          (function (index) {
            var divStylist = document.createElement("div");
            divStylist.className = "stylist";
            divStylist.id = "stylist-" + salonMembers[index].name.toLowerCase();
            divStylist.onclick = function () {
              selectStylist(
                "stylist-" + salonMembers[index].name.toLowerCase()
              );
            };

            var img = document.createElement("img");
            img.src = salonMembers[index].imgName;
            img.alt = salonMembers[index].name;
            img.className = "img-stylist";
            divStylist.appendChild(img);

            var nameStylist = document.createElement("p");
            nameStylist.textContent = salonMembers[index].name;
            divStylist.appendChild(nameStylist);

            container.appendChild(divStylist);
          })(i);
        }
      }
      console.log(membersServiceSelected);
    } else {
      console.log("Doesn't exist information in localStorage.");
    }
    updateProgress();
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

var cardSelected = null;
function selectService(id) {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    card.classList.remove("selected");
  });

  cardSelected = document.getElementById(id);
  cardSelected.classList.add("selected");

  localStorage.setItem("ServiceSelected", cardSelected.innerText);
  return cardSelected;
}
function isServiceIsSelected() {
  return cardSelected !== null;
}

var cardSelectedStylist = null;
function selectStylist(id) {
  var stylistCards = document.querySelectorAll(".stylist");
  stylistCards.forEach(function (card) {
    card.classList.remove("selected");
  });

  cardSelectedStylist = document.getElementById(id);
  cardSelectedStylist.classList.add("selected");

  // localStorage.setItem("StylistSelected", cardSelectedStylist.innerText);
  return cardSelectedStylist;
}
function isStylistIsSelected() {
  return cardSelectedStylist !== null;
}
