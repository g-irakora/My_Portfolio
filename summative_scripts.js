document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.section');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach(sec => sec.classList.remove('active-section'));
        entry.target.classList.add('active-section');
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: "-10% 0px"
  });
  sections.forEach(sec => sectionObserver.observe(sec));
  
});

document.addEventListener("DOMContentLoaded", () => {
  const nav       = document.getElementById("main-nav");
  const hero      = document.querySelector(".hero");
  const navLinks  = nav.querySelectorAll("a");
  const sections  = document.querySelectorAll("main section");

  //toggle
  const heroHeight = hero.offsetHeight;
  window.addEventListener("scroll", () => {
    if (window.scrollY > heroHeight) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });

  // 2) Highlight current section
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove 'active-link' from all, then add to matching link
        navLinks.forEach(a => a.classList.remove("active-link"));
        const id = entry.target.id;
        const activeLink = nav.querySelector(`a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active-link");
      }
    });
  }, {
    threshold: 0.6
  });

  sections.forEach(sec => linkObserver.observe(sec));
});
