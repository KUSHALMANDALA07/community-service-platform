/* ==========================================================================
   COMMUNITY HELP HUB - FIREBASE / LOCALSTORAGE REALTIME DATA ENGINE
   NGO Social Service Initiative: Community Engagement and Social Responsibility
   ========================================================================== */

const DataEngine = {
  // Initialize Default Mock Data if not present
  init() {
    if (!localStorage.getItem('chh_requests')) {
      const initialRequests = [
        { id: 'CHH-9041', name: 'Sita Devi', category: 'Emergency Medical', location: 'Sector 14, Delhi', urgency: 'CRITICAL', status: 'Pending', date: '2026-07-22' },
        { id: 'CHH-8920', name: 'Rohan Verma', category: 'Food Assistance', location: 'Sector 8, Noida', urgency: 'Medium', status: 'Assigned', date: '2026-07-21' },
        { id: 'CHH-8712', name: 'Kavita Roy', category: 'Education Books', location: 'Block B, Dwarka', urgency: 'Low', status: 'Completed', date: '2026-07-20' }
      ];
      localStorage.setItem('chh_requests', JSON.stringify(initialRequests));
    }

    if (!localStorage.getItem('chh_donations')) {
      const initialDonations = [
        { id: 'DON-8942', type: 'Food Kits', amount: '20 Boxes', donor: 'Amit Patel', date: '2026-07-22', status: 'Collected' },
        { id: 'DON-8810', type: 'Books & Stationery', amount: '50 Sets', donor: 'Priya Sharma', date: '2026-07-21', status: 'Completed' }
      ];
      localStorage.setItem('chh_donations', JSON.stringify(initialDonations));
    }

    if (!localStorage.getItem('chh_inventory')) {
      const initialInventory = [
        { item: 'Dry Ration Packets', count: 450, unit: 'packets', status: 'In Stock' },
        { item: 'Emergency First Aid Kits', count: 120, unit: 'kits', status: 'In Stock' },
        { item: 'Winter Blankets', count: 310, unit: 'units', status: 'In Stock' },
        { item: 'Oxygen Cylinders', count: 15, unit: 'units', status: 'Low Stock' }
      ];
      localStorage.setItem('chh_inventory', JSON.stringify(initialInventory));
    }
  },

  getRequests() {
    return JSON.parse(localStorage.getItem('chh_requests') || '[]');
  },

  addRequest(req) {
    const requests = this.getRequests();
    req.id = 'CHH-' + Math.floor(1000 + Math.random() * 9000);
    req.date = new Date().toISOString().split('T')[0];
    req.status = 'Pending';
    requests.unshift(req);
    localStorage.setItem('chh_requests', JSON.stringify(requests));
    return req;
  },

  getDonations() {
    return JSON.parse(localStorage.getItem('chh_donations') || '[]');
  },

  addDonation(don) {
    const donations = this.getDonations();
    don.id = 'DON-' + Math.floor(1000 + Math.random() * 9000);
    don.date = new Date().toISOString().split('T')[0];
    don.status = 'Accepted';
    donations.unshift(don);
    localStorage.setItem('chh_donations', JSON.stringify(donations));
    return don;
  },

  getInventory() {
    return JSON.parse(localStorage.getItem('chh_inventory') || '[]');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DataEngine.init();
});
