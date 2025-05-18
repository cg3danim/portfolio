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

  if (localStorage.getItem('darkMode') === 'enabled') {
    setDarkMode(true);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      setDarkMode(!isDark);
    });
  }

  // === CREDITS MODAL ===
  const creditItems = document.querySelectorAll('.credit-item');
  const modal = document.getElementById('credit-description');
  const creditText = document.getElementById('credit-text');
  const closeBtn = document.querySelector('.close-btn');
  let descriptions = {};

  if (creditItems.length && modal && creditText) {
    fetch('assets/credits/descriptions.json')
      .then(res => res.json())
      .then(data => {
        descriptions = data;
      })
      .catch(err => console.error("Failed loading descriptions.json:", err));

    creditItems.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        creditText.innerText = descriptions[id] || 'No description available.';
        modal.classList.remove('hidden');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        creditText.textContent = '';
      });
    }

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        creditText.textContent = '';
      }
    });
  }

  // === WORK SECTION VIDEO MODAL ===
  const videoThumbs = document.querySelectorAll('.video-thumb');
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeModalBtn = document.getElementById('closeModal');

  if (videoThumbs.length && videoModal && modalVideo) {
    videoThumbs.forEach(thumb => {
      const video = thumb.querySelector('video');

      thumb.addEventListener('mouseenter', () => video?.play());
      thumb.addEventListener('mouseleave', () => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      thumb.addEventListener('click', () => {
        modalVideo.src = thumb.dataset.src;
        videoModal.classList.add('active');
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
      });
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
      }
    });
  }
});
