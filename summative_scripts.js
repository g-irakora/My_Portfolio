// Javascript

document.addEventListener("DOMContentLoaded", function () {
  // Remove loading screen
  setTimeout(() => {
    const loading = document.getElementById('loading');
    loading.classList.add('fade-out');
    setTimeout(() => loading.remove(), 500);
  }, 1000);

  // Get all sections and navigation elements
  const sections = document.querySelectorAll('.section');
  const nav = document.getElementById("main-nav");
  const hero = document.querySelector(".hero");
  const navLinks = nav.querySelectorAll("a");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");


  // Mobile navigation toggle
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Sticky Navigation
  const heroHeight = hero.offsetHeight;
  
  function handleStickyNav() {
    if (window.scrollY > heroHeight - 100) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }

  // Section blur/focus effect
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach(sec => sec.classList.remove('active-section'));
        entry.target.classList.add('active-section');
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: "-15% 0px"
  });

  // Navigation link highlighting
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active-link"));
        const sectionId = entry.target.id;
        const activeLink = nav.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add("active-link");
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: "-20% 0px"
  });

  // Scroll reveal animation
  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
  });

  // Initialize observers
  sections.forEach(section => {
    sectionObserver.observe(section);
    linkObserver.observe(section);
    scrollRevealObserver.observe(section);
  });

  // Scroll event with throttling
  let ticking = false;
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavigation);
      ticking = true;
    }
  }
  
  function updateNavigation() {
    handleStickyNav();
    ticking = false;
  }
  
  window.addEventListener("scroll", requestTick);

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        const navHeight = nav.offsetHeight;
        const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
  
        const scrollTo = sectionTop - navHeight;
  
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }
    });
  });
  

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
      this.reset();
    });
  }

  // Initialize first section as active
  if (sections.length > 0) {
    sections[0].classList.add('active-section');
    sections[0].classList.add('active');
  }
  
  if (navLinks.length > 0) {
    navLinks[0].classList.add('active-link');
  }
});