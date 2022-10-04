const numbersBtn = document.querySelectorAll('[data-number]');
const currentAnswerEle = document.querySelector('[data-current-answer]');
const previousAnswerEle = document.querySelector('[data-previous-answer]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const equalsToBtn = document.querySelector('[data-equals]');

function printNumbers(number) {
  if (number.innerText === '.' && currentAnswerEle.innerText.includes('.')) return;
  else currentAnswerEle.innerText = currentAnswerEle.innerText + number.innerText;
}

function printSigns(operationSigns) {

  if (currentAnswerEle.innerText !== '') {
    currentAnswerEle.innerText += operationSigns;
  }

  /*this will move the currentAnswer to previous answer with sign*/
  if (currentAnswerEle.innerText.includes(operationSigns)) {
    previousAnswerEle.innerText = currentAnswerEle.innerText;
    currentAnswerEle.innerText = '';
  }
  
  if (previousAnswerEle.innerText !== '') {
    compute(operationSigns);
  }
}

function compute(operationSigns) {
  let computation;
  const prev = parseFloat(previousAnswerEle.innerText);
  const current = parseFloat(currentAnswerEle.innerText);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operationSigns) {
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

  currentAnswerEle.innerText = computation
  previousAnswerEle.innerText = ""
}

function allClear() {
  currentAnswerEle.innerText = '';
  previousAnswerEle.innerText = '';
}

function deleteNumber() {
  currentAnswerEle.innerText = currentAnswerEle.innerText.toString().slice(0, -1);
}

numbersBtn.forEach(button => {
  button.addEventListener('click', () => {
    printNumbers(button);
  })
})

operationsBtn.forEach(button => {
  button.addEventListener('click', () => {
    printSigns(button.innerText);
    equalsToBtn.addEventListener('click', () => {
      compute(button.innerText)
    }, { once: true });
  })
})

deleteBtn.addEventListener('click', deleteNumber);
allClearBtn.addEventListener('click', allClear);

/* To open and close the scientific calculator tab */
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("scientific-tab").classList.toggle("show");
  document.getElementById("openBtn").classList.toggle("w");
});

/* to close the opened window */
window.onclick = () => {
  if (event.target === document.getElementById("scientific-tab")) {
    document.getElementById("scientific-tab").classList.remove("show");
    document.getElementById("openBtn").classList.remove("w");
  }
  return;
}
