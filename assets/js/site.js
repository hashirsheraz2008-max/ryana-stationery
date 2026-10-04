(() => {
  const loader = document.querySelector('[data-page-loader]');

  if (loader) {
    const hideLoader = () => {
      window.setTimeout(() => loader.classList.add('hidden'), 250);
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader, { once: true });
    }
  }

  const badgeLabels = [
    { text: 'New', className: 'new' },
    { text: 'Popular', className: 'popular' },
    { text: 'Best Seller', className: 'best-seller' },
    { text: 'Limited', className: 'limited' },
    { text: 'Popular', className: 'popular' }
  ];

  document.querySelectorAll('.card-grid .card').forEach((card, index) => {
    if (card.querySelector('.product-badge')) {
      return;
    }

    const badge = badgeLabels[index % badgeLabels.length];
    const badgeElement = document.createElement('span');
    badgeElement.className = `product-badge ${badge.className}`;
    badgeElement.textContent = badge.text;
    card.appendChild(badgeElement);
  });

  const backToTop = document.querySelector('[data-back-to-top]');

  if (backToTop) {
    const updateVisibility = () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const revealTargets = document.querySelectorAll('.section-title, .hero h1, .hero p, footer');
  const reveal = (element) => element.classList.add('active');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach(reveal);
  }

  const catalogFilter = document.querySelector('[data-catalog-filter]');
  if (catalogFilter) {
    const categories = catalogFilter.dataset.catalogFilter.split(',');
    const cards = [...document.querySelectorAll('.card-grid .card')];
    const groupSize = Math.ceil(cards.length / categories.length);

    cards.forEach((card, index) => {
      card.dataset.catalogCategory = categories[Math.min(Math.floor(index / groupSize), categories.length - 1)];
    });

    catalogFilter.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.category;
        catalogFilter.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        cards.forEach((card) => {
          card.style.display = selected === 'all' || card.dataset.catalogCategory === selected ? '' : 'none';
        });
      });
    });
  }
})();
