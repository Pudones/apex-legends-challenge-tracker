const legendsPick = document.querySelector(".pick-challenge-legends");
const challengeSubtypesWrapper = document.querySelector(".pick-challenge-subtype");
const challengeSubtypeLegends = document.querySelector(".challenge-subtypes--legends");
const challengeTypeInput = document.querySelectorAll(".challenge-types input");
const challengeSubtypeInput = document.querySelectorAll(".challenge-subtypes input");
const legendsInput = document.querySelectorAll(".pick-challenge-legends input");

const submit = document.querySelector(".pick-challenge-submit");

const overlay = document.querySelector(".create-challenge-overlay");

const navChallengesLink = document.querySelector("#nav-link--challenges");
navChallengesLink.addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("nav--opened");

  overlay.classList.toggle("none");
});

let arrayDeLendas = [];

uncheckAll = () => {
  arrayDeLendas = [];

  const inputs = [challengeTypeInput, challengeSubtypeInput, legendsInput];

  for (el of inputs) resetBorder(el);

  for (el of challengeSubtypeInput) el.checked = false;

  for (el of legendsInput) {
    el.checked = false;
    el.disabled = false;
  }
}

// Function to display elements
displayElement = el => el.classList.add("flex");

// Functions to handle border visibility in order to feedback the user selection.
applyBorder = el => el.nextElementSibling.children[1].classList.toggle("--borderGreen");
resetBorder = arr => arr.forEach(el => el.nextElementSibling.children[1].classList.remove("--borderGreen"));

resetAllElementsVisibility = () => {
  const toggleStylesArray = [legendsPick, challengeSubtypesWrapper, challengeSubtypeLegends];
  toggleStylesArray.forEach(el => el.classList.remove("flex"));
}

// 1. CHOOSE CHALLENGE TYPE
challengeTypeInput.forEach(el => el.addEventListener("change", () => {

  // Every time the user changes the selection of the radio buttons here, the styles reset.
  uncheckAll();
  resetAllElementsVisibility();

  // Apply a selection border on the selected element
  applyBorder(el);

  // 0 = Legends | 1 = Weapons |
  if (challengeTypeInput[0].checked) {
    console.log("Legend challenges.");
    displayElement(challengeSubtypesWrapper);
    displayElement(challengeSubtypeLegends);
  }

  if (challengeTypeInput[1].checked) {
    console.log("Weapon challenges.");
  }
}));

// 2. CHOOSE CHALLENGE SUBTYPE
challengeSubtypeInput.forEach(el => el.addEventListener("change", () => {
  resetBorder(challengeSubtypeInput);
  applyBorder(el);
  displayElement(legendsPick);
}));

// 3. HANDLING THE CHOICES OF THE SPECIFICS OF EACH SUBTYPE
let selectionLocked = null;

const challengesWrapper = document.querySelector(".challenges-wrapper");

(() => {
  legendsInput.forEach(el => el.addEventListener("change", handleLegendSelection));

  function handleLegendSelection() {
    // Means that if "THIS" is already on Array (I.E. Already clicked) the if will remove it from the array.
    if (arrayDeLendas.includes(this)) {
      if (selectionLocked) return;

      applyBorder(this);
      arrayDeLendas.splice(arrayDeLendas.indexOf(this), 1);
      console.log(arrayDeLendas);
      return;
    }

    // When the array receives the third element, he will handle the addition in the array and will lock the other checkboxes to prevent further selections.
    if (arrayDeLendas.length > 1) {
      applyBorder(this);
      arrayDeLendas.push(this);

      console.log("Last Element:", arrayDeLendas);
      const checkboxesNotChecked = document.querySelectorAll(".pick-challenge-legends input:not(:checked)");
      checkboxesNotChecked.forEach(el => el.disabled = true);
      selectionLocked = true;
      return;
    }

    applyBorder(this);
    arrayDeLendas.push(this);
    console.log(arrayDeLendas);
  }

  function montarFrase() {

    let challengeTypeVar, challengeSubtypeVar, legendsPickedVar;

    challengeSubtypeInput.forEach(el => el.addEventListener("change", () => {
      console.log("Subtipo:", el);
      if (el.id === "subtypePlay") {
        challengeSubtypeVar = "Play";
      }
      if (el.id === "subtypeDamage") {
        challengeSubtypeVar = "Damage";
      }
      if (el.id === "subtypeKills") {
        challengeSubtypeVar = "Kills";
      }
    }));

    formattedName = el => {
      const firstLetter = el.charAt(0).toUpperCase();
      const remainderOfString = el.slice(1);
      return firstLetter + remainderOfString;
    }

    formFrase = () => {
      const challengeCreatedDiv = document.createElement("div");
      challengeCreatedDiv.classList.add("challenges--created");
    
      const challengeCreatedP = document.createElement("p");
      challengeCreatedP.textContent = `${challengeSubtypeVar} with ${formattedName(arrayDeLendas[0].id)}, ${formattedName(arrayDeLendas[1].id)}, ${formattedName(arrayDeLendas[2].id)}`;
      challengeCreatedDiv.appendChild(challengeCreatedP);
    
      challengesWrapper.appendChild(challengeCreatedDiv);

      overlay.classList.toggle("none");
      resetAllElementsVisibility();
      uncheckAll();
    }

    submit.addEventListener("click", formFrase);
  }

  montarFrase();
})();

