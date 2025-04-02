ocument.addEventListener("DOMContentLoaded", function () {
    const locationForm = document.getElementById('locationForm');
    const locationTable = document.getElementById('locationTable').getElementsByTagName('tbody')[0];
    const favoritesTable = document.getElementById('favoritesTable').getElementsByTagName('tbody')[0];

    const mockLocations = [
      { name: "Atomium", description: "Iconisch monument in Brussel." },
      { name: "Grand Place", description: "Centraal plein van Brussel." },
      { name: "Manneken Pis", description: "Bekende bronzen beeld." }
    ];
  
 
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
    const userFavorites = JSON.parse(localStorage.getItem("favorieten")) || [];
    userFavorites.forEach((item, index) => {
      let row = favoritesTable.insertRow();
  
      row.insertCell(0).textContent = item.titel;
      row.insertCell(1).textContent = item.beschrijving || "Geen beschrijving.";
  
      let deleteCell = row.insertCell(2);
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Verwijder';
      deleteButton.onclick = function () {
        verwijderFavoriet(index);
      };
      deleteCell.appendChild(deleteButton);
    });
  
       function verwijderFavoriet(index) {
      const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
      favorieten.splice(index, 1);
      localStorage.setItem("favorieten", JSON.stringify(favorieten));
      window.location.reload();  
    }

const locaties = JSON.parse(localStorage.getItem("customLocaties")) || [];
locaties.push({
  naam: locatieName, 
  beschrijving: locatieDescription,
  afbeelding: "https://via.placeholder.com/400x200", // Of via input upload
  datum: new Date().toISOString()
});
localStorage.setItem("customLocaties", JSON.stringify(locaties));

function verwijderLocatie(index) {
    const locaties = JSON.parse(localStorage.getItem("customLocaties")) || [];
    locaties.splice(index, 1);
    localStorage.setItem("customLocaties", JSON.stringify(locaties));
    location.reload();
  }
  

  
  });