document.addEventListener('DOMContentLoaded', () => {
  // =================== THEMA ===================
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

  // =================== LOCATIE LIJST PAGINA ===================
  const locatieContainer = document.getElementById("locaties");
  const zoekveld = document.getElementById("zoekveld");
  const auteurFilter = document.getElementById("auteurFilter");
  const sorteerSelect = document.getElementById("sorteerJaar");
  const jaarFilter = document.getElementById("jaarFilter");
  const toggleBtn = document.getElementById("toggleView");
  const mapElement = document.getElementById("map");

  let alleLocaties = [];
  let kaart;
  let markers = [];
  let lijstWeergave = true;

  if (locatieContainer) {
    async function fetchLocaties() {
      try {
        const response = await fetch("https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=20");
        const data = await response.json();
        alleLocaties = data.results;
        toonLocaties(alleLocaties);
        vulAuteurFilter(alleLocaties);
        vulJaarFilter(alleLocaties);
      } catch (error) {
        locatieContainer.innerHTML = `<p>❌ Fout bij laden van data.</p>`;
      }
    }

    function toonLocaties(data) {
      locatieContainer.innerHTML = "";
      data.forEach((record, index) => {
        console.log("📄 Volledige record:", record);

        const titel = record.titre || `Locatie ${index + 1}`;
        const beschrijving = record.description || "Geen beschrijving beschikbaar.";
        const adres = record.adresse || "Geen adres vermeld.";
        const auteur = record.auteur || "Onbekend";
        const realisatie = record.realisation || "?";

        let afbeelding = "https://via.placeholder.com/400x200?text=Geen+afbeelding";
        if (record.images && Array.isArray(record.images)) {
          const eersteAfbeelding = record.images.find(img => img.url);
          if (eersteAfbeelding) {
            afbeelding = eersteAfbeelding.url;
          }
        }

        const kaart = document.createElement("div");
        kaart.className = "locatie-kaart";

        kaart.innerHTML = `
          <img src="${afbeelding}" alt="Afbeelding van ${titel}" class="locatie-afbeelding">
          <div class="locatie-inhoud">
            <h2>${titel}</h2>
            <p><strong>🎨 Kunst:</strong> ${auteur}</p>
            <p><strong>📍 Locatie:</strong> ${adres}</p>
            <p><strong>📅 Jaar:</strong> ${realisatie}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adres)}" 
               target="_blank" class="kaart-link">🔗 Open in Google Maps</a>
          </div>
        `;

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
      const jaren = [...new Set(data.map(item => item.realisation).filter(Boolean))].sort((a, b) => a - b);
      jaren.forEach(jaar => {
        const optie = document.createElement("option");
        optie.value = jaar;
        optie.textContent = jaar;
        jaarFilter.appendChild(optie);
      });
    }

    function filterLocaties() {
      const zoekterm = zoekveld.value.toLowerCase();
      const geselecteerdeAuteur = auteurFilter.value;
      const geselecteerdJaar = jaarFilter.value;

      let gefilterd = alleLocaties.filter(r => {
        const matchTitel = r.titre?.toLowerCase().includes(zoekterm);
        const matchBeschrijving = r.description?.toLowerCase().includes(zoekterm);
        const matchAuteur = geselecteerdeAuteur === "" || r.auteur === geselecteerdeAuteur;
        const matchJaar = geselecteerdJaar === "" || r.realisation == geselecteerdJaar;
        return (matchTitel || matchBeschrijving) && matchAuteur && matchJaar;
      });

      if (sorteerSelect.value === "nieuwste") {
        gefilterd.sort((a, b) => (b.realisation || 0) - (a.realisation || 0));
      } else if (sorteerSelect.value === "oudste") {
        gefilterd.sort((a, b) => (a.realisation || 0) - (b.realisation || 0));
      } else if (sorteerSelect.value === "az") {
        gefilterd.sort((a, b) => (a.titre || "").localeCompare(b.titre || ""));
      }

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
  }

  // =================== LOCATIE DETAIL PAGINA ===================
  const detailDiv = document.getElementById("locatie-detail");
  if (detailDiv) {
    const data = JSON.parse(sessionStorage.getItem("detailLocatie"));
    console.log("📦 Gegevens ontvangen:", data);

    if (data) {
      const afbeelding = data.images?.[0]?.url || "https://via.placeholder.com/800x300?text=Geen+afbeelding";
      const googleMapsLink = data.geo_point_2d
        ? `https://www.google.com/maps?q=${data.geo_point_2d.lat},${data.geo_point_2d.lon}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.adresse || '')}`;

      detailDiv.innerHTML = `
        <img src="${afbeelding}" alt="${data.titre}">
        <h1>${data.titre || "Onbekende locatie"}</h1>
        <p><strong>🎨 Kunst:</strong> ${data.auteur || "Onbekend"}</p>
        <p><strong>📅 Jaar:</strong> ${data.realisation || "?"}</p>
        <p><strong>📍 Adres:</strong> ${data.adresse || "Geen adres"}</p>
        <p>${data.description || "Geen beschrijving beschikbaar."}</p>
        <a href="${googleMapsLink}" target="_blank" class="kaart-link">🔗 Open in Google Maps</a>
      `;

      if (data.geo_point_2d) {
        const map = L.map('map').setView([data.geo_point_2d.lat, data.geo_point_2d.lon], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        L.marker([data.geo_point_2d.lat, data.geo_point_2d.lon])
          .addTo(map)
          .bindPopup(data.titre || "Locatie")
          .openPopup();
      } else {
        document.getElementById("map").innerHTML = "<p>Geen locatiegegevens beschikbaar voor kaart.</p>";
      }
    } else {
      detailDiv.innerHTML = "<p>Geen gegevens gevonden. Keer terug naar <a href='locatie.html'>de lijst</a>.</p>";
    }
  }
});
