const numbersBtn = document.querySelectorAll('.num');
const currOperandElem = document.querySelector('[data-current-answer]');
const prevOperandElem = document.querySelector('[data-previous-answer]');
const operationsBtn = document.querySelectorAll('.operation');
const deleteBtn = document.querySelector('.delete');
const allClearBtn = document.querySelector('.all_clear');
const equalsToBtn = document.querySelector('.equal_to_btn');
const form = document.querySelector('form');
const threeDotsMenu = document.querySelector('.dot_menu');

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
    this.updateDisplay()
  }

  delete() {
    //if there's only curr operand
    this.currentOperand = this.currentOperand.toString().slice(0, -1);

    //if prev operand not empty and curr operand is empty, delete digit from prev operand
    if (this.previousOperand !== '' && this.currentOperand === '') {

      this.currentOperand = this.previousOperand.toString().slice(0, -1);
      this.previousOperand = ''
    }
    this.updateDisplay()
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand.length > 30) return alert('You cannot add more than 20 digits')

    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  _toggleFormEdit(elem) {
    elem.classList.toggle('open');
  }

  getPrevOperandValue() {
    if (this.previousOperand === '') return
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
    if (this.currentOperand === '' || this.currentOperand === '.') return
    if (this.previousOperand !== '') {
      this.operation = undefined;
      this.operation = operation
      this.compute();
    }

    this.operation = operation;
    this.currentOperand += this.operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay()
  }

  changeOperation(operation) {
    if (this.previousOperand !== '' && this.currentOperand === '') {
      this.operation = operation;
      this.previousOperand = this.previousOperand.toString().slice(0, -1);
      this.previousOperand += this.operation;

      this.compute();
      this.updateDisplay()
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
    this.updateDisplay();
  }

  closeScientificTab(e) {
    if (e.target.matches(".scientific-tab")) {
      scientificTab.classList.remove("open")
      scientificTabBtn.classList.remove("move");
    }

    if (e.target.matches("form")) form.classList.remove('open');

    //DROP DOWN**************
    const isDotMenu = e.target.matches('.dot_menu_btn');

    if (!isDotMenu && e.target.closest('.dot_menu') != null) return

    const dotMenuItems = document.querySelector('.dot_menu_items');

    if (isDotMenu) dotMenuItems.classList.add('active');
    else dotMenuItems.classList.remove('active');
  }

  dotMenu(e) {
    const body = document.body;

    const dataset = e.target.dataset?.theme;
    if (!dataset) return;

    dataset === 'system default' ? this._systemDefaultTheme(body) : dataset === 'light' ? body.classList.remove('dark') : dataset === 'dark' ? body.classList.add('dark') : '';
  }

  _systemDefaultTheme(body) {
    const hours = new Date().getHours();
    const isDayTime = hours >= 18 || hours <= 6;
    
    if (isDayTime) body.classList.add('dark');
    else body.classList.remove('dark');
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
  })
})

operationsBtn.forEach(operationBtn => {
  operationBtn.addEventListener('click', () => {
    calculator.operations(operationBtn.innerText);
    calculator.changeOperation(operationBtn.innerText);
  })
})

allClearBtn.addEventListener('click', calculator.clearAll.bind(calculator))

deleteBtn.addEventListener('click', calculator.delete.bind(calculator))

equalsToBtn.addEventListener('click', calculator.compute.bind(calculator))

const scientificTab = document.getElementById("scientific-tab");
const scientificTabBtn = document.querySelector(".openBtn");

scientificTabBtn.addEventListener("click", () => {
  scientificTab.classList.toggle("open");
  scientificTabBtn.classList.toggle("move");
});

prevOperandElem.addEventListener('click', () => {
  calculator.getPrevOperandValue();
})

form.addEventListener('submit', calculator.editPrevOperand.bind(calculator));

document.addEventListener('click', calculator.closeScientificTab);

threeDotsMenu.addEventListener('click', calculator.dotMenu.bind(calculator));
