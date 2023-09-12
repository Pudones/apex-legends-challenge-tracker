// Blocks
const bodyElement = document.body;
const createChallengeOverlay = document.querySelector(".create-challenge-overlay");
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
const optimizeOverlay = document.querySelector(".optimize-challenge-overlay");
const warningWindow = document.querySelector(".warning-window");

// Inputs
const challengeTypeInput = document.querySelectorAll(".challenge-types input");
const challengeSubtypeInput = document.querySelectorAll(".challenge-subtypes input");
const legendsInput = document.querySelectorAll(".pick-challenge-legends input");
const weaponsInput = document.querySelectorAll(".pick-challenge-weapons input");

// Elements, Validations, Control Variables and other stuff
// These are the bars from the Navigation Button (some transitions will be applied on them)
const topBar = document.querySelector(".top-bar");
const midBar = document.querySelector(".middle-bar");
const bottomBar = document.querySelector(".bottom-bar");

const blurOverlay = document.querySelector(".blur-overlay");
const confirmationOverlay = document.querySelector(".confirmation-overlay");

const confirmationYesBtn = document.querySelector(".confirmation-btn--yes");
const confirmationNoBtn = document.querySelector(".confirmation-btn--no");
const challengeDeleteCompletedBtn = document.querySelector(".challenges-delete-completed");
const nav = document.querySelector(".nav");
const headerNavButton = document.querySelector(".header-button");
const navChallengesLink = document.querySelector("#nav-link--challenges");

const navChallengesOptimize = document.querySelector("#nav-link--optimize");
const optimizeChallengeBackBtn = document.querySelector(".optimize-challenge-back-btn");
const warningTextBottom = document.querySelector(".warning-text-bottom");
const textInputOfOptimizedChallenge = document.querySelector(".optimize-challenge-title");
const optimizeBanner = document.querySelector(".optimize-challenge-banner");

const createChallengeTextLink = document.querySelector(".create-challenge-link");
const createChallengeBackBtn = document.querySelector(".create-challenge-back-btn");

const submit = document.querySelector(".pick-challenge-submit");

let selectedItemsArray = [];
let selectedItem;
let challengeTypeSelected;
let challengeSubtypeVar;
let isNavOpen;

// Arrays
// This array handle elements of the challenge creation visibility.
const createChallengeComponents = [createChallengeOverlay, challengePreview, blurOverlay];
// This array handle all the elements that somehow impact visibility (IE. Types, Subtypes, Grid to pick Weapons and Legends, etc.)
const divsArr = [challengeSubtypesWrapper, challengeSubtypeLegends, challengeSubtypeWeapons, legendsPick, weaponsPick];
// This array handle all the elements that have checkboxes.
const checkboxesArr = [challengeTypeInput, challengeSubtypeInput, legendsInput, weaponsInput];
// This array handle the formatting of Weapon Classes names.
const weaponClasses = ["Assault Rifles", "Light Machine Guns", "Marksman", "Pistols", "Shotguns", "Sub Machine Guns", "Sniper Rifles", "Red Tier Weapons"];
// This array handle the bars from the navigation menu.
const navButtonBars = [topBar, midBar, bottomBar];
// This array handle the image sources from Legends.
const legendsImages = {
  ash: './assets/images/legends/ash.png',
  ballistic: './assets/images/legends/ballistic.png',
  bangalore: './assets/images/legends/bangalore.png',
  bloodhound: './assets/images/legends/bloodhound.png',
  catalyst: './assets/images/legends/catalyst.png',
  caustic: './assets/images/legends/caustic.png',
  crypto: './assets/images/legends/crypto.png',
  fuse: './assets/images/legends/fuse.png',
  gibraltar: './assets/images/legends/gibraltar.png',
  horizon: './assets/images/legends/horizon.png',
  lifeline: './assets/images/legends/lifeline.png',
  loba: './assets/images/legends/loba.png',
  maggie: './assets/images/legends/maggie.png',
  mirage: './assets/images/legends/mirage.png',
  newcastle: './assets/images/legends/newcastle.png',
  octane: './assets/images/legends/octane.png',
  pathfinder: './assets/images/legends/pathfinder.png',
  rampart: './assets/images/legends/rampart.png',
  revenant: './assets/images/legends/revenant.png',
  seer: './assets/images/legends/seer.png',
  valkyrie: './assets/images/legends/valkyrie.png',
  vantage: './assets/images/legends/vantage.png',
  wattson: './assets/images/legends/wattson.png',
  wraith: './assets/images/legends/wraith.png'
}

// Along the code, some conditionals will refer as type 1 and 2.
// The numbers mean: 1. Legends - 2. Weapons

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

