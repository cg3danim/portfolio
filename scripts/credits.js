// === CREDITS PAGE MODAL INTERACTION ===
const modal = document.getElementById('credit-description');
const creditText = document.getElementById('credit-text');
const closeBtn = document.querySelector('.close-btn');

// Close modal and reset UI
function closeModal() {
  modal.classList.add('hidden');
  creditText.textContent = '';
  document.body.classList.remove('modal-active'); // Remove dark sidebar
}

// Open modal and update description
function openModal(description) {
  creditText.textContent = description || 'No description available.';
  modal.classList.remove('hidden');
  document.body.classList.add('modal-active'); // Darken sidebar
}

// Load descriptions and set up events
fetch('assets/credits/descriptions.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    return res.json();
  })
  .then(data => {
    console.log("✅ Descriptions loaded:", data);

    document.querySelectorAll('.credit-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        console.log("🟡 Clicked:", id);
        console.log("💬 Description:", data[id]);
        openModal(data[id]);
      });
    });
  })
  .catch(err => console.error("❌ Failed to load descriptions:", err));


// Close with X
closeBtn.addEventListener('click', closeModal);

// Close if clicking outside modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
