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
