# Panduan Penggunaan Panel Kontrol Website Bajo Rental

Selamat datang di **Panel Kontrol Website Bajo Rental Trip & Tours**!
Sistem ini dibuat khusus agar Anda dapat mengontrol isi website dengan sangat mudah melalui browser grafis (GUI) tanpa perlu mengedit kode HTML secara manual.

---

## 🚀 Cara Membuka Panel Kontrol

Cukup pilih salah satu cara berikut:
1. **Klik 2x (Double-click)** file `KONTROL_WEB.bat` di folder utama website (`D:\bang jey\webtipjey\KONTROL_WEB.bat`).
2. Atau dari Desktop Anda, klik 2x icon **"Panel Kontrol Bajo Rental"**.
3. Browser Anda (Chrome / Edge) akan otomatis terbuka dan menampilkan halaman:
   ```
   http://localhost:3300
   ```

> [!NOTE]
> Jendela hitam (Command Prompt) yang terbuka adalah server lokal. Jangan ditutup selama Anda sedang mengelola website. Jika sudah selesai, Anda cukup menutup jendela Command Prompt atau menekan `Ctrl + C`.

---

## 🛠️ Fitur & Cara Penggunaan

### 1. Menambah Mobil Baru
1. Di tab **"🚗 Kelola Armada Mobil"**, klik tombol emas **"+ Tambah Mobil Baru"**.
2. Isi formulir:
   - **Nama Mobil**: Contoh: `Suzuki XL7`, `Hyundai Stargazer`, dll.
   - **Kategori**: Pilih dari daftar atau ketik (MPV, SUV, City Car, Van, dll.).
   - **Foto Mobil**:
     - Klik kotak upload untuk memilih file gambar dari komputer/HP (JPG, PNG, WEBP), foto otomatis disimpan ke folder `images/cars/`.
     - Atau klik tombol **"Pilih Galeri"** untuk memilih gambar yang sudah ada.
   - **Tarif Sewa**:
     - Centang **"Tersedia Lepas Kunci"** dan masukkan harga (misal: `Rp 600K`).
     - Centang **"Tersedia Driver + BBM"** dan masukkan harga (misal: `Rp 950K`).
     - Jika salah satu tidak tersedia, hilangkan centangnya.
   - **Teks WhatsApp**: Otomatis terisi template pesan pemesanan dan bisa Anda sesuaikan.
3. Klik tombol **"Tambah Mobil"**.
4. Website (`index.html`) langsung otomatis terupdate secara instan!

---

### 2. Mengedit Mobil yang Sudah Ada
1. Temukan kartu mobil yang ingin diubah (bisa gunakan kotak pencarian atau filter kategori di atas).
2. Klik tombol **"✏️ Edit Mobil"**.
3. Ubah harga, nama, kategori, atau ganti fotonya sesuai kebutuhan.
4. Klik **"Simpan Perubahan"**. Perubahan langsung tersimpan ke website!

---

### 3. Mengatur Urutan Tampilan Mobil di Website
1. Pada setiap kartu mobil, terdapat tombol panah **⬆️ (Naik)** dan **⬇️ (Turun)**.
2. Klik panah tersebut untuk memindahkan posisi mobil ke atas atau ke bawah sesuai urutan yang Anda inginkan di halaman utama.

---

### 4. Menyembunyikan Mobil Sementara (Tanpa Menghapus)
- Klik tombol **"👁️ Sembunyikan"** pada kartu mobil.
- Mobil tersebut tidak akan muncul lagi di website pengunjung, tetapi datanya tetap tersimpan.
- Untuk memunculkannya kembali, cukup klik tombol **"👁️ Tampilkan"**.

---

### 5. Menghapus Mobil
- Klik tombol merah **"🗑️ Hapus"** pada kartu mobil.
- Konfirmasi penghapusan, dan mobil akan dihapus permanen dari daftar armada website.

---

### 6. Mengubah Nomor WhatsApp & Kontak Rental
1. Masuk ke tab **"⚙️ Pengaturan Website & WA"**.
2. Masukkan nomor WhatsApp baru (contoh: `6285801678597`).
3. Klik **"💾 Simpan Pengaturan Website"**.
4. Semua link WhatsApp di kartu armada, form pemesanan, dan tombol kontak di seluruh website langsung otomatis diperbarui!

---

### 7. Mempublikasikan Perubahan ke GitHub (Website Live)
Setelah Anda selesai menambah atau mengedit mobil di komputer lokal:
1. Klik tombol **"🚀 Upload ke GitHub (Live)"** di pojok kanan atas atau di tab **"🚀 Update ke GitHub"**.
2. Klik **"Jalankan Upload ke GitHub Sekarang"**.
3. Sistem akan otomatis melakukan git commit dan push ke repositori GitHub.
4. Dalam 1-2 menit, perubahan akan langsung live di domain **https://bajorentaltriptours.com**!

---

## 📁 Struktur Data yang Dikelola Otomatis
- `data/cars.json` : Database daftar armada mobil lengkap.
- `data/site_config.json` : Database pengaturan nomor WA dan teks website.
- `index.html` : Halaman web utama (section Armada & Form pemesanan otomatis disinkronkan).
- `js/main.js` : Skrip utama WhatsApp disinkronkan.
- `images/cars/` : Folder penyimpanan file foto armada.
- `README.md` : Tabel daftar harga armada otomatis diperbarui.

---
&copy; 2026 Bajo Rental Trip & Tours - Labuan Bajo, Flores, NTT

