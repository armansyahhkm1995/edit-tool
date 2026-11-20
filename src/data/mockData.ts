import {
  User,
  CMSDraft,
  CheckHistoryItem,
  WhitelistSource,
  StyleGuideVersion,
  AIProviderConfig,
  AuditLogItem,
  NotificationItem,
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Cameron Newton',
    email: 'cameron.newton@rri.co.id',
    role: 'admin',
    nip: '198804122015031001',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-2',
    name: 'Siti Rahmawati',
    email: 'user1@rri.co.id',
    role: 'editor',
    nip: '199208242019022003',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-2b',
    name: 'Siti Rahmawati',
    email: 'siti.rahmawati@rri.co.id',
    role: 'editor',
    nip: '199208242019022003',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-1b',
    name: 'Cameron Newton',
    email: 'admin@rri.co.id',
    role: 'admin',
    nip: '198804122015031001',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-3',
    name: 'Budi Prasetyo',
    email: 'budi.prasetyo@rri.co.id',
    role: 'admin',
    nip: '198501152010011002',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-4',
    name: 'Agus Setiawan',
    email: 'agus.setiawan@rri.co.id',
    role: 'editor',
    nip: '199003182016011004',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-5',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@rri.co.id',
    role: 'editor',
    nip: '199405102020012005',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-6',
    name: 'Rian Hidayat',
    email: 'rian.hidayat@rri.co.id',
    role: 'editor',
    nip: '199111022017031006',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-7',
    name: 'Nurul Aini',
    email: 'nurul.aini@rri.co.id',
    role: 'editor',
    nip: '199607142022022007',
    twoFactorEnabled: true,
    status: 'active',
  },
  {
    id: 'usr-8',
    name: 'Hendro Wijaya',
    email: 'hendro.wijaya@rri.co.id',
    role: 'editor',
    nip: '198912052014041008',
    twoFactorEnabled: false,
    status: 'inactive',
  },
];

