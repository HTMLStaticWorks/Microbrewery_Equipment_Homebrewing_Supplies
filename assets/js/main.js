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
    form.addEventListener('submit', event => {
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
      skeletonHTML += `
        <div class="col-md-4">
          <div class="card card-custom p-4">
            <div class="skeleton" style="width: 100%; height: 200px;"></div>
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
