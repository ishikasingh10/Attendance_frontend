let qrScanner;
let hasScanned = false;
let lastQrToken = null;  // ✅ Track last token

const emp = JSON.parse(localStorage.getItem("employee"));
if (!emp) location.href = "login.html";

window.onload = () => {
  const nameEl = document.getElementById("empName");
  if (nameEl) nameEl.innerText = emp.user.username;
};

async function startScan() {
  hasScanned = false;

  const status = document.getElementById("status");
  const reader = document.getElementById("reader");
  const modeRadio = document.querySelector('input[name="mode"]:checked');
  const mode = modeRadio ? modeRadio.value : null;

  if (!mode) {
    status.innerText = "❌ Please select Check-In or Check-Out";
    return;
  }

  status.innerText = "⏳ Requesting QR from server...";

  // 🔄 1. Generate QR from backend
  try {
    const qrRes = await fetch(`${API_BASE}/api/generate_qr/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: emp.user.username,
        mode: mode
      }),
    });

    const qrData = await qrRes.json();

    if (!qrRes.ok || !qrData.token) {
      status.innerText = `❌ Could not generate QR: ${qrData.error || "Unknown error"}`;
      return;
    }

    lastQrToken = qrData.token; // ✅ Save for cancel
    status.innerText = "📷 Initializing camera...";
    reader.innerHTML = "";
    qrScanner = new Html5Qrcode("reader");

    qrScanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedToken) => {
          if (hasScanned) return;
          hasScanned = true;

          status.innerText = "📡 Sending attendance...";

          try {
            const res = await fetch(`${API_BASE}/api/mark_attendance/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: decodedToken,
                employee_id: emp.employee_id,
                mode: mode,
              }),
            });

            const data = await res.json();

            if (res.ok) {
              status.innerText = `✅ ${mode.toUpperCase()} marked at ${data.time?.slice(11, 19) || "now"}`;
            } else {
              status.innerText = `❌ ${data.error || "Invalid/expired QR"}`;
            }
          } catch (err) {
            status.innerText = "❌ Network error: could not reach server";
          }

          stopScanner();
        },
        (scanError) => {
          // Silent scan error
        }
      )
      .catch((err) => {
        status.innerText = "❌ Failed to access camera: " + err;
      });

  } catch (err) {
    status.innerText = "❌ Failed to request QR";
    console.error("QR Request Error", err);
  }
}

function cancelScan() {
  stopScanner("⛔ Scan cancelled by user.");

  if (!lastQrToken) {
    document.getElementById("status").innerText += "\n⚠️ No QR to cancel.";
    return;
  }

  // 🔥 Cancel QR via backend
  fetch(`${API_BASE}/api/cancel_qr/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: lastQrToken }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("status").innerText += `\n🗑️ QR Cancelled`;
      lastQrToken = null;
    })
    .catch((err) => {
      console.error("Cancel error", err);
      document.getElementById("status").innerText += "\n⚠️ Failed to cancel QR.";
    });
}

function stopScanner(message = "") {
  const status = document.getElementById("status");
  const reader = document.getElementById("reader");

  if (qrScanner) {
    qrScanner.stop().then(() => {
      reader.innerHTML = "";
      if (message) status.innerText = message;
    }).catch((err) => {
      reader.innerHTML = "";
      status.innerText = "⚠️ Could not stop scanner.";
      console.error("Stop error:", err);
    });
  }
}
