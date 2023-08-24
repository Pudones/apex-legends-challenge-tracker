// Blocks
const bodyElement = document.body;
const overlay = document.querySelector(".create-challenge-overlay");
const challengeSubtypesWrapper = document.querySelector(".pick-challenge-subtype");
const challengeSubtypesNode = document.querySelectorAll(".challenge-subtypes");
const challengeSubtypeLegends = document.querySelector(".challenge-subtypes--legends");
const challengeSubtypeWeapons = document.querySelector(".challenge-subtypes--weapons");
const legendsPick = document.querySelector(".pick-challenge-legends");
const weaponsPick = document.querySelector(".pick-challenge-weapons");
const createdChallengesWrapper = document.querySelector(".challenges-wrapper");
const createdChallengesLegends = document.querySelector(".challenges--legends");
const createdChallengesWeapons = document.querySelector(".challenges--weapons");
const challengePreview = document.querySelector(".challenge-preview");
const challengePreviewText = document.querySelector(".challenge-preview-text");
const challengesCreated = document.getElementsByClassName("challenges-created");
const challengeDeleteBtnCollection = document.getElementsByClassName("challenges-created-delete");

// Inputs
const challengeTypeInput = document.querySelectorAll(".challenge-types input");
const challengeSubtypeInput = document.querySelectorAll(".challenge-subtypes input");
const legendsInput = document.querySelectorAll(".pick-challenge-legends input");
const weaponsInput = document.querySelectorAll(".pick-challenge-weapons input");

// Elements, Validations, Control Variables and other stuff
const blurOverlay = document.querySelector(".blur-overlay");
const confirmationOverlay = document.querySelector(".confirmation-overlay");
const confirmationYesBtn = document.querySelector(".confirmation-btn--yes");
const confirmationNoBtn = document.querySelector(".confirmation-btn--no");
const nav = document.querySelector(".nav");
const headerNavButton = document.querySelector(".header-button");
const navChallengesLink = document.querySelector("#nav-link--challenges");
const createChallengeTextLink = document.querySelector(".create-challenge-link");
const createChallengeBackBtn = document.querySelector(".create-challenge-back-btn");
const submit = document.querySelector(".pick-challenge-submit");

let selectedItemsArray = [];
let selectedItem;

let challengeTypeSelected;
let challengeSubtypeVar;

let isNavOpen;

// Arrays
// This array handle all the elements that somehow impact visibility (IE. Types, Subtypes, Grid to pick Weapons and Legends, etc.)
const divsArr = [challengeSubtypesWrapper, challengeSubtypeLegends, challengeSubtypeWeapons, legendsPick, weaponsPick];
// This array handle all the elements that have checkboxes.
const checkboxesArr = [challengeTypeInput, challengeSubtypeInput, legendsInput, weaponsInput];
// This array handle the formatting of Weapon Classes names.
const weaponClasses = ["Assault Rifles", "Light Machine Guns", "Marksman", "Pistols", "Shotguns", "Sub Machine Guns", "Sniper Rifles", "Red Tier Weapons"];



// Along the code, some conditionals will refer as type 1 and 2.
// The numbers mean: 1. Legends - 2. Weapons

headerNavButton.addEventListener("click", () => {
  if (isNavOpen) {
    nav.classList.remove("nav--opened");
    isNavOpen = false;
    bodyElement.classList.remove("no-scroll");
    return;
  }

  nav.classList.add("nav--opened");
  isNavOpen = true;
  bodyElement.classList.add("no-scroll");
});

// Handler for the click on the navbar that opens the challenge creation.
navChallengesLink.addEventListener("click", () => {
  nav.classList.toggle("nav--opened");
  overlay.classList.toggle("none");
  submit.classList.remove("block");
  document.body.classList.remove("no-scroll");
  blurOverlay.classList.remove("none");
  isNavOpen = false;
});
// Same as the above, but instead of the element being clicked be the link on the nav, it's a button that appears when there's no challenge created. It's not a good practice to "appoint problems" to the users without giving them a solution.
createChallengeTextLink.addEventListener("click", () => {
  overlay.classList.toggle("none");
  submit.classList.remove("block");
  document.body.classList.remove("no-scroll");
  blurOverlay.classList.remove("none");
});

