// script.js
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
  
    // Basic client-side validation (you should have more robust checks)
    if (!username) {
      alert("Please enter a username.");
      return;
    }
  
    if (!phone) {
      alert("Please enter a phone number.");
      return;
    }
  
    // You can add more validation here (e.g., check phone number format)
  
    // If all validations pass, you can submit the form or send data to the server
    alert("Sign Up button clicked (No actual signup yet!)");
    // You would typically use fetch or XMLHttpRequest to send data to your server here
  });

  // script.js
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Clear previous errors
    document.getElementById('passwordError').textContent = "";
    document.getElementById('confirmPasswordError').textContent = "";
  
    let hasErrors = false; // Flag to track errors
  
    if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').textContent = "Passwords do not match!";
      hasErrors = true;
    }
  
    if (password.length < 8 || password.length > 12) {
      document.getElementById('passwordError').textContent = "Password must be 8-12 characters long.";
      hasErrors = true;
    }
  
    // ... (Add more password condition checks here) ...
  
    if (hasErrors) {
      return; // Stop submission if there are errors
    }
  
    // If all validations pass
    alert("Sign Up button clicked (No actual signup yet!)");
    // You would typically use fetch or XMLHttpRequest to send data to your server here
  });