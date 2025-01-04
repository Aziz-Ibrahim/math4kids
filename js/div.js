const toggleButton = document.getElementsByClassName('nav-toggle')[0]
const navbarLinks = document.getElementsByClassName('nav-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});

const option1 = document.getElementById("option1"),
    option2 = document.getElementById("option2"),
    option3 = document.getElementById("option3"),
    audio = document.getElementById("wrong");
let answer = 0;

function generateEquation() {
    let num1 = Math.floor(Math.random() * 13);
    let num2 = Math.floor(Math.random() * 13);

    // Prevent division by zero by ensuring num2 is not zero
    while (num2 === 0) {
        num2 = Math.floor(Math.random() * 13);
    }

    // Ensure num1 is a multiple of num2
    num1 = num2 * (Math.floor(Math.random() * 13));

    let dummyAnswer1 = Math.floor(Math.random() * 13);
    let dummyAnswer2 = Math.floor(Math.random() * 13);
    let allAnswers = [];
    let switchAnswers = [];

    answer = num1 / num2;

    document.getElementById("num1").innerHTML = num1;
    document.getElementById("num2").innerHTML = num2;

    do {
        dummyAnswer1 = Math.floor(Math.random() * 10);
    } while (dummyAnswer1 === answer);

    do {
        dummyAnswer2 = Math.floor(Math.random() * 10);
    } while (dummyAnswer2 === answer || dummyAnswer2 === dummyAnswer1);

    allAnswers = [answer, dummyAnswer1, dummyAnswer2];

    for (i = allAnswers.length; i--;) {
        switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
    };

    option1.innerHTML = switchAnswers[0];
    option2.innerHTML = switchAnswers[1];
    option3.innerHTML = switchAnswers[2];
};



option1.addEventListener("click", function () {
    if (option1.innerHTML == answer) {
        generateEquation();
    } else {
        audio.play();
    }
});

option2.addEventListener("click", function () {
    if (option2.innerHTML == answer) {
        generateEquation();
    } else {
        audio.play();
    }
});

option3.addEventListener("click", function () {
    if (option3.innerHTML == answer) {
        generateEquation();
    } else {
        audio.play();
    }
});

generateEquation();