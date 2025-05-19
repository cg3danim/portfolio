document.addEventListener("DOMContentLoaded", () => {
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

// Apply saved mode on load
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

if (hamburger && mobileMenu && closeMobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active'); // ✅ explicitly open
  });
  closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active'); // ✅ explicitly close
  });
}
// === Resize logic: Show/hide based on screen size
function handleResize() {
  const isMobile = window.innerWidth <= 1024;
  document.querySelector('.sidebar')?.classList.toggle('hidden', isMobile);
  document.querySelector('.mobile-header')?.classList.toggle('hidden', !isMobile);
  
  // Only hide mobile menu manually if it's open
  if (!isMobile) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// === VIDEO LOGIC ONLY IF .video-gallery EXISTS ===
if (document.querySelector('.video-gallery')) {
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
  // === VIDEO THUMBNAIL CLICK TO OPEN MODAL ===
document.querySelectorAll('.video-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const videoSrc = thumb.getAttribute('data-src');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    if (videoSrc && modalVideo && modal) {
      modalVideo.src = videoSrc;

      // ✅ Prevent NotSupportedError
      modalVideo.play().catch(err => {
        console.error("Video failed to play:", err);
      });

      modal.classList.add('active');
    } else {
      console.warn("Missing or invalid videoSrc:", videoSrc);
    }
  });
});


  // === CLOSE MODAL on X click
  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('videoModal');
      const modalVideo = document.getElementById('modalVideo');
      modal.classList.remove('active');
      modalVideo.pause();
      modalVideo.src = '';
    });
  }

  // === CLOSE MODAL on outside click
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', e => {
      if (e.target.id === 'videoModal') {
        const modalVideo = document.getElementById('modalVideo');
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
      }
    });
  }
}
});