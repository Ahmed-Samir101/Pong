let selectedValue = 0.01;

const startBtn = document.getElementById("start");

function themes() {

    const difficultyRadios = document.getElementsByName("difficulty");
    const themeRadios = document.getElementsByName("theme");
    const root = document.documentElement;
    let hueValue = 1;

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
        console.log("tessssst")
        if (themeRadios[i].checked) {
            const themeValue = themeRadios[i].value;
            if (themeValue == "2") {
                hueValue = 2;
                root.style.setProperty('--hue', hueValue)
                root.style.setProperty('--saturation', "60%")
            } else if (themeValue == "3") {
                hueValue = 111;
                root.style.setProperty('--hue', hueValue)
            } else if (themeValue == "4") {
                hueValue = 300;
                root.style.setProperty('--hue', hueValue)
            }
            break;
        }
    }
};

export { selectedValue, themes };