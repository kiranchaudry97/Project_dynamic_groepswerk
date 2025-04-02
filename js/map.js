document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.warn("Geen #map element gevonden.");
      return;
    }
  
    const map = L.map('map').setView([50.8467, 4.3499], 13);
  
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=aGxhSOtCrUowIUSU9L2P', {
      attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> & OpenStreetMap contributors',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);
  
    const locaties = [
      { titel: "Jojo", lat: 50.8375, lon: 4.3445, adres: "Rue Pieremans 43, 1000 Brussel" },
      { titel: "De dromen van Nick", lat: 50.8488, lon: 4.3410, adres: "Rue des Fabriques 37, 1000 Brussel" },
      { titel: "Suske en Wiske", lat: 50.8546, lon: 4.3529, adres: "Rue de Laeken 116, 1000 Brussel" }
    ];
  
    locaties.forEach(locatie => {
      L.marker([locatie.lat, locatie.lon])
        .addTo(map)
        .bindPopup(`<b>${locatie.titel}</b><br>${locatie.adres}`);
    });
  });
  