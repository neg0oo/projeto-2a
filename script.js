// ===== ANO NO FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navMobile  = document.getElementById('navMobile');
const iconMenu   = document.getElementById('iconMenu');
const iconClose  = document.getElementById('iconClose');

menuToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  iconMenu.style.display  = isOpen ? 'none'  : 'block';
  iconClose.style.display = isOpen ? 'block' : 'none';
});

document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    iconMenu.style.display  = 'block';
    iconClose.style.display = 'none';
  });
});

// ===== HEADER SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  document.getElementById('header').style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,.12)'
    : '0 1px 3px rgba(0,0,0,.08)';
});

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + '%';
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-big[data-target]').forEach(el => counterObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-desktop a');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--green-600)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe.bind(null);

sections.forEach(sec => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + entry.target.id
            ? 'var(--green-600)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(sec);
});