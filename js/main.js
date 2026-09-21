// ===================================
// BAJO RENTAL TRIP & TOURS
// Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Fade-in animation on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function(el) {
    observer.observe(el);
  });

  // WhatsApp message builder
  window.sendWhatsApp = function(carName, priceType) {
    var waNumber = '6285801678597'; // Ganti dengan nomor WA asli
    var message = '';
    if (priceType === 'lepas-kunci') {
      message = 'Halo Bajo Rental Trip & Tours, saya ingin menyewa *' + carName + '* dengan opsi *Lepas Kunci*. Bisa info ketersediaan dan detail?';
    } else {
      message = 'Halo Bajo Rental Trip & Tours, saya ingin menyewa *' + carName + '* dengan opsi *Include Driver + BBM*. Bisa info ketersediaan dan detail?';
    }
    var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  };

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('formName').value;
      var phone = document.getElementById('formPhone').value;
      var car = document.getElementById('formCar').value;
      var msg = document.getElementById('formMsg').value;
      
      var waNumber = '6285801678597'; // Ganti dengan nomor WA asli
      var message = 'Halo Bajo Rental Trip & Tours!\n\nNama: ' + name + '\nNo. HP: ' + phone + '\nMobil yang diminati: ' + car + '\nPesan: ' + msg;
      var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message);
      window.open(url, '_blank');
    });
  }

  // Counter animation
  function animateCounter(el, target, suffix) {
    var start = 0;
    var duration = 2000;
    var step = target / (duration / 16);
    var current = start;
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  var countersStarted = false;
  var statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    var counterObserver = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll('[data-count]').forEach(function(el) {
          var target = parseInt(el.getAttribute('data-count'));
          var suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
        });
      }
    }, { threshold: 0.5 });
    counterObserver.observe(statsSection);
  }

});
