// === WORK VIDEO SLIDER ===
let index = 0;
const slider = document.querySelector('.video-slider');
const videos = document.querySelectorAll('.video-slider video');
const workSection = document.querySelector('#work');
const layout = document.querySelector('.layout');

// Reset cursor to default everywhere except #work
layout.addEventListener('mousemove', () => {
  document.body.style.cursor = 'default';
});

// Custom directional cursor ONLY in work section
workSection.addEventListener('mousemove', (e) => {
  const midpoint = window.innerWidth / 2;
  const cursor = e.clientX < midpoint ? 'left' : 'right';
  document.body.style.cursor = `url(assets/${cursor}.png), auto`;
});

// Click to slide videos
workSection.addEventListener('click', (e) => {
  const midpoint = window.innerWidth / 2;
  if (e.clientX < midpoint && index > 0) {
    index--;
  } else if (e.clientX > midpoint && index < videos.length - 1) {
    index++;
  }
  slider.style.transform = `translateX(-${index * 100}vw)`;
});


// === CREDITS MODAL ===
const creditItems = document.querySelectorAll('.credit-item');
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');
let descriptions = {};

// Load credit descriptions
fetch('assets/credits/descriptions.json')
  .then(res => res.json())
  .then(data => {
    descriptions = data;
  });

// Open modal on credit click
creditItems.forEach(item => {
  item.addEventListener('click', () => {
    const id = item.dataset.id;
    creditText.innerText = descriptions[id] || 'No description available.';
    modal.classList.remove('hidden');
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
