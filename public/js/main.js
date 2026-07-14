document.addEventListener('DOMContentLoaded', () => {

  // ===== Scroll Handler =====
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.section[id]');
  const nav = document.querySelector('.nav');
  let ticking = false;

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Active nav link
    let current = '';
    contentSections.forEach((section) => {
      if (scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    // Nav background
    if (scrollY > 50) {
      nav.style.background = 'rgba(6,6,11,.85)';
      nav.style.borderBottomColor = 'rgba(255,255,255,.08)';
    } else {
      nav.style.background = 'rgba(6,6,11,.6)';
      nav.style.borderBottomColor = 'rgba(255,255,255,.05)';
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();

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
      { threshold: 0.02, rootMargin: '0px 0px -10px 0px' }
    );
    sections.forEach((el) => observer.observe(el));
  }

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

  // ===== Mobile Nav Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksEl = document.querySelector('.nav-links');
  if (navToggle && navLinksEl) {
    const closeMenu = () => {
      navToggle.classList.remove('open');
      navLinksEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinksEl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

});
