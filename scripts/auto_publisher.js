/**
 * Auto Article Publisher & SEO Engine
 * Bajo Rental Trip & Tours (https://bajorentaltriptours.com)
 * 
 * Menghasilkan & memperbarui otomatis 2 artikel per hari dengan kata kunci:
 * - sewa mobil labuan bajo
 * - rental mobil labuan bajo
 * - bajo trip & tours
 * - sewa hiace labuan bajo
 */

const fs = require('fs');
const path = require('path');
const { baseArticles } = require('./articles_data');
const { targetKeywords, generateDynamicArticle } = require('./content_generator');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'data', 'articles.json');
const ARTIKEL_DIR = path.join(ROOT_DIR, 'artikel');
const SITEMAP_FILE = path.join(ROOT_DIR, 'sitemap.xml');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const LOG_FILE = path.join(ROOT_DIR, 'logs', 'publishing.log');
const BASE_URL = 'https://bajorentaltriptours.com';

function log(msg) {
  const time = new Date().toISOString();
  const entry = `[${time}] ${msg}`;
  console.log(entry);
  try {
    fs.appendFileSync(LOG_FILE, entry + '\n');
  } catch (e) {}
}

function formatDateIndo(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getTodayStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Inisialisasi Database Artikel jika belum ada
 */
function initArticlesDatabase() {
  if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  }

  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const existing = JSON.parse(content);
      // Sinkronisasi pembaruan konten dari baseArticles jika ada
      let updated = false;
      existing.forEach(item => {
        const base = baseArticles.find(b => b.slug === item.slug);
        if (base) {
          item.title = base.title;
          item.excerpt = base.excerpt;
          item.content = base.content;
          item.tags = base.tags;
          item.readTime = base.readTime;
          updated = true;
        }
      });
      if (updated) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8');
        log('Memperbarui konten artikel dasar di data/articles.json.');
      }
      return existing;
    } catch (e) {
      log(`Peringatan: Gagal membaca ${DATA_FILE}, membuat ulang dari baseArticles.`);
    }
  }

  // Siapkan database awal dari baseArticles dengan jadwal 2 artikel per hari
  const today = getTodayStr();
  const articles = [];

  baseArticles.forEach((art, idx) => {
    // 2 artikel per hari: artikel 0 & 1 hari ini, 2 & 3 besok, dst.
    const dayOffset = Math.floor(idx / 2);
    const pubDate = new Date();
    pubDate.setDate(pubDate.getDate() + dayOffset);
    const dateStr = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}-${String(pubDate.getDate()).padStart(2, '0')}`;

    articles.push({
      ...art,
      id: `art-${idx + 1}`,
      publishDate: dateStr,
      status: dayOffset === 0 ? 'published' : 'scheduled',
      dateModified: dateStr
    });
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  log(`Inisialisasi database artikel dengan ${articles.length} entri awal.`);
  return articles;
}

/**
 * Menghasilkan HTML Halaman Artikel Tunggal
 */
function renderArticleHTML(article, allPublishedArticles) {
  const relatedArticles = allPublishedArticles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  // TOC Generator
  const tocItems = (article.content.sections || []).map(sec => {
    const secId = sec.id || sec.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<li><a href="#${secId}">${sec.heading}</a></li>`;
  }).join('\n');

  // Content Sections Generator
  const sectionsHtml = (article.content.sections || []).map(sec => {
    const secId = sec.id || sec.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let extra = '';
    if (sec.tip) {
      extra = `
      <div class="content-box-tip">
        <h4>&#128161; Tips Wisata Labuan Bajo</h4>
        <p>${sec.tip}</p>
      </div>`;
    }
    return `
    <section id="${secId}">
      <h2>${sec.heading}</h2>
      ${sec.body}
      ${extra}
    </section>`;
  }).join('\n');

  // FAQs Generator & Schema
  const faqsHtml = (article.content.faqs || []).map((faq, idx) => `
    <div class="faq-accordion-item ${idx === 0 ? 'active' : ''}">
      <div class="faq-header">
        <h4>${faq.question}</h4>
        <span class="faq-toggle-icon">&#43;</span>
      </div>
      <div class="faq-body">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('\n');

  const faqSchemaData = (article.content.faqs || []).map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  // Schema.org JSON-LD
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${BASE_URL}/artikel/${article.slug}.html#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/artikel/${article.slug}.html`
        },
        "headline": article.title,
        "description": article.excerpt,
        "image": `${BASE_URL}/${article.image}`,
        "datePublished": `${article.publishDate}T08:00:00+08:00`,
        "dateModified": `${article.dateModified || article.publishDate}T08:00:00+08:00`,
        "mainEntityOfPage": `${BASE_URL}/artikel/${article.slug}.html`,
        "author": {
          "@type": "Organization",
          "name": "Bajo Rental Trip & Tours",
          "url": BASE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bajo Rental Trip & Tours",
          "url": BASE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/images/logo.png`
          }
        },
        "keywords": (article.tags || []).join(", ")
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Artikel & Blog",
            "item": `${BASE_URL}/artikel/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `${BASE_URL}/artikel/${article.slug}.html`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqSchemaData
      },
      {
        "@type": "AutoRental",
        "name": "Bajo Rental Trip & Tours",
        "image": `${BASE_URL}/images/logo.png`,
        "@id": `${BASE_URL}/#autorental`,
        "url": BASE_URL,
        "telephone": "+6285801678597",
        "priceRange": "Rp 450.000 - Rp 4.650.000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. H. Ishaka No.15",
          "addressLocality": "Labuan Bajo",
          "addressRegion": "Nusa Tenggara Timur",
          "postalCode": "86754",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -8.4969,
          "longitude": 119.8891
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "148"
        },
        "makesOffer": [
          {
            "@type": "Offer",
            "name": "Sewa Mobil Honda New Brio",
            "price": "550000",
            "priceCurrency": "IDR"
          },
          {
            "@type": "Offer",
            "name": "Sewa Mobil Toyota New Avanza",
            "price": "600000",
            "priceCurrency": "IDR"
          },
          {
            "@type": "Offer",
            "name": "Sewa Mobil Toyota Innova Reborn",
            "price": "750000",
            "priceCurrency": "IDR"
          },
          {
            "@type": "Offer",
            "name": "Sewa Toyota Hiace Premio Labuan Bajo",
            "price": "1600000",
            "priceCurrency": "IDR"
          }
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ]
  };

  // Related Cards HTML
  const relatedCardsHtml = relatedArticles.map(rel => `
    <article class="blog-card" data-category="${rel.category}">
      <div class="blog-card-img-wrap">
        <img src="../${rel.image}" alt="${rel.title}" loading="lazy" />
        <span class="blog-card-badge">${rel.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span>&#128197; ${formatDateIndo(rel.publishDate)}</span>
          <span>&#9201; ${rel.readTime}</span>
        </div>
        <h3 class="blog-card-title">${rel.title}</h3>
        <p class="blog-card-excerpt">${rel.excerpt}</p>
        <div class="blog-card-footer">
          <a href="${rel.slug}.html" class="blog-read-more">Baca Selengkapnya &rarr;</a>
        </div>
      </div>
    </article>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${article.title} | Bajo Rental Trip &amp; Tours</title>
  <meta name="description" content="${article.excerpt}" />
  <meta name="keywords" content="${article.keyword}, sewa mobil labuan bajo, rental mobil labuan bajo, bajo trip & tours, sewa hiace labuan bajo, wisata flores" />
  <meta name="author" content="Bajo Rental Trip & Tours" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${BASE_URL}/artikel/${article.slug}.html" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${BASE_URL}/artikel/${article.slug}.html" />
  <meta property="og:title" content="${article.title}" />
  <meta property="og:description" content="${article.excerpt}" />
  <meta property="og:image" content="${BASE_URL}/${article.image}" />
  <meta property="article:published_time" content="${article.publishDate}T08:00:00+08:00" />
  <meta property="article:author" content="Bajo Rental Trip & Tours" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${article.title}" />
  <meta name="twitter:description" content="${article.excerpt}" />
  <meta name="twitter:image" content="${BASE_URL}/${article.image}" />

  <link rel="icon" href="../images/logo.png" type="image/png" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/blog.css" />

  <!-- JSON-LD Structured Data Google Schema -->
  <script type="application/ld+json">
  ${JSON.stringify(schemaJson, null, 2)}
  </script>
</head>
<body>

<!-- Reading Progress Bar -->
<div class="reading-progress-container">
  <div class="reading-progress-bar"></div>
</div>

<!-- Navbar -->
<nav class="navbar" id="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-logo" id="nav-logo">
      <img src="../images/logo.png" alt="Bajo Rental Trip & Tours Logo" />
      <div class="nav-logo-text">
        <span class="brand-name">BAJO RENTAL</span>
        <span class="brand-sub">Trip &amp; Tours - Labuan Bajo</span>
      </div>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="../index.html">Beranda</a></li>
      <li><a href="../index.html#armada">Armada</a></li>
      <li><a href="../index.html#trip">One Day Trip</a></li>
      <li><a href="../index.html#speedboat">Speedboat</a></li>
      <li><a href="index.html" style="color:var(--gold-light);">Blog &amp; Artikel</a></li>
      <li><a href="../index.html#kontak">Kontak</a></li>
      <li><a href="https://wa.me/6285801678597?text=Halo%20Bajo%20Rental%2C%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(article.keyword)}" target="_blank" class="nav-cta">Pesan Sekarang</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="../index.html">Beranda</a>
  <a href="../index.html#armada">Armada</a>
  <a href="../index.html#trip">One Day Trip</a>
  <a href="../index.html#speedboat">Speedboat</a>
  <a href="index.html" style="color:#F5C842;">Blog &amp; Artikel</a>
  <a href="../index.html#kontak">Kontak</a>
  <a href="https://wa.me/6285801678597" target="_blank" style="color:#F5C842;">Pesan Sekarang</a>
</div>

<!-- Article Header Section -->
<header class="blog-header-section">
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../index.html">Beranda</a>
      <span class="separator">&#10095;</span>
      <a href="index.html">Artikel &amp; Blog</a>
      <span class="separator">&#10095;</span>
      <span class="current">${article.title}</span>
    </nav>

    <div class="article-badge">&#128663; ${article.category}</div>
    <h1 class="article-title-main">${article.title}</h1>

    <div class="article-meta-bar">
      <div class="article-author-info">
        <img src="../images/logo.png" alt="Bajo Rental Trip & Tours" class="author-avatar" />
        <div class="author-details">
          <div class="author-name">Bajo Rental Trip &amp; Tours</div>
          <div class="publish-date">&#128197; ${formatDateIndo(article.publishDate)} (Diperbarui)</div>
        </div>
      </div>
      <div class="article-quick-stats">
        <span>&#9201; ${article.readTime}</span>
        <span>&#128065; 100% Bebas Plagiat</span>
        <span>&#9989; Terverifikasi</span>
      </div>
      <div class="share-buttons">
        <a href="https://wa.me/?text=${encodeURIComponent(article.title + ' ' + BASE_URL + '/artikel/' + article.slug + '.html')}" target="_blank" class="share-btn" title="Bagikan ke WhatsApp">&#128241;</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BASE_URL + '/artikel/' + article.slug + '.html')}" target="_blank" class="share-btn" title="Bagikan ke Facebook">&#10148;</a>
        <button id="share-copy" class="share-btn" title="Salin Tautan">&#128279;</button>
      </div>
    </div>
  </div>
</header>

<!-- Main Article Body -->
<main class="container" style="padding-top: 40px;">
  <div class="article-featured-hero">
    <img src="../${article.image}" alt="${article.title} - Bajo Rental Trip & Tours" />
    <div class="featured-caption">&#128247; Layanan Resmi ${article.title} - Bajo Rental Trip &amp; Tours Labuan Bajo</div>
  </div>

  <div class="article-layout">
    <!-- Left Column: Content Body -->
    <article class="article-content">
      <div class="content-box-highlight">
        <h4>&#11088; Ringkasan Cepat Artikel</h4>
        <p>${article.content.lead}</p>
      </div>

      <!-- Content Sections -->
      ${sectionsHtml}

      <!-- Armada Feature Box Inside Article -->
      <div class="inline-armada-card">
        <img src="../images/cars/car_hiace_premio.jpg" alt="Sewa Hiace Premio Labuan Bajo" />
        <div class="inline-armada-info">
          <h4>Sewa Hiace Premio &amp; Commuter Labuan Bajo</h4>
          <p>Kapasitas 11-14 kursi, AC dingin merata, supir berpengalaman di medan Flores. Mulai Rp 1.500.000 / hari.</p>
          <div class="inline-armada-cta">
            <a href="https://wa.me/6285801678597?text=Halo%20Bajo%20Rental%2C%20saya%20ingin%20tanya%20sewa%20Hiace%20Premio%20di%20Labuan%20Bajo" target="_blank" class="btn-gold" style="padding:10px 24px; font-size:0.9rem;">Chat WhatsApp Sekarang</a>
            <a href="../index.html#armada" class="btn-outline" style="padding:9px 20px; font-size:0.9rem;">Lihat Semua Armada</a>
          </div>
        </div>
      </div>

      ${article.slug !== 'panduan-lengkap-sewa-mobil-labuan-bajo' ? `
      <!-- Pillar Internal Link for SEO Dominance -->
      <div class="content-box-tip" style="margin: 30px 0;">
        <h4>&#128663; Panduan Lengkap Sewa Mobil Labuan Bajo 2026</h4>
        <p>Butuh informasi detail mengenai perbandingan tarif 12 armada, syarat lepas kunci, dan tips berkendara di Flores? Baca ulasan lengkap kami di: <a href="panduan-lengkap-sewa-mobil-labuan-bajo.html" style="color:#34D399; font-weight:700; text-decoration:underline;">Sewa Mobil Labuan Bajo Murah 2026: Tarif Lengkap, Lepas Kunci &amp; Driver 24 Jam</a>.</p>
      </div>` : ''}

      <!-- FAQ Section -->
      <section class="article-faq-section" id="faq">
        <h3>&#10067; Pertanyaan Umum (FAQ) Seputar ${article.keyword}</h3>
        ${faqsHtml}
      </section>

      <!-- In-Article CTA Banner -->
      <div class="article-cta-box">
        <h3>Rencanakan Perjalanan Terbaik Anda di Labuan Bajo Sekarang!</h3>
        <p>Hubungi admin Bajo Rental Trip &amp; Tours 24 jam untuk konsultasi rute, ketersediaan unit, dan penawaran diskon terbaik.</p>
        <a href="https://wa.me/6285801678597?text=Halo%20Bajo%20Rental%2C%20saya%20ingin%20booking%20mobil%20untuk%20liburan%20di%20Labuan%20Bajo." target="_blank" class="btn-gold" style="font-size:1.1rem; padding:16px 36px;">
          &#128172; Hubungi Kami via WhatsApp: +62 858-0167-8597
        </a>
      </div>

      <!-- Author Bio Box -->
      <div class="author-bio-card">
        <img src="../images/logo.png" alt="Bajo Rental Trip & Tours" class="author-bio-avatar" />
        <div class="author-bio-text">
          <h4>Tentang Bajo Rental Trip &amp; Tours</h4>
          <p>Penyedia jasa sewa mobil terpercaya di Labuan Bajo, Flores sejak lebih dari 5 tahun. Menghadirkan armada terlengkap mulai dari Brio, Avanza, Innova Reborn, Fortuner, Alphard, hingga Hiace Premio dengan supir lokal profesional dan harga transparan tanpa hidden cost.</p>
        </div>
      </div>
    </article>

    <!-- Right Column: Sidebar -->
    <aside class="article-sidebar">
      <!-- Table of Contents Widget -->
      <div class="sidebar-widget">
        <h4>&#128209; Daftar Isi Artikel</h4>
        <ul class="toc-list">
          ${tocItems}
          <li><a href="#faq">Pertanyaan Umum (FAQ)</a></li>
        </ul>
      </div>

      <!-- Booking Widget -->
      <div class="sidebar-widget sidebar-booking-card">
        <h4>&#128663; Butuh Sewa Mobil Cepat?</h4>
        <p style="color:var(--white-80); font-size:0.9rem;">Armada lengkap, bersih, siap antar jemput Bandara Komodo 24 Jam.</p>
        <div class="price-promo">Mulai Rp 450K<span style="font-size:0.85rem; color:var(--white-60); font-weight:normal;">/hari</span></div>
        <a href="https://wa.me/6285801678597?text=Halo%20Bajo%20Rental%2C%20saya%20ingin%20sewa%20mobil%20di%20Labuan%20Bajo" target="_blank" class="btn-gold" style="width:100%; justify-content:center; margin-top:14px; font-size:0.95rem;">
          &#128172; Booking Cepat via WA
        </a>
      </div>

      <!-- Contact Info Widget -->
      <div class="sidebar-widget">
        <h4>&#128205; Kontak &amp; Lokasi</h4>
        <p style="font-size:0.88rem; color:var(--white-80); margin-bottom:8px;">
          <strong>Alamat:</strong><br>Jl. H. Ishaka No.15, Labuan Bajo, Kec. Komodo, Kab. Manggarai Barat, NTT 86754
        </p>
        <p style="font-size:0.88rem; color:var(--white-80); margin-bottom:8px;">
          <strong>WhatsApp:</strong><br>+62 858-0167-8597 (24 Jam)
        </p>
        <p style="font-size:0.88rem; color:var(--white-80);">
          <strong>Layanan:</strong><br>Lepas Kunci, Include Driver+BBM, One Day Trip Komodo, Speedboat Privat
        </p>
      </div>
    </aside>
  </div>
</main>

<!-- Related Articles Section -->
<section class="related-articles-section">
  <div class="container">
    <div class="section-title">
      <h2>Artikel &amp; Panduan Terkait</h2>
      <div class="gold-line"></div>
      <p>Simak tips dan rekomendasi wisata darat lainnya di Labuan Bajo bersama kami</p>
    </div>
    <div class="blog-cards-grid">
      ${relatedCardsHtml}
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="../index.html" class="nav-logo">
          <img src="../images/logo.png" alt="Logo" />
          <div class="nav-logo-text">
            <span class="brand-name">BAJO RENTAL TRIP &amp; TOURS</span>
            <span class="brand-sub">Jl. H. Ishaka No.15, Labuan Bajo, NTT</span>
          </div>
        </a>
        <p>Penyedia jasa sewa mobil terpercaya di Labuan Bajo, Flores. Melayani perjalanan wisata, antar jemput bandara, dan perjalanan bisnis dengan armada terlengkap.</p>
      </div>
      <div class="footer-col">
        <h4>Armada Terpopuler</h4>
        <ul class="footer-links">
          <li><a href="../index.html#armada">Toyota Hiace Premio</a></li>
          <li><a href="../index.html#armada">Toyota Innova Reborn</a></li>
          <li><a href="../index.html#armada">Toyota New Avanza</a></li>
          <li><a href="../index.html#armada">Honda New Brio</a></li>
          <li><a href="../index.html#armada">Toyota Fortuner</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Layanan Wisata</h4>
        <ul class="footer-links">
          <li><a href="index.html">Blog &amp; Panduan Wisata</a></li>
          <li><a href="../index.html#trip">One Day Trip Komodo</a></li>
          <li><a href="../index.html#speedboat">Speedboat Privat</a></li>
          <li><a href="../index.html#kontak">Antar Jemput Bandara</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 <span>Bajo Rental Trip &amp; Tours</span>. All rights reserved.</p>
      <p>&#128205; Jl. H. Ishaka No.15, Labuan Bajo, Manggarai Barat, NTT 86754</p>
    </div>
  </div>
</footer>

<!-- Floating WhatsApp Button -->
<a href="https://wa.me/6285801678597" target="_blank" class="float-wa" id="float-wa-btn" title="Chat WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 1.5C6.198 1.5 1.5 6.197 1.5 12c0 1.86.485 3.607 1.336 5.12L1.5 22.5l5.532-1.311A10.44 10.44 0 0 0 12 22.5c5.8 0 10.5-4.7 10.5-10.5S17.8 1.5 12 1.5zm0 19.2a8.706 8.706 0 0 1-4.43-1.211l-.318-.19-3.286.779.836-3.192-.208-.329A8.7 8.7 0 0 1 3.3 12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7-3.9 8.7-8.7 8.7z"/></svg>
</a>

<script src="../js/main.js"></script>
<script src="../js/blog.js"></script>
</body>
</html>`;
}

