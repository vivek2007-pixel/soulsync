// Determine login state
const isLoggedIn = localStorage.getItem("token");

// Try to read stored user (set at login/signup)
let storedUser = null;
try {
  const u = localStorage.getItem("user");
  storedUser = u ? JSON.parse(u) : null;
} catch (err) {
  storedUser = null;
}

// If the logged-in user is an admin, send them to the admin dashboard
if (isLoggedIn && storedUser && storedUser.role === "admin") {
  // Absolute/relative path from pages folder to admin page
  window.location.href = "./Adminsec.html";
}

// Main CTA button
const btn = document.getElementById("landingMainBtn");

if (btn) {
  if (isLoggedIn) {
    // Logged in → Go to chat.html for regular users
    btn.textContent = "Chat ↗";
    btn.href = "./chat.html";

    // Optional style tweak for logged-in users
    btn.style.padding = "14px 28px";
  } else {
    // Not logged in → Try as Guest
    btn.textContent = "Try as Guest";
    btn.href = "./chat-guest.html?guest=true";
  }
}
