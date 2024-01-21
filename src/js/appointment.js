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

    // Verificăm dacă există informații în localStorage
    if (localStorage.getItem("salonMembersInfo")) {
      // Obținem informațiile din localStorage și le parsăm înapoi într-un array
      var salonMembers = JSON.parse(localStorage.getItem("salonMembersInfo"));
      var x = localStorage.getItem("ServiceSelected");
      // Cream un nou array pentru a stoca membrii care oferă serviciul "Wash"
      var membersServiceSelected = [];

      // Parcurgem fiecare membru din array
      for (var i = 0; i < salonMembers.length; i++) {
        // Verificăm dacă membrul oferă serviciul "Wash"
        if (salonMembers[i].services.includes(x)) {
          // Dacă da, adăugăm membrul în noul array
          membersServiceSelected.push(salonMembers[i]);
        }
      }

      // Afisăm în consolă membrii care oferă serviciul "Wash"
      console.log(membersServiceSelected);

      // Dacă dorești să salvezi noul array în localStorage, poți utiliza:
      // localStorage.setItem('membersWithWashService', JSON.stringify(membersWithWashService));
    } else {
      console.log("Nu există informații în localStorage.");
    }
    updateProgress();
  } else {
    errorServiceMessage.style.display = "block";
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

/////////////////////////////////////////////////
// function afiseazaStilisti() {
//   // Obțineți referința către containerul unde veți afișa informațiile despre stilisti
//   var stilistiContainer = document.getElementById("stilistiContainer");

//   // Obțineți serviciul selectat din local storage
//   var serviceSelectat = localStorage.getItem("ServiceSelected");

//   // Obțineți variabila salonMembers din local storage
//   var salonMembers = JSON.parse(localStorage.getItem("salonMembersInfo"));

//   // Verificați dacă există informații despre stilisti
//   if (salonMembers && Array.isArray(salonMembers)) {
//     // Curățați conținutul anterior din containerul stilisti
//     stilistiContainer.innerHTML = "";

//     // Găsiți membrii care oferă serviciul selectat
//     var membriCuServiciu = salonMembers.filter(function (membru) {
//       return membru.services.includes(serviceSelectat);
//     });

//     // Afișați informațiile despre membrii care oferă serviciul selectat
//     membriCuServiciu.forEach(function (membru) {
//       var cardElement = document.createElement("div");
//       cardElement.classList.add("card");

//       var imagineElement = document.createElement("img");
//       imagineElement.src = membru.imgName;
//       imagineElement.alt = membru.name;
//       imagineElement.classList.add("image-stylist");

//       var numeElement = document.createElement("p");
//       numeElement.textContent = membru.name;

//       // Adăugați restul informațiilor (serviciu, preț, etc.) în funcție de nevoile dvs.

//       // Adăugați cardElement la containerul stilisti
//       stilistiContainer.appendChild(cardElement);
//     });
//   } else {
//     console.log(
//       "Nu există informații despre stilisti sau este un format incorect."
//     );
//     return;
//   }

//   // Aici continuați cu restul codului...
//   // Curățați conținutul anterior, afișați stilisții, etc.
// }

// // Apelați funcția pentru a afișa stilistii
// afiseazaStilisti();
