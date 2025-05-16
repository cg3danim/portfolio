// === CREDITS PAGE MODAL INTERACTION ===
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');

// Load credit descriptions from JSON file
fetch('assets/credits/descriptions.json')
  .then(res => res.json())
  .then(data => {
    console.log("Descriptions loaded:", data);

    // Attach click events only after data is loaded
    document.querySelectorAll('.credit-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        console.log("Clicked:", id);
        console.log("Matching description:", data[id]);
        creditText.innerText = data[id] || 'No description available.';
        modal.classList.remove('hidden');
      });
    });
  })
  .catch(err => console.error("Error loading descriptions.json:", err));

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
