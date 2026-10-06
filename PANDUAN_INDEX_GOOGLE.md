# Panduan Otomatisasi Artikel & Google Indexing
## Website: Bajo Rental Trip & Tours (https://bajorentaltriptours.com)

Dokumen ini berisi panduan lengkap penggunaan sistem pembuat artikel otomatis 2 artikel per hari serta strategi agar seluruh artikel cepat terindeks di mesin pencari Google tanpa terkena penalti duplikat konten (100% bebas plagiat).

---

## 🎯 4 Kata Kunci Utama yang Ditargetkan
Sistem ini secara bergantian memproduksi artikel seputar 4 kata kunci inti bisnis Anda:
1. **`sewa mobil labuan bajo`**
2. **`rental mobil labuan bajo`**
3. **`bajo trip & tours`**
4. **`sewa hiace labuan bajo`**

---

## 🚀 Cara Menjalankan Publikasi 2 Artikel per Hari

Anda memiliki 3 pilihan fleksibel untuk menjalankan publikasi harian:

### Pilihan 1: Satu Kali Klik (Manual / Kapan Saja)
1. Buka folder proyek `d:\bang jey\webtipjey\`.
2. Klik ganda (double-click) file **`publish_today.bat`**.
3. Sistem akan otomatis:
   - Memilih 2 artikel yang dijadwalkan untuk hari ini.
   - Menghasilkan file HTML baru di folder `/artikel/`.
   - Memperbarui halaman katalog `/artikel/index.html`.
   - Memperbarui file `sitemap.xml` dengan tanggal `<lastmod>` hari ini.
   - Memperbarui section "Artikel & Panduan Wisata" di halaman depan `index.html`.

### Pilihan 2: Jadwal Otomatis di Komputer (Windows Task Scheduler)
Agar berjalan otomatis setiap hari pukul 08:00 pagi tanpa perlu Anda klik:
1. Klik kanan file `scripts/setup_scheduler.bat` lalu pilih **Run as administrator**.
2. Jadwal bernama `BajoRental_AutoArticles` akan terdaftar di Windows Task Scheduler dan berjalan setiap hari.

### Pilihan 3: Otomatisasi Penuh di Cloud via GitHub Actions (Rekomendasi Terbaik)
Jika Anda mengunggah (push) kode ini ke repository GitHub Anda (sebagaimana tertera di README.md untuk GitHub Pages):
- File `.github/workflows/daily-articles.yml` sudah disiapkan.
- GitHub Actions akan **otomatis berjalan setiap hari pukul 00:00 UTC (08:00 WITA)** di server cloud GitHub.
- 2 artikel baru akan otomatis dibuat, dikomit, dan di-push ke GitHub Pages tanpa komputer Anda harus menyala!

---

## 🔍 Cara Agar Artikel Cepat Terindeks di Google (Google Indexing)

Agar Googlebot segera merayapi (crawling) dan menampilkan artikel Anda di halaman pencarian:

### 1. Daftarkan Domain ke Google Search Console (GSC)
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Masukkan URL website Anda: `https://bajorentaltriptours.com`.
3. Verifikasi kepemilikan menggunakan salah satu metode (File HTML atau DNS TXT Record).

### 2. Kirimkan File Sitemap (Paling Krusial)
1. Di menu sebelah kiri Google Search Console, klik menu **Peta Situs (Sitemaps)**.
2. Pada kolom "Tambahkan peta situs baru", ketik:
   ```
   sitemap.xml
   ```
3. Klik **Kirim (Submit)**.
4. Status akan berubah menjadi **Berhasil (Success)**. Setiap kali artikel baru terbit, Google akan otomatis memeriksa `sitemap.xml` yang telah diperbarui.

### 3. Request Indexing Cepat untuk Setiap Artikel Baru (Instan)
Untuk artikel yang baru saja terbit hari ini:
1. Salin link artikel, contoh: `https://bajorentaltriptours.com/artikel/sewa-hiace-labuan-bajo-wisata-rombongan.html`.
2. Tempelkan link tersebut di kotak pencarian paling atas di Google Search Console (**Inspeksi URL**).
3. Tekan Enter.
4. Klik tombol **Uji URL Langsung (Test Live URL)**.
5. Setelah tes berhasil, klik **Minta Pengindeksan (Request Indexing)**.
6. Artikel biasanya akan terindeks dalam waktu hitungan jam hingga 1-2 hari!

### 4. Kirimkan Sinyal Ping ke Google
Anda juga dapat menjalankan perintah berikut di terminal untuk memberitahu Googlebot:
```bash
node scripts/ping_google.js
```

---

## 💎 Fitur Anti-Plagiat & Standar On-Page SEO yang Diterapkan

Setiap artikel yang dihasilkan telah dilengkapi arsitektur SEO kelas atas:
- **100% Konten Orisinal & Kontekstual**: Membahas kondisi jalanan Flores, rute Bandara Komodo, Bukit Silvia, Gua Batu Cermin, Cunca Wulang, Gua Rangko, hingga Wae Rebo.
- **Tabel Perbandingan & Harga Resmi**: Menyajikan rincian harga Hiace Premio, Commuter, Brio, Avanza, Innova Reborn, Fortuner tanpa hidden cost.
- **Schema.org JSON-LD Lengkap**:
  - `Article` / `BlogPosting`: Menyertakan headline, tanggal publikasi, gambar, publisher logo.
  - `BreadcrumbList`: Navigasi hierarki terstruktur (Beranda > Artikel > Judul).
  - `FAQPage`: Pertanyaan dan jawaban interaktif untuk memenangkan fitur **Google Featured Snippets (FAQ Rich Results)** di hasil pencarian.
  - `AutoRental` / `LocalBusiness`: Menghubungkan artikel ke profil bisnis lokal rental mobil resmi.
- **Elemen Interaktif**:
  - Progress bar membaca (Reading progress indicator).
  - Daftar isi (Table of Contents) yang otomatis melacak posisi scroll.
  - Tombol aksi cepat WhatsApp dengan teks pesan otomatis yang disesuaikan.
  - Accordion FAQ yang dapat diklik buka/tutup secara responsif.

---

## 📁 Struktur Berkas Terkait

```
/
|-- artikel/                          # Direktori hasil publikasi artikel
|   |-- index.html                    # Halaman katalog Blog & Tips Wisata
|   |-- sewa-hiace-labuan-bajo-...html
|   |-- panduan-lengkap-sewa-...html
|-- css/
|   |-- style.css                     # Gaya utama website
|   |-- blog.css                      # Gaya khusus artikel, tabel & FAQ
|-- js/
|   |-- main.js                       # Skrip utama
|   |-- blog.js                       # Skrip interaktif artikel (TOC, progress, search)
|-- data/
|   |-- articles.json                 # Basis data & antrean jadwal artikel
|-- scripts/
|   |-- auto_publisher.js             # Mesin utama publikasi harian
|   |-- articles_data.js              # Kumpulan konten inti artikel
|   |-- content_generator.js          # Generator artikel dinamis
|   |-- ping_google.js                # Pengirim sinyal ping sitemap
|   |-- setup_scheduler.bat           # Pengatur Windows Task Scheduler
|   |-- setup_scheduler.ps1
|-- .github/workflows/
|   |-- daily-articles.yml            # Otomatisasi harian via GitHub Actions
|-- publish_today.bat                 # Runner satu klik untuk Windows
|-- sitemap.xml                       # Peta situs Googlebot
|-- robots.txt                        # Pengarah izin perayapan mesin pencari
```
