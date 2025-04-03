document.addEventListener("DOMContentLoaded", () => {
  const locatieContainer = document.getElementById("locaties");
  const zoekveld = document.getElementById("zoekveld");
  const auteurFilter = document.getElementById("auteurFilter");
  const sorteerSelect = document.getElementById("sorteerJaar");
  const jaarFilter = document.getElementById("jaarFilter");
  const toggleBtn = document.getElementById("toggleView");
  const mapElement = document.getElementById("map");
  const favorietenGrid = document.getElementById("favorietenGrid");

  let alleLocaties = [];
  let kaart;
  let markers = [];
  let lijstWeergave = true;

  async function fetchLocaties() {
    try {
      const response = await fetch("https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=20");
      const data = await response.json();
      alleLocaties = data.results;

      const custom = JSON.parse(localStorage.getItem("customLocaties")) || [];
      custom.forEach(loc => {
        alleLocaties.push({
          titre: loc.naam,
          auteur: "Handmatig toegevoegd",
          description: loc.beschrijving,
          adresse: loc.adresse || "Geen adres opgegeven",
          realisation: loc.realisation || new Date().getFullYear(),
          images: [{ url: loc.afbeelding || "https://via.placeholder.com/400x200?text=Geen+afbeelding" }],
          geo_point_2d: null
        });
      });

      const verwijderde = JSON.parse(localStorage.getItem("verwijderdeLocaties")) || [];
      alleLocaties = alleLocaties.filter(loc => !verwijderde.includes(loc.titre));

      toonLocaties(alleLocaties);
      vulAuteurFilter(alleLocaties);
      vulJaarFilter(alleLocaties);
    } catch (error) {
      locatieContainer.innerHTML = `<p>❌ Fout bij laden van data.</p>`;
    }
  }

  function toonLocaties(data) {
    locatieContainer.innerHTML = "";
    const isUser = localStorage.getItem("isUser") === "true";

    data.forEach((record, index) => {
      const titel = record.titre || `Locatie ${index + 1}`;
      const beschrijving = record.description || "Geen beschrijving beschikbaar.";
      const adres = record.adresse || "Geen adres vermeld.";
      const auteur = record.auteur || "Onbekend";
      const realisatie = record.realisation || "?";

      let afbeelding = "https://via.placeholder.com/400x200?text=Geen+afbeelding";
      if (record.images && Array.isArray(record.images)) {
        const eersteAfbeelding = record.images.find(img => img.url);
        if (eersteAfbeelding) afbeelding = eersteAfbeelding.url;
      }

      const kaart = document.createElement("div");
      kaart.className = "locatie-kaart";

      const inhoud = document.createElement("div");
      inhoud.className = "locatie-inhoud";
      inhoud.innerHTML = `
        <img src="${afbeelding}" alt="Afbeelding van ${titel}" class="locatie-afbeelding">
        <h2>${titel}</h2>
        <p><strong>🎨 Kunst:</strong> ${auteur}</p>
        <p><strong>📍 Locatie:</strong> ${adres}</p>
        <p><strong>📅 Jaar:</strong> ${realisatie}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adres)}" 
           target="_blank" class="kaart-link">🔗 Open in Google Maps</a>
      `;

      if (isUser) {
        const knop = document.createElement("button");
        knop.className = "favoriet-btn";
        knop.textContent = "❤️ Voeg toe";
        knop.addEventListener("click", (e) => {
          e.stopPropagation();
          voegToeAanFavorieten(titel, beschrijving, adres, afbeelding);
        });
        inhoud.appendChild(knop);
      }

      kaart.appendChild(inhoud);

      kaart.addEventListener("click", () => {
        sessionStorage.setItem("detailLocatie", JSON.stringify(record));
        window.location.href = "locatie-detail.html";
      });

      locatieContainer.appendChild(kaart);
    });
  }

  function vulAuteurFilter(data) {
    const auteurs = [...new Set(data.map(item => item.auteur).filter(Boolean))].sort();
    auteurs.forEach(auteur => {
      const optie = document.createElement("option");
      optie.value = auteur;
      optie.textContent = auteur;
      auteurFilter.appendChild(optie);
    });
  }

  function vulJaarFilter(data) {
    const jaren = [...new Set(data.map(item => item.realisation).filter(Boolean))].sort();
    jaren.forEach(jaar => {
      const optie = document.createElement("option");
      optie.value = jaar;
      optie.textContent = jaar;
      jaarFilter.appendChild(optie);
    });
  }  

function filterLocaties() {
  const zoek = zoekveld.value.toLowerCase();
  const auteur = auteurFilter.value;
  const jaar = jaarFilter.value;
  const sorteer = sorteerSelect.value;

  const gefilterd = alleLocaties.filter(loc => {
    return (
      (loc.titre?.toLowerCase().includes(zoek) || loc.description?.toLowerCase().includes(zoek)) &&
      (!auteur || loc.auteur === auteur) &&
      (!jaar || loc.realisation == jaar)
    );
  });

  const sorteerFuncties = {
    nieuwste: (a, b) => (b.realisation || 0) - (a.realisation || 0),
    oudste: (a, b) => (a.realisation || 0) - (b.realisation || 0),
    az: (a, b) => (a.titre || "").localeCompare(b.titre || "")
  };

  if (sorteerFuncties[sorteer]) gefilterd.sort(sorteerFuncties[sorteer]);

  toonLocaties(gefilterd);
  if (!lijstWeergave) updateMap(gefilterd);
}

  function initMap() {
    kaart = L.map('map').setView([50.8503, 4.3517], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap bijdragende auteurs'
    }).addTo(kaart);
  }

  function updateMap(data) {
    markers.forEach(m => kaart.removeLayer(m));
    markers = [];

    data.forEach(record => {
      const coords = record.geo_point_2d;
      if (!coords) return;

      let afbeelding = "";
      if (record.images && Array.isArray(record.images)) {
        const eersteAfbeelding = record.images.find(img => img.url);
        if (eersteAfbeelding) {
          afbeelding = `<br><img src='${eersteAfbeelding.url}' style='width:100px; margin-top:5px; border-radius:8px;'>`;
        }
      }

      const marker = L.marker([coords.lat, coords.lon])
        .addTo(kaart)
        .bindPopup(`<strong>${record.titre}</strong><br>${record.adresse || "Geen adres"}${afbeelding}`);
      markers.push(marker);
    });
  }

  toggleBtn.addEventListener("click", () => {
    lijstWeergave = !lijstWeergave;
    locatieContainer.style.display = lijstWeergave ? "grid" : "none";
    mapElement.style.display = lijstWeergave ? "none" : "block";
    toggleBtn.textContent = lijstWeergave ? "Wissel naar kaartweergave" : "Wissel naar lijstweergave";

    if (!kaart && !lijstWeergave) {
      initMap();
      updateMap(alleLocaties);
    } else if (!lijstWeergave) {
      kaart.invalidateSize();
      updateMap(alleLocaties);
    }
  });

  zoekveld.addEventListener("input", filterLocaties);
  auteurFilter.addEventListener("change", filterLocaties);
  sorteerSelect.addEventListener("change", filterLocaties);
  jaarFilter.addEventListener("change", filterLocaties);

  fetchLocaties();

  if (favorietenGrid) {
    const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];

    favorieten.forEach((favoriet, index) => {
      const div = document.createElement("div");
      div.className = "favoriet-item";
      div.innerHTML = `
        <h3>${favoriet.titel}</h3>
        <p>${favoriet.beschrijving}</p>
        <button onclick="verwijderFavoriet(${index})">❌ Verwijder</button>
      `;
      favorietenGrid.appendChild(div);
    });
  }
});

function voegToeAanFavorieten(titel, beschrijving, adres, afbeelding) {
  const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
  const uniekeID = `${titel}_${adres}`.replace(/\s+/g, "_").toLowerCase();
  const bestaatAl = favorieten.some(fav => fav.id === uniekeID);

  if (bestaatAl) {
    alert("⚠️ Deze locatie zit al in je favorieten.");
    return;
  }

  favorieten.push({ id: uniekeID, titel, beschrijving, adres, afbeelding });
  localStorage.setItem("favorieten", JSON.stringify(favorieten));
  alert("✅ Toegevoegd aan favorieten!");

  if (localStorage.getItem("isUser") === "true") {
    window.location.href = "favorieten.html";
  } else {
    alert("🔒 Log in om je favorieten te bekijken.");
  }
}

function verwijderFavoriet(index) {
  const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
  favorieten.splice(index, 1);
  localStorage.setItem("favorieten", JSON.stringify(favorieten));
  location.reload();
}

window.voegToeAanFavorieten = voegToeAanFavorieten;
window.verwijderFavoriet = verwijderFavoriet;