/**
 * Menghasilkan Halaman Hub Index Blog (artikel/index.html)
 */
function renderBlogIndexHTML(publishedArticles) {
  const categories = Array.from(new Set(publishedArticles.map(a => a.category)));

  const filterChipsHtml = categories.map(cat => `
    <button class="filter-chip" data-category="${cat}">${cat}</button>
  `).join('\n');

  const cardsHtml = publishedArticles.map(art => `
    <article class="blog-card" data-category="${art.category}">
      <div class="blog-card-img-wrap">
        <img src="../${art.image}" alt="${art.title}" loading="lazy" />
        <span class="blog-card-badge">${art.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span>&#128197; ${formatDateIndo(art.publishDate)}</span>
          <span>&#9201; ${art.readTime}</span>
        </div>
        <h2 class="blog-card-title">${art.title}</h2>
        <p class="blog-card-excerpt">${art.excerpt}</p>
        <div class="blog-card-footer">
          <a href="${art.slug}.html" class="blog-read-more">Baca Panduan Lengkap &rarr;</a>
        </div>
      </div>
    </article>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog &amp; Panduan Wisata Labuan Bajo | Bajo Rental Trip &amp; Tours</title>
  <meta name="description" content="Kumpulan artikel dan panduan wisata terlengkap Labuan Bajo, sewa mobil lepas kunci, rental mobil dengan sopir, sewa Hiace rombongan, serta info tarif resmi 2026." />
  <meta name="keywords" content="sewa mobil labuan bajo, rental mobil labuan bajo, bajo trip & tours, sewa hiace labuan bajo, blog wisata bajo" />
  <meta name="author" content="Bajo Rental Trip & Tours" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${BASE_URL}/artikel/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${BASE_URL}/artikel/" />
  <meta property="og:title" content="Blog & Panduan Wisata Labuan Bajo - Bajo Rental Trip & Tours" />
  <meta property="og:description" content="Tips sewa mobil, sewa Hiace, paket wisata darat Flores, dan panduan perjalanan terlengkap di Labuan Bajo." />
  <meta property="og:image" content="${BASE_URL}/images/labuan-bajo-bg.jpg" />

  <link rel="icon" href="../images/logo.png" type="image/png" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/blog.css" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Wisata & Rental Mobil Bajo Rental Trip & Tours",
    "url": "${BASE_URL}/artikel/",
    "description": "Tips, rute wisata, dan panduan sewa mobil di Labuan Bajo Flores",
    "publisher": {
      "@type": "Organization",
      "name": "Bajo Rental Trip & Tours",
      "logo": {
        "@type": "ImageObject",
        "url": "${BASE_URL}/images/logo.png"
      }
    }
  }
  </script>
</head>
<body>

<!-- Navbar -->
<nav class="navbar" id="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-logo" id="nav-logo">
      <img src="../images/logo.png" alt="Bajo Rental Trip & Tours Logo" />
      <div class="nav-logo-text">
        <span class="brand-name">BAJO RENTAL</span>
        <span class="brand-sub">Trip &amp; Tours - Labuan Bajo</span>
      </div>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="../index.html">Beranda</a></li>
      <li><a href="../index.html#armada">Armada</a></li>
      <li><a href="../index.html#trip">One Day Trip</a></li>
      <li><a href="../index.html#speedboat">Speedboat</a></li>
      <li><a href="index.html" style="color:var(--gold-light);">Blog &amp; Artikel</a></li>
      <li><a href="../index.html#kontak">Kontak</a></li>
      <li><a href="https://wa.me/6285801678597" target="_blank" class="nav-cta">Pesan Sekarang</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="../index.html">Beranda</a>
  <a href="../index.html#armada">Armada</a>
  <a href="../index.html#trip">One Day Trip</a>
  <a href="../index.html#speedboat">Speedboat</a>
  <a href="index.html" style="color:#F5C842;">Blog &amp; Artikel</a>
  <a href="../index.html#kontak">Kontak</a>
  <a href="https://wa.me/6285801678597" target="_blank" style="color:#F5C842;">Pesan Sekarang</a>
</div>

<!-- Blog Hero -->
<header class="blog-header-section" style="text-align: center; padding: 140px 0 50px;">
  <div class="container">
    <div class="article-badge">&#128214; Pusat Informasi &amp; Panduan Wisata</div>
    <h1 style="font-size:clamp(2.2rem,4vw,3.2rem); margin-bottom:16px;">
      Blog &amp; Tips <span style="background:var(--gradient-gold); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Sewa Mobil Labuan Bajo</span>
    </h1>
    <p style="color:var(--white-80); font-size:1.15rem; max-width:650px; margin:0 auto;">
      Temukan panduan lengkap sewa mobil, rental Hiace rombongan, rute tersembunyi Flores, hingga tips liburan hemat di Labuan Bajo.
    </p>

    <!-- Search & Filter Controls -->
    <div class="blog-hub-controls">
      <div class="category-filter-chips">
        <button class="filter-chip active" data-category="all">Semua Artikel</button>
        ${filterChipsHtml}
      </div>
      <div class="blog-search-box">
        <input type="text" id="blogSearchInput" placeholder="Cari artikel / kata kunci..." />
      </div>
    </div>
  </div>
</header>

<!-- Main Articles Grid -->
<main class="container" style="padding-bottom: 80px;">
  <div class="blog-cards-grid">
    ${cardsHtml}
  </div>
</main>

<!-- In-Article CTA Banner -->
<div class="container">
  <div class="article-cta-box" style="margin-bottom: 80px;">
    <h3>Siap Menjelajahi Pesona Labuan Bajo &amp; Flores?</h3>
    <p>Dapatkan armada terbaik dengan supir lokal berpengalaman. Pemesanan mudah, cepat, dan transparan melalui WhatsApp.</p>
    <a href="https://wa.me/6285801678597?text=Halo%20Bajo%20Rental%2C%20saya%20tertarik%20konsultasi%20sewa%20mobil%20di%20Labuan%20Bajo." target="_blank" class="btn-gold" style="font-size:1.1rem; padding:16px 36px;">
      &#128172; Chat WhatsApp Kami Sekarang
    </a>
  </div>
</div>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="../index.html" class="nav-logo">
          <img src="../images/logo.png" alt="Logo" />
          <div class="nav-logo-text">
            <span class="brand-name">BAJO RENTAL TRIP &amp; TOURS</span>
            <span class="brand-sub">Jl. H. Ishaka No.15, Labuan Bajo, NTT</span>
          </div>
        </a>
        <p>Penyedia jasa sewa mobil terpercaya di Labuan Bajo, Flores. Melayani perjalanan wisata, antar jemput bandara, dan perjalanan bisnis dengan armada terlengkap.</p>
      </div>
      <div class="footer-col">
        <h4>Armada</h4>
        <ul class="footer-links">
          <li><a href="../index.html#armada">Toyota Hiace Premio</a></li>
          <li><a href="../index.html#armada">Toyota Innova Reborn</a></li>
          <li><a href="../index.html#armada">Toyota New Avanza</a></li>
          <li><a href="../index.html#armada">Honda New Brio</a></li>
          <li><a href="../index.html#armada">Toyota Fortuner</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Layanan</h4>
        <ul class="footer-links">
          <li><a href="index.html">Blog Wisata</a></li>
          <li><a href="../index.html#trip">One Day Trip Komodo</a></li>
          <li><a href="../index.html#speedboat">Speedboat Privat</a></li>
          <li><a href="../index.html#kontak">Antar Jemput Bandara</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 <span>Bajo Rental Trip &amp; Tours</span>. All rights reserved.</p>
      <p>&#128205; Jl. H. Ishaka No.15, Labuan Bajo, Manggarai Barat, NTT 86754</p>
    </div>
  </div>
</footer>

<!-- Floating WhatsApp Button -->
<a href="https://wa.me/6285801678597" target="_blank" class="float-wa" id="float-wa-btn" title="Chat WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 1.5C6.198 1.5 1.5 6.197 1.5 12c0 1.86.485 3.607 1.336 5.12L1.5 22.5l5.532-1.311A10.44 10.44 0 0 0 12 22.5c5.8 0 10.5-4.7 10.5-10.5S17.8 1.5 12 1.5zm0 19.2a8.706 8.706 0 0 1-4.43-1.211l-.318-.19-3.286.779.836-3.192-.208-.329A8.7 8.7 0 0 1 3.3 12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7-3.9 8.7-8.7 8.7z"/></svg>
</a>

<script src="../js/main.js"></script>
<script src="../js/blog.js"></script>
</body>
</html>`;
}

/**
 * Regenerasi XML Sitemap untuk Googlebot
 */
function updateSitemap(publishedArticles) {
  const todayStr = getTodayStr();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Halaman Utama -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Halaman Hub Blog -->
  <url>
    <loc>${BASE_URL}/artikel/</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  publishedArticles.forEach(art => {
    xml += `
  <url>
    <loc>${BASE_URL}/artikel/${art.slug}.html</loc>
    <lastmod>${art.dateModified || art.publishDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `\n</urlset>\n`;

  fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8');
  log(`Sitemap.xml berhasil diperbarui dengan ${publishedArticles.length + 2} URL.`);
}

/**
 * Memperbarui Beranda index.html dengan Bagian Artikel Terbaru & Link Navigasi
 */
function updateHomepageWithArticles(publishedArticles) {
  if (!fs.existsSync(INDEX_HTML)) return;

  let indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');

  // 1. Pastikan link Blog ada di navigasi navbar jika belum
  if (!indexContent.includes('artikel/index.html') && !indexContent.includes('href="artikel/"')) {
    indexContent = indexContent.replace(
      '<li><a href="#tentang">Tentang</a></li>',
      '<li><a href="artikel/index.html">Blog &amp; Artikel</a></li>\n      <li><a href="#tentang">Tentang</a></li>'
    );
    indexContent = indexContent.replace(
      '<a href="#tentang">Tentang</a>',
      '<a href="artikel/index.html" style="color:#F5C842;">Blog &amp; Artikel</a>\n  <a href="#tentang">Tentang</a>'
    );
    log('Menambahkan link "Blog & Artikel" ke navbar index.html.');
  }

  // 2. Buat atau perbarui section Artikel Terbaru di index.html
  const latestArticles = publishedArticles.slice(0, 3);
  const cardsHtml = latestArticles.map(art => `
      <div class="car-card fade-in" style="display:flex; flex-direction:column;">
        <div class="car-img-wrap" style="height:210px;">
          <img src="${art.image}" alt="${art.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />
          <span class="car-category" style="background:rgba(10,10,10,0.85);">${art.category}</span>
        </div>
        <div class="car-body" style="padding:22px; flex:1; display:flex; flex-direction:column;">
          <div style="font-size:0.8rem; color:var(--white-60); margin-bottom:8px;">&#128197; ${formatDateIndo(art.publishDate)} | &#9201; ${art.readTime}</div>
          <h3 style="font-size:1.15rem; color:#FFFFFF; margin-bottom:10px; line-height:1.35;">${art.title}</h3>
          <p style="color:var(--white-60); font-size:0.88rem; line-height:1.5; margin-bottom:16px; flex:1;">${art.excerpt}</p>
          <a href="artikel/${art.slug}.html" class="btn-gold" style="padding:10px 20px; font-size:0.88rem; justify-content:center;">Baca Panduan &rarr;</a>
        </div>
      </div>
  `).join('\n');

  const sectionHtml = `<!-- SECTION ARTIKEL TERBARU START -->
<section class="latest-articles-section" id="blog" style="padding: 80px 0; background: #0C0C0C; border-top: 1px solid rgba(255,255,255,0.06);">
  <div class="container">
    <div class="section-title fade-in">
      <h2>Artikel &amp; Panduan Wisata Labuan Bajo</h2>
      <div class="gold-line"></div>
      <p>Tips sewa mobil, rute perjalanan darat Flores, panduan sewa Hiace, dan info wisata terkini</p>
    </div>
    <div class="fleet-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
${cardsHtml}
    </div>
    <div style="text-align:center; margin-top:40px;">
      <a href="artikel/index.html" class="btn-outline" style="font-size:1rem; padding:14px 36px;">
        &#128214; Lihat Semua Artikel &amp; Tips Wisata &rarr;
      </a>
    </div>
  </div>
</section>
<!-- SECTION ARTIKEL TERBARU END -->`;

  if (indexContent.includes('<!-- SECTION ARTIKEL TERBARU START -->')) {
    indexContent = indexContent.replace(
      /<!-- SECTION ARTIKEL TERBARU START -->[\s\S]*?<!-- SECTION ARTIKEL TERBARU END -->/,
      sectionHtml
    );
    log('Memperbarui section Artikel Terbaru di index.html.');
  } else {
    // Sisipkan sebelum section kontak
    indexContent = indexContent.replace(
      '<section class="contact" id="kontak">',
      `${sectionHtml}\n\n<section class="contact" id="kontak">`
    );
    log('Menyisipkan section Artikel Terbaru ke index.html sebelum #kontak.');
  }

  fs.writeFileSync(INDEX_HTML, indexContent, 'utf-8');
}

/**
 * FUNGSI UTAMA: Publikasikan 2 Artikel untuk Hari Ini
 */
function publishDailyArticles(options = {}) {
  const targetDateStr = options.date || getTodayStr();
  const countToPublish = options.count !== undefined ? options.count : 2;
  const force = options.force || false;

  log(`Memulai proses auto-publisher untuk tanggal: ${targetDateStr}...`);

  if (!fs.existsSync(ARTIKEL_DIR)) {
    fs.mkdirSync(ARTIKEL_DIR, { recursive: true });
  }

  let articles = initArticlesDatabase();

  // Hitung berapa artikel yang sudah berstatus 'published' untuk tanggal ini
  const publishedToday = articles.filter(a => a.publishDate === targetDateStr && a.status === 'published');
  log(`Artikel yang sudah terbit pada ${targetDateStr}: ${publishedToday.length}`);

  let needed = force ? countToPublish : Math.max(0, countToPublish - publishedToday.length);

  if (needed > 0) {
    log(`Mempersiapkan publikasi ${needed} artikel baru...`);

    for (let i = 0; i < needed; i++) {
      // Cari artikel scheduled yang belum terbit
      let candidate = articles.find(a => a.status === 'scheduled');

      if (!candidate) {
        // Jika antrean habis, buat artikel baru secara dinamis
        const nextKw = targetKeywords[(articles.length) % targetKeywords.length];
        candidate = generateDynamicArticle(nextKw, articles.length, targetDateStr);
        articles.push(candidate);
        log(`Menghasilkan artikel dinamis baru: ${candidate.title}`);
      }

      candidate.status = 'published';
      candidate.publishDate = targetDateStr;
      candidate.dateModified = targetDateStr;
      log(`Dipublikasikan: [${candidate.keyword}] - ${candidate.title}`);
    }

    // Simpan kembali database
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  } else {
    log(`Target ${countToPublish} artikel untuk hari ini (${targetDateStr}) telah tercapai.`);
  }

  // Ambil semua artikel yang berstatus published
  const allPublished = articles.filter(a => a.status === 'published');
  // Urutkan dari yang terbaru
  allPublished.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  // Render file HTML untuk setiap artikel yang diterbitkan
  allPublished.forEach(art => {
    const html = renderArticleHTML(art, allPublished);
    const filePath = path.join(ARTIKEL_DIR, `${art.slug}.html`);
    fs.writeFileSync(filePath, html, 'utf-8');
  });
  log(`Merender ${allPublished.length} file HTML artikel di folder 'artikel/'.`);

  // Render halaman hub index artikel/index.html
  const hubHtml = renderBlogIndexHTML(allPublished);
  fs.writeFileSync(path.join(ARTIKEL_DIR, 'index.html'), hubHtml, 'utf-8');
  log(`Merender halaman hub 'artikel/index.html'.`);

  // Perbarui sitemap.xml
  updateSitemap(allPublished);

  // Perbarui homepage index.html
  updateHomepageWithArticles(allPublished);

  log('Proses publikasi artikel harian selesai dengan sukses!');
  return {
    publishedCount: allPublished.length,
    todayPublished: articles.filter(a => a.publishDate === targetDateStr && a.status === 'published').length,
    articles: allPublished
  };
}

// Eksekusi CLI jika dijalankan langsung
if (require.main === module) {
  const args = process.argv.slice(2);
  let count = 2;
  let force = false;
  let date = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count' && args[i + 1]) count = parseInt(args[++i], 10);
    if (args[i] === '--force') force = true;
    if (args[i] === '--date' && args[i + 1]) date = args[++i];
  }

  publishDailyArticles({ count, force, date });
}

module.exports = {
  publishDailyArticles,
  initArticlesDatabase
};
