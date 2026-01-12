/*=============== SCROLL HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header');
  if (this.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'bx-sun';

// Check for saved theme preference or default to dark
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// Apply saved theme or default to dark mode
if (selectedTheme) {
  // User has a saved preference
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme);
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
} else {
  // Default to dark mode (do nothing, dark is default)
  // Light theme class is NOT added, so we stay in dark mode
  // Icon stays as moon (bx-moon), meaning "click to go light"
}

// Theme toggle
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== LANGUAGE TRANSLATION ===============*/
const langButton = document.getElementById('lang-button');
let currentLang = localStorage.getItem('selected-lang') || 'en';

// Apply saved language on load
if (typeof translations !== 'undefined') {
  updateLanguage(currentLang);
}

function updateLanguage(lang) {
  if (typeof translations === 'undefined') return;
  
  currentLang = lang;
  const langText = langButton.querySelector('.lang-toggle__text');
  
  // Update button text
  if (lang === 'en') {
    langText.textContent = 'JP';
    document.documentElement.lang = 'en';
  } else {
    langText.textContent = 'EN';
    document.documentElement.lang = 'jp';
  }
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const keys = element.getAttribute('data-i18n').split('.');
    let translation = translations[lang];
    
    for (const key of keys) {
      translation = translation[key];
      if (!translation) break;
    }
    
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Apply Japanese font when in Japanese mode
  if (lang === 'jp') {
    document.body.style.fontFamily = "'Noto Sans JP', 'Space Mono', monospace";
  } else {
    document.body.style.fontFamily = "'Space Mono', monospace";
  }
  
  localStorage.setItem('selected-lang', lang);
}

// Language toggle
if (langButton) {
  langButton.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'jp' : 'en';
    updateLanguage(newLang);
  });
}

/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.work__card, .project__card, .publication__card, .contact__card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});