document.addEventListener("DOMContentLoaded", function () {
  const locationTable = document.getElementById('locationTable').getElementsByTagName('tbody')[0];
  const favoritesTable = document.getElementById('favoritesTable').getElementsByTagName('tbody')[0];
  const commentsTable = document.getElementById('commentsTable').getElementsByTagName('tbody')[0];

  const mockLocations = [
    { name: "Atomium", description: "Iconisch monument in Brussel." },
    { name: "Grand Place", description: "Centraal plein van Brussel." },
    { name: "Manneken Pis", description: "Bekende bronzen beeld." }
  ];

  // Mock locaties toevoegen aan de tabel
  mockLocations.forEach(location => {
    let row = locationTable.insertRow();
    row.insertCell(0).textContent = location.name;
    row.insertCell(1).textContent = location.description;

    let deleteCell = row.insertCell(2);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.onclick = function () {
      locationTable.deleteRow(row.rowIndex - 1);
    };
    deleteCell.appendChild(deleteButton);
  });

  // Haal favorieten op uit localStorage
  const userFavorites = JSON.parse(localStorage.getItem("favorieten")) || [];
  userFavorites.forEach((item, index) => {
    let row = favoritesTable.insertRow();

    row.insertCell(0).textContent = item.titel;
    row.insertCell(1).textContent = item.beschrijving || "Geen beschrijving.";
    row.insertCell(2).textContent = "1"; // Statisch aantal keer leuk gevonden

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

  // Ophalen en opslaan van custom locaties
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

  // Gebruikersopmerkingen laden
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
});
