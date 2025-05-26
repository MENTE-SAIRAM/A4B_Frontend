const API_BASE = "http://13.53.214.239:5000/api/users";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const cartLink = document.getElementById("add-to-cart");
  const orderLink = document.getElementById("orderBtn");

  function getAuth() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    return { token, user };
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user_id = loginForm.username.value.trim();
      const password = loginForm.password.value.trim();

      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ user_id }));

        alert("Login successful!");
        window.location.href = "index.html";
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
     mixpanel.identify(user_id);  // Unique user ID
mixpanel.track("User Logged In", {
  user_id,
  time: new Date().toISOString()
});
mixpanel.people.set({
  $name: user_id,
  role: "customer",
  login_time: new Date().toISOString()
});
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user_id = registerForm.username.value.trim();
      const password = registerForm.password.value.trim();

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
    // After successful registration
mixpanel.track("User Registered", {
  user_id,
  time: new Date().toISOString()
});
  }

  const { token, user } = getAuth();

  if (token && user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline";
  } else {
    if (loginBtn) loginBtn.style.display = "inline";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }

  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      if (!token || !user) {
        e.preventDefault();
        alert("Please login to add products to the cart.");
        window.location.href = "login.html";
      }
    });
  }

  if (orderLink) {
    orderLink.addEventListener("click", (e) => {
      if (!token || !user) {
        e.preventDefault();
        alert("Please login to access your orders.");
        window.location.href = "login.html";
      }
    });
  }
 


});
// After successful login