export const mockDefaultDraft: CMSDraft = {
  id: 'draft-1',
  artCode: 'ART-8942',
  title: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
  journalist: 'Ridwan | RRI Biak Numfor',
  cmsStatus: 'Review',
  checkStatus: 'Belum Diperiksa',
  updatedAt: '06 Nov 2026, 14:45',
  wordCount: 428,
  paragraphCount: 3,
  similarityScore: 18.4,
  similarityLevel: 'Rendah',
  aiDetectionScore: 12,
  aiDetectionLevel: 'Aman',
  contentParagraphs: [
    {
      id: 1,
      text: 'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua.',
    },
    {
      id: 2,
      text: 'Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer dengan efisiensi transmisi mencapai 98% di atas permukaan laut.',
      matchedFindingId: 'f-kmp-1',
      similarityPercent: 78,
      matchedSource: 'antaranews.com',
    },
    {
      id: 3,
      text: 'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas. Dalam keterangan pers tertulisnya, "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit di pulau terluar tersebut."',
      matchedFindingId: 'f-bgy-1',
    },
    {
      id: 4,
      text: 'Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik, puskesmas, dan sekolah pasca peluncuran di kawasan 3T (Terdepan, Terluar, Tertinggal) di wilayah Indonesia Timur.',
      matchedFindingId: 'f-bgy-3',
    },
  ],
  findings: [
    {
      id: 'f-kmp-1',
      code: 'Temuan #KMP-01',
      category: 'kemiripan',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Kutipan Identik Sindikasi Berita',
      matchedSnippet: '...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner...',
      similarityPercent: 78,
      matchedSource: 'kompas.com',
      aiIndication: 'Indikasi AI: 12% (Aman)',
      recommendation: 'Kutipan ini identik dengan siaran kompas.com. Jika ini kutipan resmi, sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari penalti SEO sindikasi berita.',
      paragraphIndex: 2,
    },
    {
      id: 'f-kmp-2',
      code: 'Temuan #KMP-02',
      category: 'kemiripan',
      severity: 'Tinggi',
      status: 'Sudah Ditandai',
      title: 'Kutipan Identik Sindikasi Berita',
      matchedSnippet: '...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner...',
      similarityPercent: 78,
      matchedSource: 'antaranews.com',
      aiIndication: 'Indikasi AI: 12% (Aman)',
      recommendation: 'Kutipan ini identik dengan siaran rilis Antara News. Jika ini kutipan resmi, sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari penalti SEO sindikasi berita.',
      paragraphIndex: 2,
    },
    {
      id: 'f-kmp-3',
      code: 'Temuan #KMP-03',
      category: 'kemiripan',
      severity: 'Rendah',
      status: 'Sudah Ditandai',
      title: 'Kutipan Identik Sindikasi Berita',
      matchedSnippet: '...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner...',
      similarityPercent: 78,
      matchedSource: 'antaranews.com',
      aiIndication: 'Indikasi AI: 12% (Aman)',
      recommendation: 'Kutipan ini identik dengan siaran rilis Antara News. Jika ini kutipan resmi, sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari penalti SEO sindikasi berita.',
      paragraphIndex: 2,
    },
    {
      id: 'f-kmp-4',
      code: 'Temuan #KMP-04',
      category: 'kemiripan',
      severity: 'Tinggi',
      status: 'Telah Diperbaiki',
      title: 'Kutipan Identik Sindikasi Berita',
      matchedSnippet: '...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner...',
      similarityPercent: 78,
      matchedSource: 'antaranews.com',
      aiIndication: 'Indikasi AI: 12% (Aman)',
      recommendation: 'Kutipan ini identik dengan siaran rilis Antara News. Jika ini kutipan resmi, sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari penalti SEO sindikasi berita.',
      paragraphIndex: 2,
    },
    {
      id: 'f-kmp-5',
      code: 'Temuan #KMP-05',
      category: 'kemiripan',
      severity: 'Tinggi',
      status: 'Diterima',
      title: 'Kutipan Identik Sindikasi Berita',
      matchedSnippet: '...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner...',
      similarityPercent: 78,
      matchedSource: 'antaranews.com',
      aiIndication: 'Indikasi AI: 12% (Aman)',
      recommendation: 'Kutipan ini identik dengan siaran rilis Antara News. Jika ini kutipan resmi, sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari penalti SEO sindikasi berita.',
      paragraphIndex: 2,
    },
    {
      id: 'f-bgy-1',
      code: 'Temuan #BGY-01',
      category: 'buku_gaya',
      severity: 'Tinggi',
      status: 'Sudah Ditandai',
      title: 'Kaidah Kutipan Langsung & Verba Tutur (Bab V.7.n)',
      matchedSnippet: '...Dalam keterangan pers tertulisnya, "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit di pulau terluar tersebut."',
      ruleViolated: 'Bab V.7.n: Penulisan Kutipan Langsung & Verba Tutur (Buku Gaya Hal. 61–62)',
      recommendation: 'Sesuai Buku Gaya RRI Bab V.7.n & Bab V.6.b, kutipan langsung tidak boleh menggunakan kata tugas "menurut" di dalam tanda petik. Gunakan verba tutur baku di luar kutipan seperti "katanya, menegaskan" atau "ujarnya". Contoh: "...kesiapan pusat kendali peluncuran satelit di pulau terluar tersebut," kata Kepala BRIN Laksana Tri Handoko, menegaskan.',
      paragraphIndex: 3,
    },
    {
      id: 'f-bgy-2',
      code: 'Temuan #BGY-02',
      category: 'buku_gaya',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Penulisan Lambang Persen (%) Wajib dengan Huruf (Bab V.11.e)',
      matchedSnippet: '...dengan efisiensi transmisi mencapai 98% di atas permukaan laut.',
      ruleViolated: 'Bab V.11.e: Penulisan Lambang Persen (Buku Gaya Hal. 66)',
      recommendation: 'Sesuai Buku Gaya RRI Bab V.11.e, lambang persen (%) dalam badan naskah berita wajib ditulis dengan kata huruf "persen". Ubah "98%" menjadi "98 persen" guna menjaga konsistensi pembacaan naskah siaran radio dan portal web RRI.',
      paragraphIndex: 2,
    },
    {
      id: 'f-bgy-3',
      code: 'Temuan #BGY-03',
      category: 'buku_gaya',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Penulisan Bentuk Terikat \'pasca-\' Wajib Serangkai (Bab V.8.e)',
      matchedSnippet: '...sekolah pasca peluncuran di kawasan 3T...',
      ruleViolated: 'Bab V.8.e: Gabungan Kata Bentuk Terikat (Buku Gaya Hal. 62–63)',
      recommendation: 'Sesuai Buku Gaya RRI Bab V.8.e, kata bentuk terikat (seperti pasca-, antar-, multi-, swa-) wajib ditulis serangkai tanpa spasi dengan kata yang mengikutinya. Ubah "pasca peluncuran" menjadi "pascapeluncuran".',
      paragraphIndex: 4,
    },
    {
      id: 'f-seo-1',
      code: 'Temuan #SEO-01',
      category: 'seo',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Usulan Judul (SEO Title Tag)',
      matchedSnippet: 'Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit',
      recommendation: 'Usulan Judul Alternatif SEO: "Satelit Nusantara 3 Sukses Mengorbit dari Biak Papua: Perkuat Internet 5G Kawasan 3T". Panjang 68 karakter, optimal untuk CTR & Google SERP.',
      paragraphIndex: 1,
    },
    {
      id: 'f-seo-2',
      code: 'Temuan #SEO-02',
      category: 'seo',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Usulan Meta Description',
      matchedSnippet: 'Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari...',
      recommendation: 'Usulan Meta Description: "Satelit Nusantara Tiga sukses meluncur dari Biak Papua guna memperkuat konektivitas internet 5G untuk sekolah dan fasilitas publik di wilayah 3T Indonesia Timur." (156 karakter, ramah cuplikan mesin telusur).',
      paragraphIndex: 1,
    },
    {
      id: 'f-seo-3',
      code: 'Temuan #SEO-03',
      category: 'seo',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Optimasi Keyword (Kata Kunci Utama & LSI)',
      matchedSnippet: 'Satelit Nusantara Tiga, internet 5G kawasan 3T, orbit geostasioner',
      recommendation: 'Tempatkan keyword utama "Satelit Nusantara Tiga" pada 100 kata pertama dan tambahkan LSI "Badan Riset dan Inovasi Nasional (BRIN)" untuk meningkatkan relevansi semantik.',
      paragraphIndex: 2,
    },
    {
      id: 'f-seo-4',
      code: 'Temuan #SEO-04',
      category: 'seo',
      severity: 'Rendah',
      status: 'Sudah Ditandai',
      title: 'Usulan Slug URL',
      matchedSnippet: 'rri.co.id/teknologi/wahana-orbit-komunikasi-nasional-satelit-nusantara-tiga-berhasil-mengorbit',
      recommendation: 'Usulan Slug: "satelit-nusantara-tiga-mengorbit-biak". Lebih ringkas, ramah mesin pencari, dan mempertahankan kata kunci utama.',
      paragraphIndex: 1,
    },
    {
      id: 'f-seo-5',
      code: 'Temuan #SEO-05',
      category: 'seo',
      severity: 'Rendah',
      status: 'Sudah Ditandai',
      title: 'Struktur Heading (H2 / H3 Tag)',
      matchedSnippet: 'Belum terdapat sub-heading terstruktur pada draft berita',
      recommendation: 'Saran Heading: Tambahkan H2 "Spesifikasi Roket & Ketinggian Orbit Geostasioner" sebelum paragraf 2 dan H2 "Dampak Konektivitas Internet 5G Kawasan 3T" sebelum paragraf 4.',
      paragraphIndex: 2,
    },
    {
      id: 'f-ais-1',
      code: 'Temuan #AIS-01',
      category: 'seo',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Saran Struktur Informasi (AI Answer Engine)',
      matchedSnippet: 'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit...',
      recommendation: 'Saran Struktur AI-Search: Format paragraf pembuka dengan prinsip BLUF (Bottom Line Up Front) agar mudah diekstrak oleh Perplexity, SearchGPT, dan Google AI Overviews sebagai jawaban langsung.',
      paragraphIndex: 1,
    },
    {
      id: 'f-ais-2',
      code: 'Temuan #AIS-02',
      category: 'seo',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Saran Konteks Berita',
      matchedSnippet: '...menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa...',
      recommendation: 'Saran Konteks: Tambahkan konteks historis singkat mengenai peluncuran satelit Nusantara sebelumnya (Nusantara Satu & Dua) agar mesin pencari AI memahami kesinambungan program satelit nasional.',
      paragraphIndex: 2,
    },
    {
      id: 'f-ais-3',
      code: 'Temuan #AIS-03',
      category: 'seo',
      severity: 'Sedang',
      status: 'Sudah Ditandai',
      title: 'Saran Sumber & Atribusi Rujukan',
      matchedSnippet: '...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali...',
      recommendation: 'Saran Atribusi: Sebutkan nama lengkap narasumber resmi (Kepala BRIN) dan tautan rilis pers resmi pemerintah agar AI Search menilai kutipan memiliki otoritas entitas tinggi (E-E-A-T).',
      paragraphIndex: 3,
    },
    {
      id: 'f-ais-4',
      code: 'Temuan #AIS-04',
      category: 'seo',
      severity: 'Rendah',
      status: 'Sudah Ditandai',
      title: 'Keterbacaan AI-Search & Entity Density',
      matchedSnippet: 'Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik...',
      recommendation: 'Saran Keterbacaan: Sajikan spesifikasi teknis (ketinggian orbit 35.786 km, kapasitas pita lebar, wilayah jangkauan) dalam bentuk poin ringkas untuk memudahkan ekstraksi knowledge graph AI.',
      paragraphIndex: 4,
    },
  ],
};

