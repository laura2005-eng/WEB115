const form = document.getElementById("myForm");
const inputField = document.getElementById("inputField");

form.addEventListener("submit", function(event) {


// Prevent form from submitting
event.preventDefault();

// Retrieve the input field value
const inputValue = inputField.value;

// Regular expression pattern for alphanumeric input
const alphanumericPattern = /^[a-zA-Z0-9]+$/;

// Check if the input value matches the pattern
if (alphanumericPattern.test(inputValue)) {

    // Valid input: display confirmation
    alert("Form submitted successfully!");

} else {

    // Invalid input: display error message
    alert("Error: Please enter alphanumeric characters only.");
}


});
