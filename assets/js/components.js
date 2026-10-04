// ===== RYANA PROJECT - COMPONENT LOADER =====
// This script loads and injects navbar and footer components

document.addEventListener('DOMContentLoaded', function() {
  loadNavbarFooter();
  activateCurrentNavLink();
  setupScrollAnimations();
});

// Load Navbar and Footer
function loadNavbarFooter() {
  fetch('assets/html/navbar-footer.html')
    .then(response => response.text())
    .then(data => {
      // Parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      
      // Extract navbar and footer
      const navbar = tempDiv.querySelector('nav');
      const footer = tempDiv.querySelector('footer');
      
      // Insert navbar at the beginning of body
      if (navbar) {
        document.body.insertBefore(navbar, document.body.firstChild);
      }
      
      // Append footer at the end of body
      if (footer) {
        document.body.appendChild(footer);
      }
      
      // Re-activate current nav link after injection
      activateCurrentNavLink();
    })
    .catch(error => console.warn('Could not load navbar/footer:', error));
}

// Activate current page's nav link
function activateCurrentNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'INDEX.HTML';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.toUpperCase() === currentPage.toUpperCase()) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Scroll animations for elements
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.section-title, .hero h1, .hero p, .ceo-message, .paragraph').forEach(el => {
    observer.observe(el);
  });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Mobile menu close on link click
document.addEventListener('click', function(e) {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    const isToggler = e.target === navbarToggler || navbarToggler.contains(e.target);
    const isNavLink = e.target.closest('.nav-link');
    
    if (isNavLink && !isToggler) {
      navbarToggler.click();
    }
  }
});
