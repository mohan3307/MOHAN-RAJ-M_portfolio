/**
 * Mohan Raj M - Portfolio Main Script
 * Handles mobile navigation, smooth scrolling, active nav indicator,
 * contact form handling, clipboard utilities, and notification toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initContactForm();
  initClipboardActions();
  initResumeDownload();
});

/* --- Navbar Scroll State --- */
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

/* --- Mobile Navigation Drawer --- */
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

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --- ScrollSpy Active Navigation Link --- */
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

/* --- Contact Form Interaction --- */
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

    // Visual loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate sending with direct mailto fallback
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;

      // Provide instant confirmation
      if (formFeedback) {
        formFeedback.classList.add('success');
        formFeedback.textContent = `Thank you, ${name}! Your message has been prepared. You can also reach Mohan directly at his email.`;
      }

      showToast('Message sent! Mohan will get back to you soon.', 'success');

      // Create fallback mailto link to ensure delivery
      const mailtoLink = `mailto:mohanraj@example.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      window.location.href = mailtoLink;

      contactForm.reset();
    }, 750);
  });
}

/* --- Copy Email & Quick Clipboard Actions --- */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy-email]');

  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const emailToCopy = button.getAttribute('data-copy-email') || 'mohanraj@example.com';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailToCopy)
          .then(() => {
            showToast(`Copied ${emailToCopy} to clipboard!`, 'success');
          })
          .catch(() => {
            fallbackCopy(emailToCopy);
          });
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
      showToast('Could not copy automatically. Email: ' + text, 'warning');
    }
    document.body.removeChild(textArea);
  }
}

/* --- Resume Download Helper --- */
function initResumeDownload() {
  const resumeButtons = document.querySelectorAll('.resume-download-btn');

  resumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If assets/resume.pdf is clicked, ensure helpful feedback
      showToast('Downloading Mohan Raj M Resume...', 'info');
    });
  });
}

/* --- Toast Notification Utility --- */
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

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove toast after 3.5s
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
