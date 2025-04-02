document.addEventListener("DOMContentLoaded", () => {
    // notatie :Login functionaliteit
    const loginForm = document.getElementById("loginForm");
    const favorietenSectie = document.getElementById("favorietenSectie");
    const favorietenGrid = document.getElementById("favorietenGrid");
  
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
            toonFavorieten();
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
  
    // notatie : automatisch tonen van favorieten bij actieve gebruiker
    if (localStorage.getItem("isUser") === "true" && favorietenSectie) {
      toonFavorieten();
    }
  
    // notatie :Favorieten overzicht tonen
    function toonFavorieten() {
      if (loginForm) loginForm.style.display = "none";
      if (favorietenSectie) favorietenSectie.style.display = "block";
  
      const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
      favorietenGrid.innerHTML = "";
  
      if (favorieten.length === 0) {
        favorietenGrid.innerHTML = "<p>Je hebt nog geen favorieten opgeslagen.</p>";
        return;
      }
  
      favorieten.forEach((item, index) => {
        const kaart = document.createElement("div");
        kaart.className = "locatie-kaart";
  
        const afbeelding = item.afbeelding || "https://via.placeholder.com/400x200?text=Geen+afbeelding";
  
        kaart.innerHTML = `
          <img src="${afbeelding}" alt="Afbeelding van ${item.titel}" class="locatie-afbeelding" />
          <div class="locatie-inhoud">
            <h2>${item.titel}</h2>
            <p>${item.beschrijving || "Geen beschrijving."}</p>
            <p><strong>📍</strong> ${item.adres || "Onbekend adres"}</p>
            <button class="favoriet-btn actief" onclick="verwijderFavoriet(${index})">❤️ Verwijder</button>
          </div>
        `;
  
        favorietenGrid.appendChild(kaart);
      });
    }
  });
  
  // notatie :Logout functies
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
  
  // notatie :Verwijderen vanuit favorieten
  function verwijderFavoriet(index) {
    const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
    favorieten.splice(index, 1);
    localStorage.setItem("favorieten", JSON.stringify(favorieten));
    location.reload();
  }
  
  window.verwijderFavoriet = verwijderFavoriet;
  