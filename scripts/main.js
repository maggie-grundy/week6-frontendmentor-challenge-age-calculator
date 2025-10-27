// Grab inputs and error container
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearsInput = document.getElementById("year");
const errorMessageDiv = document.getElementById("errorMessage"); // Make sure this exists

// Make error validation prettier later!

// Helper functions
function isValidMonth(month) {
  const m = parseInt(month);
  return m >= 1 && m <= 12;
}

function isValidYears(year) {
  const y = parseInt(year);
  return y >= 1900 && y <= new Date().getFullYear();
}

function displayError(message, inputEl) {
  const p = document.createElement("p");
  p.textContent = message;
  p.style.color = "red";
  errorMessageDiv.appendChild(p);
  inputEl.classList.add("error");
}

// Button click
const button = document.getElementById("myButton");
button.addEventListener("click", function () {
  errorMessageDiv.innerHTML = ''; // Clears previous errors
  let isValid = true;

  if (dayInput.value.trim() === '') {
    displayError('Day is required.', dayInput);
    isValid = false;
  }

  if (!isValidMonth(monthInput.value)) {
    displayError('Month is required.', monthInput);
    isValid = false;
  }

  if (!isValidYears(yearsInput.value)) {
    displayError('Year is required.', yearsInput);
    isValid = false;
  }

  if (!isValid) return; // Stop calculation if invalid

  // Get numeric values
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearsInput.value);

  // Result elements
  const yearsEl = document.querySelector(".calculator__years .calculator__value");
  const monthsEl = document.querySelector(".calculator__months .calculator__value");
  const daysEl = document.querySelector(".calculator__days .calculator__value");

  // Calculate age
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  // Display results
  yearsEl.textContent = years;
  monthsEl.textContent = months;
  daysEl.textContent = days;
});
