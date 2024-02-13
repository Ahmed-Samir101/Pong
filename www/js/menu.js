let selectedValue = 0.01;
let hueValue = 1; 
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
                if (themeValue == "2") {
                    hueValue = 2;
                } else if (themeValue == "3") {
                    hueValue = 3;
                } else if (themeValue == "4") {
                    hueValue = 4;
                }
                break;
            }
        }
    };
};

export {selectedValue, hueValue};