// Navbar Toggle for Responsive Navigation
const toggleButton = document.querySelector('.nav-toggle');
const navbarLinks = document.querySelector('.nav-links');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

// Game Logic
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const operatorElement = document.getElementById("operator");
const questionMarkElement = document.getElementById("question-mark");
const modeSelector = document.getElementById("gameMode");

let currentMode = "addition";
let answer = 0;

// Generate New Equation
function generateEquation(mode) {
    let num1 = Math.floor(Math.random() * 13);
    let num2 = Math.floor(Math.random() * 13);
    let dummyAnswer1, dummyAnswer2;

    if (mode === "addition") {
        answer = num1 + num2;
        operatorElement.textContent = "+";
    } else if (mode === "subtraction") {
        // Ensure no negative results
        if (num1 > num2) {
            answer = num1 - num2;
            num1Element.textContent = num1;
            num2Element.textContent = num2;
        } else {
            answer = num2 - num1;
            num1Element.textContent = num2;
            num2Element.textContent = num1;
        }
        operatorElement.textContent = "-";
    } else if (mode === "multiplication") {
        answer = num1 * num2;
        operatorElement.textContent = "×";
    } else if (mode === "division") {
        // Ensure num2 is not zero and num1 is a multiple of num2
        while (num2 === 0) {
            num2 = Math.floor(Math.random() * 13);
        }
        num1 = num2 * Math.floor(Math.random() * 13);
        answer = num1 / num2;
        operatorElement.textContent = "÷";
    }

    questionMarkElement.textContent = "?";

    // Generate unique dummy answers
    do {
        dummyAnswer1 = Math.floor(Math.random() * 20);
    } while (dummyAnswer1 === answer);

    do {
        dummyAnswer2 = Math.floor(Math.random() * 20);
    } while (dummyAnswer2 === answer || dummyAnswer2 === dummyAnswer1);

    // Shuffle and assign options
    const allAnswers = [answer, dummyAnswer1, dummyAnswer2].sort(() => Math.random() - 0.5);
    option1.querySelector("p").textContent = allAnswers[0];
    option2.querySelector("p").textContent = allAnswers[1];
    option3.querySelector("p").textContent = allAnswers[2];
}



// Handle Option Click
function handleOptionClick(selectedOption) {
    if (parseInt(selectedOption.querySelector("p").textContent) === answer) {
        generateEquation(currentMode);
    } else {
        selectedOption.classList.add("shake");
        selectedOption.addEventListener('animationend', () => {
            selectedOption.classList.remove("shake");
        });
    }
}

// Add Event Listeners to Options
option1.addEventListener("click", () => handleOptionClick(option1));
option2.addEventListener("click", () => handleOptionClick(option2));
option3.addEventListener("click", () => handleOptionClick(option3));

// Change Game Mode
modeSelector.addEventListener("change", (event) => {
    currentMode = event.target.value;
    generateEquation(currentMode);
});

// Initialize Game
generateEquation(currentMode);