/* ==========================================================================
   COMMUNITY HELP HUB - ADMIN PORTAL ROUTE GUARD
   Protects Admin pages: Only allows access if authenticated as 'admin' / 'admin123'.
   ========================================================================== */

(function () {
  const currentRole = sessionStorage.getItem('chh_role');

  // If not authenticated as Admin, prompt for Admin credentials or redirect
  if (currentRole !== 'admin') {
    const adminPass = prompt('RESTRICTED ACCESS: Enter Admin Password to access Admin Portal:');
    if (adminPass === 'admin123') {
      sessionStorage.setItem('chh_role', 'admin');
      if (typeof showToast === 'function') {
        showToast('Admin Authentication Successful!', 'success');
      }
    } else {
      alert('Access Denied: Incorrect Admin Credentials. Redirecting to User Portal.');
      window.location.href = '../user/index.html';
    }
  }
})();
