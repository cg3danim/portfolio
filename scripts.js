// WORK VIDEO SLIDER
let index = 0;
const slider = document.querySelector('.video-slider');
const videos = document.querySelectorAll('.video-slider video');

const workSection = document.querySelector('#work');
workSection.addEventListener('mousemove', (e) => {
  const midpoint = window.innerWidth / 2;
  const cursor = e.clientX < midpoint ? 'left' : 'right';
  document.body.style.cursor = `url(assets/cursor-${cursor}.png), auto`;
});

workSection.addEventListener('click', (e) => {
  const midpoint = window.innerWidth / 2;
  if (e.clientX < midpoint && index > 0) index--;
  else if (e.clientX > midpoint && index < videos.length - 1) index++;
  slider.style.transform = `translateX(-${index * 100}vw)`;
});

// CREDITS MODAL
const creditItems = document.querySelectorAll('.credit-item');
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');
let descriptions = {};

fetch('assets/credits/descriptions.json')
  .then(res => res.json())
  .then(data => descriptions = data);

creditItems.forEach(item => {
  item.addEventListener('click', () => {
    const id = item.dataset.id;
    creditText.innerText = descriptions[id] || 'No description found.';
    modal.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
