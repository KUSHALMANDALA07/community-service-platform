/* ==========================================================================
   COMMUNITY HELP HUB - MAIN JAVASCRIPT LOGIC
   CESR Subject Project: Community Engagement and Social Responsibility
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark Mode Toggle Logic
  initDarkMode();

  // 2. Sticky Glass Navbar Scroll Effect
  initNavbarScroll();

  // 3. Animated Statistics (CountUp.js with Intersection Observer)
  initAnimatedCounters();

  // 4. Typed.js Tagline Effect (if element exists)
  initTypedEffect();

  // 5. Live Chat Widget Logic
  initLiveChat();

  // 6. AOS Animation Initializer
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }

  // 7. Global Form Submissions with Toasts
  initFormHandlers();

  // 8. SOS Emergency Trigger Handler
  initSOSTriggers();
});

/* -------------------------------------------------------------------------- */
/* 1. DARK MODE HANDLER                                                        */
/* -------------------------------------------------------------------------- */
function initDarkMode() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const storedTheme = localStorage.getItem('chh-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateDarkModeIcon(toggleBtn, currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('chh-theme', newTheme);
      updateDarkModeIcon(toggleBtn, newTheme);
      
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

function updateDarkModeIcon(btn, theme) {
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (icon) {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun text-warning';
    } else {
      icon.className = 'fas fa-moon text-dark';
    }
  }
}

/* -------------------------------------------------------------------------- */
/* 2. NAVBAR SCROLL EFFECT                                                    */
/* -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.glass-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* -------------------------------------------------------------------------- */
/* 3. ANIMATED COUNTERS                                                       */
/* -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target') || el.innerText.replace(/[^0-9]/g, ''));
        const suffix = el.getAttribute('data-suffix') || '+';

        if (typeof countUp !== 'undefined' && typeof countUp.CountUp !== 'undefined') {
          const counter = new countUp.CountUp(el, targetVal, {
            suffix: suffix,
            duration: 2.5
          });
          if (!counter.error) {
            counter.start();
          } else {
            fallbackAnimateCounter(el, targetVal, suffix);
          }
        } else {
          fallbackAnimateCounter(el, targetVal, suffix);
        }

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

function fallbackAnimateCounter(el, target, suffix) {
  let start = 0;
  const duration = 2000;
  const stepTime = 30;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.innerText = target + suffix;
      clearInterval(timer);
    } else {
      el.innerText = Math.floor(start) + suffix;
    }
  }, stepTime);
}

/* -------------------------------------------------------------------------- */
/* 4. TYPED.JS EFFECT                                                          */
/* -------------------------------------------------------------------------- */
function initTypedEffect() {
  const typedEl = document.getElementById('typed-tagline');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('#typed-tagline', {
      strings: [
        'Connecting Communities Through Compassion',
        'Empowering Lives via Technology',
        'Providing Emergency & Medical Relief',
        'Fostering Education & Volunteerism'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 5. LIVE CHAT LOGIC                                                         */
/* -------------------------------------------------------------------------- */
function initLiveChat() {
  const toggleBtn = document.getElementById('live-chat-toggle');
  const chatWidget = document.getElementById('chat-widget');
  const closeBtn = document.getElementById('close-chat');
  const sendBtn = document.getElementById('send-chat-msg');
  const chatInput = document.getElementById('chat-input-field');
  const chatBody = document.getElementById('chat-body-messages');

  if (!toggleBtn || !chatWidget) return;

  toggleBtn.addEventListener('click', () => {
    chatWidget.classList.toggle('d-none');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWidget.classList.add('d-none');
    });
  }

  function handleSend() {
    if (!chatInput || !chatBody) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerText = text;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate bot response after 1s
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg bot';
      botMsg.innerHTML = getBotReply(text);
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}

function getBotReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('help') || lower.includes('request')) {
    return 'You can submit a help request on our <a href="pages/request-help.html" class="text-primary font-weight-bold">Request Help</a> page! Our volunteer team will review it immediately.';
  } else if (lower.includes('volunteer') || lower.includes('join')) {
    return 'We love new volunteers! Head over to our <a href="pages/volunteer.html" class="text-primary font-weight-bold">Volunteer Portal</a> to sign up.';
  } else if (lower.includes('donate') || lower.includes('money')) {
    return 'Thank you for your kindness! You can donate food, books, or financial aid on our <a href="pages/donate.html" class="text-primary font-weight-bold">Donation Page</a>.';
  } else if (lower.includes('emergency') || lower.includes('sos')) {
    return '<span class="text-danger font-weight-bold"><i class="fas fa-exclamation-triangle"></i> For immediate emergency relief, please call 112 or click our Emergency Helpline.</span>';
  } else {
    return 'Hello! I am your Community Assistant. How can I support you today? You can ask about Help Requests, Volunteering, or Donations.';
  }
}

/* -------------------------------------------------------------------------- */
/* 6. GLOBAL TOAST HANDLER                                                     */
/* -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '25px';
    toastContainer.style.left = '25px';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'info' ? 'info' : 'danger'} border-0 show shadow-lg mb-2`;
  toast.role = 'alert';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'} me-2"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* -------------------------------------------------------------------------- */
/* 7. FORM SUBMISSIONS SIMULATOR                                              */
/* -------------------------------------------------------------------------- */
function initFormHandlers() {
  document.querySelectorAll('form').forEach(form => {
    if (form.classList.contains('no-sim')) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formId = form.id;
      
      if (formId === 'request-help-form') {
        showToast('Help request submitted successfully! Tracking ID: #CHH-' + Math.floor(1000 + Math.random() * 9000), 'success');
        form.reset();
      } else if (formId === 'volunteer-form') {
        showToast('Volunteer application received! Welcome to the Community Help Hub family.', 'success');
        form.reset();
      } else if (formId === 'donate-form') {
        showToast('Thank you for your generous donation! Downloading receipt...', 'success');
        form.reset();
        setTimeout(() => triggerReceiptDownload(), 1500);
      } else if (formId === 'contact-form') {
        showToast('Message sent! We will contact you within 24 hours.', 'success');
        form.reset();
      } else {
        showToast('Form submitted successfully!', 'success');
        form.reset();
      }
    });
  });
}

function triggerReceiptDownload() {
  const dummyContent = "COMMUNITY HELP HUB - DONATION RECEIPT\nDate: " + new Date().toLocaleDateString() + "\nTransaction ID: CHH-DON-" + Math.floor(100000 + Math.random() * 900000) + "\nStatus: SUCCESSFUL\nThank you for supporting community welfare!";
  const blob = new Blob([dummyContent], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Community_Help_Hub_Receipt.txt';
  a.click();
}

/* -------------------------------------------------------------------------- */
/* 8. SOS TRIGGER HANDLER                                                     */
/* -------------------------------------------------------------------------- */
function initSOSTriggers() {
  const sosBtns = document.querySelectorAll('.btn-sos-trigger');
  sosBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('ALERT: Are you sure you want to trigger an immediate Emergency SOS Request to local responders and NGO teams?')) {
        showToast('EMERGENCY SOS SENT! GPS Coordinates dispatched to disaster management teams.', 'danger');
      }
    });
  });
}
