
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
// === VIDEO HOVER AUTOPLAY ===
document.querySelectorAll('.video-thumb video').forEach(video => {
  video.muted = true;
  video.loop = true;

  video.parentElement.addEventListener('mouseenter', () => {
    video.play();
  });

  video.parentElement.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});
// === VIDEO THUMBNAIL CLICK TO OPEN MODAL ===
document.querySelectorAll('.video-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const videoSrc = thumb.getAttribute('data-src');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    modalVideo.src = videoSrc;
    modalVideo.play();
    modal.classList.add('active');
  });
});

// === CLOSE MODAL on X click or outside click ===
document.getElementById('closeModal').addEventListener('click', () => {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modal.classList.remove('active');
  modalVideo.pause();
  modalVideo.src = '';
});

document.getElementById('videoModal').addEventListener('click', e => {
  if (e.target.id === 'videoModal') {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
  }
});
