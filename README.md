# Project_dynamic_groepswerk

##  Projectbeschrijving
BrusselsExplorer is een digitale gids, ontworpen door Kiran en Lina, voor nieuwsgierige bezoekers die de verborgen parels van de stripkunst in Brussel willen ontdekken.We verzamelen en visualiseren data over muurschilderingen, kunstenaars en locaties uit het open data platform van Brussel. Ons doel is om via onze interactieve website brengen we deze striproutes tot leven. 

## Functionaliteiten

- Interactieve kaart : Hierbij kunnen de bezoekers een accurate en interactieve kaart zien met de interessantste locaties. 
- Formulier: geeft user de kans om contact op te nemen met een vraag of opmerking. De antwoord wordt meteen gestuurd naar de admin pagina.
- Login: De persoon kan kiezen welke rol hij/zij wilt aannemen dus gebruiker of user. Dan moet hij/zij de juiste wachtwoord en email-adres invoegen om op zijn respectieve pagina aan te komen.
- Favoriete locaties liken: De gebruiker kan na het inloggen zijn favoriete locaties bijhouden in zijn login pagina. Door localStorage worden zijn favorieten en het feit dat hij ingelogd is opgeslagen.
- Lijst van locaties sorteren of opzoeken: Er i een zoekbalk en een sorteer functie om zo makkelijker locaties te vinden die de gebruiker specifiek zoekt. 
- Locaties gelinkt met API: Locaties worden automatisch gelinkt met de nodige info door hun API en afbeelding. Hierbij is ook een knop Google maps om de adres van elke locatie live te kunnen zien op Google maps. Anders kan de gebruiker op de locatie klikken en meer informatie is aanwezig over de locatie zelf.
##  Gebruikte API’s
| API | Beschrijving | Link | line and java map




##  Installatiehandleiding
Volg deze stappen om het project lokaal op te zetten:

