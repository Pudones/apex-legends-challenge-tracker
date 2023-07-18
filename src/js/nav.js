(() => {
  const headerNavButton = document.querySelector(".header-button");

  headerNavButton.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("nav--opened");
  });
})();

