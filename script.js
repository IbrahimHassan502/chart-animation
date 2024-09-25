"use strict";
// rim rotation animation
let rotation = 0;
const animationDelay = 3200;
// slides
const slides = [
  {
    gradient: ["#4a8192ff", "#161834ff", "#d53129ff"],
    number: 40000,
    label: "people",
  },
  {
    gradient: ["#59c173", "#a17fe0", "#5D26C1"],
    number: 200,
    label: "speakers",
  },
  {
    gradient: ["#12c2e9", "#c471ed", "#f64f59"],
    number: 11000,
    label: "in-person views",
  },
  {
    gradient: ["#7F7FD5", "#86A8E7", "#91EAE4"],
    number: 3000,
    label: "event",
  },
];
// counter to go through the slides
let i = 0;

// rim animation
function animateRim(i) {
  const rims = document.querySelectorAll(".container .rim");
  rotation += 180;
  rims.forEach((rim) => {
    rim.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    if (rim.classList.contains("active")) {
      rim.style.opacity = 0;
      rim.classList.remove("active");
      rim.classList.add("hidden");
    } else {
      rim.style.opacity = 1;
      rim.style.backgroundImage = `linear-gradient(to right, ${slides[
        i
      ].gradient.join(",")})`;
      rim.classList.remove("hidden");
      rim.classList.add("active");
    }
  });
}

// number animation
function changeNum(i) {
  if (i > 2) {
    clearInterval(numInterval);
  }
  const numberContainer = document.querySelector("span.number");
  const newNum = slides[i].number;
  const numInterval = setInterval(() => {
    let currentNum = Number(numberContainer.textContent);

    if (currentNum < newNum) {
      const changeBy = newNum / currentNum / 10;
      currentNum += 100;
    } else if (currentNum > newNum) {
      const changeBy = currentNum / newNum / 10;
      currentNum -= 100;
    } else {
      clearInterval(numInterval);
    }
    numberContainer.textContent = currentNum;
  }, 0);

  const labelContainer = document.querySelector("p.label");
  labelContainer.textContent = slides[i].label;
}

// indicator animation
const indicators = document.querySelectorAll(".container .indicator");
function changeIndicator(i) {
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
    indicator.style.backgroundColor = "#d9d9d9ff";
    indicator.style.borderColor = slides[i].gradient[1];
  });
  const activeIndicator = indicators[i];
  activeIndicator.classList.add("active");
  activeIndicator.style.backgroundColor = slides[i].gradient[1];
}

// indicator click functionality
const indicatorContainer = document.querySelector(
  ".container .indicator-container"
);

indicatorContainer.addEventListener("click", (e) => {
  console.log("clicked");
  if (e.target.classList.contains("indicator")) {
    console.log(e.target);
  } else {
    console.log("hallo");
  }
});

const mainInterval = setInterval(() => {
  i++;
  if (i >= slides.length) {
    i = 0;
  }
  // rim animation
  animateRim(i);

  // slider change
  changeNum(i);

  // indicator change
  changeIndicator(i);
}, animationDelay);

// rim fade animation
setInterval(() => {
  const rims = document.querySelectorAll(".container .rim");
  rims.forEach((rim) => {
    if (rim.classList.contains("active")) {
      rim.style.zIndex = -2;
    } else {
      rim.style.zIndex = -1;
    }
  });
}, animationDelay + 1000);
