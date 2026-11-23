# Bajo Rental Trip & Tours - Website

Website resmi **Bajo Rental Trip & Tours** - Jasa sewa mobil terpercaya di Labuan Bajo, Flores, NTT.

## URL
**https://bajorentaltriptours.com**

## Fitur
- Tampilan modern dark theme dengan gold accent
- Responsive mobile-friendly
- 12 pilihan kendaraan dengan harga lengkap
- Tombol WhatsApp di setiap kartu kendaraan
- Form pemesanan langsung ke WhatsApp
- Animasi smooth dan efek glassmorphism
- **Mesin Pembuat Artikel Otomatis (2 Artikel / Hari)** dengan kata kunci:
  - `sewa mobil labuan bajo`
  - `rental mobil labuan bajo`
  - `bajo trip & tours`
  - `sewa hiace labuan bajo`
- **100% Bebas Plagiat Google & SEO Terindeks**: Schema JSON-LD (Article, Breadcrumbs, FAQPage, AutoRental), OpenGraph, sitemap.xml, dan robots.txt otomatis terbarui.

## Struktur File
```
/
|-- index.html                 # Halaman utama (dilengkapi section artikel terbaru)
|-- publish_today.bat          # Satu klik untuk menerbitkan 2 artikel hari ini
|-- sitemap.xml                # Sitemap XML otomatis diperbarui untuk Googlebot
|-- robots.txt                 # Konfigurasi perayapan mesin pencari
|-- PANDUAN_INDEX_GOOGLE.md    # Panduan lengkap indexing Google Search Console
|-- artikel/                   # Folder artikel terbit
|   |-- index.html             # Hub blog dengan live search & filter kategori
|   |-- [slug-artikel].html    # Halaman artikel lengkap
|-- css/
|   |-- style.css              # Stylesheet utama
|   |-- blog.css               # Stylesheet artikel, tabel, & accordion FAQ
|-- js/
|   |-- main.js                # JavaScript utama
|   |-- blog.js                # Interaktivitas artikel (progress bar, TOC, search)
|-- data/
|   |-- articles.json          # Database antrean artikel
|-- scripts/
|   |-- auto_publisher.js      # Generator & publisher otomatis
|   |-- articles_data.js       # Data konten orisinal
|   |-- content_generator.js   # Generator artikel dinamis
|   |-- ping_google.js         # Ping sitemap ke mesin pencari
|   |-- setup_scheduler.bat    # Pemasang Windows Task Scheduler
|-- .github/workflows/
|   |-- daily-articles.yml     # Cron otomatisasi harian via GitHub Actions
|-- images/                    # Asset gambar armada & destinasi
```

## Cara Deploy ke GitHub Pages

1. Upload semua file ke repository GitHub
2. Masuk ke Settings > Pages
3. Pilih branch: main, folder: / (root)
4. Klik Save
5. Website akan live di https://[username].github.io/[repo-name]

## Cara Ganti Nomor WhatsApp

Buka file `js/main.js` dan ganti:
```javascript
var waNumber = '6281234567890'; // Ganti dengan nomor WA asli
```

Juga ganti semua link `https://wa.me/6281234567890` di `index.html` dengan nomor WA yang benar.

## Teknologi
- HTML5
- CSS3 (Vanilla CSS)
- JavaScript (Vanilla JS)
- Google Fonts (Outfit + Montserrat)

## Harga Sewa (per hari)

| Kendaraan | Lepas Kunci | Include Driver+BBM |
|-----------|-------------|---------------------|
| New Brio | Rp 500K | Rp 850K |
| New Avanza | Rp 600K | Rp 900K |
| New Rush | Rp 650K | Rp 1.000K |
| Innova Reborn | Rp 650K | Rp 1.050K |
| Fortuner | Rp 1.550K | Rp 1.850K |
| Alphard | - | Rp 4.500K |
| Pajero Sport | Rp 1.650K | Rp 1.950K |
| Hilux 4x4 | Rp 1.550K | Rp 2.000K |
| Hiace Premio | Rp 1.500K | Rp 2.050K |
| Hiace Commuter | Rp 1.400K | Rp 1.800K |
| Grandmax Pickup | Rp 450K | Rp 800K |
| Medium Bus | - | Rp 2.650K |

---
&copy; 2025 Bajo Rental Trip & Tours - Labuan Bajo, Flores, NTT