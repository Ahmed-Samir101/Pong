let selectedValue = 0.01;

window.onload = () => {
  const startBtn = document.getElementById("start");
  startBtn.onclick = () => {
    const difficultyRadios = document.getElementsByName("difficulty");
    const themeRadios = document.getElementsByName("theme");

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
        // Do something with the theme value
        break;
      }
    }
  };
};

export default selectedValue;