```bash
git clone https://github.com/jouwrepo/projectnaam.git
cd projectnaam
npm install
npm start

🏗 Installatiehandleiding
Volg deze stappen om het project lokaal op te zetten:


## Taakverdeling binnen het team

1/04: Na de collectieve uitleg van de leerkracht over het project zijn ik(Lina) en Kiran samen gaan zitten om te bespreken hoe we de taken voor de eerste dag zouden verdelen. Aangezien we enkel een namiddag hadden en er al een deadline open stond voor PP(Process and project Flow) hebben we gekozen om meteen efficiënt te werken op basis van ieders talenten en snelheid om een taak uit te voeren. Kiran heeft zich op die namiddag vooral gefocust op de opbouw van de website dus de basis pagina’s aanmaken en design zodat we de volgende dag meteen verder kunnen gaan op het uitbreiden en creëren van de functionaliteiten. Ikzelf heb die namiddag de User story, Rissico Analyse en de Backlog gemaakt omdat er al een deadline stond op die avond. Samen hebben we uiteraard besproken hoe we dat zouden aanpakken en we gaven elkaar vaak feedback op ieders werk. 

Pagina’s index, login, locatie, over ons, contact en stripmuren gemaakt (kiran)
Pagina stripmuren weg gedaan (kiran)
Banner en footer voor de website gemaakt (kiran)
Tekst in “over ons” aangemaakt om te spreken over het project (kiran en Lina)
Aanmaken van User story (lina)
Aanmaken van Risico analyse (lina)
Aanmaken van backlog versie 1 (lina)

2/04: Die dag hebben we voor het eerst onze folders proberen te linken via GitHub en tot nu werken we op een manier die goed voor ons heeft gewerkt. Kiran heeft de “hoofdfolder” waar alle pagina’s op staan en ik heb toegang tot de zaken die ze aanpast door git pull origin main in de terminal te schrijven. Uiteraard maakte ik ook veranderingen en dat stuurde ik via Whatsapp copy paste naar haar toe met een beschrijving. Dit was voor ons een goede manier om elk te werken aan verschillende functionaliteiten en pagina’s tegelijkertijd. Wanneer zij vastzat en een oplossing moest zoeken op een probleem, was ik bijvoorbeeld klaar met mijn functionaliteit en stuurde ik deze door. Soms namen we hetzelfde probleem en exeprimenteerde we apart om zo efficiënt en snel mogelijk een oplossing te vinden. Specifieker heeft Kiran vooral gewerkt op : Locatie.html, locatie_detail,html, user_login.html,user_logout.html. En ik heb gewerkt aan: admin_logout en login.html, contact.html, index.html. Samen probeerde we toen een oplossing te vinden om favorieten van de gebruiker meteen zichtbaar te maken op de admin_login.html. We hebben ook samen gezocht naar oplossing om alle info avn elk item met zijn API te linken en goed zichtbaar te maken op locatioe;html en locatie_detail.html, maar de afbeeldingen wouden niet linken. Dan hebben we u in de klaslokaal gevraagd erom en u gaf ons het idee dat we de API img individueel beter zouden gebruiken en vanaf dan werkte het.

Interactieve kaart toegvoegd op home pagina en contact pagina
Favoriet button toegevoegd en gelinkt met de admin pagina
Beste drie locaties plaatsen op home pagina en deze gelinkt met API van elk voor de button meer ifnormatie
Zoekbalk, sorteerknop op locatie pagina gezet en gelinkt met de inhoud van elk item voor het sorteren
Afbeelding API img,  button google maps locatie en favoriet toegevoegd aan elke locatie grid. 
User pagina aangemaakt om de favorieten daar te zien 
Systeem opgebouwd waarbij een user eerst moet inloggen om daarna zijn favorieten toe voegen, want zonder account, geen favorieten kunne opslaan;
Backlog versie twee aangemaakt

03/04 : Ik en Kiran hebben een volledige check gedaan van de website, wat er wel en niet moet veranderen ivm design opbouw en logica voor de gebruiker. Zo hebben we een lijst van zaken opgemaakt die we moesten veranderen en hebben deze verdeelt. 

Zoekfunctie op locatie pagina : creëren van een foutmelding bij foutieve insert van een woord die niet op de locaties te vinden zijn (lina)
Contact formulier linken met een tabel in de admin-page, zodat hij de opmerkingen van de users kan zien. (Lina en kran)
Link van contact formulier plaatsen op locatie-pagina: De gebruiker wordt gevraagd hierop te klikken als er een fout is opgemerkt in de locaties. (Kiran)
Favorieten van de gebruiker linken met admin-page: De favoieten van de gebruikers zijn te zien op de admin-page in een tabel en deze wordt aangemaakt op basis van aantal keren leuk gevonden en welke locaties met naam en beschrijving. Zo kan de admin de populairste plekken zien. (Lina).
Toevoegen nieuwe locaties op de website via form op de admin-page: als de admin alle info en API img van een nieuwe locatie wilt toevoegen verschijnt deze in de tabel van beheer dashboard en is deze tevoorschijn op de loactie pagina. We hebben specifiek hier wel problemen gehad dus we hebben ook nog samen aan gewerkt (Lina en kiran)
Toevoegen drie beste locaties van alle locaties op home pagina (kiran)

Challenges: We hebben er dus voor gekozen om in de admin_pagina een tabel aan te maken die ervoor zorgt dat de admin een locatie kan toevoegen en dat het echt op de locatie.html pagina wordt toegeviegd. Jammer genoeg hebben we veel tijd gespendeerd om dit probleel te kunnen oplossen, want voor ons was het logisch om de admin de taak te geven een locatie te kunnen tovoegen en verwijderen zelfs al was dit niet gevraagd in de opdracht. Daarom hebben we ervoor gekozen om deze functionaliteit zo te laten en dat het enkel te zien is in de admin-pagina.Tweede probleem is dat sommige locaties niet willen opgeslagen worden als favoriet en we hebben dus de oplossing op dit probleem niet gevinden.