export const mockDrafts: CMSDraft[] = [
  mockDefaultDraft,
  {
    id: 'draft-2',
    artCode: 'ART-8941',
    title: 'Kenaikan Harga Pangan Pokok Menjelang Akhir Tahun Mulai Dikeluhkan Pedagang',
    journalist: 'Siti Rahmawati | RRI Jakarta Pusat',
    cmsStatus: 'Publish',
    checkStatus: 'Pelanggaran',
    violationCount: 5,
    updatedAt: '06 Nov 2026, 14:45',
    wordCount: 512,
    paragraphCount: 4,
    similarityScore: 32.5,
    similarityLevel: 'Sedang',
    aiDetectionScore: 28,
    aiDetectionLevel: 'Aman',
    contentParagraphs: [
      { id: 1, text: 'JAKARTA — Sejumlah pedagang di pasar tradisional Jakarta Pusat mengeluhkan lonjakan harga komoditas pangan pokok menjelang pergantian tahun 2026.' },
      { id: 2, text: 'Cabai rawit merah dan telur ayam ras menjadi dua komoditas yang mengalami kenaikan paling signifikan dalam dua pekan terakhir.' },
    ],
    findings: [],
  },
  {
    id: 'draft-3',
    artCode: 'ART-8940',
    title: 'Kunjungan Delegasi Perdagangan ASEAN Membahas Konektivitas Logistik Maritim',
    journalist: 'Budi Prasetyo | RRI Surabaya',
    cmsStatus: 'Review',
    checkStatus: 'Aman',
    updatedAt: '06 Nov 2026, 14:45',
    wordCount: 395,
    paragraphCount: 3,
    similarityScore: 8.2,
    similarityLevel: 'Rendah',
    aiDetectionScore: 6,
    aiDetectionLevel: 'Aman',
    contentParagraphs: [
      { id: 1, text: 'SURABAYA — Pertemuan tingkat menteri perdagangan se-Asia Tenggara hari ini resmi menyepakati cetak biru percepatan koridor logistik laut.' },
    ],
    findings: [],
  },
  {
    id: 'draft-4',
    artCode: 'ART-8939',
    title: 'Prakiraan Cuaca Ekstrem BMKG: Waspadai Hujan Lebat Disertai Angin di Pesisir Selatan',
    journalist: 'Agus Setiawan | RRI Denpasar',
    cmsStatus: 'Draft',
    checkStatus: 'Pelanggaran',
    violationCount: 2,
    updatedAt: '06 Nov 2026, 14:45',
    wordCount: 340,
    paragraphCount: 3,
    similarityScore: 22.1,
    similarityLevel: 'Sedang',
    aiDetectionScore: 14,
    aiDetectionLevel: 'Aman',
    contentParagraphs: [
      { id: 1, text: 'DENPASAR — Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) mengimbau masyarakat pesisir selatan Bali untuk meningkatkan kesiapsiagaan.' },
    ],
    findings: [],
  },
  {
    id: 'draft-5',
    artCode: 'ART-8938',
    title: 'Pemerintah Daerah Luncurkan Program Beasiswa Vokasi Tenaga Terampil Energi Terbarukan',
    journalist: 'Dewi Lestari | RRI Makassar',
    cmsStatus: 'Pending',
    checkStatus: 'Belum Diperiksa',
    updatedAt: '06 Nov 2026, 14:45',
    wordCount: 460,
    paragraphCount: 4,
    similarityScore: 0,
    similarityLevel: 'Rendah',
    aiDetectionScore: 0,
    aiDetectionLevel: 'Aman',
    contentParagraphs: [
      { id: 1, text: 'MAKASSAR — Sebanyak 500 pemuda di Sulawesi Selatan menerima beasiswa pendidikan vokasi untuk instalasi panel surya dan turbin angin.' },
    ],
    findings: [],
  },
  {
    id: 'draft-6',
    artCode: 'ART-8937',
    title: 'Festival Budaya Nusantara 2026 Menampilkan Kolaborasi Musik Tradisional Lintas Provinsi',
    journalist: 'Ahmad Fauzi | RRI Yogyakarta',
    cmsStatus: 'Publish',
    checkStatus: 'Aman',
    updatedAt: '06 Nov 2026, 12:30',
    wordCount: 480,
    paragraphCount: 4,
    similarityScore: 11.0,
    similarityLevel: 'Rendah',
    aiDetectionScore: 8,
    aiDetectionLevel: 'Aman',
    contentParagraphs: [],
    findings: [],
  },
  {
    id: 'draft-7',
    artCode: 'ART-8936',
    title: 'Uji Coba Transportasi Cerdas Berbasis Listrik Dimulai di Kawasan Inti IKN',
    journalist: 'Hendra Wijaya | RRI Balikpapan',
    cmsStatus: 'Pending',
    checkStatus: 'Pelanggaran',
    violationCount: 4,
    updatedAt: '06 Nov 2026, 11:15',
    wordCount: 520,
    paragraphCount: 5,
    similarityScore: 35.8,
    similarityLevel: 'Tinggi',
    aiDetectionScore: 45,
    aiDetectionLevel: 'Waspada',
    contentParagraphs: [],
    findings: [],
  },
  {
    id: 'draft-8',
    artCode: 'ART-8935',
    title: 'Kemenkes Resmikan Sentra Telemedicine Terpadu untuk Daerah Kepulauan Maluku',
    journalist: 'Nurul Hidayah | RRI Ambon',
    cmsStatus: 'Draft',
    checkStatus: 'Aman',
    updatedAt: '06 Nov 2026, 10:00',
    wordCount: 410,
    paragraphCount: 3,
    similarityScore: 9.4,
    similarityLevel: 'Rendah',
    aiDetectionScore: 5,
    aiDetectionLevel: 'Aman',
    contentParagraphs: [],
    findings: [],
  },
];

