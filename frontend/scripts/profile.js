export function setupProfilePage() {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    const user = JSON.parse(userStr);
    document.getElementById(
      "profileName"
    ).textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileUsername").textContent = user.username;
    document.getElementById("profileCreated").textContent =
      user.createdAt || "—";
    
    // Update back link based on user role
    const backLink = document.getElementById("profileBackLink");
    if (backLink) {
      if (user.role === "admin") {
        backLink.textContent = "← Back to Dashboard";
        backLink.href = "./Adminsec.html";
      } else {
        backLink.textContent = "← Back to Chat";
        backLink.href = "./chat.html";
      }
    }
  }

  // LOGOUT BUTTON
  document.getElementById("logoutBtn").addEventListener("click", logoutUser);

  // THEME SETUP
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return; // Safety check

  // Read saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    toggle.checked = true;
  } else {
    document.body.classList.remove("theme-dark");
    toggle.checked = false;
  }

  // Toggle event listener
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("theme-dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("theme-dark");
    }
  });
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("You have been logged out.");
  window.location.href = "../pages/landing.html";
}
