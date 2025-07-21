# Attendance Frontend

A modern web application for employee attendance management using QR code scanning. This project provides a user-friendly interface for employees to log in, mark attendance, and view their attendance records, with password reset functionality and seamless integration with a backend API.

---

## 🚀 Features

- **Employee Login & Logout**
- **QR Code Attendance Marking** (Check-In/Check-Out)
- **Attendance Dashboard** with date/month filters
- **Password Reset Workflow** (Forgot/Reset)
- **Responsive UI** (Bootstrap 5)
- **PDF Documentation Download** (see `documentation.html`)

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **QR Scanning:** [html5-qrcode](https://github.com/mebjas/html5-qrcode)
- **PDF Export:** [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) (for documentation)
- **Backend API:** (see `js/config.js` for endpoint)

---

## 📁 Folder Structure

```
Attendance_frontend/
├── dashboard copy.html         # Alternate dashboard layout
├── dashboard.html              # Main dashboard page
├── forgot.html                 # Forgot password page
├── index.html                  # Landing page
├── js/
│   ├── auth.js                 # Login/logout logic
│   ├── config.js               # API endpoint config
│   ├── dashboard.js            # Attendance dashboard logic
│   └── qrscan.js               # QR code scan logic
├── login.html                  # Login page
├── reset.html                  # Password reset page
├── scanner.html                # QR scanner page
```

---

## ⚙️ Setup & Usage

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/ishikasingh10/Attendance_frontend.git>
   cd Attendance_frontend
   ```
2. **Open `index.html` in your browser** (or use Live Server for local development).
3. **Configure Backend API:**
   - The API endpoint is set in `js/config.js`:
     ```js
     const API_BASE = "https://attendence-backend-y769.onrender.com";
     ```
   - Change this if your backend URL differs.
4. **(Optional) Download Documentation as PDF:**
   - Open `documentation.html` in your browser and click **Download as PDF**.

---

## 📝 File-by-File Logic Summary

### HTML Pages
- **index.html:** Landing page with a button to login.
- **login.html:** Employee login form. Uses `js/auth.js` for authentication.
- **dashboard.html:**
  - Shows employee info and attendance records.
  - Date/month filters for attendance.
  - Uses `js/dashboard.js`.
- **scanner.html:**
  - QR code scanner for marking attendance (Check-In/Check-Out).
  - Uses `js/qrscan.js`.
- **forgot.html / reset.html:** Password reset workflow.
- **dashboard copy.html:** Alternate dashboard layout.

### JavaScript Files
- **js/config.js:**
  - Stores the backend API base URL.
- **js/auth.js:**
  - Handles login form submission and logout.
  - Stores employee data in `localStorage` on login.
- **js/dashboard.js:**
  - Loads attendance records for the logged-in employee.
  - Handles filtering and table population.
- **js/qrscan.js:**
  - Handles QR code generation, scanning, and attendance marking.
  - Communicates with backend for QR and attendance APIs.

---

## 🖼️ App Workflow

1. **Login:** Employee logs in via `login.html`.
2. **Dashboard:** Employee views attendance records and filters by date/month.
3. **Mark Attendance:** Employee uses QR scanner to check in/out.
4. **Password Reset:** Employee can request and reset password via email.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. 
