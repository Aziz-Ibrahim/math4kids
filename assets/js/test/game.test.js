import {
    toggleDropdown,
    generateEquation,
    setMode,
    handleOptionClick
} from './gameModule';

test('toggleDropdown toggles the open class on the menu', () => {
    const menu = document.createElement('div');
    toggleDropdown(menu);
    expect(menu.classList.contains('open')).toBe(true);
    toggleDropdown(menu);
    expect(menu.classList.contains('open')).toBe(false);
});

test('generateEquation produces valid addition results', () => {
    const {
        num1,
        num2,
        answer,
        operator
    } = generateEquation('addition');
    expect(answer).toBe(num1 + num2);
    expect(operator).toBe('+');
});

// Mock DOM setup for CSS manipulation
document.body.innerHTML = `
    <div class="equation"></div>
    <div id="option1"><p>5</p></div>
    <dialog id="exit-dialog"></dialog>
    <a href="index.html" id="home-link">Home</a>
    <button id="dialog-yes">Yes</button>
    <button id="dialog-no">No</button>
`;

// Select elements
const equationDiv = document.querySelector('.equation');
const option1 = document.getElementById('option1');
const dialog = document.getElementById('exit-dialog');
const homeLink = document.getElementById('home-link');
const dialogYes = document.getElementById('dialog-yes');
const dialogNo = document.getElementById('dialog-no');

describe('CSS Class Manipulation Tests', () => {
    test('Adds and removes the "correct" class', () => {
        // Mock regenerateEquation function
        const regenerateEquation = jest.fn();

        // Correct answer case
        const result = handleOptionClick(option1, regenerateEquation);
        expect(result).toBe(true);
        expect(equationDiv.classList.contains('correct')).toBe(true);

        // Simulate removal of "correct" class
        setTimeout(() => {
            expect(equationDiv.classList.contains('correct')).toBe(false);
        }, 600);
    });

    test('Adds and removes the "shake" class', () => {
        // Mock incorrect answer case
        const result = handleOptionClick({
            querySelector: () => ({
                textContent: '3'
            })
        }, jest.fn());
        expect(result).toBe(false);
        expect(option1.classList.contains('shake')).toBe(true);

        // Simulate animation end event
        const animationEndEvent = new Event('animationend');
        option1.dispatchEvent(animationEndEvent);
        expect(option1.classList.contains('shake')).toBe(false);
    });
});

describe('Exit Confirmation Dialog Tests', () => {
    test('Displays dialog when "Home" link is clicked', () => {
        // Mock dialog.showModal
        dialog.showModal = jest.fn();

        // Simulate link click
        homeLink.dispatchEvent(new Event('click', {
            bubbles: true
        }));
        expect(dialog.showModal).toHaveBeenCalled();
    });

    test('Redirects to home page when "Yes" is clicked', () => {
        // Mock window location
        delete window.location;
        window.location = {
            href: ''
        };

        // Simulate "Yes" button click
        dialogYes.dispatchEvent(new Event('click'));
        expect(window.location.href).toBe('index.html');
    });

    test('Closes dialog when "No" is clicked', () => {
        // Mock dialog.close
        dialog.close = jest.fn();

        // Simulate "No" button click
        dialogNo.dispatchEvent(new Event('click'));
        expect(dialog.close).toHaveBeenCalled();
    });
});