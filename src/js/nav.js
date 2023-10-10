const nav = document.querySelector(".nav");

const bodyElement = document.body;

const topBar = document.querySelector(".top-bar");
const midBar = document.querySelector(".middle-bar");
const bottomBar = document.querySelector(".bottom-bar");
const headerNavButton = document.querySelector(".header-button");
const navChallengesLink = document.querySelector("#nav-link--challenges");
const navChallengesOptimize = document.querySelector("#nav-link--optimize");
let isNavOpen;

const navButtonBars = [topBar, midBar, bottomBar];

headerNavButton.addEventListener("click", () => {
  if (isNavOpen) {
    navButtonBars.forEach(el => el.classList.remove("bar-animation"));
    nav.classList.remove("nav--opened");
    isNavOpen = false;
    bodyElement.classList.remove("no-scroll");
    return;
  }

  navButtonBars.forEach(el => el.classList.add("bar-animation"));
  nav.classList.add("nav--opened");
  isNavOpen = true;
  bodyElement.classList.add("no-scroll");
});