createChallengeBackBtn.addEventListener("click", () => {
  selectedItemsArray = [];
  selectedItem = null;

  uncheckAll(checkboxesArr);
  resetContentVisibility(divsArr);
  overlay.classList.add("none");
  challengePreview.classList.add("none");
  blurOverlay.classList.add("none");

  checkChallengesCreatedState();
});

const toggleBorder = el => el.classList.toggle("--borderGreen");

const resetBorder = arr => {
  for (el of arr) el.nextElementSibling.children[1].classList.remove("--borderGreen");
};

const showContent = content => content.classList.add("flex");

const addNoneClass = content => content.classList.add("none");

const resetContentVisibility = arr => {
  for (el of arr) el.classList.remove("flex");
};

const uncheckAll = arr => {
  for (member of arr) {
    for (el of member) {
      el.nextElementSibling.children[1].classList.remove("--borderGreen");
      el.checked = false;
    }
  }
};

const formatSubtypeText = sub => {
  const subtypes = ["Play", "Damage", "Kills", "Knockdowns"];

  if (sub.id === "subtypePlay") return subtypes[0];
  if (sub.id === "subtypeDamage" || sub.id === "subtypeDamageWpn") return subtypes[1];
  if (sub.id === "subtypeKills" || sub.id === "subtypeKillsWpn") return subtypes[2];
  if (sub.id === "subtypeKnockdown" || sub.id === "subtypeKnockdownWpn") return subtypes[3];
};

const formatLegendNames = legend => {
  const legendString = legend.id;
  const firstLetter = legendString.charAt(0).toUpperCase();
  const remainder = legendString.slice(1);

  return firstLetter + remainder;
};

const formatWeaponName = weapon => {
  if (weapon.id === "assault") return weaponClasses[0];
  if (weapon.id === "lmg") return weaponClasses[1];
  if (weapon.id === "marksman") return weaponClasses[2];
  if (weapon.id === "pistols") return weaponClasses[3];
  if (weapon.id === "shotguns") return weaponClasses[4];
  if (weapon.id === "smg") return weaponClasses[5];
  if (weapon.id === "sniper") return weaponClasses[6];
  if (weapon.id === "specialwpn") return weaponClasses[7];
};

const generateChallengeText = () => {
  const subtype = formatSubtypeText(challengeSubtypeVar);

  // 1. Legends | 2. Weapons

  if (challengeTypeSelected === 1) {
    const [selection1, selection2, selection3] = [formatLegendNames(selectedItemsArray[0]), formatLegendNames(selectedItemsArray[1]), formatLegendNames(selectedItemsArray[2])];

    const phrase = `${subtype} with ${selection1}, ${selection2}, ${selection3}.`;

    return phrase;
  }

  if (challengeTypeSelected === 2) {
    const weaponName = formatWeaponName(selectedItem);

    const phrase = `${subtype} with ${weaponName}.`;

    return phrase;
  }
};

const handlePreview = () => {
  const previewSubtype = formatSubtypeText(challengeSubtypeVar);

  if (challengeTypeSelected === 1) {
    if (selectedItemsArray.length === 0)
      return challengePreviewText.textContent = `${previewSubtype} with`;

    if (selectedItemsArray.length === 1)
      return challengePreviewText.textContent = `${previewSubtype} with ${formatLegendNames(selectedItemsArray[0])}`;

    if (selectedItemsArray.length === 2)
      return challengePreviewText.textContent = `${previewSubtype} with ${formatLegendNames(selectedItemsArray[0])}, ${formatLegendNames(selectedItemsArray[1])}`;

    if (selectedItemsArray.length === 3)
      return challengePreviewText.textContent = `${previewSubtype} with ${formatLegendNames(selectedItemsArray[0])}, ${formatLegendNames(selectedItemsArray[1])}, ${formatLegendNames(selectedItemsArray[2])}.`;
  }

  if (challengeTypeSelected === 2) {
    !selectedItem ? challengePreviewText.textContent = `${previewSubtype} with` : challengePreviewText.textContent = `${previewSubtype} with ${formatWeaponName(selectedItem)}.`;
  }
};

