// Blocks
const bodyElement = document.body;
const nav = document.querySelector(".nav");
const challengeToolboxWrapper = document.querySelector(".challenges-toolbox-wrapper");
const warningWindow = document.querySelector(".warning-window");

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
const createChallengeActions = document.querySelector(".pick-challenge-actions");
const challengeCreationSuccessDisplay = document.querySelector(".create-challenge-success");

const optimizeOverlay = document.querySelector(".optimize-challenge-overlay");
const optimizeChallengesContainer = document.querySelector(".optimize-challenge-overlay-container");

// Inputs
const challengeTypeInput = document.querySelectorAll(".challenge-types input");
const challengeSubtypeInput = document.querySelectorAll(".challenge-subtypes input");
const legendsInput = document.querySelectorAll(".pick-challenge-legends input");
const weaponsInput = document.querySelectorAll(".pick-challenge-weapons input");
const legendsLabel = document.querySelectorAll(".pick-challenge-legends label");
const weaponsLabel = document.querySelectorAll(".pick-challenge-weapons label");

// Elements, Validations, Control Variables and other stuff
// These are the bars from the Navigation Button (some transitions will be applied on them)
const topBar = document.querySelector(".top-bar");
const midBar = document.querySelector(".middle-bar");
const bottomBar = document.querySelector(".bottom-bar");

const scrollToTopElement = document.querySelector(".scroll-top");

const blurOverlay = document.querySelector(".blur-overlay");

const confirmationOverlay = document.querySelector(".confirmation-overlay");
const confirmationActionText = document.querySelector(".confirmation-action");
const confirmationYesBtn = document.querySelector(".confirmation-btn--yes");
const confirmationNoBtn = document.querySelector(".confirmation-btn--no");

const challengeDeleteCompletedBtn = document.querySelector(".challenges-delete-completed");
const challengeDeleteAllBtn = document.querySelector(".challenges-delete-all");
const headerNavButton = document.querySelector(".header-button");
const createChallengeButton = document.querySelector(".create-challenges-button-header");
const challengeToolboxBtn = document.querySelector(".challenges-toolbox");
const navChallengesLink = document.querySelector("#nav-link--challenges");

const navChallengesOptimize = document.querySelector("#nav-link--optimize");
const optimizeChallengeBackBtn = document.querySelector(".optimize-challenge-back-btn");
const optimizerAccordionBtns = document.getElementsByClassName("optimize-challenge-accordion-title");
const optimizerAccordionOption = document.getElementsByClassName("optimize-challenge-option--acordion");

const warningTextTop = document.querySelector(".warning-text-top");
const warningTextBottom = document.querySelector(".warning-text-bottom");

const createChallengeTextLink = document.querySelector(".create-challenge-link");
const createChallengeBackBtn = document.querySelector(".create-challenge-back-btn");

const submit = document.querySelector(".pick-challenge-submit");

let selectedItemsArray = [];
let selectedItem;
let challengeTypeSelected;
let challengeSubtypeSelected;
let isNavOpen;

