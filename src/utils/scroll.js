export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const createSectionObserver = (callback) => {
  const options = {
    root: null,
    rootMargin: '-80px 0px -20% 0px', // Adjust based on navbar height
    threshold: 0
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target.id);
      }
    });
  }, options);
};

export const initSmoothScrollPolyfill = () => {
  if (!(window && 'scrollBehavior' in document.documentElement.style)) {
    import('smoothscroll-polyfill').then(smoothscroll => {
      smoothscroll.polyfill();
    });
  }
}; 