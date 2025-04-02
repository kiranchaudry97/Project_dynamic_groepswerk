document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let voornaam = document.getElementById("voornaam").value.trim();
    let achternaam = document.getElementById("achternaam").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefoon = document.getElementById("telefoon").value.trim();
    let opmerking = document.getElementById("opmerking").value.trim();

    if (voornaam === "" || achternaam === "" || email === "" || telefoon === "" || opmerking === "") {
      alert("Vul alle velden in!");
      return;
    }

    alert(`Bedankt, ${voornaam}! Je bericht is succesvol verzonden.`);
    this.reset();
  });
});
