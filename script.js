document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;


    if (!username || !email || !password) {
        document.getElementById("error-message").textContent = "Please fill in all fields.";
        return;
    }

    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const passwordBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashedPassword = Array.from(new Uint8Array(passwordBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');

        console.log("Username: " + username);
        console.log("Email: " + email);
        console.log("Hashed Password: " + hashedPassword);
        console.log("Remember Me: " + rememberMe);

    } catch (error) {
        console.error("Password hashing error: " + error);
        document.getElementById("error-message").textContent = "An error occurred during password hashing.";
    }
});