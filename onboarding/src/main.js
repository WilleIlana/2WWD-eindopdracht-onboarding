import "../src/scss/styles.scss";

const screens = Array.from(document.querySelectorAll(".c-start, .c-onboarding, .c-end"));
const nextButtons = document.querySelectorAll("[data-next]");
const backButtons = document.querySelectorAll(".c-onboarding__back");

let currentIndex = screens.findIndex((screen) => screen.classList.contains("c-start--active") || screen.classList.contains("c-onboarding--active") || screen.classList.contains("c-end--active"));
if (currentIndex === -1) currentIndex = 0;

const activateScreen = (target) => {
  screens.forEach((screen) => {
    screen.classList.remove("c-start--active", "c-onboarding--active", "c-end--active", "u-fade--in");
    screen.style.display = "none";
  });

  target.style.display = "flex";

  if (target.classList.contains("c-start")) {
    target.classList.add("c-start--active");
  } else if (target.classList.contains("c-onboarding")) {
    target.classList.add("c-onboarding--active");
  } else if (target.classList.contains("c-end")) {
    target.classList.add("c-end--active");
  }

  requestAnimationFrame(() => {
    target.classList.add("u-fade--in");
  });

  currentIndex = screens.indexOf(target);
};

const playEndAnimation = (target) => {
  const blob = target.querySelector(".c-end__blob");
  const text = target.querySelector(".c-end__text");
  if (!blob || !text) return;

  blob.classList.remove("c-end__blob--zoomed");
  text.classList.remove("c-end__text--visible");

  setTimeout(() => {
    blob.classList.add("c-end__blob--zoomed");

    setTimeout(() => {
      text.classList.add("c-end__text--visible");
    }, 800);
  }, 900);
};

const showScreenById = (id) => {
  const target = document.querySelector(`#screen-${id}`);
  if (!target) return;

  activateScreen(target);

  if (id === "6") {
    playEndAnimation(target);
  }
};

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
    if (!prevScreen) return;
    const id = prevScreen.id.replace("screen-", "");
    showScreenById(id);
  });
});
