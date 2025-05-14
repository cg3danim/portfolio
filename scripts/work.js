// === WORK PAGE VIDEO SLIDER ===
let index = 0;
const slider = document.querySelector('.video-slider');
const videos = document.querySelectorAll('.video-slider video');
const workSection = document.querySelector('.work');

// Set default cursor globally
document.body.addEventListener('mousemove', (e) => {
  const isInWork = e.target.closest('.work');
  if (isInWork) {
    const midpoint = window.innerWidth / 2;
    const cursor = e.clientX < midpoint ? 'left' : 'right';
    document.body.style.cursor = `url(assets/${cursor}.png), auto`;
  } else {
    document.body.style.cursor = 'default';
  }
});

// Slide videos
workSection.addEventListener('click', (e) => {
  const midpoint = window.innerWidth / 2;
  if (e.clientX < midpoint && index > 0) {
    index--;
  } else if (e.clientX > midpoint && index < videos.length - 1) {
    index++;
  }
  slider.style.transform = `translateX(-${index * (window.innerWidth - 240)}px)`;
});