// Arrays
// This array handle elements of the challenge creation visibility.
const createChallengeComponents = [challengePreview, blurOverlay];
// This array handle all the elements that somehow impact visibility (IE. Types, Subtypes, Grid to pick Weapons and Legends, etc.)
const divsArr = [challengeSubtypesWrapper, challengeSubtypeLegends, challengeSubtypeWeapons, legendsPick, weaponsPick];
// This array handle all the elements that have checkboxes.
const checkboxesArr = [challengeTypeInput, challengeSubtypeInput, legendsInput, weaponsInput];
// This array handle weaponTags that will be inputed on the function that formats the names of the weapon types.
const weaponTags = ["Assault", "Light", "Marksman", "Pistols", "Shotguns", "Sub", "Sniper", "Red"];
// This array handle the formatting of Weapon Classes names.
const weaponClasses = ["Assault Rifles", "Light Machine Guns", "Marksman", "Pistols", "Shotguns", "Sub Machine Guns", "Sniper Rifles", "Red Tier Weapons"];
// This array will be used to remove every keyword that we don't want to consider in the optimization process, such as challenge types, strings that are common to weapon types and so on.
const filterChallengesArray = [
  '',
  "Play",
  "Damage",
  "Kills",
  "Knockdowns",
  "with",
  "Weapons",
  "Rifles",
  "Machine",
  "Guns",
  "Tier"
];
// This array handle the bars from the navigation menu.
const navButtonBars = [topBar, midBar, bottomBar];
// This array handle the image sources from Legends.
const legendsImages = {
  ash: './assets/images/legends/ash.webp',
  ballistic: './assets/images/legends/ballistic.webp',
  bangalore: './assets/images/legends/bangalore.webp',
  bloodhound: './assets/images/legends/bloodhound.webp',
  catalyst: './assets/images/legends/catalyst.webp',
  caustic: './assets/images/legends/caustic.webp',
  crypto: './assets/images/legends/crypto.webp',
  fuse: './assets/images/legends/fuse.webp',
  gibraltar: './assets/images/legends/gibraltar.webp',
  horizon: './assets/images/legends/horizon.webp',
  lifeline: './assets/images/legends/lifeline.webp',
  loba: './assets/images/legends/loba.webp',
  maggie: './assets/images/legends/maggie.webp',
  mirage: './assets/images/legends/mirage.webp',
  newcastle: './assets/images/legends/newcastle.webp',
  octane: './assets/images/legends/octane.webp',
  pathfinder: './assets/images/legends/pathfinder.webp',
  rampart: './assets/images/legends/rampart.webp',
  revenant: './assets/images/legends/revenant.webp',
  seer: './assets/images/legends/seer.webp',
  valkyrie: './assets/images/legends/valkyrie.webp',
  vantage: './assets/images/legends/vantage.webp',
  wattson: './assets/images/legends/wattson.webp',
  wraith: './assets/images/legends/wraith.webp'
};

const weaponsImages = {
  assault: './assets/images/icons/weaponClasses/assault.svg',
  light: './assets/images/icons/weaponClasses/light.svg',
  marksman: './assets/images/icons/weaponClasses/marksman.svg',
  pistols: './assets/images/icons/weaponClasses/pistols.svg',
  shotguns: './assets/images/icons/weaponClasses/shotguns.svg',
  sub: './assets/images/icons/weaponClasses/sub.svg',
  sniper: './assets/images/icons/weaponClasses/sniper.svg',
  red: './assets/images/icons/weaponClasses/red.svg'
};

// Functions

const smoothScrollTop = block => block.scrollTo({ top: 0, behavior: "smooth" });

const toggleBorder = el => el.classList.toggle("pick-challenge--selected");

const resetBorder = arr => { 
  for (el of arr) el.classList.remove("pick-challenge--selected");
};

const showContent = content => content.classList.add("flex");

const addNoneClass = content => content.classList.add("none");

const addMultipleNoneClass = arr => arr.forEach(el => el.classList.add("none"));

const removeNoneClass = content => content.classList.remove("none");

const clearElements = elementsArr => {
  Array.from(elementsArr).forEach(el => {
    el.remove();
  });
};

const resetContentVisibility = arr => {
  for (el of arr) el.classList.remove("flex");
};

const uncheckAll = arr => {
  for (member of arr) {
    for (el of member) {
      el.checked = false;
    }
  }
};

const checkBiggestOccurrence = (arr, arrLength) => {
  const alreadyUsed = [];
  const countArray = [];

  for (let i = 0; i < arrLength; i++) {
    let count = 0;

    // This will prevent that an element gets checked two times, preventing duplicates.
    if (alreadyUsed.includes(arr[i])) continue;

    for (let j = 0; j < arrLength; j++) if (arr[i] === arr[j]) count++;
    // console.log(arr[i], count);

    alreadyUsed.push(arr[i]);
    countArray.push(count);
  }

  // If ANY element from countArray is bigger than 1, it means that the challenge appear more than one time, then it CAN BE optimized.
  for (element of countArray) if (element > 1) return [alreadyUsed, countArray];

  // If the check above fails, it means that there's no elements that appear more than one time, then it's impossible to optimize.
  return "noElementGreaterThanOne";
};

const showWarningWindow = (topText, bottomText) => {
  // topText is the warning and bottomText is some explanation about the warning.
  warningWindow.classList.add("warning-window--active");
  warningTextTop.textContent = topText;
  warningTextBottom.textContent = bottomText;

  setTimeout(() => {
    warningWindow.classList.remove("warning-window--active");
  }, 3800);
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
  weapon = weapon.toLowerCase();

  if (weapon === "assault") return weaponClasses[0];
  if (weapon === "lmg" || weapon === "light") return weaponClasses[1];
  if (weapon === "marksman") return weaponClasses[2];
  if (weapon === "pistols") return weaponClasses[3];
  if (weapon === "shotguns") return weaponClasses[4];
  if (weapon === "smg" || weapon === "sub") return weaponClasses[5];
  if (weapon === "sniper") return weaponClasses[6];
  if (weapon === "specialwpn" || weapon === "red") return weaponClasses[7];
};

