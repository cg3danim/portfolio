// === DARK MODE TOGGLE ===
const toggleBtn = document.getElementById('darkModeToggle');

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
}

if (localStorage.getItem('darkMode') === 'enabled') {
  setDarkMode(true);
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isDark);
  });
}

// === WORK VIDEO SLIDER ===
let index = 0;
const slider = document.querySelector('.video-slider');
const videos = document.querySelectorAll('.video-slider video');
const workSection = document.querySelector('#work');

if (workSection) {
  document.body.addEventListener('mousemove', (e) => {
    const isInWork = e.target.closest('#work');
    if (isInWork) {
      const midpoint = window.innerWidth / 2;
      const cursor = e.clientX < midpoint ? 'left' : 'right';
      document.body.style.cursor = `url(assets/${cursor}.png), auto`;
    } else {
      document.body.style.cursor = 'default';
    }
  });

  workSection.addEventListener('click', (e) => {
    const midpoint = window.innerWidth / 2;
    if (e.clientX < midpoint && index > 0) {
      index--;
    } else if (e.clientX > midpoint && index < videos.length - 1) {
      index++;
    }
    slider.style.transform = `translateX(-${index * 100}vw)`;
  });
}

// === CREDITS MODAL ===
const creditItems = document.querySelectorAll('.credit-item');
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');

let descriptions = {};
if (modal) {
  fetch('assets/credits/descriptions.json')
    .then(res => res.json())
    .then(data => {
      descriptions = data;
    });

  creditItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      creditText.innerText = descriptions[id] || 'No description available.';
      modal.classList.remove('hidden');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    creditText.textContent = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      creditText.textContent = '';
    }
  });
}

// === MOBILE MENU TOGGLE ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');

if (hamburger && mobileMenu && closeMobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}
