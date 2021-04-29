class Calculator {
  constructor(prevElement, currElement) {
    this.prevElement = prevElement;
    this.currElement = currElement;
    this.clear();
  }

  formatNumber(number) {
 
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay
    if(isNaN(integerDigits)){
      integerDisplay = ""
    }else{
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay
    }
  }

  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  update() {
    this.currElement.innerText = this.formatNumber(this.currOperand);
    if(this.operation != null){
      this.prevElement.innerText = `${this.formatNumber(this.prevOperand)} ${this.operation}`
    }else{
      this.prevElement.innerText = this.formatNumber(this.prevOperand)
    }
  }

  append(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === "") return;

    //performing direct operations without clicking equals to button
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  compute() {
    let result; //storing the result
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "−":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      default:
        return;
    }
    //resesting numbers
    this.currOperand = result;
    this.operation = undefined;
    this.prevOperand = "";
  }
}

let numberButtons = document.querySelectorAll("[ data-number]");
let prevElement = document.querySelector("[ data-previous-operand]");
let currElement = document.querySelector("[ data-current-operand]");
let deleteButton = document.querySelector("[ data-delete]");
let allClearButton = document.querySelector("[data-all-clear]");
let operationButtons = document.querySelectorAll("[ data-operation]");
let EqaulsButton = document.querySelector("[data-equals]");

let calculator = new Calculator(prevElement, currElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText);
    calculator.update();
  });
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.update();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.update();
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.update();
  });
});

EqaulsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.update();
});
