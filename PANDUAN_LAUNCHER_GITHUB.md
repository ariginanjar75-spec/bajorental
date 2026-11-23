# Panduan Penggunaan Launcher Update GitHub — Bajo Rental

Launcher ini dibuat untuk memudahkan pembaruan (update & push) file website, artikel SEO harian, dan sitemap ke repository:
👉 **Repository:** [https://github.com/ariginanjar75-spec/bajorental](https://github.com/ariginanjar75-spec/bajorental)  
👉 **Website Live:** [https://www.bajorentaltriptours.com](https://www.bajorentaltriptours.com)

---

## 🚀 Cara Menjalankan Launcher

Anda dapat menjalankan launcher dengan salah satu cara berikut:

1. **Dari Desktop Windows (Paling Praktis):**  
   Klik ganda ikon shortcut:
   - **`Launcher Bajo Rental GitHub`** *(Menu lengkap interaktif)*
   - **`Update Bajo Rental ke GitHub`** *(Langsung eksekusi update)*
   - **`Publish 2 Artikel & Push GitHub`** *(Terbitkan 2 artikel hari ini lalu upload)*

2. **Dari Folder Project:**  
   Buka file: [`LAUNCHER_UPDATE_GITHUB.bat`](file:///d:/bang%20jey/webtipjey/LAUNCHER_UPDATE_GITHUB.bat)

---

## 📋 Fitur & Menu di Dalam Launcher

Saat launcher dibuka, terdapat pilihan menu:

| Pilihan | Menu | Fungsi |
| :---: | :--- | :--- |
| **`[1]`** | **Update + Push Sekarang** | Memeriksa perubahan, otomatis `git add`, `git commit` dengan tanggal & jam, lalu mengunggah ke GitHub `origin main`. |
| **`[2]`** | **Terbitkan 2 Artikel + Push** | Otomatis membuat 2 artikel SEO hari ini, memperbarui hub `/artikel/index.html` dan `sitemap.xml`, lalu langsung mengunggahnya ke GitHub. |
| **`[3]`** | **Atur / Simpan Token GitHub** | Menghubungkan Personal Access Token (PAT) milik akun `ariginanjar75-spec` agar upload selalu lancar dan tidak bentrok dengan akun lain. |
| **`[4]`** | **Cek Status & Sinkronisasi Git** | Melihat file yang belum di-commit dan menyinkronkan perubahan dari remote repository. |
| **`[5]`** | **Buka Repository di Browser** | Membuka halaman GitHub di browser secara otomatis. |
| **`[6]`** | **Buat / Perbarui Shortcut Desktop** | Memperbarui 3 ikon shortcut di layar Desktop Windows Anda. |
| **`[0]`** | **Keluar** | Menutup launcher. |

---

## 🔑 Langkah Jika Muncul Notifikasi Izin / Token GitHub

Jika saat melakukan update muncul kendala autentikasi (karena akun GitHub sebelumnya):
1. Pilih menu nomor **`[3]`** pada launcher.
2. Buka link pembuatan token: [https://github.com/settings/tokens](https://github.com/settings/tokens)
3. Klik **Generate new token (classic)**, beri nama (misal: `Bajo Rental`), dan centang opsi **`repo`**.
4. Klik **Generate token**, lalu salin token yang diawali dengan `ghp_...`.
5. Tempel (Paste) token tersebut ke dalam launcher dan tekan Enter.
6. Token akan tersimpan secara otomatis dan permanen di repository laptop Anda.