const generateChallengeText = () => {
  const subtype = formatSubtypeText(challengeSubtypeSelected);

  // 1. Legends | 2. Weapons

  if (challengeTypeSelected === 1) {
    const [selection1, selection2, selection3] = [formatLegendNames(selectedItemsArray[0]), formatLegendNames(selectedItemsArray[1]), formatLegendNames(selectedItemsArray[2])];

    const phrase = `${subtype} with ${selection1}, ${selection2}, ${selection3}.`;

    return phrase;
  }

  if (challengeTypeSelected === 2) {
    const weaponName = formatWeaponName(selectedItem.id);
    const phrase = `${subtype} with ${weaponName}.`;
    return phrase;
  }
};

const handlePreview = () => {
  const previewSubtype = formatSubtypeText(challengeSubtypeSelected);

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
    !selectedItem ? challengePreviewText.textContent = `${previewSubtype} with` : challengePreviewText.textContent = `${previewSubtype} with ${formatWeaponName(selectedItem.id)}.`;
  }
};

function handleSelection() {
  const borderElement = this.nextElementSibling;

  if (challengeTypeSelected === 2) {
    resetBorder(weaponsLabel);
    toggleBorder(borderElement);
    selectedItem = this;
    // console.log("Weapon Selection:");
    // console.log(selectedItem);
    handlePreview();
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

    elementParent.classList.toggle("challenges-created-border--completed");

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

    confirmationActionText.textContent = "Do you really want to delete this challenge?";

    bodyElement.classList.add("no-scroll");

    confirmationYesBtn.onclick = () => {
      element.classList.add("challenges-created--deleting");
      addNoneClass(confirmationOverlay);

      setTimeout(() => {
        element.remove();
        saveChallenges();
        checkChallengesCreatedState();
        bodyElement.classList.remove("no-scroll");
      }, 1200);
    }

    confirmationNoBtn.onclick = () => {
      addNoneClass(confirmationOverlay);
      bodyElement.classList.remove("no-scroll");
    }
  });
  challengeDiv.appendChild(challengeDeleteBtn);


  challengeDiv.appendChild(challengeText);
  if (challengeTypeSelected === 1) return createdChallengesLegends.appendChild(challengeDiv);
  if (challengeTypeSelected === 2) return createdChallengesWeapons.appendChild(challengeDiv);
};

