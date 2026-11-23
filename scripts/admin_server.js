/**
 * scripts/admin_server.js
 * Server Backend Panel Kontrol Bajo Rental
 * Tanpa dependency eksternal (menggunakan pure Node.js standard library)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec, spawn } = require('child_process');
const { syncWebsite, loadCars, loadConfig } = require('./sync_site');

const ROOT_DIR = path.resolve(__dirname, '..');
const CARS_FILE = path.join(ROOT_DIR, 'data', 'cars.json');
const CONFIG_FILE = path.join(ROOT_DIR, 'data', 'site_config.json');
const IMAGES_CARS_DIR = path.join(ROOT_DIR, 'images', 'cars');
const ADMIN_DIR = path.join(ROOT_DIR, 'admin');

// Pastikan folder data dan images/cars ada
if (!fs.existsSync(path.join(ROOT_DIR, 'data'))) {
  fs.mkdirSync(path.join(ROOT_DIR, 'data'), { recursive: true });
}
if (!fs.existsSync(IMAGES_CARS_DIR)) {
  fs.mkdirSync(IMAGES_CARS_DIR, { recursive: true });
}
if (!fs.existsSync(ADMIN_DIR)) {
  fs.mkdirSync(ADMIN_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Proteksi ukuran payload (max 20MB untuk foto)
      if (body.length > 20 * 1024 * 1024) {
        req.connection.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        const data = body ? JSON.parse(body) : {};
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(res, filePath) {
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': mime,
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  try {
    // -------------------------------------------------------------
    // API: GET /api/cars (Daftar semua mobil)
    // -------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/cars') {
      const cars = loadCars();
      return sendJson(res, 200, { success: true, cars });
    }

    // -------------------------------------------------------------
    // API: POST /api/cars (Simpan array mobil atau tambah 1 mobil baru)
    // -------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/cars') {
      const body = await parseJsonBody(req);
      let cars = loadCars();

      if (Array.isArray(body)) {
        // Simpan keseluruhan array
        cars = body;
      } else if (body && typeof body === 'object') {
        // Tambah 1 mobil baru
        const newCar = body;
        if (!newCar.id) {
          newCar.id = (newCar.name || 'mobil').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);
        }
        if (typeof newCar.order !== 'number') {
          newCar.order = cars.length + 1;
        }
        if (typeof newCar.active !== 'boolean') {
          newCar.active = true;
        }
        cars.push(newCar);
      }

      fs.writeFileSync(CARS_FILE, JSON.stringify(cars, null, 2), 'utf8');
      syncWebsite();
      return sendJson(res, 200, { success: true, message: 'Mobil berhasil disimpan & disinkronkan ke website!', cars });
    }

    // -------------------------------------------------------------
    // API: PUT /api/cars/:id (Update mobil tertentu)
    // -------------------------------------------------------------
    if (req.method === 'PUT' && pathname.startsWith('/api/cars/')) {
      const carId = pathname.replace('/api/cars/', '').trim();
      const body = await parseJsonBody(req);
      let cars = loadCars();
      const index = cars.findIndex(c => String(c.id) === String(carId));

      if (index === -1) {
        return sendJson(res, 404, { success: false, message: 'Mobil tidak ditemukan' });
      }

      cars[index] = Object.assign({}, cars[index], body, { id: carId });
      fs.writeFileSync(CARS_FILE, JSON.stringify(cars, null, 2), 'utf8');
      syncWebsite();
      return sendJson(res, 200, { success: true, message: 'Data mobil berhasil diperbarui!', car: cars[index] });
    }

    // -------------------------------------------------------------
    // API: DELETE /api/cars/:id (Hapus mobil tertentu)
    // -------------------------------------------------------------
    if (req.method === 'DELETE' && pathname.startsWith('/api/cars/')) {
      const carId = pathname.replace('/api/cars/', '').trim();
      let cars = loadCars();
      const initialLength = cars.length;
      cars = cars.filter(c => String(c.id) !== String(carId));

      if (cars.length === initialLength) {
        return sendJson(res, 404, { success: false, message: 'Mobil tidak ditemukan' });
      }

      // Re-index order
      cars.forEach((c, idx) => { c.order = idx + 1; });

      fs.writeFileSync(CARS_FILE, JSON.stringify(cars, null, 2), 'utf8');
      syncWebsite();
      return sendJson(res, 200, { success: true, message: 'Mobil berhasil dihapus dari website!', cars });
    }

    // -------------------------------------------------------------
    // API: POST /api/cars/reorder (Ubah susunan urutan mobil)
    // -------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/cars/reorder') {
      const body = await parseJsonBody(req);
      if (!Array.isArray(body.carIds)) {
        return sendJson(res, 400, { success: false, message: 'carIds array is required' });
      }

      let cars = loadCars();
      const map = new Map(cars.map(c => [String(c.id), c]));
      const reordered = [];

      body.carIds.forEach((id, idx) => {
        if (map.has(String(id))) {
          const car = map.get(String(id));
          car.order = idx + 1;
          reordered.push(car);
          map.delete(String(id));
        }
      });

      // Tambahkan sisa mobil jika ada
      map.forEach(car => {
        car.order = reordered.length + 1;
        reordered.push(car);
      });

      fs.writeFileSync(CARS_FILE, JSON.stringify(reordered, null, 2), 'utf8');
      syncWebsite();
      return sendJson(res, 200, { success: true, message: 'Urutan mobil berhasil disimpan!', cars: reordered });
    }

    // -------------------------------------------------------------
    // API: GET & POST /api/config (Pengaturan website & WA)
    // -------------------------------------------------------------
    if (pathname === '/api/config') {
      if (req.method === 'GET') {
        const config = loadConfig();
        return sendJson(res, 200, { success: true, config });
      }
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const current = loadConfig();
        const updated = Object.assign(current, body);
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf8');
        syncWebsite();
        return sendJson(res, 200, { success: true, message: 'Pengaturan website berhasil diperbarui!', config: updated });
      }
    }

    // -------------------------------------------------------------
    // API: GET /api/images (Daftar gambar mobil yang tersedia)
    // -------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/images') {
      if (!fs.existsSync(IMAGES_CARS_DIR)) {
        return sendJson(res, 200, { success: true, images: [] });
      }
      const files = fs.readdirSync(IMAGES_CARS_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext);
      });
      const images = files.map(file => ({
        filename: file,
        path: `images/cars/${file}`,
        size: fs.statSync(path.join(IMAGES_CARS_DIR, file)).size
      }));
      return sendJson(res, 200, { success: true, images });
    }

    // -------------------------------------------------------------
    // API: POST /api/upload-image (Upload foto mobil dari browser)
    // -------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/upload-image') {
      const body = await parseJsonBody(req);
      if (!body.base64Data || !body.filename) {
        return sendJson(res, 400, { success: false, message: 'filename and base64Data required' });
      }

      // Bersihkan nama file
      const safeFilename = body.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const targetPath = path.join(IMAGES_CARS_DIR, safeFilename);

      // Konversi data base64 ke buffer biner
      const base64Data = body.base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      fs.writeFileSync(targetPath, buffer);
      const relativePath = `images/cars/${safeFilename}`;

      return sendJson(res, 200, {
        success: true,
        message: 'Foto berhasil diunggah!',
        filename: safeFilename,
        imagePath: relativePath
      });
    }

    // -------------------------------------------------------------
    // API: POST /api/sync (Trigger manual sync ke HTML)
    // -------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/sync') {
      const result = syncWebsite();
      return sendJson(res, 200, { success: true, message: 'Website berhasil disinkronkan!', result });
    }

    // -------------------------------------------------------------
    // API: POST /api/publish (Jalankan git commit & push otomatis tanpa input terminal)
    // -------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/publish') {
      // Sync data terlebih dahulu ke file HTML
      syncWebsite();

      const cmd = `git add -A && git commit -m "Update website Bajo Rental" && git push origin main`;
      exec(cmd, { cwd: ROOT_DIR, timeout: 60000 }, (error, stdout, stderr) => {
        const combined = (stdout || '') + '\n' + (stderr || '');

        // Jika nothing to commit, tetap jalankan git push origin main
        if (error && combined.includes('nothing to commit')) {
          exec('git push origin main', { cwd: ROOT_DIR, timeout: 60000 }, (err2, out2, errOut2) => {
            const finalOut = (out2 || '') + '\n' + (errOut2 || '');
            return sendJson(res, 200, {
              success: true,
              message: 'Semua perubahan berhasil di-upload ke GitHub! Website kini live.',
              output: `[1/2] Menyinkronkan file website...\n[2/2] Mengunggah ke GitHub:\n${finalOut}\n========================================\n[SUKSES] Upload ke GitHub selesai!\nWebsite live di https://bajorentaltriptours.com\n========================================`
            });
          });
          return;
        }

        if (error) {
          return sendJson(res, 500, {
            success: false,
            message: 'Gagal upload: ' + error.message,
            output: combined
          });
        }

        return sendJson(res, 200, {
          success: true,
          message: 'Upload ke GitHub Berhasil! Website live dalam 1-2 menit.',
          output: `[1/2] Menyinkronkan file website...\n[2/2] Mengunggah ke GitHub:\n${combined}\n========================================\n[SUKSES] Upload ke GitHub selesai!\nWebsite live di https://bajorentaltriptours.com\n========================================`
        });
      });
      return;
    }

    // -------------------------------------------------------------
    // STATIC FILE SERVING
    // -------------------------------------------------------------
    // 1. Root / admin -> admin/index.html
    if (pathname === '/' || pathname === '/admin' || pathname === '/admin/' || pathname === '/admin/index.html') {
      const adminHtml = path.join(ADMIN_DIR, 'index.html');
      return serveStatic(res, adminHtml);
    }

    // 2. /index.html (Pratinjau web utama)
    if (pathname === '/preview' || pathname === '/website' || pathname === '/web') {
      return serveStatic(res, path.join(ROOT_DIR, 'index.html'));
    }

    // 3. Static assets
    const requestedFile = path.join(ROOT_DIR, pathname.startsWith('/') ? pathname.slice(1) : pathname);
    // Security check: pastikan tetap dalam ROOT_DIR
    if (requestedFile.startsWith(ROOT_DIR) && fs.existsSync(requestedFile) && !fs.statSync(requestedFile).isDirectory()) {
      return serveStatic(res, requestedFile);
    }

    // Fallback: 404
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');

  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { success: false, message: err.message });
  }
});

const DEFAULT_PORT = 3300;

function startServer(port = DEFAULT_PORT) {
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log('========================================================');
    console.log('   🚗 PANEL KONTROL WEBSITE - BAJO RENTAL TRIP & TOURS');
    console.log('========================================================');
    console.log(`[STATUS] Server kontrol web aktif di: ${url}`);
    console.log(`[NAVIGASI] Buka browser Anda di: ${url}`);
    console.log('========================================================');
    console.log('Tekan Ctrl + C di jendela ini untuk mematikan server.');
    console.log('');

    // Buka otomatis di browser jika diminta
    if (process.argv.includes('--open')) {
      const openCmd = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
      exec(`${openCmd} ${url}`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[INFO] Port ${port} sedang dipakai, mencoba port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('[ERROR] Gagal menjalankan server:', err);
    }
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { server, startServer };