// Handler for the click on the navbar that opens the challenge creation.
navChallengesLink.addEventListener("click", () => {
  nav.classList.toggle("nav--opened");
  createChallengeOverlay.classList.toggle("none");
  submit.classList.remove("block");
  document.body.classList.remove("no-scroll");
  removeNoneClass(blurOverlay);
  isNavOpen = false;
});
// Same as the above, but instead of the element being clicked be the link on the nav, it's a button that appears when there's no challenge created. It's not a good practice to "appoint problems" to the users without giving them a solution.
createChallengeTextLink.addEventListener("click", () => {
  createChallengeOverlay.classList.toggle("none");
  submit.classList.remove("block");
  document.body.classList.remove("no-scroll");
  removeNoneClass(blurOverlay);
});

createChallengeBackBtn.addEventListener("click", () => {
  selectedItemsArray = [];
  selectedItem = null;

  navButtonBars.forEach(el => el.classList.remove("bar-animation"));

  uncheckAll(checkboxesArr);
  resetContentVisibility(divsArr);
  addMultipleNoneClass(createChallengeComponents);
  checkChallengesCreatedState();
});

challengeDeleteCompletedBtn.addEventListener("click", () => {

  Array.from(challengesCreated).forEach(el => {

    if (el.getAttribute("challengecomplete") === "true") {
      el.remove();
      saveChallenges();
      checkChallengesCreatedState();
    } else {
      return;
    }

  });

});

const optimizeOverlayWindow = document.querySelector(".optimize-challenge-overlay-container");

navChallengesOptimize.addEventListener("click", () => {
  optimizeOverlay.classList.add("optimize-challenge-overlay--active");

  const eligibleChallenges = [];
  const challengeOcurrenceArray = [];

  for (el of challengesCreated) {
    if (el.getAttribute("challengecomplete") === "false") eligibleChallenges.push(el);
  }

  if (eligibleChallenges.length < 2) {
    nav.classList.toggle("nav--opened");
    navButtonBars.forEach(el => el.classList.remove("bar-animation"));
    isNavOpen = false;

    addNoneClass(blurOverlay);
    addNoneClass(optimizeOverlay);

    if (eligibleChallenges.length === 0) warningTextBottom.textContent = "(There's no challenges)";
    if (eligibleChallenges.length === 1) warningTextBottom.textContent = "(Only one challenge exists)";
    
    warningWindow.classList.add("warning-window--active");

    setTimeout(() => {
      warningWindow.classList.remove("warning-window--active");
    }, 4000);

    return;
  }

  nav.classList.toggle("nav--opened");
  navButtonBars.forEach(el => el.classList.remove("bar-animation"));
  isNavOpen = false;
  removeNoneClass(blurOverlay);
  removeNoneClass(optimizeOverlay);

  for (el of eligibleChallenges) {
    let challengeText = el.children[3].textContent;

    challengeText = challengeText.replace(/[^a-zA-Z]+/g, ' ').split(" ");
    challengeText.forEach(el => {
      if (el === "Play" || el === "Damage" || el === "with" || el === '') return;
      challengeOcurrenceArray.push(el);
    });
  };

  // This variable holds the value of the return of the function below, either the element that appears more times or "false" if there's only ONE challenge created (becoming impossible to optimize)
  let challengeOcurrenceElement = checkBiggestOccurrence(challengeOcurrenceArray, challengeOcurrenceArray.length);

  if (challengeOcurrenceElement === false) {
    addNoneClass(blurOverlay);
    addNoneClass(optimizeOverlay);
    warningWindow.classList.add("warning-window--active");
    warningTextBottom.textContent = "(Maybe all challenges are different?)";

    setTimeout(() => {
      warningWindow.classList.remove("warning-window--active");
    }, 3800);

    return;
  }

  optimizeBanner.src = legendsImages[`${challengeOcurrenceElement.toLowerCase()}`];

  if (challengeOcurrenceElement === "maggie") {
    textInputOfOptimizedChallenge.textContent = "Mad Maggie";
    return;
  }

  textInputOfOptimizedChallenge.textContent = challengeOcurrenceElement;
});

optimizeChallengeBackBtn.addEventListener("click", () => {
  addNoneClass(blurOverlay);
  bodyElement.classList.remove("no-scroll");
  optimizeOverlay.classList.remove("optimize-challenge-overlay--active");
});

const toggleBorder = el => el.classList.toggle("--borderGreen");

const resetBorder = arr => {
  for (el of arr) el.nextElementSibling.children[1].classList.remove("--borderGreen");
};

const showContent = content => content.classList.add("flex");

const addNoneClass = content => content.classList.add("none");
const addMultipleNoneClass = arr => arr.forEach(el => el.classList.add("none"));
const removeNoneClass = content => content.classList.remove("none");

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

