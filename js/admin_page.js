document.addEventListener("DOMContentLoaded", function () {
  const locationTable = document.getElementById('locationTable').getElementsByTagName('tbody')[0];
  const favoritesTable = document.getElementById('favoritesTable').getElementsByTagName('tbody')[0];
  const commentsTable = document.getElementById('commentsTable').getElementsByTagName('tbody')[0];

  // Functie om gegevens uit localStorage te laden
  function laadGegevens(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  // Algemene functie voor verwijderen van gegevens uit localStorage
  function verwijderItem(key, index) {
    const items = laadGegevens(key);
    items.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(items));
    location.reload();
  }

  // Favorieten tonen
  laadGegevens("favorieten").forEach((item, index) => {
    let row = favoritesTable.insertRow();
    row.insertCell(0).textContent = item.titel;
    row.insertCell(1).textContent = item.beschrijving || "Geen beschrijving.";
    row.insertCell(2).textContent = "1";

    let actieCell = row.insertCell(3);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.onclick = () => verwijderItem("favorieten", index);
    actieCell.appendChild(deleteButton);
  });

  // Custom locaties tonen
  laadGegevens("customLocaties").forEach((locatie, index) => {
    let row = locationTable.insertRow();
    row.insertCell(0).textContent = locatie.naam;
    row.insertCell(1).textContent = locatie.beschrijving;

    let deleteCell = row.insertCell(2);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.onclick = () => verwijderItem("customLocaties", index);
    deleteCell.appendChild(deleteButton);
  });

  // Gebruikersopmerkingen tonen
  laadGegevens("gebruikersOpmerkingen").forEach((item, index) => {
    let row = commentsTable.insertRow();
    row.insertCell(0).textContent = item.voornaam || "Onbekend";
    row.insertCell(1).textContent = item.achternaam || "Onbekend";
    row.insertCell(2).textContent = item.email || "Geen e-mail";
    row.insertCell(3).textContent = item.telefoonnummer || "Geen telefoonnummer";
    row.insertCell(4).textContent = item.opmerking || "Geen opmerking.";

    let actieCell = row.insertCell(5);
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Verwijder";
    deleteBtn.onclick = () => verwijderItem("gebruikersOpmerkingen", index);
    actieCell.appendChild(deleteBtn);
  });

  // Admin controle
  if (localStorage.getItem("isAdmin") === "true") {
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

      const customLocaties = laadGegevens("customLocaties");
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
    const formElement = document.getElementById("locationForm");
    if (formElement) {
      formElement.style.display = "none";
      const waarschuwing = document.createElement("p");
      waarschuwing.textContent = "🔒 Enkel beheerders kunnen nieuwe locaties toevoegen.";
      formElement.parentElement?.appendChild(waarschuwing);
    }
  }
});
