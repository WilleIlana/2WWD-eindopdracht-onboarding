import "../src/scss/styles.scss";

const screens = Array.from(document.querySelectorAll(".c-onboarding"));
const nextButtons = document.querySelectorAll("[data-next]");
const backButtons = document.querySelectorAll(".c-onboarding__back");

let currentIndex = screens.findIndex((screen) => screen.classList.contains("c-onboarding--active"));
if (currentIndex === -1) currentIndex = 0;

function showScreen(index) {
  if (index < 0 || index >= screens.length) return;
  screens.forEach((screen) => screen.classList.remove("c-onboarding--active"));
  screens[index].classList.add("c-onboarding--active");
  currentIndex = index;
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextId = button.getAttribute("data-next");
    const target = document.querySelector(`#screen-${nextId}`);
    const targetIndex = screens.indexOf(target);
    if (targetIndex !== -1) showScreen(targetIndex);
  });
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prevIndex = Math.max(0, currentIndex - 1);
    showScreen(prevIndex);
  });
});
