// GSAP Reveal Animations ala MotionSites
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from(".reveal-text", { opacity: 0, y: 20, duration: 1, delay: 0.2 });
gsap.from(".reveal-title", { opacity: 0, y: 40, duration: 1.2, delay: 0.4 });
gsap.from(".reveal-footer", { opacity: 0, y: 20, duration: 1, delay: 0.8 });

// Scroll Trigger untuk tiap kartu museum
gsap.utils.toArray(".museum-card").forEach((card) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// Modal Logic
function openModal(src) {
  document.getElementById('modal-img').src = src;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');
}
