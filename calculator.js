const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  // If the `displayValue` property does not contain a decimal point
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
   // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
   // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);
  
  
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

// verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
   // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  // Access the clicked element
  const { target } = event;
  // is equivalent to const target = event.target
  const { value } = target;
    // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});