document.addEventListener('DOMContentLoaded', () => {

  // Thema toggle
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

  const container = document.querySelector(".top-3-locaties"); // of andere sectie
const opgeslagen = JSON.parse(localStorage.getItem("customLocaties")) || [];



});
 