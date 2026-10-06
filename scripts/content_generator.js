/**
 * Content Synthesizer & Generator Engine
 * Menghasilkan artikel unik, berkualitas tinggi, anti-plagiat, dan SEO-optimized
 * Fokus 4 Kata Kunci:
 * 1. sewa mobil labuan bajo
 * 2. rental mobil labuan bajo
 * 3. bajo trip & tours
 * 4. sewa hiace labuan bajo
 */

const targetKeywords = [
  "sewa hiace labuan bajo",
  "sewa mobil labuan bajo",
  "rental mobil labuan bajo",
  "bajo trip & tours"
];

// Bank Topik dan Sudut Pandang Unik
const topicBlueprints = {
  "sewa hiace labuan bajo": [
    {
      subAngle: "vip-family",
      titlePattern: "Sewa Hiace Labuan Bajo untuk Liburan Keluarga & Komunitas: Kenyamanan Mewah Keliling Flores",
      category: "Armada Hiace",
      image: "images/cars/car_hiace_premio.jpg",
      leadGen: (kw) => `Menjelajahi Labuan Bajo bersama keluarga besar atau kelompok komunitas kini semakin menyenangkan dengan opsi <strong>${kw}</strong>. Toyota Hiace menawarkan kelegaan kabin, suspensi empuk, dan pendingin ruangan double-blower yang menjamin kenyamanan maksimal sepanjang perjalanan darat di Manggarai Barat.`,
      sections: [
        {
          heading: "Kelebihan Kapasitas dan Kenyamanan Kabin Hiace",
          body: `<p>Toyota Hiace Premio maupun Commuter dirancang khusus untuk memenuhi standar perjalanan wisata jarak jauh. Dengan kapasitas tempat duduk berkisar antara 11 hingga 14 kursi, seluruh anggota keluarga bisa duduk berdampingan tanpa berdesakan. Ruang bagasi di bagian belakang juga sangat lapang untuk menampung koper berukuran besar, tas ransel, dan perlengkapan snorkeling.</p>`,
          tip: "Bagi rombongan yang membawa anak-anak atau orang tua, pilihlah Hiace Premio yang memiliki akses pintu geser lebih lebar dan pijakan kaki yang rendah."
        },
        {
          heading: "Rute Wisata Darat Favorit Rombongan di Labuan Bajo",
          body: `<p>Dengan menggunakan armada Hiace, rombongan Anda dapat dengan mudah mengunjungi destinasi darat paling populer:</p>
          <ul>
            <li><strong>Bukit Silvia & Amelia Sea View:</strong> Pemandangan matahari terbenam (sunset) yang spektakuler menghadap gugusan pulau Komodo.</li>
            <li><strong>Gua Batu Cermin:</strong> Menjelajahi formasi batuan purba dan fosil terumbu karang di dalam gua alami.</li>
            <li><strong>Puncak Waringin:</strong> Panorama marina pelabuhan dan kapal-kapal phinisi yang bersandar megah di teluk Labuan Bajo.</li>
          </ul>`
        },
        {
          heading: "Daftar Harga Sewa Hiace di Bajo Rental Trip & Tours",
          body: `<p>Bajo Rental Trip & Tours menyediakan tarif sewa kompetitif dan transparan:</p>
          <ul>
            <li><strong>Hiace Commuter (14 Seat):</strong> Rp 1.500.000 / hari (Lepas Kunci) | Rp 1.850.000 / hari (Include Driver + BBM)</li>
            <li><strong>Hiace Premio (11 Seat):</strong> Rp 1.600.000 / hari (Lepas Kunci) | Rp 2.100.000 / hari (Include Driver + BBM)</li>
          </ul>`
        }
      ],
      faqs: [
        {
          question: "Berapa jumlah kapasitas maksimal sewa Hiace di Labuan Bajo?",
          answer: "Hiace Commuter dapat menampung hingga 14-15 penumpang, sedangkan Hiace Premio berkapasitas 11-12 kursi executive dengan ruang gerak ekstra lega."
        },
        {
          question: "Apakah tersedia fasilitas antar-jemput mobil ke bandara?",
          answer: "Ya, kami memberikan layanan free delivery dan pickup di Bandara Komodo maupun hotel di area pusat Labuan Bajo."
        }
      ]
    },
    {
      subAngle: "overland-corporate",
      titlePattern: "Sewa Hiace Labuan Bajo untuk Perjalanan Dinas & Gathering Kantor: Solusi Efisien dan Profesional",
      category: "Transport Korporat",
      image: "images/cars/car_hiace_commuter.jpg",
      leadGen: (kw) => `Mengorganisir agenda perjalanan dinas, kunjungan kerja, maupun employee gathering ke Labuan Bajo menuntut transportasi darat yang tepat waktu dan profesional. Layanan <strong>${kw}</strong> dari Bajo Rental Trip & Tours menjadi mitra terpercaya perusahaan Anda.`,
      sections: [
        {
          heading: "Efisiensi Biaya Transportasi Rombongan Perusahaan",
          body: `<p>Daripada menyewa beberapa mobil keluarga ukuran kecil yang memakan biaya lebih tinggi dan menyulitkan koordinasi, menggunakan satu unit Hiace memberikan efisiensi biaya bahan bakar, parkir, dan koordinasi waktu yang jauh lebih praktis.</p>`
        },
        {
          heading: "Driver Profesional dan Mengutamakan Keselamatan Kerja",
          body: `<p>Driver kami telah terlatih menghadapi karakteristik jalanan Flores yang berliku dan memiliki sertifikasi berkendara aman. Pakaian rapi, komunikasi sopan, dan penguasaan rute memastikan tamu instansi Anda merasa aman dan dihargai.</p>`
        },
        {
          heading: "Fasilitas Faktur dan Invoice Resmi Perusahaan",
          body: `<p>Kami menyediakan kelengkapan administrasi berupa kwitansi, invoice, dan surat penawaran resmi untuk mempermudah proses reimbursement atau pelaporan keuangan instansi Anda.</p>`
        }
      ],
      faqs: [
        {
          question: "Apakah Bajo Rental Trip & Tours menyediakan invoice resmi untuk perusahaan?",
          answer: "Ya, kami menerbitkan kuitansi, invoice resmi, dan dokumen penagihan lengkap untuk keperluan pembukuan kantor."
        },
        {
          question: "Bisakah menyewa Hiace untuk durasi mingguan?",
          answer: "Tentu saja, kami menyediakan potongan harga khusus untuk masa sewa mingguan atau sewa jangka panjang."
        }
      ]
    }
  ],

  "sewa mobil labuan bajo": [
    {
      subAngle: "smart-tips",
      titlePattern: "Tips Cerdas Sewa Mobil Labuan Bajo: Cara Mendapatkan Armada Terbaik Tanpa Khawatir",
      category: "Tips Wisata",
      image: "images/cars/car_innova.jpg",
      leadGen: (kw) => `Merencanakan liburan impian ke Flores memerlukan persiapan transportasi darat yang matang. Memilih jasa <strong>${kw}</strong> yang tepat akan menghindarkan Anda dari risiko mobil mogok atau biaya tersembunyi yang merusak suasana liburan.`,
      sections: [
        {
          heading: "Pentingnya Memilih Mobil dengan Kondisi Mesin Prima di Flores",
          body: `<p>Pulau Flores memiliki kontur perbukitan dengan elevasi curam. Mesin mobil yang bertenaga, sistem pengereman yang sehat, dan ketebalan ban menjadi faktor mutlak keselamatan berkendara. Bajo Rental Trip & Tours selalu melakukan uji kelayakan berkala sebelum mobil diserahkan kepada penyewa.</p>`
        },
        {
          heading: "Pilihan Lepas Kunci vs Supir: Mana yang Pas untuk Anda?",
          body: `<p>Bagi yang menyukai privasi, opsi lepas kunci menawarkan kebebasan tak terbatas. Namun bila Anda ingin beristirahat dan menikmati pemandangan alam savana tanpa stres mencari jalan, paket include supir lokal ramah adalah keputusan paling bijak.</p>`
        },
        {
          heading: "Daftar Rekomendasi Mobil Paling Populer",
          body: `<p>Pilihlah tipe kendaraan yang sesuai dengan jumlah orang dan destinasi Anda:</p>
          <ul>
            <li><strong>Honda New Brio:</strong> Praktis dan irit untuk pasangan muda keliling spot kuliner kota.</li>
            <li><strong>Toyota New Avanza & Rush:</strong> Tangguh dan ekonomis untuk 4-6 penumpang.</li>
            <li><strong>Innova Reborn:</strong> Standar kenyamanan terbaik untuk rute perjalanan jarak jauh.</li>
          </ul>`
        }
      ],
      faqs: [
        {
          question: "Apakah ada batasan kilometer untuk sewa mobil lepas kunci?",
          answer: "Pemakaian di dalam wilayah Pulau Flores Barat tidak dikenakan batasan kilometer."
        },
        {
          question: "Apa saja dokumen yang dibutuhkan saat serah terima mobil?",
          answer: "Anda cukup memperlihatkan KTP asli penyewa dan SIM A yang masih berlaku, serta konfirmasi tiket penerbangan."
        }
      ]
    },
    {
      subAngle: "innova-comfort",
      titlePattern: "Sewa Mobil Innova Reborn Labuan Bajo: Pilihan Terfavorit Wisatawan untuk Kenyamanan Maksimal",
      category: "Armada Favorit",
      image: "images/cars/car_innova.jpg",
      leadGen: (kw) => `Dalam kategori kendaraan keluarga premium, Toyota Innova Reborn tetap menjadi primadona utama dalam layanan <strong>${kw}</strong>. Kekuatan mesin diesel common rail yang responsif berpadu dengan kabin yang hening dan suspensi yang stabil.`,
      sections: [
        {
          heading: "Mengapa Innova Reborn Menjadi Mobil Terlaris di Labuan Bajo?",
          body: `<p>Jalanan di sekitar Labuan Bajo memiliki banyak kelokan tajam dan tanjakan bukit. Innova Reborn memiliki distribusi bobot yang sangat stabil, meminimalisir gejala limbung sehingga penumpang di baris kedua dan ketiga tidak mudah merasa pusing atau mual.</p>`
        },
        {
          heading: "Tarif Sewa Innova Reborn di Bajo Rental Trip & Tours",
          body: `<p>Kami menawarkan harga sewa Innova Reborn yang sangat bersahabat:</p>
          <ul>
            <li><strong>Lepas Kunci:</strong> Rp 750.000 / hari (24 Jam)</li>
            <li><strong>Include Driver + BBM:</strong> Rp 1.100.000 / hari (12 Jam pemakaian)</li>
          </ul>`
        }
      ],
      faqs: [
        {
          question: "Berapa kapasitas kursi Innova Reborn?",
          answer: "Innova Reborn dapat mengangkut 7 penumpang dengan nyaman termasuk supir, dengan ruang bagasi belakang yang lega."
        },
        {
          question: "Apakah unit Innova Reborn bertransmisi matik atau manual?",
          answer: "Kami menyediakan opsi transmisi manual maupun matik (automatic) yang terawat rapi."
        }
      ]
    }
  ],

  "rental mobil labuan bajo": [
    {
      subAngle: "airport-pickup",
      titlePattern: "Rental Mobil Labuan Bajo Siap Antar Jemput Bandara Komodo 24 Jam Non-Stop",
      category: "Layanan Bandara",
      image: "images/cars/car_avanza.jpg",
      leadGen: (kw) => `Mendarat di Bandara Komodo dengan rasa tenang tanpa perlu repot tawar-menawar taksi konvensional adalah keunggulan utama layanan <strong>${kw}</strong> dari Bajo Rental Trip & Tours. Driver kami selalu siap menjemput Anda tepat waktu di gerbang kedatangan.`,
      sections: [
        {
          heading: "Kemudahan Penjemputan Tepat di Pintu Kedatangan",
          body: `<p>Saat mendarat, supir kami telah menunggu dengan papan nama tamu Anda. Tidak ada waktu yang terbuang dan Anda bisa langsung masuk ke dalam kabin mobil yang telah didinginkan AC-nya untuk menuju hotel atau pelabuhan kapal phinisi.</p>`
        },
        {
          heading: "Fleksibilitas Rute dan City Tour Singkat",
          body: `<p>Bila jam check-in hotel Anda masih siang, supir kami bisa langsung memandu Anda menikmati makan siang seafood segar di Kampung Ujung atau berburu foto pemandangan di Puncak Waringin sebelum ke penginapan.</p>`
        }
      ],
      faqs: [
        {
          question: "Apakah ada biaya tambahan untuk penjemputan malam hari?",
          answer: "Tidak ada biaya tambahan. Layanan antar-jemput bandara kami beroperasi 24 jam tanpa biaya tak terduga."
        },
        {
          question: "Berapa jarak dari Bandara Komodo ke pusat kota Labuan Bajo?",
          answer: "Jaraknya sangat dekat, hanya sekitar 5 hingga 10 menit perjalanan mobil (sekitar 2-3 km)."
        }
      ]
    },
    {
      subAngle: "budget-friendly",
      titlePattern: "Rental Mobil Murah di Labuan Bajo: Rekomendasi Honda Brio & New Avanza Irit dan Lincah",
      category: "Rental Murah",
      image: "images/cars/car_brio.jpg",
      leadGen: (kw) => `Menikmati liburan berkesan di Flores tidak harus menguras kantong. Layanan <strong>${kw}</strong> kami menghadirkan opsi city car hemat bahan bakar seperti Honda New Brio dan Toyota Avanza yang siap menemani setiap momen petualangan Anda.`,
      sections: [
        {
          heading: "Kelebihan Honda New Brio untuk Rute Kota",
          body: `<p>Dengan dimensi kompak, Honda Brio sangat lincah melewati jalanan Labuan Bajo, mudah diparkir di area pusat kuliner, serta konsumsi bahan bakar yang sangat hemat. Mulai Rp 550.000 / hari lepas kunci, Anda sudah bisa menikmati kebebasan berkendara.</p>`
        },
        {
          heading: "Toyota New Avanza: Teman Perjalanan Keluarga Paling Handal",
          body: `<p>Bagi rombongan 4-6 orang, Toyota Avanza tetap menjadi solusi paling terjangkau dengan tarif mulai Rp 600.000 / hari. Kapasitas bagasi lapang dan mesin tangguh siap mengantar Anda ke Bukit Silvia hingga Air Terjun Cunca Wulang.</p>`
        }
      ],
      faqs: [
        {
          question: "Berapa tarif rental mobil termurah di Bajo Rental?",
          answer: "Tarif termurah kami mulai dari Rp 450.000 untuk Grandmax dan Rp 550.000 untuk Honda New Brio lepas kunci per hari."
        },
        {
          question: "Apakah boleh sewa mobil hanya untuk 1 hari?",
          answer: "Boleh! Kami melayani penyewaan mobil harian mulai dari 1 hari hingga sewa mingguan atau bulanan."
        }
      ]
    }
  ],

  "bajo trip & tours": [
    {
      subAngle: "full-package",
      titlePattern: "Bajo Trip & Tours: Layanan Terpadu Sewa Mobil, One Day Trip Komodo & Speedboat Privat",
      category: "Trip Terpadu",
      image: "images/islands/pulau_padar.jpg",
      leadGen: (kw) => `Menghabiskan waktu liburan di Labuan Bajo akan jauh lebih berkesan jika seluruh transportasi darat dan laut dikoordinasikan secara profesional oleh satu penyedia terpercaya. <strong>${kw}</strong> menghadirkan paket lengkap mulai dari rental mobil bandara hingga petualangan bahari di Taman Nasional Komodo.`,
      sections: [
        {
          heading: "Kombinasi Sempurna Wisata Darat dan Wisata Bahari",
          body: `<p>Kami membantu Anda menyusun jadwal terpadu tanpa saling bertabrakan: hari pertama mengeksplorasi spot darat seperti Gua Batu Cermin dan sunset di Bukit Silvia menggunakan mobil pribadi, hari kedua mengarungi perairan Komodo dengan One Day Trip Speedboat, dan hari ketiga diantar kembali ke Bandara dengan tenang.</p>`
        },
        {
          heading: "Paket One Day Trip Komodo 6 Destinasi",
          body: `<p>Ikuti pengalaman seru menaiki speedboat modern mengunjungi 6 destinasi ikonik dunia dalam satu hari: Pulau Padar, Pink Beach, Pulau Komodo, Manta Point, Taka Makassar, dan Pulau Kanawa dengan harga hemat mulai Rp 1.300.000/pax.</p>`
        }
      ],
      faqs: [
        {
          question: "Apakah Bajo Trip & Tours melayani paket custom tour privat?",
          answer: "Ya, kami melayani paket wisata custom privat sesuai keinginan rombongan Anda, baik untuk rute darat maupun carter kapal speedboat."
        },
        {
          question: "Di mana alamat kantor Bajo Trip & Tours?",
          answer: "Kantor kami beralamat di Jl. H. Ishaka No.15, Labuan Bajo, Kec. Komodo, Manggarai Barat, NTT 86754."
        }
      ]
    },
    {
      subAngle: "hidden-gems",
      titlePattern: "Eksplorasi Spot Tersembunyi Labuan Bajo Bersama Bajo Trip & Tours: Rute Eksotis Flores Barat",
      category: "Eksplorasi Flores",
      image: "images/islands/pink_beach.jpg",
      leadGen: (kw) => `Selain destinasi wisata populer, daratan Flores menyimpan beragam keindahan tersembunyi yang jarang diketahui wisatawan umum. Bersama pemandu lokal dari <strong>${kw}</strong>, Anda diajak menelusuri keajaiban alam yang masih alami dan asri.`,
      sections: [
        {
          heading: "Mengunjungi Danau Vulkanik Sano Nggoang",
          body: `<p>Danau Sano Nggoang adalah salah satu danau kawah vulkanik terdalam di dunia (sekitar 500 meter) yang dikelilingi hutan lindung asri dan sumber air panas alami yang bisa merebus telur. Perjalanan darat sekitar 2,5 jam dengan mobil kami akan terbayar lunas dengan ketenangan alamnya.</p>`
        },
        {
          heading: "Menikmati Keindahan Pantai Pede dan Waecicu",
          body: `<p>Pantai-pantai di pesisir utara dan selatan Labuan Bajo menawarkan panorama pasir putih dan air laut tenang yang sangat cocok untuk bersantai sore bersama keluarga sebelum menyantap makan malam.</p>`
        }
      ],
      faqs: [
        {
          question: "Apakah mobil yang disewa bisa digunakan ke Danau Sano Nggoang?",
          answer: "Bisa, untuk rute pegunungan seperti Sano Nggoang kami menyarankan mobil SUV seperti Rush, Fortuner, atau Hilux 4x4 dengan supir lokal kami."
        },
        {
          question: "Bagaimana cara berkonsultasi mengenai itinerary wisata?",
          answer: "Silakan hubungi WhatsApp kami di 0858-0167-8597 untuk konsultasi rute dan estimasi biaya secara gratis."
        }
      ]
    }
  ]
};

