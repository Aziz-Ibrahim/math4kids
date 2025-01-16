// Game Logic Elements
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const operatorElement = document.getElementById("operator");
const questionMarkElement = document.getElementById("question-mark");

// Custom Dropdown Elements
const modeSelector = document.getElementById("gameMode"); // Custom dropdown
const dropdownButton = modeSelector.querySelector(".dropdown-button");
const dropdownMenu = modeSelector.querySelector(".dropdown-menu");
const dropdownItems = dropdownMenu.querySelectorAll("li");

let currentMode = "addition";
let answer = 0;

/**
 * Toggles the visibility of the dropdown menu.
 */
function toggleDropdown(menu) {
    menu.classList.toggle("open");
}

/**
 * Handles the click event for dropdown items.
 */
function setMode(selectedMode, dropdownButtonElement) {
    currentMode = selectedMode;
    dropdownButtonElement.textContent = selectedMode; // Update the button text
}

/**
 * Generates a new math equation based on the selected mode.
 * @param {string} mode - The mode of the game (addition, subtraction, multiplication, division).
 * @returns {Object} Generated equation data: { num1, num2, answer, operator }
 */
function generateEquation(mode) {
    let num1 = Math.floor(Math.random() * 13);
    let num2 = Math.floor(Math.random() * 13);
    let operator = "+";

    switch (mode) {
        case "addition":
            answer = num1 + num2;
            operator = "+";
            break;
        case "subtraction":
            if (num1 < num2)[num1, num2] = [num2, num1]; // Ensure no negative results
            answer = num1 - num2;
            operator = "-";
            break;
        case "multiplication":
            answer = num1 * num2;
            operator = "×";
            break;
        case "division":
            while (num2 === 0) num2 = Math.floor(Math.random() * 13); // Avoid division by zero
            num1 = num2 * Math.floor(Math.random() * 13); // Make num1 a multiple of num2
            answer = num1 / num2;
            operator = "÷";
            break;
    }

    return {
        num1,
        num2,
        answer,
        operator
    };
}

/**
 * Handles the click event for a game option.
 * @param {HTMLElement} selectedOption - The option element that was clicked.
 * @param {Function} regenerateEquation - Function to regenerate equation after a correct answer.
 * @returns {boolean} True if the answer is correct, otherwise false.
 */
function handleOptionClick(selectedOption, regenerateEquation) {
    const selectedAnswer = parseInt(selectedOption.querySelector("p").textContent);
    const equationDiv = document.querySelector(".equation");
    if (selectedAnswer === answer) {
        equationDiv.classList.add("correct");
        questionMarkElement.textContent = answer;

        setTimeout(() => {
            equationDiv.classList.remove("correct");
            regenerateEquation(currentMode);
        }, 600);
        return true;
    } else {
        selectedOption.classList.add("shake");
        selectedOption.addEventListener("animationend", () => {
            selectedOption.classList.remove("shake");
        });
        return false;
    }
}

// Export functions and variables for Jest testing
export {
    toggleDropdown,
    setMode,
    generateEquation,
    handleOptionClick,
    dropdownButton,
    dropdownMenu,
    dropdownItems,
    currentMode,
};