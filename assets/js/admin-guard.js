/* ==========================================================================
   COMMUNITY HELP HUB - ADMIN PORTAL ROUTE GUARD
   Protects Admin pages: Requires persistent 'admin' role in localStorage.
   Does not log out on refresh until user explicitly clicks Logout.
   ========================================================================== */

(function () {
  const currentRole = localStorage.getItem('chh_role');

  // If not authenticated as Admin, prompt for Admin credentials or redirect
  if (currentRole !== 'admin') {
    const adminPass = prompt('RESTRICTED ACCESS: Enter Admin Password to access Admin Portal:');
    if (adminPass === 'admin123') {
      localStorage.setItem('chh_role', 'admin');
      localStorage.setItem('chh_user', 'Super Admin');
      if (typeof showToast === 'function') {
        showToast('Admin Authentication Successful!', 'success');
      }
    } else {
      alert('Access Denied: Incorrect Admin Credentials. Redirecting to User Portal.');
      window.location.href = '../user/index.html';
    }
  }
})();
