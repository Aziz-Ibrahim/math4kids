import {
    toggleDropdown,
    generateEquation,
    setMode
} from './game';

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