const createOptimizerAccordion = (string, occurrence, eligibleArr) => {
  const accBtn = document.createElement("button");
  accBtn.classList.add("optimize-challenge-accordion-title", "mt30", "mb30");
  accBtn.addEventListener("click", () => {
    accBtn.classList.toggle("optimize-challenge-accordion-title--active");
  });

  const optimizerOccNumber = document.createElement("span");
  optimizerOccNumber.classList.add("optimize-challenge-occ");
  optimizerOccNumber.textContent = occurrence;

  weaponTags.includes(string) ? accBtn.textContent = formatWeaponName(string) : accBtn.textContent = string;

  const accWrapper = document.createElement("div");
  accWrapper.classList.add("optimize-challenge-option", "optimize-challenge-option--acordion");

  const accBanner = document.createElement("img");
  accBanner.classList.add("optimize-challenge-banner");
  if (weaponTags.includes(string)) {
    accBanner.src = weaponsImages[`${string.toLowerCase()}`];
  } else {
    accBanner.src = legendsImages[`${string.toLowerCase()}`];
  }

  const accSeparator = document.createElement("div");
  accSeparator.classList.add("separator");

  const accChallengesDisplay = document.createElement("div");
  accChallengesDisplay.classList.add("optimize-challenge-display-challenges");

  const accChallengesDisplayTitle = document.createElement("p");
  accChallengesDisplayTitle.classList.add("text-center");
  accChallengesDisplayTitle.textContent = "Challenges:";

  accBtn.appendChild(optimizerOccNumber);
  optimizeChallengesContainer.appendChild(accBtn);
  accChallengesDisplay.appendChild(accChallengesDisplayTitle);
  accWrapper.append(accBanner, accSeparator, accChallengesDisplay);
  optimizeChallengesContainer.appendChild(accWrapper);

  Array.from(eligibleArr).forEach(el => {
    const challengeText = el.children[3].textContent;

    if (challengeText.includes(string)) {
      const challengeCardDiv = document.createElement("div");

      const challengeCompleteOverlay = document.createElement("div");
      challengeCompleteOverlay.classList.add("challenges-created--completed", "none");
      challengeCompleteOverlay.textContent = "CHALLENGE COMPLETE!";

      const challengeCompleteBtn = document.createElement("button");
      challengeCompleteBtn.classList.add("challenges-created-complete-btn");
      challengeCompleteBtn.onclick = () => {
        const parentElement = challengeCompleteBtn.parentElement;
        const mainPageChallengeCompleteOverlay = el.children[1];

        if (parentElement.getAttribute("challengecomplete") === "true") {
          parentElement.setAttribute("challengecomplete", "false");
          el.setAttribute("challengecomplete", "false");
          addNoneClass(challengeCompleteOverlay);
          addNoneClass(mainPageChallengeCompleteOverlay);
          saveChallenges();
          checkChallengesCreatedState();
          return;
        }

        parentElement.setAttribute("challengecomplete", "true");
        el.setAttribute("challengecomplete", "true");
        removeNoneClass(el.children[1]);
        removeNoneClass(challengeCompleteOverlay);
        saveChallenges();
        optimizeChallenges();
        checkChallengesCreatedState();
      }

      const challengeDeleteBtn = document.createElement("button");
      challengeDeleteBtn.classList.add("challenges-created-delete");
      challengeDeleteBtn.onclick = () => {
        const parentElement = challengeDeleteBtn.parentElement;
        parentElement.remove();
        el.remove();
        saveChallenges();
        optimizeChallenges();
      }

      challengeCardDiv.classList.add("optimize-challenge-card", "text-center");
      challengeCardDiv.textContent = challengeText;
      challengeCardDiv.append(challengeCompleteOverlay, challengeCompleteBtn, challengeDeleteBtn);
      accChallengesDisplay.appendChild(challengeCardDiv);
    }
  });
};

