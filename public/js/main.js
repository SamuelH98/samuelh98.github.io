document.addEventListener('DOMContentLoaded', () => {

  // ===== Parallax Engine =====
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.2;
      const img = layer.querySelector('.cutout');
      if (img) {
        const offset = scrollY * speed;
        img.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ===== Section Reveal =====
  const sections = document.querySelectorAll('.section');
  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '-60px 0px' }
    );
    sections.forEach((el) => observer.observe(el));
  }

  // ===== Active Nav Link =====
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.section[id]');

  const updateActiveLink = () => {
    let current = '';
    contentSections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Nav Background on Scroll =====
  const nav = document.querySelector('.nav');
  const updateNav = () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(6,6,11,.85)';
      nav.style.borderBottomColor = 'rgba(255,255,255,.08)';
    } else {
      nav.style.background = 'rgba(6,6,11,.6)';
      nav.style.borderBottomColor = 'rgba(255,255,255,.05)';
    }
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

});
