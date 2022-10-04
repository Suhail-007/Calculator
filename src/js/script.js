const numbersBtn = document.querySelectorAll('[data-number]');
const currOperandElem = document.querySelector('[data-current-answer]');
const prevOperandElem = document.querySelector('[data-previous-answer]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const equalsToBtn = document.querySelector('[data-equals]');


class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    //if there's only curr operand
    this.currentOperand = this.currentOperand.toString().slice(0, -1);

    //if prev operand not empty and curr operand is empty, delete digit from prev operand
    if (this.previousOperand !== '' && this.currentOperand === '') {

      this.currentOperand = this.previousOperand.toString().slice(0, -1);
      this.previousOperand = ''
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  operations(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.operation = undefined;
      this.operation = operation
      this.compute();
    }

    this.operation = operation;
    this.currentOperand += this.operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  changeOperation(operation) {
    this.operation = operation;
    if (this.previousOperand !== '' && this.currentOperand === '') {
      this.previousOperand = this.previousOperand.toString().slice(0, -1);
      this.previousOperand += this.operation;

      this.compute();
    }

  }

  compute() {

    if (this.previousOperand === '' || this.currentOperand === '') return

    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    let result;
    switch (this.operation) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '÷':
        result = prev / curr
        break;
      default:
        return
    }

    this.currentOperand = result.toString();
    this.previousOperand = '';
  }


  updateDisplay() {
    currOperandElem.innerText = this.currentOperand;
    prevOperandElem.innerText = this.previousOperand;
  }
}

const calculator = new Calculator(prevOperandElem, currOperandElem);

numbersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  })
})

operationsBtn.forEach(operationBtn => {
  operationBtn.addEventListener('click', () => {
    calculator.operations(operationBtn.innerText);
    calculator.changeOperation(operationBtn.innerText);
    calculator.updateDisplay()
  })
})

allClearBtn.addEventListener('click', () => {
  calculator.clearAll()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

equalsToBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("scientific-tab").classList.toggle("show");
  document.getElementById("openBtn").classList.toggle("w");

});

/* to close the opened window */
window.onclick = () => {
  if (event.target === document.getElementById("scientific-tab")) {
    document.getElementById("scientific-tab").classList.remove("show")
    document.getElementById("openBtn").classList.remove("w");
  }
  return;
}
