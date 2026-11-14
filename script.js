
const form = document.getElementById("registrationForm");

// Input fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const courseInput = document.getElementById("course");
const termsInput = document.getElementById("terms");

const successMessage = document.getElementById("successMessage");

// Display error message
function showError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
}

// Clear error message
function clearError(fieldId) {
    document.getElementById(fieldId + "Error").textContent = "";
}

// Clear all errors
function clearAllErrors() {
    const errors = document.querySelectorAll(".error");

    errors.forEach(function(error) {
        error.textContent = "";
    });
}

// Email validation
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Validate name
function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        showError("name", "Full name is required.");
        return false;
    }

    if (name.length < 3) {
        showError("name", "Name must contain at least 3 characters.");
        return false;
    }

    clearError("name");
    return true;
}

// Validate email
function validateEmail() {
    const email = emailInput.value.trim();

    if (email === "") {
        showError("email", "Email address is required.");
        return false;
    }

    if (!isValidEmail(email)) {
        showError("email", "Please enter a valid email address.");
        return false;
    }

    clearError("email");
    return true;
}

// Validate phone
function validatePhone() {
    const phone = phoneInput.value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
        showError("phone", "Enter a valid 10-digit phone number.");
        return false;
    }

    clearError("phone");
    return true;
}

// Validate password
function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        showError("password", "Password is required.");
        return false;
    }

    if (password.length < 8) {
        showError("password", "Password must be at least 8 characters.");
        return false;
    }

    clearError("password");
    return true;
}

// Validate confirm password
function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        showError("confirmPassword", "Please confirm your password.");
        return false;
    }

    if (password !== confirmPassword) {
        showError("confirmPassword", "Passwords do not match.");
        return false;
    }

    clearError("confirmPassword");
    return true;
}

// Validate course
function validateCourse() {
    if (courseInput.value === "") {
        showError("course", "Please select a course.");
        return false;
    }

    clearError("course");
    return true;
}

// Validate terms
function validateTerms() {
    if (!termsInput.checked) {
        showError("terms", "Please accept the terms and conditions.");
        return false;
    }

    clearError("terms");
    return true;
}

// Live validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", function() {
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
courseInput.addEventListener("change", validateCourse);

termsInput.addEventListener("change", validateTerms);

// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    clearAllErrors();
    successMessage.textContent = "";

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isCourseValid = validateCourse();
    const areTermsAccepted = validateTerms();

    if (
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isCourseValid &&
        areTermsAccepted
    ) {
        successMessage.textContent =
            "Registration successful! All details are valid.";

        form.reset();
        clearAllErrors();
    }
});
