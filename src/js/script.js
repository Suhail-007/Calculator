const numbersBtn = document.querySelectorAll('.num');
const currOperandElem = document.querySelector('[data-current-answer]');
const prevOperandElem = document.querySelector('[data-previous-answer]');
const operationsBtn = document.querySelectorAll('.operation');
const deleteBtn = document.querySelector('.delete');
const allClearBtn = document.querySelector('.all_clear');
const equalsToBtn = document.querySelector('.equal_to_btn');
const form = document.querySelector('form');

class Calculator {
  _input = document.querySelector('input');
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
    if (this.currentOperand.length > 30) return alert('You cannot add more than 20 digits')

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  _toggleFormEdit(elem) {
    elem.classList.toggle('open');
  }

  getPrevOperandValue() {
    this._toggleFormEdit(form)
    this.value = this.previousOperand;
    this._input.value = parseInt(this.previousOperand);
  }

  editPrevOperand(e) {
    e.preventDefault();
    this._toggleFormEdit(form);

    this.previousOperand = `${parseInt(this._input.value)}${this.operation}`;
    
    this.updateDisplay();
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

const scientificTab = document.getElementById("scientific-tab");
const scientificTabBtn = document.querySelector(".openBtn");

scientificTabBtn.addEventListener("click", () => {
  scientificTab.classList.toggle("open");
  scientificTabBtn.classList.toggle("move");
});

/* to close the opened window */
window.addEventListener('click', (e) => {
  if (e.target.matches(".scientific-tab")) {
    scientificTab.classList.remove("open")
    scientificTabBtn.classList.remove("move");
  }

  if (e.target.matches("form")) form.classList.remove('open');
})

prevOperandElem.addEventListener('click', () => {
  calculator.getPrevOperandValue();
  calculator.updateDisplay();
})

form.addEventListener('submit', calculator.editPrevOperand.bind(calculator));