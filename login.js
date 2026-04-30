function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Simple hardcoded login
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password");
  }
}

function forgotPassword() {
  alert("Demo app: Username = admin, Password = 1234");
}