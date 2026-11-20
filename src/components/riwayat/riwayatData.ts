import { DraftVersionData } from './types';

export const DRAFT_VERSIONS_DATA: DraftVersionData[] = [
  {
    id: 'v2-0',
    version: 'Versi 2.0',
    createdAt: '06 Nov 2026, 14:45 WIB',
    createdBy: 'Cameron Newton (Editor)',
    isAI: false,
    wordCount: 428,
    paragraphCount: 3,
    aiDetection: '12% (Aman)',
    similarityScore: '18.4% (Rendah)',
    styleGuideScore: '0 Pelanggaran (Aman)',
    seoAiScore: '88 Skor (Optimal)',
    changeSummary:
      'Parafrase kutipan sindikasi antaranews.com, koreksi nama lembaga BRIN sesuai Buku Gaya Bab 4, dan penyusunan heading H2.',
    title: 'Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit',
    lead: 'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua.',
    sections: [
      {
        heading: 'Spesifikasi Roket dan Orbit Geostasioner',
        content:
          'Peluncuran memanfaatkan kendaraan roket pendorong generasi modern yang dirancang secara mandiri guna menempatkan muatan komunikasi berkecepatan tinggi di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer.',
        findingNote: {
          type: 'kemiripan',
          title: 'Parafrase Selesai Dilakukan',
          description:
            'Teks kutipan telah diubah struktur kalimatnya sehingga skor kemiripan turun dari 32.8% menjadi 18.4%.',
          status: 'Telah Diperbaiki',
        },
      },
      {
        heading: 'Pemeriksaan Telemetri dan Pernyataan Resmi BRIN',
        content:
          'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak 12 menit setelah lepas landas. Dalam taklimat resminya, Kepala Badan Riset dan Inovasi Nasional (BRIN) menegaskan kesiapan infrastruktur stasiun bumi pulau terluar.',
        findingNote: {
          type: 'buku_gaya',
          title: 'Koreksi Nomenklatur Lembaga BRIN',
          description:
            'Frasa "kepala badan riset" telah dibakukan menjadi "Kepala Badan Riset dan Inovasi Nasional (BRIN)" sesuai Buku Gaya Pasal 4.',
          status: 'Telah Diperbaiki',
        },
      },
      {
        heading: 'Pemerataan Internet 5G di Wilayah 3T',
        content:
          'Keberhasilan misi ini diproyeksikan memperluas konektivitas digital pita lebar 5G bagi fasilitas kesehatan puskesmas, pos perbatasan, dan ribuan institusi pendidikan di kawasan Terdepan, Terluar, dan Tertinggal (3T) Indonesia Timur.',
        findingNote: {
          type: 'seo',
          title: 'Struktur Heading & Entitas AI-Search',
          description:
            'Sub-heading H2 telah ditambahkan dan entitas 3T diuraikan dengan format ramah kutipan AI Search Overviews.',
          status: 'Telah Diperbaiki',
        },
      },
    ],
  },
  {
    id: 'v1-1',
    version: 'Versi 1.1',
    createdAt: '06 Nov 2026, 11:20 WIB',
    createdBy: 'Cameron Newton (Editor)',
    isAI: false,
    wordCount: 418,
    paragraphCount: 3,
    aiDetection: '22% (Aman)',
    similarityScore: '24.2% (Sedang)',
    styleGuideScore: '1 Pelanggaran (Aman)',
    seoAiScore: '76 Skor (Optimal)',
    changeSummary:
      'Perbaikan ejaan pembuka dan penambahan keterangan lokasi pusat peluncuran Biak Numfor.',
    title: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    lead: 'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil meluncur dengan sukses pada Kamis dini hari dari pangkalan antariksa Biak.',
    sections: [
      {
        content:
          'Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.',
        findingNote: {
          type: 'kemiripan',
          title: 'Kemiripan 78% (antaranews.com)',
          description:
            '42 kata sama persis dengan siaran rilis Antara News tanpa parafrase atau atribusi.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas. Dalam keterangan tertulis, menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali...',
        findingNote: {
          type: 'buku_gaya',
          title: 'Pelanggaran Nomenklatur Lembaga',
          description:
            'Penyebutan "kepala badan riset" tidak memenuhi Buku Gaya Pasal 4 tentang Nomenklatur Lembaga Resmi.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T di wilayah Indonesia Timur.',
        findingNote: {
          type: 'seo',
          title: 'Kurang Sub-Heading Terstruktur',
          description:
            'Draft berita belum memiliki H2/H3 dan penjelasan detail mengenai target bulan operasional.',
          status: 'Sudah Ditandai',
        },
      },
    ],
  },
  {
    id: 'v1-0',
    version: 'Versi 1.0 (AI Original)',
    createdAt: '06 Nov 2026, 09:15 WIB',
    createdBy: 'AI Assistant (Sinkronisasi CMS)',
    isAI: true,
    wordCount: 410,
    paragraphCount: 3,
    aiDetection: '48% (Tinggi)',
    similarityScore: '32.8% (Tinggi)',
    styleGuideScore: '3 Pelanggaran (Aman)',
    seoAiScore: '58 Skor (Rendah)',
    changeSummary:
      'Draft berita awal hasil sinkronisasi otomatis CMS RRI sebelum dilakukan uji kemiripan dan penyuntingan editor.',
    title: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    lead: 'BIAK — Satelit Nusantara Tiga sukses meluncur Kamis dini hari dari kompleks peluncuran antariksa Biak Numfor.',
    sections: [
      {
        content:
          'Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.',
        findingNote: {
          type: 'kemiripan',
          title: 'Kemiripan Tinggi dengan Kantor Berita Antara',
          description:
            'Kutipan mentah dari rilis resmi Antara News tersalin tanpa kutipan langsung atau tanda petik.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit.',
        findingNote: {
          type: 'buku_gaya',
          title: 'Nomenklatur Lembaga Informal',
          description: 'Belum menyebut kepanjangan BRIN pada kemunculan pertama draft berita.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik kawasan 3T.',
        findingNote: {
          type: 'seo',
          title: 'Minim Konteks AI-Search',
          description:
            'Tidak terdapat konteks perbandingan satelit terdahulu atau estimasi waktu operasional komersial.',
          status: 'Sudah Ditandai',
        },
      },
    ],
  },
];
