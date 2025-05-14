// === CREDITS PAGE MODAL INTERACTION ===
const creditItems = document.querySelectorAll('.credit-item');
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');
let descriptions = {};

// Load credit descriptions from JSON file
fetch('assets/credits/descriptions.json')
  .then(res => res.json())
  .then(data => {
    descriptions = data;
  });

// Show modal with description
creditItems.forEach(item => {
  item.addEventListener('click', () => {
    const id = item.dataset.id;
    creditText.innerText = descriptions[id] || 'No description available.';
    modal.classList.remove('hidden');
  });
});

// Hide modal on close
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
