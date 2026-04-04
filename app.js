// ============================================================
//  SUJATA DINING — app.js
//  Frontend Interactions, Animations, Menu Rendering
// ============================================================

/* ============================================================
   1. NAVBAR — scroll effect & mobile toggle
   ============================================================ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('mobile-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('mobile-open'));
});

/* ============================================================
   2. FLOATING PETALS — hero decoration
   ============================================================ */
function createPetals() {
  const container = document.getElementById('petals');
  const colors    = ['#F48FB1','#FFB7D0','#F8BBD9','#E91E8C','#FFCCDD','#D4A843'];
  const count     = window.innerWidth < 600 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('petal');
    p.style.left            = `${Math.random() * 100}%`;
    p.style.top             = `${Math.random() * -20}%`;
    p.style.background      = colors[Math.floor(Math.random() * colors.length)];
    p.style.width           = `${8 + Math.random() * 12}px`;
    p.style.height          = `${12 + Math.random() * 16}px`;
    p.style.animationDuration = `${6 + Math.random() * 10}s`;
    p.style.animationDelay  = `${Math.random() * 8}s`;
    container.appendChild(p);
  }
}
createPetals();

/* ============================================================
   3. MENU TABS — render and switch
   ============================================================ */
function renderMenuCard(item) {
  return `
    <div class="menu-card reveal">
      <img class="menu-card-img" src="${item.img}" alt="${item.name}" loading="lazy" />
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-row">
          <span class="menu-price">${item.price}</span>
          <span class="menu-tag ${item.tag}">${item.tag === 'spicy' ? '🌶 Spicy' : '🌿 Veg'}</span>
        </div>
      </div>
    </div>
  `;
}

function populateMenuGrids() {
  Object.keys(MENU_DATA).forEach(category => {
    const grid = document.getElementById(`${category}-grid`);
    if (!grid) return;
    grid.innerHTML = MENU_DATA[category].map(renderMenuCard).join('');
  });
}

function initTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.menu-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) {
        panel.classList.add('active');
        // Trigger reveal on newly visible cards
        setTimeout(() => revealElements(), 80);
      }
    });
  });
}

/* ============================================================
   4. SCROLL REVEAL
   ============================================================ */
function revealElements() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealElements, { passive: true });

// Add reveal class to section headers and cards dynamically
function addRevealClasses() {
  document.querySelectorAll(
    '.thali-card, .section-header, .about-img-col, .about-text-col, .info-item, .contact-form-wrap, .stat'
  ).forEach(el => el.classList.add('reveal'));
}

/* ============================================================
   5. CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✅ Booking Confirmed!';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Book Table';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ============================================================
   6. ADD TO ORDER BUTTON feedback
   ============================================================ */
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-btn')) {
    const btn = e.target;
    const original = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 2000);
  }
});

/* ============================================================
   7. SMOOTH ACTIVE NAV LINK on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--pink)' : '';
  });
}, { passive: true });

/* ============================================================
   8. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  populateMenuGrids();
  initTabs();
  addRevealClasses();
  setTimeout(revealElements, 200);
  console.log('%c🍽️ Sujata Dining — Frontend loaded', 'color:#E91E8C; font-size:14px; font-weight:bold;');
});
