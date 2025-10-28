// Grab DOM elements
const button = document.getElementById("myButton");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// Helper to locate label and error container
function getFieldGroup(input) {
  return input.closest(".calculator__input-field");
}

// Validation helpers
function isValidDay(day) {
  const d = parseInt(day);
  return d >= 1 && d <= 31;
}

function isValidMonth(month) {
  const m = parseInt(month);
  return m >= 1 && m <= 12;
}

function isValidYear(year) {
  const y = parseInt(year);
  const currentYear = new Date().getFullYear();
  return y >= 1900 && y <= currentYear;
}

// Show field error below input
function showFieldError(input, message) {
  const group = getFieldGroup(input);
  if (!group) return;

  // remove old error first
  clearFieldError(input);

  const error = document.createElement("p");
  error.classList.add("error-message");
  error.textContent = message;
  error.style.color = "red";
  error.style.fontSize = "0.8rem";
  error.style.margin = "0.3rem 0 0";

  const label = group.querySelector("label");
  if (label) label.classList.add("error-label");

  input.classList.add("error");
  group.appendChild(error);
}

// Clear field error
function clearFieldError(input) {
  const group = getFieldGroup(input);
  if (!group) return;
  const error = group.querySelector(".error-message");
  const label = group.querySelector("label");
  if (error) error.remove();
  if (label) label.classList.remove("error-label");
  input.classList.remove("error");
}

// Real-time validation feedback
[dayInput, monthInput, yearInput].forEach((input) => {
  input.addEventListener("input", () => clearFieldError(input));

  input.addEventListener("blur", () => {
    if (input === dayInput && !isValidDay(input.value)) {
      showFieldError(dayInput, "Please enter a valid day (1–31).");
    } else if (input === monthInput && !isValidMonth(input.value)) {
      showFieldError(monthInput, "Please enter a valid month (1–12).");
    } else if (input === yearInput) {
      const currentYear = new Date().getFullYear();
      const enteredYear = parseInt(input.value);
      if (enteredYear > currentYear) {
        showFieldError(yearInput, "Year must be in the past.");
      } else if (!isValidYear(enteredYear)) {
        showFieldError(yearInput, "Please enter a valid year (1900–present).");
      }
    }
  });
});

// Main button click handler
button.addEventListener("click", function () {
  // Clear any existing errors first
  [dayInput, monthInput, yearInput].forEach(clearFieldError);

  let isValid = true;

  // Validate fields
  if (!isValidDay(dayInput.value)) {
    showFieldError(dayInput, "Please enter a valid day (1–31).");
    isValid = false;
  }

  if (!isValidMonth(monthInput.value)) {
    showFieldError(monthInput, "Please enter a valid month (1–12).");
    isValid = false;
  }

  if (!isValidYear(yearInput.value)) {
    const y = parseInt(yearInput.value);
    if (y > new Date().getFullYear()) {
      showFieldError(yearInput, "Year must be in the past.");
    } else {
      showFieldError(yearInput, "Please enter a valid year (1900–present).");
    }
    isValid = false;
  }

  if (!isValid) return; // stop if any invalid

  // Parse inputs
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Result elements
  const yearsEl = document.querySelector(".calculator__years .calculator__value");
  const monthsEl = document.querySelector(".calculator__months .calculator__value");
  const daysEl = document.querySelector(".calculator__days .calculator__value");

  // Create date objects
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
