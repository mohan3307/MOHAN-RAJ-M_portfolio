# Mohan Raj M - Professional Portfolio Website

A clean, modern, and fully responsive dark-themed portfolio website designed for **Mohan Raj M**, a 2nd-year B.Tech Computer Science and Business Systems (CSBS) student at **V.S.B Engineering College, Tamil Nadu**.

![Portfolio Preview Banner](https://img.shields.io/badge/Theme-Modern%20Dark-38bdf8?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-10b981?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-6366f1?style=for-the-badge)

---

## 🌟 Key Highlights & Included Sections

1. **Hero Section**:
   - High-impact introduction with glowing typography and animated background orbs.
   - Status badge: `Pega Intern • Currently Ongoing` + `V.S.B Engineering College`.
   - Tagline: *"Building projects, learning technology, and turning ideas into practical solutions."*
   - Interactive visual code mockup card showcasing CSBS profile definition.
   - Action buttons: `View My Projects`, `GitHub`, and `Download Resume`.

2. **About Me**:
   - Motivated CSBS student profile detailing problem-solving, communication, teamwork, and time management.
   - Distinct highlight cards explaining the dual focus of software engineering and enterprise business systems.

3. **Education**:
   - **V.S.B Engineering College**
   - **B.Tech – Computer Science and Business Systems (CSBS)**
   - **2024 – 2028 | Currently pursuing 2nd Year**
   - Location: Karur / Tamil Nadu, India.

4. **Internship Experience Timeline**:
   - **Pega Internship Project** — Highlighted prominently with a pulsing green badge as **Currently Ongoing** (focus on enterprise application development, business process automation, and workflow design).
   - **Infosys Springboard Internship** — Completed (Project: *Crypto Portfolio Manager* with data handling, reporting, and analytics).

5. **Projects Section**:
   - 5 Project Cards:
     - **Project 01 (Featured)**: *Crypto Portfolio Manager* (Infosys Springboard) with tech stack, key features, and GitHub link.
     - **Projects 02 – 05**: Clean, labeled placeholders with tech tags and key feature lists ready to link to your exact GitHub repositories.
   - Prominent global CTA button: **"View All Projects on GitHub"** linking directly to [https://github.com/mohan3307](https://github.com/mohan3307).

6. **Skills & Capabilities**:
   - **Technical Skills**: Python (Basic), Database Fundamentals, Git & GitHub.
   - **Productivity & Business Tools**: MS Word, MS Excel, MS PowerPoint.
   - **Soft Skills**: Communication, Teamwork & Collaboration, Problem Solving, Time Management, Adaptability.

7. **Contact Section**:
   - Direct cards for GitHub, Email (with 1-click clipboard copy), and College location.
   - Working interactive message form with instant validation and feedback toasts.
   - Download resume buttons linked to `assets/resume.pdf` and printable `assets/resume.html`.

---

## 📁 Project Structure

```
MOHAN RAJ_M_PORTFOLIO/
├── index.html              # Core semantic webpage
├── css/
│   └── style.css           # Premium dark theme styling, glassmorphism, responsive styles
├── js/
│   └── main.js             # Mobile drawer, scrollspy, contact feedback, clipboard utilities
├── assets/
│   ├── resume.pdf          # Downloadable resume PDF
│   └── resume.html         # Printable formatted HTML resume
└── README.md               # Project documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open
Simply double-click `index.html` in your file explorer to view it directly in Google Chrome, Edge, or any modern web browser.

### Option 2: Local HTTP Server (Python)
If you'd like to test with a local server:
```bash
# In the project directory:
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

---

## 🌐 How to Deploy for Free on GitHub Pages

1. **Create a GitHub Repository**:
   - Log into your GitHub account (`mohan3307`).
   - Create a new public repository named `mohan3307.github.io` (or `portfolio`).

2. **Push the Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Mohan Raj M Portfolio Website"
   git branch -M main
   git remote add origin https://github.com/mohan3307/mohan3307.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings -> **Pages**.
   - Under **Build and deployment**, select `Deploy from a branch`.
   - Choose branch `main` and folder `/(root)`.
   - Click **Save**.
   - Your website will be live in ~1 minute at `https://mohan3307.github.io`!

---

## ✏️ How to Customize Your Projects & Details

- **To update Project 2 to 5 details**:
  Open `index.html` and search for `Project 02 Title`, `Project 03 Title`, etc. Replace the placeholder text inside the `<h3 class="project-title">` and `<li>` tags with your repository name, description, and exact GitHub links.
- **To update your Resume PDF**:
  Replace `assets/resume.pdf` with your updated resume PDF file using the exact same filename.
- **To update your Email**:
  Search for `mohanraj@example.com` in `index.html` and replace it with your personal or college email address.