const checkBiggestOccurrence = (arr, arrLength) => {
  let maxCount = 0;
  let elementMostFrequent;

  for (let i = 0; i < arrLength; i++) {
    let count = 0;

    for (let j = 0; j < arrLength; j++) {
      if (arr[i] === arr[j]) count++;
    }

    if (count > maxCount) {
      maxCount = count;
      elementMostFrequent = arr[i];
    }
  }

  if (maxCount === 1) return false;

  // Otherwise, return the most frequent element in the array.
  return elementMostFrequent;
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
    const elementParent = el.target.parentNode;
    const elementCompleteOverlay = el.target.nextElementSibling;


    if (elementParent.getAttribute("challengecomplete") === "true") {
      elementParent.setAttribute("challengecomplete", "false");
      addNoneClass(elementCompleteOverlay);
      saveChallenges();
      return;
    };

    elementParent.setAttribute("challengecomplete", "true");
    removeNoneClass(elementCompleteOverlay);

    saveChallenges();
  });
  challengeDiv.appendChild(challengeCompleteBtn);

  challengeDiv.setAttribute("challengecomplete", "false");


  const challengeCompleteOverlay = document.createElement("div");
  challengeCompleteOverlay.classList.add("challenges-created--completed", "none");
  challengeCompleteOverlay.textContent = "CHALLENGE COMPLETED";
  challengeDiv.appendChild(challengeCompleteOverlay);


  const challengeDeleteBtn = document.createElement("button");
  challengeDeleteBtn.classList.add("challenges-created-delete");
  challengeDeleteBtn.addEventListener("click", el => {
    const element = el.target.parentNode;
    removeNoneClass(confirmationOverlay);

    confirmationYesBtn.onclick = () => {
      element.remove();
      saveChallenges();
      checkChallengesCreatedState();
      addNoneClass(confirmationOverlay);
    }

    confirmationNoBtn.onclick = () => addNoneClass(confirmationOverlay);
  });
  challengeDiv.appendChild(challengeDeleteBtn);


  challengeDiv.appendChild(challengeText);
  if (challengeTypeSelected === 1) return createdChallengesLegends.appendChild(challengeDiv);
  if (challengeTypeSelected === 2) return createdChallengesWeapons.appendChild(challengeDiv);
};

const saveChallenges = () => {
  const getChallengesText = document.getElementsByClassName("challenges-created-text");
  const savedChallenges = [];

  const getChallengesCompleteState = document.getElementsByClassName("challenges-created");
  const savedChallengesState = [];

  Array.from(getChallengesText).forEach(el => savedChallenges.push(el.innerText));
  Array.from(getChallengesCompleteState).forEach(el => savedChallengesState.push(el.getAttribute("challengecomplete")));

  const challengesJSON = JSON.stringify(savedChallenges);
  const challengesStateJSON = JSON.stringify(savedChallengesState);

  localStorage.setItem("apexChallengesJSON", challengesJSON);
  localStorage.setItem("apexChallengesStateJSON", challengesStateJSON);
};

// This function handles if the "No Challenges" text will appear
const checkChallengesCreatedState = () => {
  const challengeCategories = [createdChallengesLegends, createdChallengesWeapons];
  const challengesCreatedNone = document.querySelector(".no-challenges-created");

  if (challengesCreated.length === 0) {
    createdChallengesWrapper.style.justifyContent = "center";
    challengeCategories.forEach(el => addNoneClass(el));
    removeNoneClass(challengesCreatedNone);
  } else {
    createdChallengesWrapper.style.justifyContent = "flex-start";
    // If the second child from the element is undefined, that means that it doesn't exist, so we assume that there's no Challenge Created in this category, then it's safe to hide the Title until the user create a challenge.
    challengeCategories.forEach(el =>
      el.children[1] === undefined ? addNoneClass(el) : removeNoneClass(el)
    );
    addNoneClass(challengesCreatedNone);
  }
};

// IIFE that will retrieve all the challenges and it's state previously created (if there's any).
(() => {
  const retrievedChallenges = JSON.parse(localStorage.getItem("apexChallengesJSON"));
  const retrievedChallengesState = JSON.parse(localStorage.getItem("apexChallengesStateJSON"));

  if (!retrievedChallenges) return;

  retrievedChallenges.forEach((el, index) => {
    // If any string from weaponClasses Array is included in the Object of localStorage, return true and create the challenge based on the weapon types (challengeTypeSelected = 2)
    // Weapons are used to "filter" here, cause there's less weapon types than Legends, so it's easier.
    weaponClasses.some(weapon => el.includes(weapon)) ? challengeTypeSelected = 2 : challengeTypeSelected = 1;

    const challengeCreated = createChallengeCard(el);
    challengeCreated.setAttribute("challengecomplete", retrievedChallengesState[index]);

    if (challengeCreated.getAttribute("challengecomplete") === "true") removeNoneClass(challengeCreated.children[1]);
  })
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

  removeNoneClass(challengePreview);
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
  navButtonBars.forEach(el => el.classList.remove("bar-animation"));

  createChallengeComponents.forEach(el => addNoneClass(el));

  checkChallengesCreatedState();
});

checkChallengesCreatedState();