function handleSelection() {
  const borderElement = this.nextElementSibling.children[1];

  if (challengeTypeSelected === 2) {
    resetBorder(weaponsInput);

    toggleBorder(borderElement);
    selectedItem = this;

    handlePreview();

    submit.classList.add("block");
    submit.scrollIntoView({ behavior: "smooth" });
    console.log("Weapon Selection:");
    console.log(selectedItem);
    return;
  }

  // If the Selection already has this element, remove it from the array (IE: Second click on a element)
  if (selectedItemsArray.includes(this)) {
    toggleBorder(borderElement);
    selectedItemsArray.splice(selectedItemsArray.indexOf(this), 1);
    handlePreview();
    return;
  }

  // If the Selection already has 3 elements, block the check on the 4th and inform the user.
  if (selectedItemsArray.length === 3) {
    this.checked = false;
    alert("Selection full!");
    return;
  }

  toggleBorder(borderElement);
  selectedItemsArray.push(this);

  handlePreview();

  // After 3 elements are selected, scroll to the Submit Button.
  if (selectedItemsArray.length === 3) {
    submit.classList.add("block");
    submit.scrollIntoView({ behavior: "smooth" });
  }
};

const createChallengeCard = challenge => {
  const challengeDiv = document.createElement("div");
  challengeDiv.classList.add("challenges-created");

  const challengeText = document.createElement("p");
  challengeText.classList.add("challenges-created-text");
  challengeText.textContent = challenge;

  const challengeCompleteBtn = document.createElement("button");
  challengeCompleteBtn.classList.add("challenges-created-complete-btn");
  challengeCompleteBtn.addEventListener("click", el => {
    el.target.nextElementSibling.classList.remove("none");

  });
  challengeDiv.appendChild(challengeCompleteBtn);


  const challengeCompleteOverlay = document.createElement("div");
  challengeCompleteOverlay.classList.add("challenges-created--completed", "none");
  challengeDiv.appendChild(challengeCompleteOverlay);


  const challengeDeleteBtn = document.createElement("button");
  challengeDeleteBtn.classList.add("challenges-created-delete");
  challengeDeleteBtn.addEventListener("click", el => {
    const element = el.target.parentNode;
    confirmationOverlay.classList.remove("none");

    confirmationYesBtn.onclick = () => {
      element.remove();
      saveChallenges();
      checkChallengesCreatedState();
      confirmationOverlay.classList.add("none");
    }

    confirmationNoBtn.onclick = () => confirmationOverlay.classList.add("none");
  });
  challengeDiv.appendChild(challengeDeleteBtn);


  challengeDiv.appendChild(challengeText);
  if (challengeTypeSelected === 1) createdChallengesLegends.appendChild(challengeDiv);
  if (challengeTypeSelected === 2) createdChallengesWeapons.appendChild(challengeDiv);
};

const saveChallenges = () => {
  const getChallengesText = document.getElementsByClassName("challenges-created-text");
  const savedChallenges = [];
  // console.log(getChallengesText);

  Array.from(getChallengesText).forEach(el => savedChallenges.push(el.innerText));

  const challengesJSON = JSON.stringify(savedChallenges);

  localStorage.setItem("apexChallengesJSON", challengesJSON);
};

