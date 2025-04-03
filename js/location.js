document.addEventListener('DOMContentLoaded', () => {
    const locatieContainer = document.getElementById("locaties");
    const zoekveld = document.getElementById("zoekveld");
    const auteurFilter = document.getElementById("auteurFilter");
    const sorteerSelect = document.getElementById("sorteerJaar");
    const jaarFilter = document.getElementById("jaarFilter");
    const toggleBtn = document.getElementById("toggleView");
    const mapElement = document.getElementById("map");
    const foutmeldingDiv = document.getElementById("foutmelding");

  
    let alleLocaties = [];
    let kaart;
    let markers = [];
    let lijstWeergave = true;

    function showError(boodschap = "Er is een fout opgetreden tijdens het laden van de gegevens.") {
        if (foutmeldingDiv) {
          foutmeldingDiv.textContent = `❌ ${boodschap}`;
          foutmeldingDiv.style.display = "block";
        }
      }
  
      if (locatieContainer) {
        async function fetchLocaties() {
          try {
            const response = await fetch("https://bruxellesdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/bruxelles_parcours_bd/records?limit=10");
            const data = await response.json();
      
            if (!Array.isArray(data.results) || data.results.length === 0) {
              showError("Geen locaties gevonden in de dataset.");
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
            {
              titre: "Billy the cat",
              auteur: "Colman et Desberg",
              realisation: "2000",
              adresse: "Rue d'Ophem 24 - 1000 Bruxelles",
              description: "Muurschildering van Billy the Cat in Brussel.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/06_billy_the_cat_rue_ophem_01_vb-685x1024.jpg" }],
              geo_point_2d: { lat: 50.853589220561844, lon: 4.344980392872638 }
            },
            {
              titre: "Blake en Mortimer",
              auteur: "Edgar P. Jacobs",
              realisation: "2021",
              adresse: "Rue du Temple 6 - 1000 Bruxelles",
              description: "Blake & Mortimer op een gevel in hartje Brussel.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/08_blake_mortimer_rue_temple_01-768x1024.jpeg" }],
              geo_point_2d: { lat: 50.83988437098996, lon: 4.351304177138129 }
            },
            {
              titre: "De Smurfen",
              auteur: "Peyo",
              realisation: "2017",
              adresse: "Carrefour de l'Europe 3 - 1000 Bruxelles",
              description: "De Smurfen aan het Europakruispunt in Brussel.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/54_schtroumpfs_carrefour_europe_06_vb-1-768x512.jpg" }],
              geo_point_2d: { lat: 50.845616976922564, lon: 4.355934267340923 }
            },
            {
              titre: "Jojo",
              auteur: "André Geerts",
              realisation: "1996",
              adresse: "Rue Pieremans 43 - 1000 Bruxelles",
              description: "De vrolijke Jojo op een muur in de stad.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/25_petit_jojo_rue_pieremans_04_vb-685x1024.jpg" }],
              geo_point_2d: { lat: 50.83574388868448, lon: 4.344524802874058 }
            },
            {
              titre: "De dromen van Nick",
              auteur: "Hermann",
              realisation: "1999",
              adresse: "Rue des Fabriques 37 - 1000 Bruxelles",
              description: "Een dromerige muurschildering van Nick.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/12_reves_nic_rue_fabriques_01_vb-768x514.jpg" }],
              geo_point_2d: { lat: 50.84886004340463, lon: 4.340997437339567 }
            },
            {
              titre: "Suske en Wiske",
              auteur: "Willy Vandersteen",
              realisation: "1995",
              adresse: "Rue de Laeken 116 - 1000 Bruxelles",
              description: "Suske en Wiske fleuren deze gevel op.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/05_bob_bobette_rue_laeken_01_vb-685x1024.jpg" }],
              geo_point_2d: { lat: 50.854687478802575, lon: 4.352086797603347 }
            },
            {
              titre: "Yoko Tsuno",
              auteur: "Roger Leloup",
              realisation: "2011",
              adresse: "Rue Terre-Neuve 25 - 1000 Bruxelles",
              description: "Sciencefiction met Yoko Tsuno op een muur.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/40_yoko_tsuno_rue_terre_neuve_04_vb-683x1024.jpg" }],
              geo_point_2d: { lat: 50.842558093054976, lon: 4.34731674408932 }
            },
            {
              titre: "De Schorpioen",
              auteur: "Marini et Desberg",
              realisation: "2002",
              adresse: "Rue du Treurenberg 14 - 1000 Bruxelles",
              description: "Avontuur met De Schorpioen aan een gevel.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/03_scorpion_rue_treurenberg_001-715x1024.jpg" }],
              geo_point_2d: { lat: 50.84768517978514, lon: 4.361809680843012 }
            },
            {
              titre: "Het kleine vest",
              auteur: "Aurélie William Levaux",
              realisation: "2019",
              adresse: "Rue Basse - tunnel - 1000 Bruxelles",
              description: "Een intiem kunstwerk in de tunnel van Brussel.",
              images: [{ url: "https://www.parcoursbd.brussels/wp-content/uploads/2021/09/70_petit_gilet_tunnel_basse_04-768x511.jpg" }],
              geo_point_2d: { lat: 50.83919871, lon: 4.342035033825081 }
            }
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

    alleLocaties = alleLocaties.concat(omgezetteCustoms);

  
          alleLocaties = extraLocaties; 

          

  
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
  
          kaart.innerHTML = `
            <img src="${afbeelding}" alt="Afbeelding van ${titel}" class="locatie-afbeelding">
            <div class="locatie-inhoud">
              <h2>${titel}</h2>
              <p><strong>🎨 Kunst:</strong> ${auteur}</p>
              <p><strong>📍 Locatie:</strong> ${adres}</p>
              <p><strong>📅 Jaar:</strong> ${realisatie}</p>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adres)}" 
                 target="_blank" class="kaart-link">🔗 Open in Google Maps</a>
              <button class="favoriet-btn" onclick="event.stopPropagation(); voegToeAanFavorieten('${titel}', \`${beschrijving}\`, '${adres}', '${afbeelding}')">❤️ Voeg toe</button>
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
        
          // Sorteer logica...//
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

      

      /** notatie: zoek filter  */
      const zoekveld = document.getElementById("zoekveld");
      const zoekBtn = document.getElementById("zoekBtn");
      const zoekFout = document.getElementById("zoekFout");
      
      zoekBtn.addEventListener("click", () => {
        const zoekterm = zoekveld.value.trim().toLowerCase();
      
        const resultaten = alleLocaties.filter(loc =>
          loc.titre?.toLowerCase().includes(zoekterm) ||
          loc.description?.toLowerCase().includes(zoekterm)
        );
      
        if (zoekterm === "") {
          zoekFout.style.display = gefilterd.length === 0 ? "block" : "none";

          toonLocaties(alleLocaties); // alles tonen als leeg
          return;
        }
      
      if (gefilterd.length === 0) {
  zoekFout.style.display = "block";
} else {
  zoekFout.style.display = "none";
}
      });
      
      zoekveld.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          zoekBtn.click();
        }
      });


      /*timer  */
      zoekBtn.addEventListener("click", () => {
        const zoekterm = zoekveld.value.trim().toLowerCase();
      
        const resultaten = alleLocaties.filter(loc =>
          loc.titre?.toLowerCase().includes(zoekterm) ||
          loc.description?.toLowerCase().includes(zoekterm)
        );
      
        if (zoekterm === "") {
          zoekFout.style.display = "none";
          toonLocaties(alleLocaties);
          return;
        }
      
        if (resultaten.length === 0) {
          zoekFout.style.display = "block";
          setTimeout(() => {
            zoekFout.style.display = "none";
          }, 3000);
        } else {
          zoekFout.style.display = "none";
          toonLocaties(resultaten);
        }
      
      
      
        toonLocaties(resultaten);
        zoekFout.style.display = "block";
        setTimeout(() => {
          zoekFout.style.display = "none";
        }, 3000); // 3 seconden
              });
      
      
      

  
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
  });
  
  /*notatie :Favorieten */
  function voegToeAanFavorieten(titel, beschrijving, adres, afbeelding) {
    const favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
  
    const bestaatAl = favorieten.some(item => item.titel === titel && item.adres === adres);
    if (bestaatAl) {
      alert("⚠️ Deze locatie zit al in je favorieten.");
      return;
    }
  
    favorieten.push({ titel, beschrijving, adres, afbeelding });
    localStorage.setItem("favorieten", JSON.stringify(favorieten));
    alert("Toegevoegd aan favorieten!");
  
    if (localStorage.getItem("isUser") === "true") {
      window.location.href = "favorieten.html";
    } else {
      alert("🔐 Log eerst in om je favorieten te bekijken.");
    }
  }

  /*overzicht van locatie */
  window.voegToeAanFavorieten = voegToeAanFavorieten;
  document.addEventListener("DOMContentLoaded", () => {
    const detailDiv = document.getElementById("locatie-detail");
    const mapDiv = document.getElementById("map");
  
    const data = JSON.parse(sessionStorage.getItem("detailLocatie"));
  
    if (!data) {
      detailDiv.innerHTML = "<p>Geen gegevens gevonden. Keer terug naar <a href='locatie.html'>de lijst</a>.</p>";
      return;
    }
  
    const afbeelding = data.images?.[0]?.url || "https://via.placeholder.com/800x300?text=Geen+afbeelding";
    const titel = data.titre || data.titel || "Onbekende titel";
    const beschrijving = data.description || "Geen beschrijving beschikbaar.";
  
    detailDiv.innerHTML = `
      <img src="${afbeelding}" alt="Afbeelding van ${titel}" class="detail-afbeelding" />
      <h1>${titel}</h1>
      <p>${beschrijving}</p>
    `;
  
    if (data.geo_point_2d) {
      const map = L.map('map').setView([data.geo_point_2d.lat, data.geo_point_2d.lon], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
  
      L.marker([data.geo_point_2d.lat, data.geo_point_2d.lon])
        .addTo(map)
        .bindPopup(titel)
        .openPopup();
    } else {
      mapDiv.innerHTML = "<p>📍 Geen locatiegegevens beschikbaar voor deze locatie.</p>";
    }


/*notatie : opmerkingen */
function verzendOpmerking() {
  const tekst = document.getElementById("opmerking").value.trim();
  const bevestiging = document.getElementById("bevestigingOpmerking");

  if (tekst === "") {
    alert("⚠️ Opmerking mag niet leeg zijn.");
    return;
  }

  const data = JSON.parse(sessionStorage.getItem("detailLocatie"));
  const locatie = data?.titre || "Onbekende locatie";

  const opmerkingen = JSON.parse(localStorage.getItem("gebruikersOpmerkingen")) || [];
  opmerkingen.push({ locatie, opmerking: tekst });
  localStorage.setItem("gebruikersOpmerkingen", JSON.stringify(opmerkingen));

  document.getElementById("opmerking").value = "";
  bevestiging.style.display = "block";
}





  });
  
  