const optimizeChallenges = () => {
  const accordionHeights = [];
  const challengeOccurrenceArray = [];
  const eligibleChallenges = Array.from(challengesCreated).filter(el => {
    if (el.getAttribute("challengecomplete") === "false") return el;
  });

  clearElements(optimizerAccordionBtns);
  clearElements(optimizerAccordionOption);

  // If there's ONE or ZERO challenges:
  if (eligibleChallenges.length < 2) {
    bodyElement.classList.remove("no-scroll");
    optimizeOverlay.classList.remove("optimize-challenge-overlay--active");
    setTimeout(() => {
      blurOverlay.classList.remove("blur-overlay--active");
    }, 500);

    nav.classList.remove("nav--opened");
    navButtonBars.forEach(el => el.classList.remove("bar-animation"));
    isNavOpen = false;

    if (eligibleChallenges.length === 0) showWarningWindow("Can't optimize challenges.", "(There's no challenges to optimize.)");
    if (eligibleChallenges.length === 1) showWarningWindow("Can't optimize challenges.", "(Only one challenge exists.)");

    return;
  }

  for (el of eligibleChallenges) {
    let challengeText = el.children[3].textContent;
    challengeText = challengeText.replace(/[^a-zA-Z]+/g, ' ').split(" ");
    challengeText.forEach(el => {
      if (filterChallengesArray.includes(el)) return;
      challengeOccurrenceArray.push(el);
    });
  }

  const filteredOccurrenceArrs = checkBiggestOccurrence(challengeOccurrenceArray, challengeOccurrenceArray.length);

  // If all challenges are different:
  if (filteredOccurrenceArrs === "noElementGreaterThanOne") {
    nav.classList.remove("nav--opened");
    navButtonBars.forEach(el => el.classList.remove("bar-animation"));
    isNavOpen = false;

    blurOverlay.classList.remove("blur-overlay--active");
    optimizeOverlay.classList.remove("optimize-challenge-overlay--active");
    showWarningWindow("Can't optimize challenges.", "(Maybe all challenges are different?)");
    return;
  }

  nav.classList.remove("nav--opened");
  navButtonBars.forEach(el => el.classList.remove("bar-animation"));
  isNavOpen = false;

  optimizeOverlay.style.top = "0";
  blurOverlay.classList.add("blur-overlay--active");

  setTimeout(() => {
    optimizeOverlay.removeAttribute("style");
    optimizeOverlay.classList.add("optimize-challenge-overlay--active");
  }, 500);

  const filteredOccurrenceNames = filteredOccurrenceArrs[0];
  const filteredOccurenceNumber = filteredOccurrenceArrs[1];

  const challengeArrObj = [];

  filteredOccurrenceNames.forEach((el, i) => {
    if (filteredOccurenceNumber[i] > 1) {

      const challengeObject = {
        challName: el,
        challOccurr: filteredOccurenceNumber[i]
      }

      challengeArrObj.push(challengeObject);
    }
  });

  challengeArrObj.sort(({ challOccurr: a }, { challOccurr: b }) => b - a);

  challengeArrObj.forEach(el => createOptimizerAccordion(el.challName, el.challOccurr, eligibleChallenges));

  // This will get the height of each accordion to calculate how many max-height they will need.
  Array.from(optimizerAccordionBtns).forEach(el => accordionHeights.push(el.nextElementSibling.offsetHeight));

  Array.from(optimizerAccordionBtns).forEach((el, index) => {
    const accordionPanel = el.nextElementSibling;
    accordionPanel.style.maxHeight = 0;

    el.addEventListener("click", () => {
      if (accordionPanel.style.maxHeight === "0px") {
        accordionPanel.style.maxHeight = accordionHeights[index] + "px";
      }
      else {
        accordionPanel.style.maxHeight = "0";
      }
    });
  });
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
    const challengeCreatedLastIndex = challengesCreated.length - 1;

    Array.from(challengesCreated).forEach(el => {
      if (el.getAttribute("challengecomplete") === "true") el.classList.add("challenges-created-border--completed");
    });

    Array.from(challengesCreated).forEach(el => el.classList.remove("mb85"));
    challengesCreated[challengeCreatedLastIndex].classList.add("mb85");

    createdChallengesWrapper.style.justifyContent = "flex-start";
    // If the second child from the element is undefined, that means that it doesn't exist, so we assume that there's no Challenge Created in this category, then it's safe to hide the Title until the user create a challenge.
    challengeCategories.forEach(el =>
      el.children[1] === undefined ? addNoneClass(el) : removeNoneClass(el)
    );
    addNoneClass(challengesCreatedNone);
  }
};

// Retrieve all the challenges (if any exist) and it's previous state when created.
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

// Events

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

// The next 3 events does the same: Open the challenge creation.
// 1. The + button on the mobile header.
// 2. The button link of the header (Desktop and Mobile)
// 3. The text-link that appears when there's no challenges created. It's not a good practice to present a problem to the user without a solution.
createChallengeButton.addEventListener("click", () => {
  createChallengeOverlay.style.top = "0";
  // blurOverlay.classList.add("blur-overlay--active");

  setTimeout(() => {
    createChallengeOverlay.removeAttribute("style");
    createChallengeOverlay.classList.add("create-challenge-overlay--active");
    bodyElement.classList.add("no-scroll");
    createChallengeActions.classList.add("pick-challenge-actions--active");
  }, 550);
});

navChallengesLink.addEventListener("click", () => {
  nav.classList.remove("nav--opened");
  isNavOpen = false;

  createChallengeOverlay.style.top = "0";
  // blurOverlay.classList.add("blur-overlay--active");

  setTimeout(() => {
    createChallengeOverlay.removeAttribute("style");
    createChallengeOverlay.classList.add("create-challenge-overlay--active");
    bodyElement.classList.add("no-scroll");
    createChallengeActions.classList.add("pick-challenge-actions--active");
  }, 550);
});

createChallengeTextLink.addEventListener("click", () => {
  createChallengeOverlay.style.top = "0";
  // blurOverlay.classList.add("blur-overlay--active");

  setTimeout(() => {
    createChallengeOverlay.removeAttribute("style");
    createChallengeOverlay.classList.add("create-challenge-overlay--active");
    bodyElement.classList.add("no-scroll");
    createChallengeActions.classList.add("pick-challenge-actions--active");
  }, 550);
});

