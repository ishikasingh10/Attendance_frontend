document.addEventListener("DOMContentLoaded", () => {
  const emp = JSON.parse(localStorage.getItem("employee"));
  if (!emp) window.location = "login.html";

  document.getElementById("emp_name").innerText = emp.user.username;
  document.getElementById("emp_id").innerText = emp.employee_id;
  document.getElementById("emp_dept").innerText = emp.department;

  document.getElementById("dateFilter").addEventListener("change", loadAttendance);
  document.getElementById("monthFilter").addEventListener("change", loadAttendance);

  loadAttendance();

  async function loadAttendance() {
    let url = `${API_BASE}/api/attendance/?username=${emp.user.username}`;
    const date = document.getElementById("dateFilter").value;
    const month = document.getElementById("monthFilter").value;

    if (date) url += `&date=${date}`;
    else if (month) url += `&month=${month}`;

    const table = document.getElementById("attendanceTable");
    table.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

    try {
      const res = await fetch(url);
      const data = await res.json();

      table.innerHTML = '';
      if (data.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No records</td></tr>";
        return;
      }

      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.date}</td><td>${row.day}</td><td>${row.check_in}</td><td>${row.check_out}</td>`;
        table.appendChild(tr);
      });
    } catch (err) {
      table.innerHTML = "<tr><td colspan='4'>❌ Error loading data</td></tr>";
    }
  }
});
