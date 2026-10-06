// ============================================================
// BAJO RENTAL TRIP & TOURS - BLOG & ARTICLE SCRIPTS
// Interactive features: Reading Progress, TOC, FAQ, Share, Search
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // 1. Reading Progress Bar
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 2. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Table of Contents (TOC) Active Tracking & Smooth Scroll
  const tocLinks = document.querySelectorAll('.toc-list a');
  const headings = document.querySelectorAll('.article-content h2[id]');

  if (tocLinks.length > 0 && headings.length > 0) {
    window.addEventListener('scroll', function () {
      let currentId = '';
      headings.forEach(heading => {
        const top = heading.getBoundingClientRect().top;
        if (top <= 140) {
          currentId = heading.getAttribute('id');
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (currentId && link.getAttribute('href') === '#' + currentId) {
          link.classList.add('active');
        }
      });
    });
  }

  // 4. Copy Link to Clipboard
  const copyBtn = document.getElementById('share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(function () {
        alert('Tautan artikel berhasil disalin ke clipboard!');
      }).catch(function () {
        prompt('Salin link artikel:', url);
      });
    });
  }

  // 5. Blog Search & Filter (for artikel/index.html)
  const searchInput = document.getElementById('blogSearchInput');
  const filterChips = document.querySelectorAll('.filter-chip');
  const blogCards = document.querySelectorAll('.blog-card');

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeChip = document.querySelector('.filter-chip.active');
    const selectedCategory = activeChip ? activeChip.getAttribute('data-category') : 'all';

    blogCards.forEach(card => {
      const title = (card.querySelector('.blog-card-title')?.innerText || '').toLowerCase();
      const excerpt = (card.querySelector('.blog-card-excerpt')?.innerText || '').toLowerCase();
      const category = (card.getAttribute('data-category') || '').toLowerCase();

      const matchesSearch = !query || title.includes(query) || excerpt.includes(query);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory.toLowerCase();

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterCards();
    });
  });
});
