/**
 * Mohan Raj M - Portfolio Main Script
 * Handles:
 * 1. Interactive moving constellation particle canvas
 * 2. Navigation bar & active link scrollspy
 * 3. Mobile menu drawer
 * 4. Project Detail Modal Template with live interactive preview
 * 5. Clipboard actions (Email & Git clone command)
 * 6. Contact form validation and toast notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initConstellationCanvas();
  initProjectModals();
  initContactForm();
  initClipboardActions();
  initResumeDownload();
});

/* --- 1. Moving Constellation Particle Canvas --- */
function initConstellationCanvas() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
  let particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(99, 102, 241, 0.45)';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;

      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;

      // Mouse reactivity
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 2.5;
          this.y -= directionY * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const opacity = (1 - distance / 130) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/* --- 2. Navbar Scroll State --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- 3. Mobile Navigation Drawer --- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

  if (!mobileToggle || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
    mobileToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars-staggered"></i>';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    document.body.style.overflow = '';
  };

  mobileToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --- 4. ScrollSpy Active Navigation Indicator --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        updateActiveLink(desktopLinks, currentId);
        updateActiveLink(mobileLinks, currentId);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveLink(links, activeId) {
    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --- 5. Project Detail Modal Template System --- */
const projectsData = {
  1: {
    title: 'Crypto Portfolio Manager',
    category: 'Infosys Springboard Internship Project',
    image: 'assets/images/project1-crypto.jpg',
    github: 'https://github.com/mohan3307/Crypto-Portfolio-Manager',
    cloneCmd: 'git clone https://github.com/mohan3307/Crypto-Portfolio-Manager.git',
    description: 'A specialized cryptocurrency asset tracker and valuation manager built to provide investors with real-time portfolio health monitoring, return analytics, and structured market reports.',
    tech: ['Python', 'Database Fundamentals', 'Data Analytics', 'Git & GitHub'],
    features: [
      'Comprehensive crypto holdings tracking and market asset evaluation',
      'Automated summary generation and calculated ROI metrics reporting',
      'Historical valuation trends, data validation, and portfolio optimization insights'
    ]
  },
  2: {
    title: 'AttendEdge – Student Attendance Analytics System',
    category: 'Full-Stack Web Engineering',
    image: 'assets/images/project2-attendance.jpg',
    github: 'https://github.com/mohan3307/Automated-student-attendance-monitoring-and-analytics-system-for-colleges',
    cloneCmd: 'git clone https://github.com/mohan3307/Automated-student-attendance-monitoring-and-analytics-system-for-colleges.git',
    description: 'An automated full-stack academic portal developed for colleges to streamline daily classroom attendance, track multi-semester trends, and proactively alert faculty about at-risk students.',
    tech: ['React (Vite)', 'Node.js', 'Express', 'SQLite', 'REST API', 'Chart.js'],
    features: [
      'Triple-tier role-based authentication (Admin, Faculty/Teacher, Student)',
      '1-click batch roster attendance marking (Present / Late / Excused / Absent)',
      'Longitudinal analytics dashboard highlighting attendance anomalies and alert notifications'
    ]
  },
  3: {
    title: 'Smart Community Health & Early Warning System',
    category: 'Public Health Surveillance & IoT',
    image: 'assets/images/project3-water-health.jpg',
    github: 'https://github.com/mohan3307/Smart-Community-Health-Monitoring-and-Early-Warning-System-for-Water-Borne-Diseases',
    cloneCmd: 'git clone https://github.com/mohan3307/Smart-Community-Health-Monitoring-and-Early-Warning-System-for-Water-Borne-Diseases.git',
    description: 'A full-stack municipal digital surveillance and early warning platform designed for public health officials and community leaders to monitor potable water quality and curb water-borne epidemics.',
    tech: ['Full-Stack Web', 'Health Data Analytics', 'Geographic Mapping', 'GitHub Pages'],
    features: [
      'Real-time water quality parameter tracking (Turbidity, pH, Coliform counts)',
      'Automated outbreak threshold alert triggers dispatched to municipal health officers',
      'Interactive geospatial risk mapping and public health containment resource tracking'
    ]
  },
  4: {
    title: 'Voice-Controlled Gaming Tools for Enhanced Learning',
    category: 'Voice AI & Gamified EdTech',
    image: 'assets/images/project4-voice-gaming.jpg',
    github: 'https://github.com/mohan3307/Voice-Controlled-Gaming-Tools-for-Enhanced-Learning-in-the-Skill-Ecosystem',
    cloneCmd: 'git clone https://github.com/mohan3307/Voice-Controlled-Gaming-Tools-for-Enhanced-Learning-in-the-Skill-Ecosystem.git',
    description: 'An enterprise-grade, accessibility-driven learning platform that lets students navigate interactive programming sandboxes, solve quizzes, and embark on RPG quests using browser Web Speech API voice commands.',
    tech: ['React.js', 'TypeScript', 'Node.js', 'Socket.IO', 'Web Speech API', 'Tailwind CSS'],
    features: [
      'Hands-free voice recognition navigation and command-driven coding sandbox execution',
      'Real-time multiplayer speed matching and cooperative quizzes powered by Socket.IO',
      'Gamified learning progression with interactive RPG quests, unlockable badges, and analytics'
    ]
  },
  5: {
    title: 'AegisResponse – Smart Ambulance Allocation & Routing',
    category: 'Emergency Logistics & Triage Optimization',
    image: 'assets/images/project5-smart-ambulance.jpg',
    github: 'https://github.com/mohan3307/Smart-Ambulance-Allocation-Hospital-Routing',
    cloneCmd: 'git clone https://github.com/mohan3307/Smart-Ambulance-Allocation-Hospital-Routing.git',
    description: 'An emergency clinical logistics management and "Golden Hour" optimization platform designed to allocate clinically equipped ambulances and dynamically route emergency vehicles to specialized hospital facilities.',
    tech: ['Full-Stack Systems', 'Geospatial Routing', 'Triage Optimization', 'Real-Time Telemetry'],
    features: [
      'Clinical severity and equipment-aware dispatch matching (Ventilator, ICU ambulances)',
      'Dynamic hospital bed capacity matching and specialized emergency unit routing',
      'Real-time paramedic transit telemetry and critical "Golden Hour" timeline tracking'
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const previewButtons = document.querySelectorAll('[data-preview-project]');

  if (!modalOverlay) return;

  function openModal(id) {
    const data = projectsData[id];
    if (!data) return;

    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalImg').alt = data.title;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalDesc').textContent = data.description;
    document.getElementById('modalCloneCode').textContent = data.cloneCmd;
    document.getElementById('modalGithubBtn').href = data.github;

    // Tech badges
    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-badge';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    // Features
    const featContainer = document.getElementById('modalFeatures');
    featContainer.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${f}</span>`;
      featContainer.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-preview-project');
      openModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Modal Copy Clone Button
  const modalCopyBtn = document.getElementById('modalCopyCloneBtn');
  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      const codeText = document.getElementById('modalCloneCode').textContent;
      navigator.clipboard.writeText(codeText)
        .then(() => showToast('Copied git clone command to clipboard!', 'success'))
        .catch(() => showToast('Could not copy command automatically.', 'warning'));
    });
  }
}

/* --- 6. Contact Form Interaction --- */
function initContactForm() {
  const contactForm = document.getElementById('portfolioContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields before sending.', 'warning');
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;

      if (formFeedback) {
        formFeedback.classList.add('success');
        formFeedback.textContent = `Thank you, ${name}! Your inquiry has been created. Mohan will review and respond promptly.`;
      }

      showToast('Message sent! Mohan will get back to you soon.', 'success');

      const mailtoLink = `mailto:mohanraj@example.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      window.location.href = mailtoLink;

      contactForm.reset();
    }, 750);
  });
}

/* --- 7. Clipboard Utilities --- */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');

  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const emailToCopy = button.getAttribute('data-copy-email') || 'mohanraj@example.com';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailToCopy)
          .then(() => showToast(`Copied ${emailToCopy} to clipboard!`, 'success'))
          .catch(() => fallbackCopy(emailToCopy));
      } else {
        fallbackCopy(emailToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${text} to clipboard!`, 'success');
    } catch (err) {
      showToast('Email: ' + text, 'warning');
    }
    document.body.removeChild(textArea);
  }
}

/* --- 8. Resume Download Feedback --- */
function initResumeDownload() {
  const resumeButtons = document.querySelectorAll('.resume-download-btn');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading Mohan Raj M Resume...', 'info');
    });
  });
}

/* --- 9. Toast Notification System --- */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color: ${type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : '#38bdf8')}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 400);
  }, 3500);
}

/* --- Global Scroll To Top --- */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
window.scrollToTop = scrollToTop;
