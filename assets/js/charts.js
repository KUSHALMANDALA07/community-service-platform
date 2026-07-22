/* ==========================================================================
   COMMUNITY HELP HUB - CHART.JS INITIALIZATIONS
   NGO Social Service Initiative: Community Engagement and Social Responsibility
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAdminCharts();
  initVolunteerCharts();
});

function initAdminCharts() {
  // 1. Monthly Donations Bar Chart
  const donationCanvas = document.getElementById('monthlyDonationsChart');
  if (donationCanvas && typeof Chart !== 'undefined') {
    new Chart(donationCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Food Packages',
            data: [120, 150, 180, 220, 300, 280, 350, 400, 420, 480, 510, 600],
            backgroundColor: '#2E8B57',
            borderRadius: 6
          },
          {
            label: 'Medical Kits',
            data: [40, 55, 70, 90, 110, 130, 160, 190, 210, 240, 280, 320],
            backgroundColor: '#4CAF50',
            borderRadius: 6
          },
          {
            label: 'Books & Clothes',
            data: [80, 95, 130, 160, 210, 250, 310, 340, 390, 430, 490, 550],
            backgroundColor: '#FFC107',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,0.05)' } }
        }
      }
    });
  }

  // 2. Help Requests Category Pie Chart
  const requestCategoryCanvas = document.getElementById('requestCategoryChart');
  if (requestCategoryCanvas && typeof Chart !== 'undefined') {
    new Chart(requestCategoryCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Food Assistance', 'Medical Support', 'Education Support', 'Emergency SOS', 'Clothing & Supplies', 'Senior Care'],
        datasets: [{
          data: [35, 25, 15, 12, 8, 5],
          backgroundColor: ['#2E8B57', '#4CAF50', '#FFC107', '#dc3545', '#17a2b8', '#6c757d'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // 3. Volunteer Growth Line Chart
  const volunteerLineCanvas = document.getElementById('volunteerGrowthChart');
  if (volunteerLineCanvas && typeof Chart !== 'undefined') {
    new Chart(volunteerLineCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
        datasets: [{
          label: 'Active Volunteers',
          data: [80, 140, 220, 310, 390, 450],
          borderColor: '#2E8B57',
          backgroundColor: 'rgba(46, 139, 87, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

function initVolunteerCharts() {
  const volunteerHoursCanvas = document.getElementById('volunteerHoursChart');
  if (volunteerHoursCanvas && typeof Chart !== 'undefined') {
    new Chart(volunteerHoursCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Hours Contributed',
          data: [12, 18, 15, 24],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.15)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
