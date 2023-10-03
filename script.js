const display = document.getElementById("display");
let currentInput = "";
let currentOperation = "";
let firstOperand = null;

// Fungsi untuk memperbarui tampilan layar
function updateDisplay() {
  display.value = currentInput === "" ? "0" : currentInput;
}

// Fungsi untuk mengosongkan kalkulator
function clearCalculator() {
  currentInput = "";
  currentOperation = "";
  firstOperand = null;
  updateDisplay();
}

// Fungsi untuk melakukan operasi matematika
function performOperation() {
  const secondOperand = parseFloat(currentInput);
  switch (currentOperation) {
	case "+":
	  firstOperand += secondOperand;
	  break;
	case "-":
	  firstOperand -= secondOperand;
	  break;
	case "*":
	  firstOperand *= secondOperand;
	  break;
	case "÷":
	  firstOperand /= secondOperand;
	  break;
  }
}

// Fungsi untuk menangani klik tombol angka
function handleNumberClick(number) {
  currentInput += number;
  updateDisplay();
}

// Fungsi untuk menangani klik tombol operasi matematika
function handleOperationClick(operation) {
  if (currentInput !== "") {
	if (firstOperand === null) {
	  firstOperand = parseFloat(currentInput);
	} else {
	  performOperation();
	}
	currentOperation = operation;
	currentInput = "";
	updateDisplay();
  }
}

// Fungsi untuk menangani klik tombol sama dengan (=)
function handleEqualsClick() {
  if (currentInput !== "") {
	if (firstOperand !== null) {
	  performOperation();
	  currentInput = String(firstOperand);
	  currentOperation = "";
	  firstOperand = null;
	  updateDisplay();
	}
  }
}

// Fungsi untuk menangani klik tombol menghapus (C)
function handleClearClick() {
  clearCalculator();
}

// Menambahkan event listener ke semua tombol dalam kalkulator
document.querySelectorAll("button").forEach(button => {
  if (button.hasAttribute("data-number")) {
	button.addEventListener("click", () => {
	  handleNumberClick(button.textContent);
	});
  } else if (button.hasAttribute("data-operation")) {
	button.addEventListener("click", () => {
	  handleOperationClick(button.textContent);
	});
  } else if (button.hasAttribute("data-equals")) {
	button.addEventListener("click", () => {
	  handleEqualsClick();
	});
  } else if (button.hasAttribute("data-clear")) {
	button.addEventListener("click", () => {
	  handleClearClick();
	});
  }
});