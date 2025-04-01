/*index */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleTheme');
    const body = document.body;
  
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
  
    // Zet het juiste thema bij laden van de pagina
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
    }
  });
  


  /*locatie */
  document.addEventListener("DOMContentLoaded", async () => {
    const locatieContainer = document.getElementById("locaties");
  
    try {
      const response = await fetch("https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/streetart/records?limit=20");
      const data = await response.json();
      const records = data.results;
  
      records.forEach((record, index) => {
        const titel = record.titre || `Naam ${index + 1}`;
        const beschrijving = record.description || "Geen beschrijving beschikbaar.";
        const locatie = record.localisation || "Locatie niet vermeld.";
        const afbeelding = record.url_image || "https://via.placeholder.com/400x200?text=Geen+afbeelding";
  
        const kaart = document.createElement("div");
        kaart.className = "locatie-kaart";
  
        kaart.innerHTML = `
          <img src="${afbeelding}" alt="Afbeelding van ${titel}" class="locatie-afbeelding">
          <div class="locatie-inhoud">
            <h2>${titel}</h2>
            <p><strong>Beschrijving:</strong> ${beschrijving}</p>
            <p><strong>Locatie:</strong> ${locatie}</p>
          </div>
        `;
  
        locatieContainer.appendChild(kaart);
      });
    } catch (error) {
      console.error("❌ Fout bij ophalen van street art data:", error);
      locatieContainer.innerHTML = `<p>❌ Er ging iets mis bij het ophalen van de locaties.</p>`;
    }
  });