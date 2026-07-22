/* ==========================================================================
   COMMUNITY HELP HUB - GLOBAL USER AUTHENTICATION GUARD
   Requires login for ALL page buttons/CTAs EXCEPT navbar navigation.
   If user is ALREADY logged in, permits all actions seamlessly.
   ========================================================================== */

function requireUserAuth(actionName = 'use this feature') {
  const role = localStorage.getItem('chh_role');
  if (!role) {
    if (confirm(`LOGIN REQUIRED: Please log in first to ${actionName}. Would you like to go to the Login page now?`)) {
      const isRoot = !window.location.pathname.includes('/pages/') && !window.location.pathname.includes('/admin/') && !window.location.pathname.includes('/user/');
      window.location.href = isRoot ? 'pages/login.html' : (window.location.pathname.includes('/pages/') ? 'login.html' : '../pages/login.html');
    }
    return false;
  }
  return true; // Already logged in -> do nothing and permit action
}

document.addEventListener('DOMContentLoaded', () => {
  // Protected pages check (e.g. user/index.html)
  if (window.location.pathname.includes('/user/')) {
    const role = localStorage.getItem('chh_role');
    if (!role) {
      alert('Please log in first to access your User Portal.');
      window.location.href = '../pages/login.html';
      return;
    }
  }

  // Intercept ALL button clicks across pages EXCEPT Navbar elements
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a.btn, input[type="submit"]');
    if (!btn) return;

    // Exclude Navbar elements, navbar links, dark mode toggle, close buttons, modal close, and login/register navbar buttons
    if (
      btn.closest('nav') || 
      btn.closest('.glass-navbar') || 
      btn.id === 'dark-mode-toggle' || 
      btn.classList.contains('nav-link') || 
      btn.classList.contains('navbar-brand') || 
      btn.classList.contains('btn-close') || 
      btn.hasAttribute('data-bs-dismiss')
    ) {
      return; // Allow navbar navigation freely
    }

    const role = localStorage.getItem('chh_role');
    if (!role) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (confirm('LOGIN REQUIRED: Please log in first to perform this action. Would you like to go to the Login page now?')) {
        const isRoot = !window.location.pathname.includes('/pages/') && !window.location.pathname.includes('/admin/') && !window.location.pathname.includes('/user/');
        window.location.href = isRoot ? 'pages/login.html' : (window.location.pathname.includes('/pages/') ? 'login.html' : '../pages/login.html');
      }
    }
  }, true); // Capture phase to intercept before inline onclick attributes
});
