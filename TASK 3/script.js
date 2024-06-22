const display = document.getElementById('display');
let currentInput = '';
let fullExpression = '';
let shouldResetScreen = false;

const updateDisplay = () => {
    display.textContent = fullExpression || '0';
};

const appendNumber = (number) => {
    if (shouldResetScreen) {
        fullExpression = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    fullExpression += number;
    updateDisplay();
};

const chooseOperation = (op) => {
    if (currentInput === '') return;
    if (shouldResetScreen) {
        shouldResetScreen = false;
    }
    fullExpression += op;
    currentInput = '';
    updateDisplay();
};

const calculate = () => {
    try {
        fullExpression = eval(fullExpression).toString();
        shouldResetScreen = true;
    } catch {
        fullExpression = 'Error';
    }
    updateDisplay();
};

const clear = () => {
    currentInput = '';
    fullExpression = '';
    updateDisplay();
};

const backspace = () => {
    fullExpression = fullExpression.slice(0, -1);
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
};

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            chooseOperation(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clear();
        } else if (value === '←') {
            backspace();
        }
    });
});
