//selected Elements
let toggleMenu = document.querySelector(".toggleMenu");
let option = document.querySelector(".header  .option");
let showProfile = document.querySelector(".profile div");
let closeProfile = document.querySelector(
  ".header .menu .option .profile ul li:first-child"
);
let showLang = document.querySelector(".changLang > i");
let closeLang = document.querySelector(
  ".header .menu .option .changLang ul li:first-child"
);
let nav = document.querySelector(".nav-bar");
let select = document.querySelector(" .nav-bar .container .select");
let overlay = document.querySelectorAll(".landing .container ul li");
let images = document.querySelectorAll(".landing .container .images .image");

//header
toggleMenu.onclick = function () {
  this.classList.toggle("open");
  if (this.classList.item(5) == "open") {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
};

function showAndClose(show, close) {
  show.onclick = function () {
    this.classList.add("open");
    this.parentElement.parentElement.style.position = "static";
  };

  close.onclick = function () {
    this.parentElement.parentElement
      .querySelector(":first-child")
      .classList.remove("open");

    function ChangPositionAfter() {
      close.parentElement.parentElement.parentElement.style.position =
        "absolute";
    }
    setTimeout(ChangPositionAfter, 300);
  };
}

function removeClassOpen() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 767) {
    toggleMenu.classList.remove("open");
    showProfile.classList.remove("open");
    showLang.classList.remove("open");
    option.style.position = "static";
    document.body.style.overflowY = "auto";
  } else {
    if (
      showProfile.classList.item(4) !== "open" &&
      showLang.classList.item(7) !== "open"
    ) {
      option.style.position = "absolute";
    }
  }
}

showAndClose(showProfile, closeProfile);
showAndClose(showLang, closeLang);
window.addEventListener("resize", removeClassOpen);

//nav
select.onclick = function () {
  this.classList.toggle("open");
};

//landing
overlay[0].classList.add("active");
//change image
let index = 1;
let counter = setInterval(() => {
  overlay.forEach((element) => {
    element.classList.remove("active");
  });
  overlay[index].classList.add("active");
  if (index !== 0) {
    images[index].style.transform = "translateX(0%)";
    images[index].style.transition = "0.1s linear";
  } else {
    images.forEach((element, index) => {
      if (index !== 0) {
        element.style.transform = "translateX(100%)";
      }
    });
  }

  index++;

  if (index > overlay.length - 1) {
    index = 0;
  }
}, 10000);

let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");
let WidthContainer;
let lastScroll = "";
let countScroll = 0;

nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "Smooth";

  if (countScroll < 4) {
    countScroll++;
  }

  WidthContainer = document.querySelector(".container").offsetWidth;

  if (document.querySelector(".container").offsetWidth < 750) {
    WidthContainer = document.querySelector(".container").offsetWidth + 40;
  }

  scrollContainer.scrollLeft = scrollContainer.scrollLeft + WidthContainer;
  setTimeout((lastScroll = scrollContainer.scrollLeft), 600);

  backBtn.style.opacity = "1";
  backBtn.style.pointerEvents = "all";
  if (scrollContainer.scrollLeft >= WidthContainer * countScroll - 20) {
    nextBtn.style.opacity = "0.5";
    nextBtn.style.pointerEvents = "none";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "all";
  }
});

backBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "Smooth";

  if (countScroll > 0) {
    countScroll--;
  }

  WidthContainer = document.querySelector(".container").offsetWidth;

  if (document.querySelector(".container").offsetWidth < 750) {
    WidthContainer = document.querySelector(".container").offsetWidth + 40;
  }

  scrollContainer.scrollLeft -= WidthContainer;

  setTimeout((lastScroll = scrollContainer.scrollLeft), 600);

  nextBtn.style.opacity = "1";
  nextBtn.style.pointerEvents = "all";

  if (scrollContainer.scrollLeft <= 0) {
    backBtn.style.opacity = "0.5";
    backBtn.style.pointerEvents = "none";
  } else {
    backBtn.style.opacity = "1";
    backBtn.style.pointerEvents = "all";
  }
});

function editScroll() {
  setTimeout((lastScroll = scrollContainer.scrollLeft), 10);

  scrollContainer.style.scrollBehavior = "auto";
  WidthContainer = document.querySelector(".container").offsetWidth;

  if (document.querySelector(".container").offsetWidth < 750) {
    WidthContainer = document.querySelector(".container").offsetWidth + 40;
  }

  scrollContainer.scrollLeft =
    scrollContainer.scrollLeft - lastScroll + countScroll * WidthContainer;

  lastScroll = scrollContainer.scrollLeft;
}

window.addEventListener("resize", editScroll);
