document.addEventListener("DOMContentLoaded", function () {
  const locationTable = document.getElementById('locationTable').getElementsByTagName('tbody')[0];
  const favoritesTable = document.getElementById('favoritesTable').getElementsByTagName('tbody')[0];
  const commentsTable = document.getElementById('commentsTable').getElementsByTagName('tbody')[0];

  // Favorieten tonen
  const userFavorites = JSON.parse(localStorage.getItem("favorieten")) || [];
  userFavorites.forEach((item, index) => {
    let row = favoritesTable.insertRow();

    row.insertCell(0).textContent = item.titel;
    row.insertCell(1).textContent = item.beschrijving || "Geen beschrijving.";
    row.insertCell(2).textContent = "1";

    let actieCell = row.insertCell(3);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.onclick = function () {
      verwijderFavoriet(index);
    };
    actieCell.appendChild(deleteButton);
  });

  function verwijderFavoriet(index) {
    const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
    favorieten.splice(index, 1);
    localStorage.setItem("favorieten", JSON.stringify(favorieten));
    window.location.reload();
  }

  // Custom locaties ophalen en tonen
  const customLocaties = JSON.parse(localStorage.getItem("customLocaties")) || [];
  customLocaties.forEach((locatie, index) => {
    let row = locationTable.insertRow();
    row.insertCell(0).textContent = locatie.naam;
    row.insertCell(1).textContent = locatie.beschrijving;

    let deleteCell = row.insertCell(2);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.onclick = function () {
      verwijderLocatie(index);
    };
    deleteCell.appendChild(deleteButton);
  });

  function verwijderLocatie(index) {
    const locaties = JSON.parse(localStorage.getItem("customLocaties")) || [];
    locaties.splice(index, 1);
    localStorage.setItem("customLocaties", JSON.stringify(locaties));
    location.reload();
  }

  // Gebruikersopmerkingen tonen
  const opmerkingen = JSON.parse(localStorage.getItem("gebruikersOpmerkingen")) || [];
  opmerkingen.forEach((item, index) => {
    let row = commentsTable.insertRow();
    row.insertCell(0).textContent = item.locatie || "Onbekend";
    row.insertCell(1).textContent = item.opmerking || "Geen opmerking.";

    let actieCell = row.insertCell(2);
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Verwijder";
    deleteBtn.onclick = function () {
      verwijderOpmerking(index);
    };
    actieCell.appendChild(deleteBtn);
  });

  function verwijderOpmerking(index) {
    const opmerkingen = JSON.parse(localStorage.getItem("gebruikersOpmerkingen")) || [];
    opmerkingen.splice(index, 1);
    localStorage.setItem("gebruikersOpmerkingen", JSON.stringify(opmerkingen));
    location.reload();
  }

  // ✅ Check of admin is ingelogd
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (isAdmin) {
    document.getElementById("locationForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const naam = document.getElementById("locationName").value.trim();
      const beschrijving = document.getElementById("locationDescription").value.trim();
      const adres = document.getElementById("locationAddress")?.value.trim() || "Nog niet gespecificeerd";
      const afbeelding = document.getElementById("locationImage")?.value.trim() || "https://via.placeholder.com/400x200?text=Geen+afbeelding";

      if (!naam || !beschrijving) {
        alert("⚠️ Vul alle verplichte velden in.");
        return;
      }

      const customLocaties = JSON.parse(localStorage.getItem("customLocaties")) || [];

      customLocaties.push({
        naam,
        beschrijving,
        auteur: "Beheerder",
        realisation: new Date().getFullYear(),
        adresse: adres,
        afbeelding: afbeelding,
        images: [{ url: afbeelding }]
      });

      localStorage.setItem("customLocaties", JSON.stringify(customLocaties));
      alert("✅ Locatie toegevoegd!");
      location.reload();
    });
  } else {
    // Als geen admin, verberg formulier of toon melding
    const formElement = document.getElementById("locationForm");
    if (formElement) {
      formElement.style.display = "none";
      const waarschuwing = document.createElement("p");
      waarschuwing.textContent = "🔒 Enkel beheerders kunnen nieuwe locaties toevoegen.";
      formElement.parentElement?.appendChild(waarschuwing);
    }
  }
});

