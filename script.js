// script.js
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const registerButton = document.getElementById("registerButton");
    const form = document.getElementById("preparednessForm");
  
    // Function to check if all checkboxes are checked
    function validateCheckboxes() {
      const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
      registerButton.disabled = !allChecked; // Enable button only if all are checked
    }
  
    // Add event listener to each checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", validateCheckboxes);
    });
  
    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!registerButton.disabled) {
        alert("You have successfully registered!");
      } else {
        alert("Please check all the boxes to proceed.");
      }
    });
  });