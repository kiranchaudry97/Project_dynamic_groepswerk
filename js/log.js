document.addEventListener("DOMContentLoaded", () => {
    // Login functionaliteit
    const loginForm = document.getElementById("loginForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const rol = document.getElementById("rol").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
  
        if (rol === "gebruiker") {
          if (email === "gebruiker@brussel.be" && password === "user123") {
            localStorage.setItem("isUser", "true");
            alert("✅ Welkom gebruiker!");
            window.location.href = "index.html";
          } else {
            alert("❌ Ongeldige gebruikersgegevens");
          }
  
        } else if (rol === "admin") {
          if (email === "admin@brussel.be" && password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            alert("✅ Welkom admin!");
            window.location.href = "admin.html";
          } else {
            alert("❌ Ongeldige admingegevens");
          }
  
        } else {
          alert("⚠️ Kies een rol om in te loggen.");
        }
      });
    }
  });
  
  // Logout functies
  function logoutUser() {
    localStorage.removeItem("isUser");
    alert("Je bent uitgelogd als gebruiker.");
    window.location.href = "user_login.html";
  }
  
  function logoutAdmin() {
    localStorage.removeItem("isAdmin");
    alert("Je bent uitgelogd als admin.");
    window.location.href = "admin_login.html";
  }
  
  window.logoutUser = logoutUser;
  window.logoutAdmin = logoutAdmin;
  