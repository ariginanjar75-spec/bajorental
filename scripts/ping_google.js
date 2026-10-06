/**
 * Ping & Notifikasi Mesin Pencari
 * Bajo Rental Trip & Tours (https://bajorentaltriptours.com)
 * 
 * Google kini mengutamakan pengiriman sitemap langsung via Google Search Console:
 * https://search.google.com/search-console/sitemaps
 * 
 * Script ini juga mendukung IndexNow untuk Bing & Yandex
 */

const https = require('https');
const SITEMAP_URL = 'https://bajorentaltriptours.com/sitemap.xml';

console.log('========================================================');
console.log(' PING & VERIFIKASI SITEMAP GOOGLE / MESIN PENCARI');
console.log('========================================================');
console.log(`URL Sitemap: ${SITEMAP_URL}`);
console.log('\n[INFO PENTING UNTUK GOOGLE INDEXING]:');
console.log('1. Masuk ke Google Search Console: https://search.google.com/search-console');
console.log('2. Pilih properti https://bajorentaltriptours.com');
console.log('3. Buka menu Sitemaps (Peta Situs) lalu kirimkan: sitemap.xml');
console.log('4. Gunakan fitur "URL Inspection" untuk artikel baru agar terindeks kilat.\n');

// Ping Bing / IndexNow
const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
https.get(bingUrl, (res) => {
  console.log(`[Bing Sitemap Ping Status]: ${res.statusCode}`);
}).on('error', (err) => {
  console.log(`[Bing Ping]: ${err.message}`);
});
