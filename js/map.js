document.addEventListener('DOMContentLoaded', function () {
    // Initialiseer de kaart één keer
    var map = L.map('map').setView([50.8467, 4.3499], 13); // Centrum van Brussel
  
    // Voeg OpenStreetMap tiles toe
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Voeg de eerste set markers toe
    var markers = [
      { lat: 50.8503, lon: 4.3517, title: "Locatie 1", description: "Beschrijving 1" },
      { lat: 50.8467, lon: 4.3499, title: "Locatie 2", description: "Beschrijving 2" }
    ];
  
    markers.forEach(function (marker) {
      L.marker([marker.lat, marker.lon])
        .addTo(map)
        .bindPopup("<b>" + marker.title + "</b><br>" + marker.description);
    });
  
    // Voeg de stripmuur-locaties toe
    var locaties = [
      { titel: "Jojo", lat: 50.83754388868448, lon: 4.344524882874058, adres: "Rue Pieremans 43, 1000 Brussel" },
      { titel: "De dromen van Nick", lat: 50.84886043404643, lon: 4.340997437339567, adres: "Rue des Fabriques 37, 1000 Brussel" },
      { titel: "Suske en Wiske", lat: 50.854687478802575, lon: 4.352896797603347, adres: "Rue de Laeken 116, 1000 Brussel" },
      { titel: "Yoko Tsuno", lat: 50.84255809354976, lon: 4.37431674408932, adres: "Rue Neuve 25, 1000 Brussel" },
      { titel: "De Schorpioen", lat: 50.84768517978514, lon: 4.361890680843012, adres: "Rue du Treurenberg 14, 1000 Brussel" },
      { titel: "Het kleine vest", lat: 50.83919871, lon: 4.34203538252081, adres: "Rue Basse - tunnel, 1000 Brussel" },
      { titel: "Asterix en Obelix", lat: 50.84693880488534, lon: 4.341801182264361, adres: "Rue de la Buanderie 33-35, 1000 Brussel" },
      { titel: "Billy the Cat", lat: 50.853859220561844, lon: 4.344980392872638, adres: "Rue d’Ophem 24, 1000 Brussel" },
      { titel: "Blake en Mortimer", lat: 50.83988437809996, lon: 4.351304177138129, adres: "Rue du Temple 6, 1000 Brussel" },
      { titel: "De Smurfen", lat: 50.84561697692564, lon: 4.355942637049293, adres: "Carrefour de l’Europe 3, 1000 Brussel" }
    ];
  
    locaties.forEach(locatie => {
      L.marker([locatie.lat, locatie.lon])
        .addTo(map)
        .bindPopup(`<b>${locatie.titel}</b><br>${locatie.adres}`);
    });
  });
  