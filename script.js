/* declaring a class this will handle all the operations done by calculator */
class Calculator {
  constructor(previousAnswer, currentAnswer) {
    this.previousAnswer = previousAnswer;
    this.currentAnswer = currentAnswer;
    this.clear();
  }

  /* All the functions calculator gonna have */
  clear() {
    this.previousAnswer = "";
    this.currentAnswer = "";
    this.chooseOperation = undefined;
  }

  delete() {
    this.currentAnswer = this.currentAnswer.toString().slice(0, -1);
    if (this.currentAnswer === "" && this.previousAnswer !== "") {
      this.previousAnswer = this.previousAnswer.toString().slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentAnswer.includes(".")) return {}
    this.currentAnswer = this.currentAnswer.toString() + number.toString();
  }

  chooseSign(operation) {
    if (this.currentAnswer === "") return;
    if (this.previous !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousAnswer = this.currentAnswer;
    this.currentAnswer = "";
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousAnswer);
    const current = parseFloat(this.currentAnswer);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return
    }
    this.currentAnswer = computation;
    this.choose = undefined;
    this.previousAnswer = "";
  }

  updateDisplay() {
    currentElementText.innerText = this.currentAnswer
    previousElementText.innerText = this.previousAnswer;
    if (this.previousAnswer !== "") {
      previousElementText.innerText = `${this.previousAnswer} ${this.operation}`
    }
  }

} /* Constructor */

/* Declaring variables */
const numbersBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allclearBtn = document.querySelector("[data-all-clear]");
const previousElementText = document.querySelector("[data-previous-answer]");
const currentElementText = document.querySelector("[data-current-answer]");


const calculator = new Calculator(previousElementText, currentElementText);


numbersBtn.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});

operationBtn.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseSign(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
})

allclearBtn.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
})


/* To open and close the scientific calculator tab */
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
