const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const progressBarFront = document.querySelector(".progress-bar-front");

const steps = document.querySelectorAll(".step");
const forms = document.querySelectorAll(".form");

let currentStep = 1;
let serviceBoolean = true;
let stylistBoolean = true;
let dateAndTimeBoolean = true;
let personalDate = true;
var membersServiceSelected = [];
var freeDate = false;

nextButton.addEventListener("click", () => {
  console.log(currentStep);
  if (currentStep == 1 && isServiceIsSelected()) {
    currentStep++;
    if (currentStep > steps.length) {
      currentStep = steps.length;
    }

    if (localStorage.getItem("salonMembersInfo")) {
      var salonMembers = JSON.parse(localStorage.getItem("salonMembersInfo"));
      var ServiceSelected = localStorage.getItem("ServiceSelected");

      var container = document.querySelector(".stylist-cards");
      for (var i = 0; i < salonMembers.length; i++) {
        var member = salonMembers[i];
        var services = member.services;
        var indexServ = services.indexOf(ServiceSelected);

        if (indexServ !== -1) {
          membersServiceSelected.push({
            stylistIndex: i,
            serviceIndex: indexServ,
            stylist: member,
          });

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

            var priceService = document.createElement("p");
            priceService.textContent =
              "Price is: " + salonMembers[index].prices[indexServ];
            priceService.className = "price-service";
            divStylist.appendChild(priceService);

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

  if (currentStep != 1) {
    serviceBoolean = false;
  }

  if (currentStep == 2 && isStylistIsSelected()) {
    currentStep++;
    if (currentStep > steps.length) {
      currentStep = steps.length;
    }
    updateProgress();
  }

  if (currentStep != 2) {
    stylistBoolean = false;
  }

  if (currentStep == 3 && isDateAndTimeSelected()) {
    saveAppointment();
    if (freeDate) {
      currentStep++;
      if (currentStep > steps.length) {
        currentStep = steps.length;
      }
      updateProgress();
    } else {
      alert(
        "The selected date and time are not available. Please choose another date or time."
      );
    }

    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
  }

  if (currentStep != 3) {
    dateAndTimeBoolean = false;
  }

  if (currentStep == 4 && isPersonalDate()) {
    currentStep++;
    if (currentStep > steps.length) {
      currentStep = steps.length;
    }
    savePersonalDate();
    updateProgress();
  }

  if (currentStep != 4) {
    personalDate = false;
  }
});

prevButton.addEventListener("click", () => {
  currentStep--;
  if (currentStep < 1) {
    currentStep = 1;
  }

  updateProgress();

  if (currentStep == 1) {
    membersServiceSelected = [];
    console.log(membersServiceSelected);
    serviceBoolean = true;

    var container = document.querySelector(".stylist-cards");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  if (currentStep == 2) {
    stylistBoolean = true;
  }

  if (currentStep == 3) {
    dateAndTimeBoolean = true;
  }
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
  if (serviceBoolean == true) {
    return cardSelected !== null;
  }
}

var cardSelectedStylist = null;
function selectStylist(id) {
  var stylistCards = document.querySelectorAll(".stylist");
  stylistCards.forEach(function (card) {
    card.classList.remove("selected");
  });

  cardSelectedStylist = document.getElementById(id);
  cardSelectedStylist.classList.add("selected");

  localStorage.setItem("StylistSelected", cardSelectedStylist.innerText);
  return cardSelectedStylist;
}
function isStylistIsSelected() {
  if (stylistBoolean == true) {
    return cardSelectedStylist !== null;
  }
}

// step 3
function isDateAndTimeSelected() {
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  return date !== "" && time !== "";
}

function saveAppointment() {
  var date = $("#date").val();
  var time = $("#time").val();
  var stylistFromLocal = localStorage.getItem("StylistSelected");
  if (stylistFromLocal) {
    let words = stylistFromLocal.split(" ");
    let name = words[0];
    var stylist = name;
  }

  var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  existingAppointment = appointments.find(
    (appointment) =>
      appointment.date === date &&
      appointment.time === time &&
      appointment.stylist === stylist
  );
  saveAppointmentBoolean = existingAppointment;

  if (existingAppointment) {
    console.log("Appointment already exists!");
  } else {
    appointments.push({
      date: date,
      time: time,
      stylist: stylist,
    });
    localStorage.setItem("appointments", JSON.stringify(appointments));
    console.log("Appointment saved successfully!");
    freeDate = true;
  }

  return existingAppointment;
}

$(function () {
  // check if hour is between 9AM and 9PM
  $.validator.addMethod(
    "validTimeInterval",
    function (value, element) {
      let hourDate = new Date("2000-01-01T" + value + ":00");
      let dayOfWeek = hourDate.getDay();
      let hourMinDate;
      let hourMaxDate;
      let errorMessage;

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        hourMinDate = new Date("2000-01-01T" + "09:00" + ":00");
        hourMaxDate = new Date("2000-01-01T" + "21:00" + ":00");
        errorMessage = "Please enter a valid time between 9:00 AM and 9:00 PM.";
      } else if (dayOfWeek === 6) {
        hourMinDate = new Date("2000-01-01T" + "10:00" + ":00");
        hourMaxDate = new Date("2000-01-01T" + "19:00" + ":00");
        errorMessage =
          "Please enter a valid time between 10:00 AM and 7:00 PM for Saturday.";
      } else {
        return false;
      }

      if (hourDate < hourMinDate || hourDate > hourMaxDate) {
        $.validator.messages.validTimeInterval = errorMessage;
        return false;
      }

      return true;
    },
    $.validator.format("Please enter a valid time.")
  );

  $.validator.addMethod(
    "isValidTime",
    function (value, element) {
      var allowedTimes = ["00"];
      var selectedTime = value.split(":");
      return allowedTimes.includes(selectedTime[1]);
    },
    "Please select a valid time. Exemple 14:00, 15:00 are allowed."
  );

  // check if date is a future date
  $.validator.addMethod(
    "isValidDate",
    function (value, element) {
      let selectedDate = new Date(value);
      let currentDate = new Date();
      return !isNaN(selectedDate) && selectedDate >= currentDate;
    },
    "Please select a date from the future."
  );

  // ckeck if date is not in weekends
  $.validator.addMethod(
    "notWeekends",
    function (value, element) {
      let selectedDate = new Date(value);
      let day = selectedDate.getUTCDay();
      return day !== 0; // 0 is Sunday
    },
    "Please select a date that is not Sunday."
  );

  $("#form-appointment").validate({
    rules: {
      date: {
        required: true,
        isValidDate: true,
        notWeekends: true,
      },
      time: {
        required: true,
        validTimeInterval: true,
        isValidTime: true,
      },
    },
    submitHandler: function (form) {},
  });
});

// step 4
function isPersonalDate() {
  var fullName = document.getElementById("fullName").value;
  var phone = document.getElementById("phone").value;
  return fullName !== "" && phone !== "";
}

function savePersonalDate() {
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;

  const userData = {
    fullName: fullName,
    phone: phone,
  };

  const userDataJSON = JSON.stringify(userData);
  localStorage.setItem("userData", userDataJSON);
}

$(function () {
  // check if is only letters in field
  $.validator.addMethod(
    "lettersOnly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
    },
    "Please enter letters only."
  );

  // check if is only digits in field
  $.validator.addMethod(
    "digitsOnly",
    function (value, element) {
      return this.optional(element) || /^\d+$/.test(value);
    },
    "Please enter digits only."
  );

  $("#form-personal-info").validate({
    rules: {
      fullName: {
        required: true,
        minlength: 3,
        lettersOnly: true,
      },
      phone: {
        required: true,
        minlength: 10,
        digitsOnly: true,
      },
    },
    messages: {
      phone: {
        minlength: "Phone number must be exactly 10 digits.",
      },
    },
    submitHandler: function (form) {},
  });
});
