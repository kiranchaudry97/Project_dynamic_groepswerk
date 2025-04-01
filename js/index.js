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
  