export const mockCheckHistory: CheckHistoryItem[] = [
  {
    id: 'hist-1',
    draftId: 'draft-1',
    draftArtCode: 'ART-8942',
    editor: 'Ridwan | RRI Biak Numfor',
    draftTitle: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    version: 'Versi 2 (Terbaru)',
    time: '06 Nov 2026, 14:45',
    triggerBy: 'Ridwan',
    similarityScore: '18.4% (Rendah)',
    similarityLevel: 'Rendah',
    findingsCount: 5,
    fixedCount: 2,
    acceptedCount: 2,
    ignoredCount: 2,
    styleGuideCount: 2,
    aiDetectionCount: 1,
    seoAiCount: 2,
    articleStatus: 'Publish',
  },
  {
    id: 'hist-2',
    draftId: 'draft-1',
    draftArtCode: 'ART-8942',
    editor: 'Ridwan | RRI Biak Numfor',
    draftTitle: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    version: 'Versi 1',
    time: '06 Nov 2026, 14:45',
    triggerBy: 'Ridwan',
    similarityScore: '24.2% (Sedang)',
    similarityLevel: 'Sedang',
    findingsCount: 5,
    fixedCount: 2,
    acceptedCount: 2,
    ignoredCount: 2,
    styleGuideCount: 3,
    aiDetectionCount: 2,
    seoAiCount: 3,
    articleStatus: 'Review',
  },
  {
    id: 'hist-3',
    draftId: 'draft-1',
    draftArtCode: 'ART-8942',
    editor: 'Ridwan | RRI Biak Numfor',
    draftTitle: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    version: 'Versi 1',
    time: '06 Nov 2026, 14:45',
    triggerBy: 'Ridwan',
    similarityScore: '74.4% (Tinggi)',
    similarityLevel: 'Tinggi',
    findingsCount: 5,
    fixedCount: 2,
    acceptedCount: 2,
    ignoredCount: 2,
    styleGuideCount: 4,
    aiDetectionCount: 5,
    seoAiCount: 4,
    articleStatus: 'Draft',
  },
  {
    id: 'hist-4',
    draftId: 'draft-2',
    draftArtCode: 'ART-8941',
    editor: 'Siti Rahmawati | RRI Jakarta Pusat',
    draftTitle: 'Kenaikan Harga Pangan Pokok Menjelang Akhir Tahun Mulai Dikeluhkan Pedagang',
    version: 'Versi 1',
    time: '06 Nov 2026, 13:20',
    triggerBy: 'Siti Rahmawati',
    similarityScore: '32.5% (Sedang)',
    similarityLevel: 'Sedang',
    findingsCount: 5,
    fixedCount: 3,
    acceptedCount: 1,
    ignoredCount: 1,
    styleGuideCount: 2,
    aiDetectionCount: 1,
    seoAiCount: 1,
    articleStatus: 'Pending',
  },
  {
    id: 'hist-5',
    draftId: 'draft-3',
    draftArtCode: 'ART-8940',
    editor: 'Budi Prasetyo | RRI Surabaya',
    draftTitle: 'Kunjungan Delegasi Perdagangan ASEAN Membahas Konektivitas Logistik Maritim',
    version: 'Versi 1',
    time: '06 Nov 2026, 11:45',
    triggerBy: 'Budi Prasetyo',
    similarityScore: '8.2% (Rendah)',
    similarityLevel: 'Rendah',
    findingsCount: 1,
    fixedCount: 1,
    acceptedCount: 0,
    ignoredCount: 0,
    styleGuideCount: 0,
    aiDetectionCount: 0,
    seoAiCount: 1,
    articleStatus: 'Publish',
  },
  {
    id: 'hist-6',
    draftId: 'draft-4',
    draftArtCode: 'ART-8939',
    editor: 'Agus Setiawan | RRI Denpasar',
    draftTitle: 'Prakiraan Cuaca Ekstrem BMKG: Waspadai Hujan Lebat Disertai Angin di Pesisir Selatan',
    version: 'Versi 1',
    time: '06 Nov 2026, 09:30',
    triggerBy: 'Cameron Newton',
    similarityScore: '22.1% (Sedang)',
    similarityLevel: 'Sedang',
    findingsCount: 2,
    fixedCount: 2,
    acceptedCount: 0,
    ignoredCount: 0,
    styleGuideCount: 1,
    aiDetectionCount: 1,
    seoAiCount: 0,
    articleStatus: 'Review',
  },
];

