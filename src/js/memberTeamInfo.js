var salonMembers = [
  {
    name: "Emily",
    imgName: "img/member-team/member1.jpg",
    info: ["4+", "10", "40+"],
    services: ["Women's cut", "Coloring", "Blowout", "Kid's cut"],
    prices: ["$ 30.0", "$ 50.0", "$ 20.0", "$ 10.0"],
  },
  {
    name: "John",
    imgName: "img/member-team/member2.jpg",
    info: ["3+", "9.55", "23+"],
    services: ["Men's cut", "Hot towel shave", "Beard trim", "Kid's cut"],
    prices: ["$ 25.0", "$ 25.5", "$ 10.0", "$ 15.0"],
  },
  {
    name: "Anne",
    imgName: "img/member-team/member3.jpg",
    info: ["2+", "8.55", "11+"],
    services: ["Women's cut", "Wash", "Beard trim", "Kid's cut"],
    prices: ["$ 25.0", "$ 15.5", "$ 15.0", "$ 10.0"],
  },
  {
    name: "Nicolas",
    imgName: "img/member-team/member4.jpg",
    info: ["6+", "10", "79+"],
    services: ["Men's cut", "Hot towel shave", "Beard trim", "Kid's cut"],
    prices: ["$ 40.0", "$ 35.5", "$ 15.0", "$ 15.0"],
  },
  {
    name: "Sofia",
    imgName: "img/member-team/member5.jpg",
    info: ["5+", "9.25", "21+"],
    services: ["Men's cut", "Coloring", "Beard trim", "Women's cut"],
    prices: ["$ 30.0", "$ 30.5", "$ 10.0", "$ 35.0"],
  },
  {
    name: "Raul",
    imgName: "img/member-team/member6.jpg",
    info: ["1+", "7.20", "12+"],
    services: ["Men's cut", "Wash", "Beard trim", "Kid's cut"],
    prices: ["$ 15.0", "$ 10.5", "$ 10.0", "$ 15.0"],
  },
];

function redirectToMemberInfo(index) {
  var selectedMemberInfo = salonMembers[index];

  var queryString =
    "?name=" +
    encodeURIComponent(selectedMemberInfo.name) +
    "&imgName=" +
    encodeURIComponent(selectedMemberInfo.imgName);

  window.location.href = "member-team.html" + queryString;
}

function showMemberInfo() {
  var urlParams = new URLSearchParams(window.location.search);
  var memberName = urlParams.get("name");
  var memberImgName = urlParams.get("imgName");

  document.getElementById("memberName").innerText = memberName || "";
  document.getElementById("memberImage").src = memberImgName || "";

  var selectedMember = salonMembers.find(
    (member) => member.name === memberName
  );

  if (selectedMember) {
    document.getElementById("experience").innerText =
      selectedMember.info[0] || "";
    document.getElementById("rating").innerText = selectedMember.info[1] || "";
    document.getElementById("satisfiedClients").innerText =
      selectedMember.info[2] || "";
    document.getElementById("service1").innerText =
      selectedMember.services[0] || "";
    document.getElementById("service2").innerText =
      selectedMember.services[1] || "";
    document.getElementById("service3").innerText =
      selectedMember.services[2] || "";
    document.getElementById("service4").innerText =
      selectedMember.services[3] || "";
    document.getElementById("price1").innerText =
      selectedMember.prices[0] || "";
    document.getElementById("price2").innerText =
      selectedMember.prices[1] || "";
    document.getElementById("price3").innerText =
      selectedMember.prices[2] || "";
    document.getElementById("price4").innerText =
      selectedMember.prices[3] || "";
  } else {
    console.error("Membrul nu a fost găsit în array-ul salonMembers.");
  }
}

showMemberInfo();
