console.log("Hello from script.js");

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      window.location.href = "/home";
    }
  } catch (error) {
    console.log(error);
  }
});
