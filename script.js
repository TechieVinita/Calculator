let firstOperand = null;
let secondOperand = null;
let operator = null;

const numberButtons = document.querySelectorAll('.num-btn');
const operatorButtons = document.querySelectorAll('.op-btn');

const equalsButton = document.querySelector('.equals-btn');
const deleteButton = document.querySelector('.back-btn');
const clearButton = document.querySelector('.clear-btn');
const pointButton = document.querySelector('.point-btn');

const currentOperationScreen = document.querySelector('.current-operation-container');
const lastOperationScreen = document.querySelector('.last-operation-container');

function resetScreen(){
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function displayNumber(number){
    if( currentOperationScreen.textContent === '0' ){
        currentOperationScreen.textContent = '';
    }
    currentOperationScreen.textContent += number;
}

function displayOperator(op){
    if( firstOperand === null ){
        firstOperand = currentOperationScreen.textContent;
        operator = op;
        lastOperationScreen.textContent = currentOperationScreen.textContent;
        currentOperationScreen.textContent = operator;
    }
    if( secondOperand !== null ) {
        firstOperand = evaluate(firstOperand, operator, secondOperand);
        lastOperationScreen.textContent = firstOperand;
        currentOperationScreen.textContent = '';
        secondOperand = null;
        operator = op;
    }
    else{
        operator = op;
        currentOperationScreen.textContent = operator;
    }
}

function displayPoint(){
    if( !currentOperationScreen.textContent.includes('.') ){
        currentOperationScreen.textContent += '.';
    }
}

function deleteOperation(){
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function clearScreen(){
    firstOperand = null;
    secondOperand = null;
    operator = null;
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
}

function evaluate(){
    if( firstOperand === null && secondOperand === null){
        return;
    }

    secondOperand = currentOperationScreen.textContent.toString().slice(1);
    firstOperand = operate(firstOperand, operator, secondOperand);
    secondOperand = null;
    lastOperationScreen.textContent = roundOff(firstOperand);
    currentOperationScreen.textContent = '';
}

function roundOff(number){
    if(typeof number == 'number'){
        if( Number.isInteger(number) === false){
            return number.toFixed(2);
        }
        else{
            return number;
        }
    }
    else{
        return number;
    }
}

numberButtons.forEach( button => button.addEventListener('click', () => displayNumber(button.textContent) ) );

operatorButtons.forEach( operator => operator.addEventListener('click', () => displayOperator(operator.textContent) ) );

pointButton.addEventListener('click', displayPoint );
equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteOperation);
clearButton.addEventListener('click', clearScreen);


function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b === 0) return 'ERROR : Divide by 0!';
    else return a / b;
}

function operate(num1, operator, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator){
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default : return;
    }
}