// This function handles if the "No Challenges" text will appear
const checkChallengesCreatedState = () => {
  const challengeCategories = [createdChallengesLegends, createdChallengesWeapons];
  const challengesCreatedNone = document.querySelector(".no-challenges-created");

  if (challengesCreated.length === 0) {
    createdChallengesWrapper.style.justifyContent = "center";
    challengeCategories.forEach(el => el.classList.add("none"));
    challengesCreatedNone.classList.remove("none");
  } else {
    createdChallengesWrapper.style.justifyContent = "flex-start";
    // If the second child from the element is undefined, that means that it doesn't exist, so we assume that there's no Challenge Created in this category, then it's safe to hide the Title until the user create a challenge.
    challengeCategories.forEach(el =>
      el.children[1] === undefined ? el.classList.add("none") : el.classList.remove("none")
    );
    challengesCreatedNone.classList.add("none");
  }
};

// IIFE that will retrieve all the challenges previously created (if there's any)
(() => {
  const retrievedChallenges = JSON.parse(localStorage.getItem("apexChallengesJSON"));
  if (!retrievedChallenges) return;

  for (el of retrievedChallenges) {
    // If any string from weaponClasses Array is included in the Object of localStorage, return true and create the challenge based on the weapon types (challengeTypeSelected = 2)
    // Weapons are used to "filter" here, cause there's less weapon types than Legends.
    if (weaponClasses.some(weapon => el.includes(weapon))) {
      challengeTypeSelected = 2;
      createChallengeCard(el);
    }

    // Otherwise, will be a Legend Challenge.
    else {
      challengeTypeSelected = 1;
      createChallengeCard(el);
    }
  }
})();

/*
  The methodology behind the logic of the Event Listeners below, is that every time a element will be executed as an argument to a function, first, we gotta reset the previous state so it will be "clean" before receiving the new stuff.
*/

// 1.
challengeTypeInput.forEach(el => el.addEventListener("change", el => {
  const typeInput = el.target;
  const borderElement = typeInput.nextElementSibling.children[1];
  const checkboxesArr = [challengeSubtypeInput, legendsInput, weaponsInput];
  const picksArr = [legendsPick, weaponsPick];

  // Resets (Emptying the selection array, reseting visual elements...)
  selectedItemsArray = [];
  selectedItem = null;
  uncheckAll(checkboxesArr);
  resetBorder(challengeTypeInput);
  resetContentVisibility(challengeSubtypesNode);
  resetContentVisibility(picksArr);
  addNoneClass(challengePreview);

  toggleBorder(borderElement);
  showContent(challengeSubtypesWrapper); // Just the title

  if (typeInput.id === "typeLegends") {
    challengeTypeSelected = 1;
    showContent(challengeSubtypeLegends);
  }

  if (typeInput.id === "typeWeapons") {
    challengeTypeSelected = 2;
    showContent(challengeSubtypeWeapons);
  }

  challengeSubtypesWrapper.scrollIntoView({ behavior: "smooth" });
}));

// 2.
challengeSubtypeInput.forEach(el => el.addEventListener("change", el => {
  const subtypeInput = el.target;
  const borderElement = subtypeInput.nextElementSibling.children[1];

  console.log(subtypeInput)
  challengeSubtypeVar = subtypeInput;

  challengePreview.classList.remove("none");

  resetBorder(challengeSubtypeInput);
  toggleBorder(borderElement);

  handlePreview();

  if (challengeTypeSelected === 1) {
    showContent(legendsPick);
    legendsPick.scrollIntoView({ behavior: "smooth" });
  }

  if (challengeTypeSelected === 2) {
    showContent(weaponsPick);
    weaponsPick.scrollIntoView({ behavior: "smooth" });
  }
}));

// 3
legendsInput.forEach(el => el.addEventListener("change", handleSelection));

weaponsInput.forEach(el => el.addEventListener("change", handleSelection));

submit.addEventListener("click", () => {
  const challengeText = generateChallengeText();

  createChallengeCard(challengeText);
  saveChallenges();

  // Resets after the user creates the challenge
  uncheckAll(checkboxesArr);
  resetContentVisibility(divsArr);
  overlay.classList.add("none");
  challengePreview.classList.add("none");
  blurOverlay.classList.add("none");

  checkChallengesCreatedState();
});

checkChallengesCreatedState();
