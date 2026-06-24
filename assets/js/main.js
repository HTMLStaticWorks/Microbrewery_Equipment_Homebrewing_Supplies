/**
 * Microbrewery Equipment & Homebrewing Supplies - Core JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initActiveNavLink();
  initBackToTop();
  initFormValidation();
  initSkeletonLoaders();
  initPasswordToggle();
  initCountdown();
  initBrewCalculator();
  initBubbles();
});

/* ==========================================
   1. Theme Management (Light / Dark)
   ========================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    if (theme === 'dark') {
      themeToggle.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
    } else {
      themeToggle.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
    }
  }
}

/* ==========================================
   2. RTL (Right-to-Left) Management
   ========================================== */
function initRTL() {
  const rtlToggle = document.getElementById('rtlToggle');
  if (!rtlToggle) return;

  const currentLayout = localStorage.getItem('layout') || 'ltr';
  setLayout(currentLayout);

  rtlToggle.addEventListener('click', () => {
    const activeLayout = document.documentElement.getAttribute('dir');
    const newLayout = activeLayout === 'rtl' ? 'ltr' : 'rtl';
    setLayout(newLayout);
  });
}

function setLayout(layout) {
  document.documentElement.setAttribute('dir', layout);
  localStorage.setItem('layout', layout);

  const bootstrapCSS = document.getElementById('bootstrapCSS');
  const rtlCSS = document.getElementById('rtlCSS');
  const rtlToggle = document.getElementById('rtlToggle');

  if (layout === 'rtl') {
    if (bootstrapCSS) {
      bootstrapCSS.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css');
    }
    if (rtlCSS) {
      rtlCSS.removeAttribute('disabled');
    }
    if (rtlToggle) {
      rtlToggle.innerHTML = '<span>LTR</span>';
    }
  } else {
    if (bootstrapCSS) {
      bootstrapCSS.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
    }
    if (rtlCSS) {
      rtlCSS.setAttribute('disabled', 'true');
    }
    if (rtlToggle) {
      rtlToggle.innerHTML = '<span>RTL</span>';
    }
  }
}

/* ==========================================
   3. Active Link Navigation Highlighting
   ========================================== */
function initActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================
   4. Back To Top Utility
   ========================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   5. Form Validation & Tooltips
   ========================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    const password = form.querySelector('#registerPassword');
    const confirmPassword = form.querySelector('#registerConfirmPassword');
    const confirmError = form.querySelector('#confirmPasswordError');

    const validatePasswords = () => {
      if (!password || !confirmPassword) return;
      if (confirmPassword.value === '') {
        confirmPassword.setCustomValidity('Please confirm your password.');
        if (confirmError) confirmError.textContent = 'Please confirm your password.';
      } else if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match.');
        if (confirmError) confirmError.textContent = 'Passwords do not match.';
      } else {
        confirmPassword.setCustomValidity('');
      }
    };

    if (password && confirmPassword) {
      password.addEventListener('input', validatePasswords);
      confirmPassword.addEventListener('input', validatePasswords);
    }

    form.addEventListener('submit', event => {
      if (password && confirmPassword) {
        validatePasswords();
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Mock Form Submission success feedback
        event.preventDefault();
        const alertSuccess = document.createElement('div');
        alertSuccess.className = 'alert alert-success mt-3';
        alertSuccess.role = 'alert';
        alertSuccess.innerHTML = '<i class="bi bi-check-circle-fill"></i> Action completed successfully!';
        form.appendChild(alertSuccess);
        setTimeout(() => alertSuccess.remove(), 4000);
      }
      form.classList.add('was-validated');
    }, false);
  });
}

/* ==========================================
   6. Skeleton Loaders for Dynamic Content
   ========================================== */
function initSkeletonLoaders() {
  const dynamicContainers = document.querySelectorAll('.dynamic-load-container');
  if (dynamicContainers.length === 0) return;

  dynamicContainers.forEach(container => {
    // Inject skeletons
    const skeletonsCount = parseInt(container.getAttribute('data-skeletons')) || 3;
    let skeletonHTML = '<div class="row g-4">';
    for (let i = 0; i < skeletonsCount; i++) {
      const colClass = (i === 2 && skeletonsCount === 3) ? 'col-md-6 mx-auto' : 'col-md-6';
      skeletonHTML += `
        <div class="${colClass}">
          <div class="card card-custom p-4">
            <div class="skeleton" style="width: 100%; aspect-ratio: 1.5;"></div>
            <div class="card-custom-body w-100 mt-3 text-center">
              <div class="skeleton mx-auto mb-2" style="width: 60%; height: 24px;"></div>
              <div class="skeleton mx-auto mb-2" style="width: 80%; height: 16px;"></div>
              <div class="skeleton mx-auto" style="width: 40%; height: 16px;"></div>
            </div>
            <div class="card-custom-cta w-100 mt-3">
              <div class="skeleton mx-auto" style="width: 100%; height: 40px;"></div>
            </div>
          </div>
        </div>
      `;
    }
    skeletonHTML += '</div>';

    // Store original contents
    const originalHTML = container.innerHTML;
    container.innerHTML = skeletonHTML;

    // Simulate fetch delay
    setTimeout(() => {
      container.innerHTML = originalHTML;
      initBubbles();
    }, 1500);
  });
}

