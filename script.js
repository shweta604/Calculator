const numBtns = document.querySelectorAll('[data-number]');
// console.log(numButtons);
const operationBtns = document.querySelectorAll('[data-operation]');
// console.log(operationButtons);
const equalToBtn = document.querySelector('[data-equals-to]');
// console.log(equalBtn);
const allClearBtn = document.querySelector('[data-clear-all]');
// console.log(allClearBtn);
const clearOneBtn = document.querySelector('[data-clear-one]');
// console.log(clearOneBtn);
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
// console.log(previousOperand);
// console.log(currentOperand);

class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        // resets all the input
        this.allClear();
    }

    allClear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    clearOne() {
        this.current = this.current.toString().slice(0, -1);
    }

    // once the user clicks on a number add it in current operand
    addNumber(operand) {
        // console.log(operand);
        // this.current = operand;
        // each operand will have only one decimal point
        if (operand == '.' && this.current.includes('.')) return;
        // console.log(typeof(operand,this.current));
        // more than one digit operand
        this.current = this.current + operand;
    }

    chooseBasicOperation(operator) {
        // console.log(operator);
        if(this.current == '') return;
        if(this.previous != '') {
            this.compute();
        }

        this.operation = operator;
        // previous will have current's value and current will become empty string after selecting an operation
        this.previous = this.current;
        this.current = '';
    }

    // takes inputs and displays result
    compute() {
        let result;
        let previous = parseFloat(this.previous);
        let current = parseFloat(this.current);

        if(isFinite(previous) && isFinite(current)) {
            switch(this.operation) {
                case '+':
                    result = previous + current;
                    break;
                case '-':
                    result = previous - current;
                    break;
                case 'x':
                    result = previous * current;
                    break;
                case '/':
                    result = previous / current;
                    break;
            }
        }

        // rounding the result upto two decimal values
        this.current = Math.round((result) * 100) / 100;

        // remove the operator 
        this.operation = undefined;
        this.previous = '';
    }

    // update screen after every operation
    updateDisplay() {
        if (this.operation != null) {
            this.previousOperand.innerText = `
                ${this.previous} ${this.operation}
            `;
        } else {
            this.previousOperand.innerText = '';
        }
        this.currentOperand.innerText = this.current;
    }
}

const calculator = new Calculator(previousOperand, currentOperand);

numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', () => {
        calculator.addNumber(numBtn.innerText);
        calculator.updateDisplay();
    })
})

allClearBtn.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
})

clearOneBtn.addEventListener('click', () => {
    calculator.clearOne();
    calculator.updateDisplay();
})

operationBtns.forEach(operationBtn => {
    operationBtn.addEventListener('click', () => {
        calculator.chooseBasicOperation(operationBtn.innerText);
        calculator.updateDisplay();
    })
})

equalToBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