createChallengeBackBtn.addEventListener("click", () => {
  selectedItemsArray = [];
  selectedItem = null;

  navButtonBars.forEach(el => el.classList.remove("bar-animation"));

  uncheckAll(checkboxesArr);
  resetContentVisibility(divsArr);
  createChallengeOverlay.classList.remove("create-challenge-overlay--active");

  addNoneClass(challengePreview);
  createChallengeActions.classList.remove("pick-challenge-actions--active");

  bodyElement.classList.remove("no-scroll");

  // setTimeout(() => {
  //   blurOverlay.classList.remove("blur-overlay--active");
  // }, 500);

  resetBorder(legendsLabel);
  resetBorder(weaponsLabel);

  checkChallengesCreatedState();
});

scrollToTopElement.addEventListener("click", smoothScrollTop.bind(null, createChallengeOverlay));

challengeToolboxBtn.addEventListener("click", () => challengeToolboxWrapper.classList.toggle("challenges-toolbox-wrapper--active"));

challengeDeleteAllBtn.addEventListener("click", () => {

  if (challengesCreated.length < 1) {
    challengeToolboxWrapper.classList.toggle("challenges-toolbox-wrapper--active");
    showWarningWindow("Can't delete challenges.", "(Try creating some challenges!)");
    return;
  }

  removeNoneClass(confirmationOverlay);
  confirmationActionText.textContent = "Do you really want to delete ALL challenges?";

  confirmationYesBtn.onclick = () => {
    Array.from(challengesCreated).forEach(el => {
      el.remove();
      saveChallenges();
      checkChallengesCreatedState();
      addNoneClass(confirmationOverlay);
    });
  }

  confirmationNoBtn.onclick = () => {
    addNoneClass(confirmationOverlay);
  }

  challengeToolboxWrapper.classList.toggle("challenges-toolbox-wrapper--active");

});

challengeDeleteCompletedBtn.addEventListener("click", () => {
  const completeChallenges = [];

  if (challengesCreated.length < 1) {
    challengeToolboxWrapper.classList.toggle("challenges-toolbox-wrapper--active");
    showWarningWindow("Can't delete challenges.", "(Try creating some challenges!)");
    return;
  }

  Array.from(challengesCreated).forEach(el => {
    if (el.getAttribute("challengecomplete") === "true") completeChallenges.push(el);
  });

  if (completeChallenges.length > 0) {
    for (challenge of completeChallenges) {
      challenge.remove();
      saveChallenges();
      checkChallengesCreatedState();
    }
  } else {
    showWarningWindow("Can't delete challenges.", "(All challenges are incomplete.)");
  }

  challengeToolboxWrapper.classList.toggle("challenges-toolbox-wrapper--active");
  return;
});

navChallengesOptimize.addEventListener("click", optimizeChallenges);

optimizeChallengeBackBtn.addEventListener("click", () => {
  clearElements(optimizerAccordionBtns);
  clearElements(optimizerAccordionOption);

  bodyElement.classList.remove("no-scroll");
  optimizeOverlay.classList.remove("optimize-challenge-overlay--active");
  checkChallengesCreatedState();

  setTimeout(() => {
    blurOverlay.classList.remove("blur-overlay--active");
  }, 500);
});

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
  resetBorder(legendsLabel);
  resetBorder(weaponsLabel);

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

challengeSubtypeInput.forEach(el => el.addEventListener("change", el => {
  const subtypeInput = el.target;
  const borderElement = subtypeInput.nextElementSibling.children[1];

  challengeSubtypeSelected = subtypeInput;

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

legendsInput.forEach(el => el.addEventListener("change", handleSelection));
weaponsInput.forEach(el => el.addEventListener("change", handleSelection));

submit.addEventListener("click", () => {
  const challengeText = generateChallengeText();
  createChallengeCard(challengeText);
  saveChallenges();

  addNoneClass(challengePreview);
  createChallengeActions.classList.remove("pick-challenge-actions--active");
  challengeCreationSuccessDisplay.classList.add("create-challenge-success--active");
  bodyElement.classList.remove("no-scroll");

  // Resets after the user creates the challenge
  setTimeout(() => {
    // blurOverlay.classList.remove("blur-overlay--active");
    createChallengeOverlay.classList.remove("create-challenge-overlay--active");
    uncheckAll(checkboxesArr);
    resetContentVisibility(divsArr);
    resetBorder(legendsLabel);
    resetBorder(weaponsLabel);
    navButtonBars.forEach(el => el.classList.remove("bar-animation"));
  }, 500);

  setTimeout(() => challengeCreationSuccessDisplay.classList.remove("create-challenge-success--active"), 2000);

  checkChallengesCreatedState();
});

checkChallengesCreatedState();