/* ==========================================
   7. Password Eye Toggle
   ========================================== */
function initPasswordToggle() {
  const toggles = document.querySelectorAll('.password-toggle-btn');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '<i class="bi bi-eye-slash"></i>';
      } else {
        input.type = 'password';
        toggle.innerHTML = '<i class="bi bi-eye"></i>';
      }
    });
  });
}

/* ==========================================
   8. Countdown Timer (Coming Soon Page)
   ========================================== */
function initCountdown() {
  const timer = document.getElementById('countdown-timer');
  if (!timer) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 15); // 15 days out

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      timer.innerHTML = "LAUNCHED!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dVal = document.getElementById('countdown-days');
    const hVal = document.getElementById('countdown-hours');
    const mVal = document.getElementById('countdown-minutes');
    const sVal = document.getElementById('countdown-seconds');

    if (dVal) dVal.innerText = days.toString().padStart(2, '0');
    if (hVal) hVal.innerText = hours.toString().padStart(2, '0');
    if (mVal) mVal.innerText = minutes.toString().padStart(2, '0');
    if (sVal) sVal.innerText = seconds.toString().padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================
   9. Interactive ABV & Gravity Calculator
   ========================================== */
function initBrewCalculator() {
  const ogInput = document.getElementById('calc-og');
  const fgInput = document.getElementById('calc-fg');
  const abvOutput = document.getElementById('calc-abv-result');
  const attenuationOutput = document.getElementById('calc-atten-result');

  if (!ogInput || !fgInput || !abvOutput || !attenuationOutput) return;

  function calculateABV() {
    const og = parseFloat(ogInput.value);
    const fg = parseFloat(fgInput.value);

    if (isNaN(og) || isNaN(fg) || og <= 0 || fg <= 0) {
      abvOutput.innerText = '0.00%';
      attenuationOutput.innerText = '0%';
      return;
    }

    // Standard ABV formula: (OG - FG) * 131.25
    const abv = (og - fg) * 131.25;
    // Apparent Attenuation formula: (OG - FG) / (OG - 1) * 100
    const attenuation = og > 1 ? ((og - fg) / (og - 1)) * 100 : 0;

    abvOutput.innerText = (abv > 0 ? abv.toFixed(2) : '0.00') + '%';
    attenuationOutput.innerText = (attenuation > 0 ? Math.round(attenuation) : '0') + '%';
  }

  ogInput.addEventListener('input', calculateABV);
  fgInput.addEventListener('input', calculateABV);
  calculateABV(); // Run initially
}

/* ==========================================
   10. Bubbling CSS Animations Dynamic Generator
   ========================================== */
function initBubbles() {
  // Automatically add bubble container to all card-custom elements that aren't form cards
  const cards = document.querySelectorAll('.card-custom');
  cards.forEach(card => {
    // Skip login/register and callback form cards
    if (card.classList.contains('card') || card.querySelector('form')) return;

    // Check if it already has a bubble-container
    if (!card.querySelector('.bubble-container')) {
      card.classList.add('bubble-card');

      // Create bubble container
      const container = document.createElement('div');
      container.classList.add('bubble-container');

      // Gather all current child nodes
      const children = Array.from(card.childNodes);

      // Create content wrapper
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.zIndex = '2';

      // Append children to wrapper
      children.forEach(child => wrapper.appendChild(child));

      // Append container and wrapper to card
      card.appendChild(container);
      card.appendChild(wrapper);
    }
  });

  const containers = document.querySelectorAll('.bubble-container');
  if (containers.length === 0) return;

  containers.forEach(container => {
    // Prevent duplicate bubble generation if called multiple times (e.g. after skeleton loader finishes)
    if (container.children.length > 0) return;

    const bubbleCount = 8;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble-particle');

      const size = Math.random() * 12 + 6; // 6px to 18px
      const left = Math.random() * 100; // 0% to 100%
      const delay = Math.random() * 6; // 0s to 6s
      const duration = Math.random() * 4 + 4; // 4s to 8s

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.animationDuration = `${duration}s`;

      container.appendChild(bubble);
    }
  });
}

