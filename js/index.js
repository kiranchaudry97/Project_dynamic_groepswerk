document.addEventListener('DOMContentLoaded', () => {

  // Thema toggle
  const toggleButton = document.getElementById('toggleTheme');
  const body = document.body;

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';

      switch (currentTheme) {
        case 'dark':
          body.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          break;
        case 'light':
        default:
          body.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          break;
      }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
    }
  }

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

  // Favorieten overzicht
  const container = document.getElementById("favorietenGrid");
  if (container) {
    const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];

    if (favorieten.length === 0) {
      container.innerHTML = "<p>Je hebt nog geen favorieten opgeslagen.</p>";
    } else {
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
            <button onclick="verwijderFavoriet(${index})" class="favoriet-btn actief">Verwijder ❤️</button>
          </div>
        `;

        container.appendChild(kaart);
      });
    }
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

// Maak de logout functies beschikbaar
window.logoutUser = logoutUser;
window.logoutAdmin = logoutAdmin;

// Toevoegen aan favorieten vanuit andere pagina's
function voegToeAanFavorieten(titel, beschrijving, adres, afbeelding) {
  const huidige = JSON.parse(localStorage.getItem("favorieten")) || [];
  huidige.push({
    titel,
    beschrijving,
    adres,
    afbeelding
  });
  localStorage.setItem("favorieten", JSON.stringify(huidige));
  alert("✅ Toegevoegd aan favorieten!");
}
window.voegToeAanFavorieten = voegToeAanFavorieten;

// Verwijderen vanuit favorietenpagina
function verwijderFavoriet(index) {
  const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
  favorieten.splice(index, 1);
  localStorage.setItem("favorieten", JSON.stringify(favorieten));
  window.location.reload();
}
window.verwijderFavoriet = verwijderFavoriet;
