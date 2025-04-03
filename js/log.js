if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const rol = document.getElementById("rol").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let validLogin = false;
//switch-case voor keuze user
    switch (rol) {
      case "gebruiker":
        if (email === "gebruiker@brussel.be" && password === "user123") {
          localStorage.setItem("isUser", "true");
          alert("✅ Welkom gebruiker!");
          window.location.href = "favorieten.html";
          validLogin = true;
        } else {
          alert("⚠ Ongeldige gebruikersgegevens");
        }
        break;

      case "admin":
        if (email === "admin@brussel.be" && password === "admin123") {
          localStorage.setItem("isAdmin", "true");
          alert("✅ Welkom admin!");
          window.location.href = "admin_login.html";
          validLogin = true;
        } else {
          alert("⚠ Ongeldige admingegevens");
        }
        break;

      default:
        alert(" Kies een rol om in te loggen.");
        break;
    }

    if (!validLogin && rol !== "gebruiker" && rol !== "admin") {
      alert("⚠ Ongeldige rol.");
    }
  });
}

if (localStorage.getItem("isUser") === "true" && favorietenSectie && favorietenGrid) {
  toonFavorieten();
}

//functie die favorieten toont

function toonFavorieten() {
  if (loginForm) loginForm.style.display = "none";
  if (favorietenSectie) favorietenSectie.style.display = "block";

  const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
  let favorietenHTML = "";

  if (favorieten.length) {
    favorieten.forEach((item, index) => {
      favorietenHTML += `
        <div class="locatie-kaart">
          <img src="${item.afbeelding || 'https://via.placeholder.com/400x200?text=Geen+afbeelding'}" alt="Afbeelding van ${item.titel}" class="locatie-afbeelding" />
          <div class="locatie-inhoud">
            <h2>${item.titel}</h2>
            <p>${item.beschrijving || "Geen beschrijving."}</p>
            <p><strong>📍</strong> ${item.adres || "Onbekend adres"}</p>
            <button class="favoriet-btn actief" onclick="verwijderFavoriet(${index})">❤ Verwijder</button>
          </div>
        </div>
      `;
    });
  } else {
    favorietenHTML = "<p>Je hebt nog geen favorieten opgeslagen.</p>";
  }

  favorietenGrid.innerHTML = favorietenHTML;
}
  // Logout functies voor elke user

  function logoutUser() {
    localStorage.removeItem("isUser");
    alert("Je bent uitgelogd als gebruiker.");
    window.location.href = "login.html"; // 
  }
  
  function logoutAdmin() {
    localStorage.removeItem("isAdmin");
    alert("Je bent uitgelogd als admin.");
    window.location.href = "admin_login.html";
  }
  
  window.logoutUser = logoutUser;
  window.logoutAdmin = logoutAdmin;
  
  // Favoriet verwijderen
  const verwijderFavoriet = index => {
    const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
    favorieten.splice(index, 1);
    localStorage.setItem("favorieten", JSON.stringify(favorieten));

    const favorietenGrid = document.getElementById('favorietenGrid');
    const kaarten = favorietenGrid.getElementsByClassName('locatie-kaart');
    kaarten[index].remove();
  };
  
  window.verwijderFavoriet = verwijderFavoriet;