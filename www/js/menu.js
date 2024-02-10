let selectedValue = 0.01;
window.onload = () => {
    const startBtn = document.getElementById("start")
    startBtn.onclick = () => {
        const radios = document.getElementsByName("radio");
    
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                selectedValue = radios[i].value;
                if(selectedValue = "easy") selectedValue = 0.01
                else if(selectedValue = "medium") selectedValue = 0.02
                else selectedValue = 0.03
                break;
            }
        }
    }

}

export default selectedValue;