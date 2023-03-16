// Define a global array to store calculation history
const history = [];

// Get elements from DOM
const calculatorForm = $("#calculator-form");
const clearBtn = $("#clear-btn");
const resultEl = $("#result");
const historyList = $("#history-list");

// Load history on page load
$(document).ready(() => {
  loadHistory();
});

// Handle form submit
calculatorForm.submit(e => {
  e.preventDefault();

  // Extract input values from form
  const num1 = parseFloat($("input[name=num1]").val());
  const num2 = parseFloat($("input[name=num2]").val());
  const operation = $("select[name=operation]").val();

  // Check for valid input
  if (isNaN(num1) || isNaN(num2)) {
    alert("Please enter valid numbers");
    return;
  }

  // Perform calculation
  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num1 / num2;
      break;
    default:
      result = "Invalid operation";
  }
  resultEl.text(result);

  // Add calculation to history
  const calculation = {
    num1,
    num2,
    operation,
    result
  };
  history.push(calculation);
  saveHistory();

  // Render calculation in history list
  renderCalculation(calculation);

  // Reset form
  calculatorForm.trigger("reset");
});

// Handle clear button click
clearBtn.click(() => {
  historyList.empty();
  resultEl.text("");
});

// Load history from local storage
function loadHistory() {
  const savedHistory = JSON.parse(localStorage.getItem("history"));
  if (savedHistory) {
    history.push(...savedHistory);
    savedHistory.forEach(renderCalculation);
  }
}

// Save history to local storage
function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

// Render calculation in history list
function renderCalculation(calculation) {
  const listItem = $("<li>");
  listItem.text(
    `${calculation.num1} ${calculation.operation} ${calculation.num2} = ${
      calculation.result
    }`
  );
  historyList.prepend(listItem);
}
