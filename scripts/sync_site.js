/**
 * scripts/sync_site.js
 * Generator otomatis sinkronisasi data/cars.json & data/site_config.json ke index.html, js/main.js, dan README.md
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CARS_FILE = path.join(ROOT_DIR, 'data', 'cars.json');
const CONFIG_FILE = path.join(ROOT_DIR, 'data', 'site_config.json');
const INDEX_HTML_FILE = path.join(ROOT_DIR, 'index.html');
const MAIN_JS_FILE = path.join(ROOT_DIR, 'js', 'main.js');
const README_FILE = path.join(ROOT_DIR, 'README.md');

function loadCars() {
  if (!fs.existsSync(CARS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(CARS_FILE, 'utf8'));
  } catch (e) {
    console.error('Error parsing cars.json:', e);
    return [];
  }
}

function loadConfig() {
  const defaultConfig = {
    waNumber: '6285801678597',
    brandName: 'Bajo Rental Trip & Tours',
    phoneDisplay: '+62 858-0167-8597',
    siteTitle: 'Sewa Mobil Labuan Bajo Murah 2026 (Lepas Kunci / Driver) | Bajo Rental',
    fleetTitle: 'Pilihan Armada Kami',
    fleetSubtitle: 'Berbagai pilihan kendaraan untuk setiap kebutuhan perjalanan Anda di Labuan Bajo'
  };
  if (!fs.existsSync(CONFIG_FILE)) return defaultConfig;
  try {
    return Object.assign(defaultConfig, JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')));
  } catch (e) {
    return defaultConfig;
  }
}

function generateFleetGridHtml(cars, config) {
  const activeCars = cars.filter(c => c.active !== false);
  const waSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 1.5C6.198 1.5 1.5 6.197 1.5 12c0 1.86.485 3.607 1.336 5.12L1.5 22.5l5.532-1.311A10.44 10.44 0 0 0 12 22.5c5.8 0 10.5-4.7 10.5-10.5S17.8 1.5 12 1.5zm0 19.2a8.706 8.706 0 0 1-4.43-1.211l-.318-.19-3.286.779.836-3.192-.208-.329A8.7 8.7 0 0 1 3.3 12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7-3.9 8.7-8.7 8.7z"/></svg>`;

  const cardsHtml = activeCars.map(car => {
    const defaultWa = `Halo, saya ingin sewa ${car.name} di Labuan Bajo. Boleh info ketersediaan?`;
    const waText = car.waText || defaultWa;
    const waUrl = `https://wa.me/${config.waNumber}?text=${encodeURIComponent(waText)}`;
    const carId = car.id || car.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const icon = car.iconHtml || car.icon || '&#128663;';

    const lepasKunciHtml = car.hasLepasKunci
      ? `<div class="price-value"><div class="price-amount">${car.priceLepasKunci}</div><div class="price-unit">per hari</div></div>`
      : `<div class="price-value"><div class="price-amount unavailable">Tidak Tersedia</div></div>`;

    const driverBbmHtml = car.hasDriverBBM
      ? `<div class="price-value"><div class="price-amount">${car.priceDriverBBM}</div><div class="price-unit">per hari</div></div>`
      : `<div class="price-value"><div class="price-amount unavailable">Tidak Tersedia</div></div>`;

    return `<div class="car-card fade-in">
  <div class="car-img-wrap">
    <img src="${car.image}" alt="Sewa ${car.fullName || car.name} Labuan Bajo" loading="lazy" />
    <span class="car-category">${car.category}</span>
  </div>
  <div class="car-card-header">
    <h3 class="car-name">${car.name}</h3>
    <span class="car-icon">${icon}</span>
  </div>
  <div class="car-card-body">
    <div class="price-row">
      <div class="price-type"><div class="price-type-icon">&#128273;</div><span class="price-type-label">Lepas Kunci</span></div>
      ${lepasKunciHtml}
    </div>
    <div class="price-row">
      <div class="price-type"><div class="price-type-icon">&#128104;&#8205;&#9992;</div><span class="price-type-label">Include Driver + BBM</span></div>
      ${driverBbmHtml}
    </div>
  </div>
  <div class="car-card-footer">
    <a href="${waUrl}" target="_blank" class="btn-wa" id="wa-${carId}">${waSvg} Pesan via WhatsApp</a>
  </div>
</div>`;
  }).join('\n');

  return `<div class="fleet-grid">\n${cardsHtml}\n</div>`;
}

function generateFormOptions(cars) {
  const activeCars = cars.filter(c => c.active !== false);
  let options = [];
  options.push(`<option value="" disabled selected>-- Pilih Layanan / Kendaraan --</option>`);
  options.push(`<option value="One Day Trip Komodo (Rp 1.300K/pax)">⭐ ONE DAY TRIP KOMODO - Include Lengkap (Rp 1.300K/pax)</option>`);
  options.push(`<option value="Speedboat Privat 1-4 Pax">⚓ SPEEDBOAT PRIVAT 1-4 Pax</option>`);
  options.push(`<option value="Speedboat Privat 4-6 Pax">⚓ SPEEDBOAT PRIVAT 4-6 Pax</option>`);
  options.push(`<option value="Speedboat Privat 6-8 Pax">⚓ SPEEDBOAT PRIVAT 6-8 Pax</option>`);
  options.push(`<option value="Speedboat Privat 8-10 Pax">⚓ SPEEDBOAT PRIVAT 8-10 Pax</option>`);

  activeCars.forEach(car => {
    if (car.hasLepasKunci) {
      options.push(`<option>${car.name} - Lepas Kunci (${car.priceLepasKunci})</option>`);
    }
    if (car.hasDriverBBM) {
      options.push(`<option>${car.name} - Include Driver+BBM (${car.priceDriverBBM})</option>`);
    }
  });

  return options.map(opt => `              ${opt}`).join('\n');
}

function syncWebsite() {
  const cars = loadCars();
  const config = loadConfig();

  // 1. Update index.html
  if (fs.existsSync(INDEX_HTML_FILE)) {
    let html = fs.readFileSync(INDEX_HTML_FILE, 'utf8');

    // Update fleet-grid
    const fleetGridRegex = /<div class="fleet-grid">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/;
    if (fleetGridRegex.test(html)) {
      const newFleetHtml = generateFleetGridHtml(cars, config);
      html = html.replace(fleetGridRegex, newFleetHtml + '$1');
    }

    // Update fleet title/subtitle if present
    if (config.fleetTitle) {
      html = html.replace(/(<section class="fleet" id="armada">[\s\S]*?<div class="section-title fade-in"><h2>)[^<]*(<\/h2><div class="gold-line"><\/div><p>)[^<]*(<\/p><\/div>)/,
        `$1${config.fleetTitle}$2${config.fleetSubtitle || ''}$3`
      );
    }

    // Update formCar options
    const formCarRegex = /(<select id="formCar" required>)[\s\S]*?(<\/select>)/;
    if (formCarRegex.test(html)) {
      const newOptions = generateFormOptions(cars);
      html = html.replace(formCarRegex, `$1\n${newOptions}\n            $2`);
    }

    // Update wa number across index.html (generic wa.me links)
    // Matches https://wa.me/62...
    html = html.replace(/https:\/\/wa\.me\/\d+/g, `https://wa.me/${config.waNumber}`);

    fs.writeFileSync(INDEX_HTML_FILE, html, 'utf8');
    console.log('[OK] index.html berhasil diperbarui dengan data armada & config terbaru.');
  }

  // 2. Update js/main.js
  if (fs.existsSync(MAIN_JS_FILE)) {
    let js = fs.readFileSync(MAIN_JS_FILE, 'utf8');
    js = js.replace(/var waNumber = '\d+';/g, `var waNumber = '${config.waNumber}';`);
    fs.writeFileSync(MAIN_JS_FILE, js, 'utf8');
    console.log('[OK] js/main.js berhasil disinkronkan.');
  }

  // 3. Update README.md price table
  if (fs.existsSync(README_FILE)) {
    let readme = fs.readFileSync(README_FILE, 'utf8');
    const tableHeader = '| Kendaraan | Lepas Kunci | Include Driver+BBM |\n|-----------|-------------|---------------------|';
    const rows = cars.filter(c => c.active !== false).map(c => {
      const lk = c.hasLepasKunci ? c.priceLepasKunci : '-';
      const drv = c.hasDriverBBM ? c.priceDriverBBM : '-';
      return `| ${c.name} | ${lk} | ${drv} |`;
    }).join('\n');
    
    const tableRegex = /\| Kendaraan \| Lepas Kunci \| Include Driver\+BBM \|[\s\S]*?(?=\n\n---|\n\n##|\Z)/;
    if (tableRegex.test(readme)) {
      readme = readme.replace(tableRegex, `${tableHeader}\n${rows}`);
      fs.writeFileSync(README_FILE, readme, 'utf8');
      console.log('[OK] README.md daftar harga berhasil diperbarui.');
    }
  }

  return { success: true, count: cars.length };
}

if (require.main === module) {
  syncWebsite();
}

module.exports = {
  syncWebsite,
  loadCars,
  loadConfig
};

