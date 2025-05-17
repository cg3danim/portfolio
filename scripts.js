
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

// === MOBILE MENU TOGGLE ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');

function toggleMobileMenu(show) {
  if (mobileMenu) {
    mobileMenu.classList.toggle('active', show);
  }
}
if (hamburger && mobileMenu && closeMobileMenu) {
  hamburger.addEventListener('click', () => toggleMobileMenu(true));
  closeMobileMenu.addEventListener('click', () => toggleMobileMenu(false));
}

// === Resize logic: Show/hide based on screen size
function handleResize() {
  const isMobile = window.innerWidth <= 1024;
  document.querySelector('.sidebar')?.classList.toggle('hidden', isMobile);
  document.querySelector('.mobile-header')?.classList.toggle('hidden', !isMobile);
  if (!isMobile) {
    toggleMobileMenu(false); // Hide mobile menu when resizing back to desktop
  }
}
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// === CREDITS MODAL ===
const creditItems = document.querySelectorAll('.credit-item');
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');
let descriptions = {};
if (modal) {
  fetch('assets/credits/descriptions.json')
    .then(res => res.json())
    .then(data => { descriptions = data; });
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
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      creditText.textContent = '';
    }
  });
}
