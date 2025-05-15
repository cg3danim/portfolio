const videoWrapper = document.getElementById('videoWrapper');
const slider = document.getElementById('videoSlider');
const videos = slider.querySelectorAll('video');
const workSection = document.getElementById('work');
const range = document.getElementById('videoRange');

let index = 0;

// Cursor logic only in work section
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

// Click to slide
workSection.addEventListener('click', (e) => {
  const midpoint = window.innerWidth / 2;
  if (e.clientX < midpoint && index > 0) {
    index--;
  } else if (e.clientX > midpoint && index < videos.length - 1) {
    index++;
  }
  updateSlider();
});

// Range slider control
range.addEventListener('input', () => {
  index = parseInt(range.value);
  updateSlider();
});

function updateSlider() {
  slider.style.transform = `translateX(-${index * videoWrapper.clientWidth}px)`;
  range.value = index;
}