export const mockWhitelist: WhitelistSource[] = [
  {
    id: 'wl-1',
    domain: 'rri.co.id',
    type: 'Domain',
    addedBy: 'Ridwan | RRI Jakarta',
    addedAt: '06 Nov 2026, 14:45',
    reason: 'Portal internal resmi RRI — berita atau arsip portal sendiri tidak dihitung sebagai plagiarisme.',
    status: 'active',
  },
  {
    id: 'wl-2',
    domain: 'antaranews.com',
    type: 'Domain',
    addedBy: 'Ridwan | RRI Jakarta',
    addedAt: '05 Nov 2026, 11:20',
    reason: 'Mitra kantor berita nasional resmi LKBN Antara untuk sindikasi siaran pers kedinasan.',
    status: 'active',
  },
  {
    id: 'wl-3',
    domain: 'jawanews.com',
    type: 'Domain',
    addedBy: 'Ridwan | RRI Surabaya',
    addedAt: '04 Nov 2026, 16:10',
    reason: 'Isi berita seringkali overlap dengan kebutuhan draft berita regional Jawa Timur.',
    status: 'active',
  },
  {
    id: 'wl-4',
    domain: 'setkab.go.id',
    type: 'Domain',
    addedBy: 'Ridwan | RRI Jakarta',
    addedAt: '02 Nov 2026, 09:15',
    reason: 'Rilis resmi Sekretariat Kabinet RI dan transkrip pidato kenegaraan Presiden.',
    status: 'active',
  },
  {
    id: 'wl-5',
    domain: 'kemkes.go.id/rilis-pers',
    type: 'URL',
    addedBy: 'Ridwan | RRI Bandung',
    addedAt: '01 Nov 2026, 15:30',
    reason: 'Halaman rilis pers resmi Kementerian Kesehatan untuk penanganan wabah musiman.',
    status: 'active',
  },
];

