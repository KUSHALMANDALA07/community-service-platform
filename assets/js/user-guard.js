/* ==========================================================================
   COMMUNITY HELP HUB - USER PORTAL AUTHENTICATION GUARD
   Requires login for actions if user is not logged in.
   If user is ALREADY logged in, permits actions seamlessly.
   ========================================================================== */

function requireUserAuth(actionName = 'access this feature') {
  const role = localStorage.getItem('chh_role');
  
  if (!role) {
    if (confirm(`AUTHENTICATION REQUIRED: Please log in to ${actionName}. Would you like to go to the Login page now?`)) {
      const isRoot = !window.location.pathname.includes('/pages/') && !window.location.pathname.includes('/admin/') && !window.location.pathname.includes('/user/');
      window.location.href = isRoot ? 'pages/login.html' : (window.location.pathname.includes('/pages/') ? 'login.html' : '../pages/login.html');
    }
    return false;
  }
  
  // User is already logged in -> do nothing and allow action
  return true;
}

// Auto-check for protected pages like user/index.html
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('/user/')) {
    const role = localStorage.getItem('chh_role');
    if (!role) {
      alert('Please log in first to access your User Portal.');
      window.location.href = '../pages/login.html';
    }
  }
});
