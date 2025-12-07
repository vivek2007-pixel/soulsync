// =====================================================
// Admin Dashboard Logic (CLEAN VERSION)
// =====================================================

import { apiGet } from "./api.js";

// ==========================================
// Initialize Admin Page
// ==========================================
export async function setupAdminPage() {
  console.log("Setting up Admin Page...");

  loadAdminMetrics();   // Only total users + chart
  loadAdminUsers();     // UL list
  loadUsersTable();     // Table with checkboxes
}

window.onload = setupAdminPage;

// ==========================================
// Load Admin Metrics (ONLY TOTAL USERS)
// ==========================================
async function loadAdminMetrics() {
  try {
    const metrics = await apiGet("/admin/metrics");

    if (metrics.error) {
      console.error("Admin metrics error:", metrics.error);
      return;
    }

    // Only total users is used now
    document.getElementById("totalUsers").textContent =
      metrics.totalUsers ?? "0";

    renderMetricsChart(metrics.timeSeries || []);

  } catch (err) {
    console.error("Admin metrics fetch failed:", err);
  }
}

// ==========================================
// Render Chart
// ==========================================
function renderMetricsChart(data) {
  const ctx = document.getElementById("metricsChart").getContext("2d");

  const labels = data.map(i => i.date);
  const values = data.map(i => i.totalMessages);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Messages Per Day",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2
        }
      ]
    },
    options: { responsive: true }
  });
}

// =====================================================
// ORIGINAL UL USER LIST
// =====================================================
async function loadAdminUsers() {
  try {
    const result = await apiGet("/admin/users");

    if (result.error) {
      console.error("Admin users fetch error:", result.error);
      return;
    }

    const users = result.users || [];
    const userList = document.getElementById("adminUserList");

    if (!userList) return;

    userList.innerHTML = "";

    users.forEach(user => {
      const li = document.createElement("li");
      li.className = "user-item";
      li.textContent = `${user.firstName} ${user.lastName} (${user.email})`;
      userList.appendChild(li);
    });

  } catch (err) {
    console.error("Admin users fetch failed:", err);
  }
}

// =====================================================
// USER TABLE WITH CHECKBOXES
// =====================================================
async function loadUsersTable() {
  try {
    const result = await apiGet("/admin/users");

    if (result.error) {
      console.error("Admin table fetch error:", result.error);
      return;
    }

    const users = result.users || [];
    const tbody = document.getElementById("usersTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    users.forEach(user => {
      const tr = document.createElement("tr");
      if(user.role=="user"){
        tr.innerHTML = `
        <td>${user.firstName || ""}</td>
        <td>${user.lastName || ""}</td>
        <td>${user.email || ""}</td>
        <td>${user.username || ""}</td>
        <td>${user.role || ""}</td>
        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        <td>
          <input type="checkbox" class="userCheckbox" data-email="${user.email}">
        </td>
      `;

      tbody.appendChild(tr);
      }

      
    });

    setupSelectAllFeature();

  } catch (err) {
    console.error("Admin table fetch failed:", err);
  }
}

// =====================================================
// SELECT ALL CHECKBOX LOGIC
// =====================================================
function setupSelectAllFeature() {
  const selectAll = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll(".userCheckbox");

  if (!selectAll) return;

  selectAll.addEventListener("change", () => {
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
  });

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const allChecked = [...checkboxes].every(x => x.checked);
      selectAll.checked = allChecked;
    });
  });
}

// =====================================================
// EXPORT SELECTED EMAILS
// =====================================================
export function getSelectedEmails() {
  return [...document.querySelectorAll(".userCheckbox:checked")].map(
    cb => cb.dataset.email
  );
}
