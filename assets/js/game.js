// Game Logic Elements
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const operatorElement = document.getElementById("operator");
const questionMarkElement = document.getElementById("question-mark");

// Custom Dropdown Elements
const modeSelector = document.getElementById('gameMode'); // Custom dropdown
const dropdownButton = modeSelector.querySelector('.dropdown-button');
const dropdownMenu = modeSelector.querySelector('.dropdown-menu');
const dropdownItems = dropdownMenu.querySelectorAll('li');

let currentMode = "addition";
let answer = 0;

/**
 * Toggles the visibility of the dropdown menu.
 */
dropdownButton.addEventListener('click', () => {
    modeSelector.classList.toggle('open');
});

/**
 * Handles the click event for dropdown items.
 */
dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const selectedMode = event.target.dataset.value;

        // Update the button text
        dropdownButton.textContent = event.target.textContent;

        // Update the current mode and generate a new equation
        currentMode = selectedMode;
        generateEquation(currentMode);

        // Close the dropdown menu
        modeSelector.classList.remove('open');
    });
});

// Close dropdown if clicked outside
document.addEventListener('click', (event) => {
    if (!modeSelector.contains(event.target)) {
        modeSelector.classList.remove('open');
    }
});

/**
 * Generates a new math equation based on the selected mode.
 * @param {string} mode - The mode of the game (addition, subtraction, multiplication, division).
 */
function generateEquation(mode) {
    let num1 = Math.floor(Math.random() * 13);
    let num2 = Math.floor(Math.random() * 13);
    let dummyAnswer1, dummyAnswer2;

    // Addition Logic
    if (mode === "addition") {
        answer = num1 + num2;
        operatorElement.textContent = "+";
        num1Element.textContent = num1;
        num2Element.textContent = num2;

        // Subtraction Logic (Ensures no negative results)
    } else if (mode === "subtraction") {
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

        // Multiplication Logic
    } else if (mode === "multiplication") {
        answer = num1 * num2;
        operatorElement.textContent = "×";
        num1Element.textContent = num1;
        num2Element.textContent = num2;

        // Division Logic (Ensures no remainders and no division by zero)
    } else if (mode === "division") {
        while (num2 === 0) { // Prevent division by zero
            num2 = Math.floor(Math.random() * 13);
        }
        num1 = num2 * Math.floor(Math.random() * 13); // Make num1 a multiple of num2
        answer = num1 / num2;

        operatorElement.textContent = "÷";
        num1Element.textContent = num1;
        num2Element.textContent = num2;
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

/**
 * Handles the click event for a game option.
 * @param {HTMLElement} selectedOption - The option element that was clicked.
 */
function handleOptionClick(selectedOption) {
    const equationDiv = document.querySelector('.equation');
    if (parseInt(selectedOption.querySelector("p").textContent) === answer) {
        equationDiv.classList.add("correct");
        questionMarkElement.textContent = answer;

        setTimeout(() => {
            equationDiv.classList.remove("correct");
            generateEquation(currentMode);
        }, 600);
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

// Initialize Game
generateEquation(currentMode);

// Exit Dialog Elements
const homeLink = document.getElementById("home-link");
const dialog = document.getElementById("exit-dialog");
const dialogYes = document.getElementById("dialog-yes");
const dialogNo = document.getElementById("dialog-no");

/**
 * Shows a confirmation dialog when the home link is clicked.
 */
homeLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default navigation
    dialog.showModal(); // Show the dialog
});

/**
 * Redirects to the home page when the "Yes" button is clicked in the dialog.
 */
dialogYes.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to home page
});

/**
 * Closes the dialog when the "No" button is clicked.
 */
dialogNo.addEventListener("click", () => {
    dialog.close(); // Close the dialog
});


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