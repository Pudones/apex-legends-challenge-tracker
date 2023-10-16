const nav = document.querySelector(".nav");

const bodyElement = document.body;

const topBar = document.querySelector(".top-bar");
const midBar = document.querySelector(".middle-bar");
const bottomBar = document.querySelector(".bottom-bar");
const navButtonBars = [topBar, midBar, bottomBar];

const headerNavButton = document.querySelector(".header-button");
const navChallengesLink = document.querySelector("#nav-link--challenges");
const navChallengesOptimize = document.querySelector("#nav-link--optimize");
const navLinksDropdown = document.querySelectorAll(".nav-li--dropdown");

let isNavOpen;
let isDropdownClicked;


headerNavButton.addEventListener("click", () => {
  if (isNavOpen) {
    navButtonBars.forEach(el => el.classList.remove("bar-animation"));
    nav.classList.remove("nav--opened");
    isNavOpen = false;
    bodyElement.classList.remove("no-scroll");

    navLinksDropdown.forEach(el => el.classList.remove("dropdown--active"));
    isDropdownClicked = false;
    return;
  }

  navButtonBars.forEach(el => el.classList.add("bar-animation"));
  nav.classList.add("nav--opened");
  isNavOpen = true;
  bodyElement.classList.add("no-scroll");
});

navLinksDropdown.forEach(el => el.addEventListener("click", () => {
  const clickedElement = el;

  if(isDropdownClicked) {
    isDropdownClicked = false;
    clickedElement.classList.remove("dropdown--active");
    clickedElement.classList.add("dropdown--inactive");
    return;
  }

  clickedElement.classList.remove("dropdown--inactive");
  clickedElement.classList.add("dropdown--active");
  isDropdownClicked = true;
}));