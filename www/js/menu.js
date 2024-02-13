const difficultyRadios = document.getElementsByName("difficulty");
const themeRadios = document.getElementsByName("theme");
const startBtn = document.getElementById("start");
const root = document.documentElement;
let selectedValue = 0.01;

const themeChangeHandler = () => {
  for (let i = 0; i < difficultyRadios.length; i++) {
    if (difficultyRadios[i].checked) {
      const difficultyValue = difficultyRadios[i].value;
      if (difficultyValue === "easy") {
        selectedValue = 0.01;
      } else if (difficultyValue === "medium") {
        selectedValue = 0.02;
      } else if (difficultyValue === "hard") {
        selectedValue = 0.03;
      }
      break;
    }
  }

  for (let i = 0; i < themeRadios.length; i++) {
    if (themeRadios[i].checked) {
      const themeValue = themeRadios[i].value;
      if (themeValue == "1") {
        root.style.setProperty('--hue', 200)
      } else if (themeValue == "2") {
        root.style.setProperty('--hue', 2)
      } else if (themeValue == "3") {
        root.style.setProperty('--hue', 121)
      } else if (themeValue == "4") {
        root.style.setProperty('--hue', 300)
      }
      break;
    }
  }
};

for (let i = 0; i < themeRadios.length; i++) {
  themeRadios[i].addEventListener('change', themeChangeHandler);
}

export { selectedValue };