document.addEventListener('DOMContentLoaded', function () {
    // Initialize intl-tel-input
    const phoneInput = document.getElementById('phone');
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch('https://ipinfo.io/json?token=<YOUR_TOKEN>')
                .then(response => response.json())
                .then(data => callback(data.country_code))
                .catch(() => callback('us'));
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
    });

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const strengthMessage = document.getElementById('password-strength-message');

    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        let strength = 'weak';

        if (password.length > 8) {
            strength = 'medium';
            if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
                strength = 'strong';
            }
        }

        strengthMessage.textContent = strength === 'weak' ? 'Password is weak' : (strength === 'medium' ? 'Password is medium' : 'Password is strong');
        strengthMessage.className = `password-strength-message ${strength}`;
    });

    // Handle form submission
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const phone = iti.getNumber(); // Get the phone number with country code
        const dob = document.getElementById('dob').value;
        const address = document.getElementById('address').value;
        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
        const terms = document.getElementById('terms').checked;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (terms) {
            alert('Registration form submitted successfully');
            document.getElementById('registerForm').reset();
        } else {
            alert('You must accept the terms and conditions to register');
        }
    });
});
