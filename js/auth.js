document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_BASE}/api/login/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("employee", JSON.stringify(data));
      window.location = "dashboard.html";
    } else {
      alert(data.error || "Login failed");
    }
  };
});

function logout() {
  localStorage.removeItem("employee");
  window.location = "login.html";
}
