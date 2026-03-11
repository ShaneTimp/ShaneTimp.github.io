/* =============================================
   NAVBAR — shrink on scroll
   ============================================= */
const navbar = document.getElementById('navbar');

const handleScroll = () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run once on load

/* =============================================
   HAMBURGER MENU (mobile)
   ============================================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

/* =============================================
   ACTIVE NAV LINK on scroll
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            if (!a.classList.contains('nav-cta')) {
              a.style.color = 'var(--teal)';
            }
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach(s => activeSectionObserver.observe(s));

/* =============================================
   SMOOTH number counter for stats
   ============================================= */
function animateCounter(el, target, duration = 1000) {
  const isYear = target > 1000;
  let start = isYear ? target - 1 : 0;
  const range = target - start;
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(start + range * eased);
    el.textContent = isYear ? value : (value >= 800 ? '800+' : value + '+');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = el.dataset.final;
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
statNums.forEach(el => {
  el.dataset.final = el.textContent;
  const raw = parseInt(el.textContent.replace(/\D/g, ''), 10);

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter(el, raw);
      observer.unobserve(el);
    }
  }, { threshold: 0.5 });

  observer.observe(el);
});