export const mockStyleGuideVersions: StyleGuideVersion[] = [
  {
    id: 'sg-1',
    version: 'Edisi 2026 (Revisi)',
    filename: 'Buku_Gaya_Pedoman_Penulisan_Berita_KBRN_2026.pdf',
    uploadedBy: 'Direktorat Program dan Produksi LPP RRI',
    uploadedAt: '01 Nov 2026, 09:00 WIB',
    isActive: true,
    pageCount: 76,
    lineCount: 1850,
    articles: [
      {
        chapter: 'BAB V.6.k: PEMILIHAN KATA BAKU KBBI (HALAMAN 60)',
        content: `Biasakan menggunakan kata yang sudah baku. Jika bingung membedakan mana kata yang baku dan tidak baku, wajib merujuk ke Kamus Besar Bahasa Indonesia (KBBI) versi daring ataupun cetak.

Daftar Standardisasi Kata Baku vs Tidak Baku:
• jemaah (baku) — jamaah (tidak baku)
• skuad (baku) — skuat (tidak baku)
• apotek (baku) — apotik (tidak baku)
• analisis (baku) — analisa (tidak baku)
• risiko (baku) — resiko (tidak baku)
• daring / dalam jaringan (baku) — online (hindari istilah asing jika ada padanan Indonesianya).`,
      },
      {
        chapter: 'BAB V.7: PEDOMAN PENULISAN KUTIPAN BERITA (HALAMAN 60–62)',
        content: `1. Kutipan Pernyataan Langsung: Digunakan untuk menyatakan keaslian ucapan narasumber atau memberikan variasi agar berita lebih hidup.
Contoh: "Ketika kami mau berangkat ke lapangan, ternyata ada kabar stadion belum siap digunakan," ujar Shin Tae-yong, kecewa.

2. Pemenggalan Kutipan Panjang: Kutipan langsung sebaiknya tidak terlalu panjang. Jika terlalu panjang, wajib dipenggal menjadi beberapa bagian agar lebih mudah dicerna dan dipahami pembaca.
• Contoh Salah: "Hingga Selasa (31/5/2022), data yang sudah direkap petugas OPD di lapangan, ada 202 bangunan yang terdampak angin kencang. Rinciannya rusak berat 38 unit, rusak sedang 23 unit, rusak ringan 24 unit, dan tanpa keterangan kerusakan sebanyak 117 unit," ujar Sulaimi.
• Contoh Benar: "Hingga Selasa 31 Mei 2022, data yang sudah direkap petugas OPD di lapangan, ada 202 bangunan yang terdampak angin kencang," ujar Sulaimi. "Rinciannya rusak berat 38 unit, rusak sedang 23 unit, rusak ringan 24 unit, dan tanpa keterangan kerusakan sebanyak 117 unit."

3. Larangan Verba Salah Kaprah: Hindari penggunaan kata yang menyalahi kaidah penulisan kutipan. Kata sifat seperti "tegas/tegasnya" atau kata kerja seperti "pungkas/pungkasnya" tidak dapat digunakan untuk kalimat kutipan.
• Contoh Salah: "..., kita harus memprioritaskan kebutuhan dalam negeri," tegasnya kepada pers. / "...saya masih menunggu arahan," pungkasnya.
• Contoh Benar: "..., kita harus memprioritaskan kebutuhan dalam negeri," katanya, menegaskan. / "...saya masih menunggu arahan," katanya, mengakhiri. / "...," ujarnya. / "...," ucapnya.`,
      },
      {
        chapter: 'BAB V.8: PEDOMAN PENULISAN GABUNGAN KATA & BENTUK TERIKAT (HALAMAN 62–63)',
        content: `1. Gabungan Kata Tidak Terikat Ditulis Terpisah: Baik kata pertama maupun kedua dapat berdiri mandiri tanpa harus terikat.
Contoh: kerja sama, sepak bola, terima kasih, jati diri, rumah sakit, bulu tangkis, puting beliung, duta besar, simpang lima, cendera mata, persegi panjang, mata acara.

2. Tanda Penghubung: Gabungan kata yang berpotensi menimbulkan salah persepsi wajib ditulis dengan tanda hubung.
Contoh: "Ayah-ibu kami sedang tidak ada di rumah," ujar Laras (maksudnya: ayah dan ibu, bukan ayah dari ibu).

3. Gabungan Kata Padu Ditulis Serangkai:
Contoh: kacamata, saputangan, olahraga, beasiswa, hulubalang, kilometer, acapkali, adakalanya, bumiputra, saptamarga, perilaku, matahari, radioaktif, sukarela.

4. Imbuhan Konfiks (Awalan + Akhiran Sekaligus): Ditulis serangkai.
Contoh: dialihfungsikan, dipertanggungjawabkan, dianaktirikan.

5. Bentuk Terikat Ditulis Serangkai: Gabungan kata yang terbentuk dari kata dasar dan bentuk terikat (seperti adi-, multi-, antar-, pasca-, pra-, swa-, semi-, serba-, a-) wajib ditulis serangkai tanpa spasi.
Contoh: adidaya, multifungsi, antarpulau, pascabencana, pascalepas landas, pascapeluncuran, swakelola, semifinal, serbaguna.`,
      },
      {
        chapter: 'BAB V.9: IDENTITAS SUBJEK BERITA, GELAR & PERKARA HUKUM (HALAMAN 63–65)',
        content: `1. Ejaan Nama Asli: Identitas subjek berita atau nama orang ditulis penuh sesuai ejaan yang biasa dipakai pemilik nama.
• Contoh Salah: Wapres Yusuf Kala / Pelatih Persib Jajang Nurjaman.
• Contoh Benar: Wapres Jusuf Kalla / Pelatih Persib Djadjang Nurdjaman.

2. Pembatasan Gelar: Pencantuman gelar narasumber digunakan bila memang diperlukan dan sesuai dengan bidang pekerjaan terkait. Hindari deretan gelar akademis/kehormatan berlebihan di badan berita straight news.
• Contoh Salah: Ketua Umum PAN Dr. H. Zulkifli Hasan, S.E., M.M. menolak hadir...
• Contoh Benar: Ketua Umum PAN Zulkifli Hasan menolak hadir... / Mochamad Iriawan (bukan Komjen Pol (Purn) Dr. Drs. H. Mochamad Iriawan, S.H., M.M., M.H.).
• Pengecualian Gelar Khusus: Boleh dicantumkan pada momen pelantikan atau konteks akademik khusus (misal: Prof. dr. Ova Emilia, M.Med., Ed., Sp.OG(K)., Ph.D., resmi dilantik sebagai Rektor UGM).

3. Peringkasan Jabatan Panjang: Identitas subjek berita jika terlalu panjang dapat ditulis secara ringkas dengan menunjukkan ciri keahlian, pangkat, atau jabatannya.
• Contoh: Pejabat Pemkab Jepara, Sri Alim Yuliatun, menegaskan pihaknya... (menggantikan "Kepala Bagian Tata Usaha Dinas Kependudukan dan Catatan Sipil Kabupaten Jepara...").

4. Subjek Tersangkut Kasus Hukum: Penyebutan identitas subjek berita yang sedang tersangkut masalah hukum hanya diberikan inisial (contoh: SWA, DPA, MRD), kecuali nama yang bersangkutan sudah diungkap secara resmi oleh institusi berwenang atau sudah memiliki kekuatan hukum mengikat. Korban asusila dan anak di bawah umur mutlak dirahasiakan dengan inisial.`,
      },
      {
        chapter: 'BAB V.10: PEDOMAN PENULISAN NAMA TEMPAT & WILAYAH (HALAMAN 65)',
        content: `1. Nama Lokasi: Nama lokasi atau tempat kejadian boleh dituliskan secara lengkap dengan mempertimbangkan bobot berita.
Contoh: Kediaman Wali Kota Cimahi nonaktif di Jalan Sariasih IV, Kecamatan Sukasari, Kota Bandung, tampak sepi setelah digeledah KPK, Kamis 6 Juni 2022 malam.

2. Orientasi Pembaca (Geografis): Lokasi kejadian atau peristiwa penting di kota kecil dapat dihubungkan dengan kota besar terdekat untuk memperjelas orientasi pembaca.
Contoh:
• "...terjadi di jalanan Abbiategrasso, kota kecil yang berjarak 15 km dari Milan."
• "...Cimahi, kota kecil di sebelah barat Bandung."`,
      },
      {
        chapter: 'BAB V.11: PEDOMAN PENULISAN BILANGAN, ANGKA & LAMBANG PERSEN (HALAMAN 65–68)',
        content: `1. Bilangan Satu Kata Ditulis Huruf: Bilangan dalam draft berita yang dapat dinyatakan dengan satu kata ditulis dengan huruf (misal: sampai tiga kali, sembilan ribu butir), kecuali jika berupa paparan atau perincian statistik (contoh: Di antara 72 anggota yang hadir, 52 orang menyatakan setuju, 15 tidak setuju, dan 5 abstain).

2. Bilangan Taksiran / Perkiraan: Ditulis dengan huruf (misal: ribuan ayam, jutaan massa, lebih dari 4 ribu bebek).

3. Bilangan Awal Kalimat: Dilarang mengawali kalimat dengan angka numerik. Bilangan pada awal kalimat wajib ditulis dengan huruf atau didahului kata keterangan (sebanyak, sekitar, lebih dari).
• Contoh Salah: 7.200 honorer Tangsel terimbas... / 25.000 naskah kuno...
• Contoh Benar: Sebanyak 7.200 honorer Tangsel terimbas... / Di perpustakaan itu tersimpan 25 ribu naskah kuno.

4. Larangan Penulisan Ganda Angka & Huruf: Dilarang menulis angka dan huruf sekaligus di berita umum (hanya berlaku pada dokumen legal/resmi).
• Contoh Salah: ...barang curian 8 (delapan) unit sepeda motor.
• Contoh Benar: ...barang curian delapan unit sepeda motor.

5. Lambang Persen (%) Wajib Huruf: Lambang persen (%) di badan naskah berita wajib ditulis dengan kata huruf "persen".
Contoh: "...hanya naik delapan persen pada musim panen", "Hanya 55 persen warga yang menggunakan hak pilih".

6. Simbol Mata Uang & Valuta Asing: Ditulis serangkai tanpa spasi bersama simbol (contoh: Rp5.000, Rp30 ribu, USD45 juta). Nilai dalam mata uang asing harus disertai perkiraan nilai kurs saat itu dalam rupiah (contoh: USD200 juta (setara Rp2,8 triliun)).

7. Bilangan Desimal: Ditulis menggunakan tanda koma, bukan titik (contoh: 4,5 kg, 30,5 km, 4,9 skala Richter).`,
      },
      {
        chapter: 'BAB V.12: KETENTUAN FOTO PENDUKUNG & FORMAT CAPTION (HALAMAN 68)',
        content: `1. Kewajiban Foto: Setiap berita harus dilengkapi foto atau ilustrasi visual aktual untuk menambah daya tarik dan melengkapi informasi.
2. Hak Cipta: Sedapat mungkin foto karya RRI sendiri. Jika dari sumber lain, wajib dicantumkan pemilik hak cipta foto.
3. Format Keterangan Foto (Caption): Maksimal 2 kalimat, mengandung unsur 4W (what, who, where, when) dan tanggal pengambilan foto. Pada akhir keterangan foto dicantumkan sumber atribusi.
Contoh: Polisi berjaga untuk mengarahkan kendaraan saat penerapan aturan ganjil-genap di Jalan Gatot Soebroto, Jakarta Selatan, Kamis 12 Mei 2022. (Foto: Antara/Reno Esmir) / (Foto: RRI/M. Kusnaeni).`,
      },
      {
        chapter: 'BAB V.14: PEDOMAN PENULISAN TAG BERITA & KATEGORI CMS (HALAMAN 69–70)',
        content: `1. Definisi Tag: Kata atau frasa deskriptif yang melekat pada artikel untuk mengelompokkan konten berdasarkan topik spesifik, membantu pembaca menemukan berita serupa, dan meningkatkan visibilitas konten (SEO) di mesin pencari.
2. Perbedaan Tag vs Kategori dalam CMS:
• Kategori: Lebih luas dan hierarkis (contoh: Olahraga, Berita Politik, Ekonomi).
• Tag: Lebih spesifik dan detail (contoh: "Satelit Nusantara 3", "Biak Numfor", "Internet 5G", "BRIN", "Pemilu 2024").`,
      },
      {
        chapter: 'BAB V.15: PENGGUNAAN ARTIFICIAL INTELLIGENCE (AI) (HALAMAN 70–72)',
        content: `Prinsip Dasar:
1. Akuntabilitas Manusia: Segala bentuk karya jurnalistik yang diproduksi dengan bantuan AI tetap di bawah tanggung jawab penuh jurnalis dan editor.
2. Akurasi & Verifikasi: Konten AI wajib diverifikasi secara manual oleh jurnalis.
3. AI Sebagai Alat Bantu: AI hanya mempercepat proses teknis (draft awal, ringkasan, perbaikan struktur kalimat, penerjemahan, optimasi SEO). Keputusan sudut pandang dan nilai berita tetap di tangan jurnalis.

Larangan Keras:
• Pembuatan berita palsu, disinformasi, atau manipulatif.
• Manipulasi audio/visual (deepfake) yang menipu persepsi publik.
• Pembuatan kutipan, wawancara, atau pernyataan palsu narasumber.
• Produksi dan penerbitan konten otomatis tanpa supervisi manusia.

Etika & Transparansi:
Penulis dan editor wajib bersikap terbuka dengan menyertakan catatan di akhir berita:
"Berita ini diolah dan disunting dengan melibatkan teknologi AI."
(Mengacu pada Peraturan Dewan Pers Nomor 1 Tahun 2025 Tentang Pedoman Penggunaan Kecerdasan Buatan dalam Karya Jurnalistik).`,
      },
      {
        chapter: 'BAB V.1 - V.5: KAIDAH STRAIGHT NEWS KBRN (5 ATURAN EMAS) (HALAMAN 51–55)',
        content: `5 Standar Emas Penulisan Straight News KBRN:
• 70 : Maksimal karakter huruf dalam judul berita (aktif, menarik, tanpa tanda titik di akhir).
• 2 : Jumlah kalimat dalam satu alinea (terdiri atas 2-3 kalimat pendek).
• 18 : Maksimal kata dalam satu kalimat.
• 7 : Minimal alinea dalam satu berita langsung (straight news).
• 15 : Maksimal alinea dalam satu berita langsung (straight news).

Format Identitas Dateline Pembuka:
Awal penulisan berita wajib diawali identitas:
"RRI.CO.ID, [Nama Lokasi] - [Isi Kalimat Teras]..."
Contoh: RRI.CO.ID, Jakarta - Komisi Pemberantasan Korupsi menangkap mantan Bupati...`,
      },
      {
        chapter: 'BAB VI & LAMPIRAN: KETENTUAN TAMBAHAN & PUEBI (HALAMAN 72–75)',
        content: `Hal-hal yang belum diatur dalam pedoman Buku Gaya ini selanjutnya mengikuti aturan baku dalam:
1. Peraturan Kementerian Pendidikan dan Kebudayaan Nomor 50 Tahun 2015 tentang Pedoman Umum Ejaan Bahasa Indonesia (PUEBI).
2. Kode Etik Jurnalistik (KEJ) Dewan Pers.
3. Kamus Besar Bahasa Indonesia (KBBI) Daring (https://kbbi.kemdikbud.go.id).`,
      },
    ],
  },
  {
    id: 'sg-2',
    version: 'Edisi 2022',
    filename: 'Buku_Gaya_Pedoman_Penulisan_Berita_2022.pdf',
    uploadedBy: 'Pusat Pemberitaan LPP RRI',
    uploadedAt: '15 Jan 2022, 11:30 WIB',
    isActive: false,
    pageCount: 68,
    lineCount: 1620,
    articles: [
      {
        chapter: 'PEDOMAN PEMBERITAAN RRI EDISI 2022 (ARSIP)',
        content: `Versi arsip panduan pemberitaan teks RRI tahun 2022 sebelum pembaruan Pedoman Berita KBRN Edisi 2026. Standar penulisan lama mencakup 4 pilar berita dan rubrikasi dasar.`,
      },
    ],
  },
  {
    id: 'sg-3',
    version: 'Edisi 2020',
    filename: 'Buku_Pedoman_Gaya_Pemberitaan_RRI_2020.pdf',
    uploadedBy: 'Direktorat Program dan Produksi',
    uploadedAt: '10 Feb 2020, 08:45 WIB',
    isActive: false,
    pageCount: 54,
    lineCount: 1280,
    articles: [
      {
        chapter: 'BUKU PEDOMAN PEMBERITAAN RRI EDISI 2020 (ARSIP)',
        content: `Versi arsip awal standar penulisan naskah siaran dan berita online RRI tahun 2020 sebelum penerapan format KBRN terpadu.`,
      },
    ],
  },
];

