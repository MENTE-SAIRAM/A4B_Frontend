const API_BASE = "http://localhost:5000/api/users";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const cartLink = document.getElementById("cartBtn");
  const orderLink = document.getElementById("orderBtn");
  const cartBtns = document.querySelectorAll(".add-to-cart");

  // Handle login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value.trim();

      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        // ✅ Store both token and username
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ username }));

        alert("Login successful!");
        window.location.href = "index.html";
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  }

  // Handle registration
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = registerForm.username.value.trim();
      const password = registerForm.password.value.trim();

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  }

  // ✅ UI update based on login state
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline";
  } else {
    if (loginBtn) loginBtn.style.display = "inline";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }

  // ✅ Prevent cart access if not logged in
  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      if (!token || !user) {
        e.preventDefault();
        alert("Please login to access the cart.");
        window.location.href = "login.html";
      }
    });
  }

  // ✅ Prevent order history access if not logged in
  if (orderLink) {
    orderLink.addEventListener("click", (e) => {
      if (!token || !user) {
        e.preventDefault();
        alert("Please login to access your order history.");
        window.location.href = "login.html";
      }
    });
  }

  // ✅ Prevent add-to-cart actions if not logged in
  if (cartBtns.length > 0) {
    cartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (!token || !user) {
          e.preventDefault();
          alert("Please login to add items to cart.");
          window.location.href = "login.html";
        }
      });
    });
  }
});