/**
 * Menghasilkan artikel baru yang unik secara dinamis jika queue artikel dasar telah habis
 */
function generateDynamicArticle(keyword, indexNumber, targetDateStr) {
  const blueprints = topicBlueprints[keyword] || topicBlueprints["sewa mobil labuan bajo"];
  const bp = blueprints[indexNumber % blueprints.length];

  const dateObj = new Date(targetDateStr);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const slugSuffix = `-${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
  const slug = `${keyword.replace(/\s+/g, "-").replace(/&/g, "dan")}-${bp.subAngle}${slugSuffix}`;

  return {
    id: `dyn-${slug}`,
    slug: slug,
    keyword: keyword,
    category: bp.category,
    title: `${bp.titlePattern} (${formattedDate})`,
    excerpt: `Ulasan dan panduan terlengkap ${keyword} dari Bajo Rental Trip & Tours. Cek rekomendasi armada, harga hemat, dan tips wisata aman di Labuan Bajo Flores.`,
    image: bp.image,
    author: "Tim Bajo Rental",
    publishDate: targetDateStr,
    status: "published",
    readTime: "7 Menit Baca",
    tags: [keyword, "labuan bajo", "wisata flores", "sewa mobil"],
    content: {
      lead: bp.leadGen(keyword),
      sections: bp.sections,
      faqs: bp.faqs
    }
  };
}

module.exports = {
  targetKeywords,
  topicBlueprints,
  generateDynamicArticle
};