export const mockAIConfig: AIProviderConfig = {
  activeLlm: 'claude-3-5-sonnet',
  claudeApiKey: 'sk-ant-api03-••••••••••••••••••••••••••••••••8d9A',
  geminiApiKey: 'AIzaSy••••••••••••••••••••••••••••••••9xQ',
  similarityEngine: 'inhouse',
  externalApiKey: 'copyleaks-ent-••••••••••••••••331A',
  similarityThreshold: 20,
  styleGuideThreshold: 3,
  seoThreshold: 75,
  aiSearchThreshold: 75,
  aiDetectionThreshold: 30,
};

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '06 Nov 2026 14:15',
    timezone: 'Asia/Jakarta (WIB)',
    userName: 'Budi Santoso',
    userRole: 'Admin',
    category: 'Login',
    detail: 'Mengubah model aktif ke Claude 3.5 Sonnet (Temp: 0.20)',
    ip: '10.20.4.118',
  },
  {
    id: 'log-2',
    timestamp: '06 Nov 2026 14:15',
    timezone: 'Asia/Jakarta (WIB)',
    userName: 'Budi Santoso',
    userRole: 'Editor',
    category: 'Buku gaya',
    detail: 'Mengunggah Buku Gaya Versi 2.4 (SK Direksi No. 42)',
    ip: '10.20.4.102',
  },
  {
    id: 'log-3',
    timestamp: '06 Nov 2026 14:15',
    timezone: 'Asia/Jakarta (WIB)',
    userName: 'Budi Santoso',
    userRole: 'Editor',
    category: 'Pengecualian sumber',
    detail: 'Mengubah model aktif ke Claude 3.5 Sonnet (Temp: 0.20)',
    ip: '192.168.1.55',
  },
  {
    id: 'log-4',
    timestamp: '06 Nov 2026 14:15',
    timezone: 'Asia/Jakarta (WIB)',
    userName: 'Budi Santoso',
    userRole: 'Editor',
    category: 'Manajemen akun',
    detail: 'Mengaktifkan akun Editor baru: siti.rahma@rri.co.id',
    ip: '10.20.4.102',
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    section: 'Hari Ini',
    title: 'Analisis selesai. Hasil evaluasi tata bahasa, SEO, dan kemiripan telah dimuat',
    time: '2 menit lalu',
    status: 'success',
    isRead: false,
  },
  {
    id: 'notif-2',
    section: 'Hari Ini',
    title: 'Status temuan berhasil diperbarui',
    time: '15 menit lalu',
    status: 'info',
    isRead: false,
  },
  {
    id: 'notif-3',
    section: 'Hari Ini',
    title: 'Draf baru ART-8942 tersinkronisasi otomatis dari antrean CMS RRI',
    time: '1 jam lalu',
    status: 'info',
    isRead: true,
  },
  {
    id: 'notif-4',
    section: 'Kemarin',
    title: 'Domain berhasil dikecualikan. Skor kemiripan sedang dikalkulasi ulang',
    time: '12 Okt 2026, 14:00',
    status: 'warning',
    isRead: true,
  },
  {
    id: 'notif-5',
    section: 'Kemarin',
    title: 'Gagal menganalisis draft berita. Provider AI tidak merespons (Timeout)',
    time: '12 Okt 2026, 11:20',
    status: 'error',
    isRead: true,
  },
];
