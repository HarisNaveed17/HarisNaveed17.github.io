// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('main section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollMid = window.scrollY + window.innerHeight / 3;
  let current = '';

  sections.forEach(sec => {
    if (scrollMid >= sec.offsetTop) current = sec.id;
  });

  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
