document.addEventListener('DOMContentLoaded', async function () {
  const mapElement = document.getElementById('map');

  if (!mapElement) {
    console.error("❌ Element met ID 'map' niet gevonden. Kaart wordt niet geladen.");
    return;
  }

  const map = L.map('map').setView([50.8467, 4.3499], 13);

  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=aGxhSOtCrUowIUSU9L2P', {
    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> & OpenStreetMap contributors',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(map);

  // foutcontrole bij opladen API
  try {
    const response = await fetch("https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=100");
    const data = await response.json();
    const locaties = data.results;

    locaties.forEach(locatie => {
      const coords = locatie.geo_point_2d;
      if (!coords) return; // skipals er coordinaten zijn

      const titel = locatie.titre || "Onbekende locatie";
      const adres = locatie.adresse || "Geen adres beschikbaar";

      L.marker([coords.lat, coords.lon])
        .addTo(map)
        .bindPopup(`<strong>${titel}</strong><br>${adres}`);
    });
  } catch (error) {
    console.error("Fout bij ophalen van locaties uit API:", error);
  }
});
