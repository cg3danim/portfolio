// === CREDITS PAGE MODAL INTERACTION ===
const modal = document.getElementById('credit-description');
const creditTextContainer = document.getElementById('credit-text-container'); // Changed from creditText
const closeBtn = document.querySelector('.close-btn');

// Close modal and reset UI
function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('active');
  if (creditTextContainer) creditTextContainer.innerHTML = ''; // Clear container
  document.body.classList.remove('modal-active'); // Remove dark sidebar
}

// Open modal and update description
function openModal(description) {
  if (!creditTextContainer) return; // Safety check

  creditTextContainer.innerHTML = ''; // Clear previous content

  if (description) {
    const parts = description.split('\\n\\n'); // Split by double newline
    parts.forEach(part => {
      if (part.trim() === '') return; // Skip empty parts (e.g. if there are more than two newlines)
      const p = document.createElement('p');
      p.textContent = part.trim();
      creditTextContainer.appendChild(p);
    });
  } else {
    const p = document.createElement('p');
    p.textContent = 'No description available.';
    creditTextContainer.appendChild(p);
  }

  modal.classList.remove('hidden');
  modal.classList.add('active');
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
