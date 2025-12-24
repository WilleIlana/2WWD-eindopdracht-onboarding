import "../src/scss/styles.scss";

const screens = Array.from(document.querySelectorAll(".c-start, .c-onboarding"));
const nextButtons = document.querySelectorAll("[data-next]");
const backButtons = document.querySelectorAll(".c-onboarding__back");

let currentIndex = screens.findIndex((screen) => screen.classList.contains("c-start--active") || screen.classList.contains("c-onboarding--active"));
if (currentIndex === -1) currentIndex = 0;

function showScreenById(id) {
  const target = document.querySelector(`#screen-${id}`);
  const targetIndex = screens.indexOf(target);
  if (targetIndex === -1) return;

  screens.forEach((screen) => {
    screen.classList.remove("c-start--active", "c-onboarding--active");
  });

  if (target.classList.contains("c-start")) {
    target.classList.add("c-start--active");
  } else {
    target.classList.add("c-onboarding--active");
  }

  currentIndex = targetIndex;
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextId = button.getAttribute("data-next");
    showScreenById(nextId);
  });
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prevIndex = Math.max(0, currentIndex - 1);
    const prevScreen = screens[prevIndex];
    const id = prevScreen.id.replace("screen-", "");
    showScreenById(id);
  });
});
