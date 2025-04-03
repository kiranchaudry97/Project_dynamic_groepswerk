document.addEventListener('DOMContentLoaded', () => {
  const locatieContainer = document.getElementById("locaties");

  let alleLocaties = [];

  async function fetchLocaties() {
    try {
      const response = await fetch("https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=10");
      const data = await response.json();

      if (!Array.isArray(data.results) || data.results.length === 0) {
        locatieContainer.innerHTML = `<p>❌ Geen locaties gevonden in de dataset.</p>`;
        return;
      }

      const extraLocaties = [
        {
          titre: "Asterix en Obelix",
          auteur: "Uderzo et Goscinny",
          realisation: "2005",
          adresse: "Rue de la Buanderie 33-35 - 1000 Bruxelles",
          description: "Een kleurrijke muurschildering met Asterix & Obelix.",
          images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/15_asterix_obelix_rue_buanderie_06-768x576.jpg" }],
          geo_point_2d: { lat: 50.84693088408534, lon: 4.341801182264361 }
        },
        // Voeg hier de andere bestaande locaties toe zoals Billy the Cat, Blake en Mortimer, etc.
      ];

      const customLocaties = JSON.parse(localStorage.getItem("customLocaties")) || [];
      const omgezetteCustoms = customLocaties.map(loc => ({
        titre: loc.naam,
        description: loc.beschrijving,
        auteur: loc.auteur || "Beheerder",
        adresse: loc.adresse || "Nog niet gespecificeerd",
        realisation: loc.realisation || new Date().getFullYear(),
        images: [{ url: loc.afbeelding || "https://via.placeholder.com/400x200?text=Geen+afbeelding" }],
        geo_point_2d: null
      }));

      // Combineer alle locaties
      alleLocaties = [...data.results, ...extraLocaties, ...omgezetteCustoms];

      toonLocaties(alleLocaties);
      vulAuteurFilter(alleLocaties);
      vulJaarFilter(alleLocaties);

    } catch (error) {
      locatieContainer.innerHTML = `<p>❌ Fout bij laden van data.</p>`;
    }
  }

  function toonLocaties(data) {
    locatieContainer.innerHTML = "";
    data.forEach(record => {
      const kaart = document.createElement("div");
      kaart.className = "locatie-kaart";

      const afbeelding = record.images?.[0]?.url || "https://via.placeholder.com/400x200?text=Geen+afbeelding";

      kaart.innerHTML = `
        <img src="${afbeelding}" alt="${record.titre}" class="locatie-afbeelding">
        <div class="locatie-inhoud">
          <h2>${record.titre}</h2>
          <p><strong>🎨 Kunst:</strong> ${record.auteur}</p>
          <p><strong>📍 Locatie:</strong> ${record.adresse}</p>
          <p><strong>📅 Jaar:</strong> ${record.realisation}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.adresse)}" target="_blank">🔗 Open in Google Maps</a>
        </div>
      `;

      locatieContainer.appendChild(kaart);
    });
  }

  function vulAuteurFilter(data) {
    // Je bestaande implementatie
  }

  function vulJaarFilter(data) {
    // Je bestaande implementatie
  }

  fetchLocaties();
});
