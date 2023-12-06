const apiKey = "d731286e43f70a37ab06ab6a42d83b4a";

const navRotationLink = document.querySelector("#nav-li--dropdown");

// Current
const rotationBanner = document.querySelector(".rotation-banner");
const rotationMapName = document.querySelector(".rotation-map-name");
const rotationModeName = document.querySelector(".rotation-mode-name");
const rotationMapDuration = document.querySelector(".rotation-map-timer");

// Next
const rotationNextWrapper = document.querySelector(".rotation-next-wrapper");
const rotationNextMapName = document.querySelector(".rotation-next-map");
const rotationNextMode = document.querySelector(".rotation-next-mode");

const loadingOverlay = document.querySelector(".loading-overlay");
const loadingOverlayText = document.querySelector(".loading-text");

let rotationInterval;

const mapImages = {
  "Broken Moon": "../assets/images/maps/brokenmoon.webp",
  "Caustic Treatment": "../assets/images/maps/caustictreatment.webp",
  "Estates": "../assets/images/maps/estates.webp",
  "Fragment": "../assets/images/maps/fragment.webp",
  "Habitat 4": "../assets/images/maps/habitat4.webp",
  "Hammond Labs": "../assets/images/maps/hammondlabs.webp",
  "Kings Canyon": "../assets/images/maps/kingscanyon.webp",
  "Olympus": "../assets/images/maps/olympus.webp",
  "Phase Runner": "../assets/images/maps/phaserunner.webp",
  "Production Yard": "../assets/images/maps/productionyard.webp",
  "Siphon": "../assets/images/maps/siphon.webp",
  "Skulltown": "../assets/images/maps/skulltown.webp",
  "Storm Point": "../assets/images/maps/stormpoint.webp",
  "The Core": "../assets/images/maps/thecore.webp",
  "Wattson's Pylon": "../assets/images/maps/wattsonspylon.webp",
  "World's Edge": "../assets/images/maps/worldsedge.webp",
  "Zeus Station": "../assets/images/maps/zeusstation.webp"
};

const formatZero = number => number < 10 ? `0${number}` : number;

const getMapRotation = async () => {
  loadingOverlay.classList.add("loading--active");
  loadingOverlayText.textContent = "Checking map rotation...";

  setTimeout(() => {
    loadingOverlay.classList.remove("loading--active");
    loadingOverlayText.textContent = "";
  }, 1600);

  let currentData;
  let nextData;
  let rotationCategory;

  const promise = await fetch(`https://api.mozambiquehe.re/maprotation?auth=${apiKey}&version=2`)
  const data = await promise.json();

  if (window.location.href.indexOf("br") > -1) rotationCategory = "br";
  if (window.location.href.indexOf("mixtape") > -1) rotationCategory = "mixtape";

  if (rotationCategory === "br") {
    currentData = data["battle_royale"].current;
    nextData = data["battle_royale"].next;
  }

  if (rotationCategory === "mixtape") {
    currentData = data["ltm"].current;
    nextData = data["ltm"].next;
  }

  // These logs will output information about the current map, used to verify names and other info regarding rotation.
  // console.log(currentData.map)
  // console.log(nextData.map)

  const setTimer = () => {
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }

    if (minutes < 0) {
      loadingOverlay.classList.add("loading--active");
      loadingOverlayText.textContent = "Checking map rotation...";

      clearInterval(rotationInterval);
      getMapRotation();

      setTimeout(() => {
        loadingOverlay.classList.remove("loading--active");
        loadingOverlayText.textContent = "";
      }, 1600);
    }

    if (rotationCategory === "br") {
      rotationMapDuration.textContent = `${formatZero(minutes)}:${formatZero(seconds)}`;
    } else {
      rotationMapDuration.textContent = `${formatZero(minutes)}:${formatZero(seconds)}`;
    }
    seconds--;
  };

  /* Log to verify the timer from the API (to check if the "manual timer" is sync)
  setInterval(async () => {
    const promise = await fetch(`https://api.mozambiquehe.re/maprotation?auth=${apiKey}&version=2`)
    const data = await promise.json();
  
    const currentData = data["ltm"].current;

    console.log(currentData.remainingTimer);
  }, 1000);
  console.log(currentData.remainingTimer);
  console.log(currentData.remainingSecs);
  */

  // let hours = Math.floor(currentData.remainingSecs / 3600);
  let minutes = Math.floor(currentData.remainingSecs / 60);
  let seconds = currentData.remainingSecs - minutes * 60;

  setTimer();
  rotationInterval = setInterval(setTimer, 1000);

  rotationBanner.src = mapImages[currentData.map];
  rotationMapName.textContent = currentData.map;
  rotationModeName.textContent = currentData.eventName;

  rotationNextWrapper.style.backgroundImage = `url(${mapImages[nextData.map]})`;
  rotationNextMapName.textContent = nextData.map;
  rotationNextMode.textContent = nextData.eventName;
};

getMapRotation();