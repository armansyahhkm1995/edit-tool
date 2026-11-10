# RRI Editools — Portal Pemeriksa Naskah Redaksi

Portal Pemeriksa Naskah Redaksi Radio Republik Indonesia (RRI Editools) berbasis kecerdasan buatan (AI) untuk mendeteksi kemiripan naskah antar-media, evaluasi kepatuhan Buku Gaya Jurnalistik 2026, analisis indikasi AI, serta optimasi SEO & AI-Search.

---

## 🚀 Fitur Utama

1. **Autentikasi & Verifikasi Dua Langkah (2FA)**
   - Login staf redaksi via NIP / Email dengan proteksi Cloudflare Turnstile.
   - Verifikasi 6-digit OTP (2FA) dengan navigasi kembali ke login.

2. **Daftar Draf Berita CMS (`DaftarDrafPage`)**
   - Sinkronisasi antrean draf berita dari CMS RRI.
   - Filter status CMS, pencarian instan, dan indikator status pemeriksaan AI (*Aman*, *Pelanggaran*, *Belum Diperiksa*).

3. **Detail Pemeriksaan Naskah Split-View (`DetailSplitViewPage`)**
   - **Panel Kiri:** Tampilan naskah berita (*read-only*) dengan penyorotan warna (*highlight boxes*) pada kalimat yang terindikasi kemiripan/pelanggaran.
   - **Panel Kanan:** Ringkasan skor kemiripan, kartu temuan AI terperinci (Kemiripan, Buku Gaya, SEO & AI-Search), tombol atribusi sumber, dan pencatatan keputusan editor (*Telah Diperbaiki*, *Diterima*, *Diabaikan*).

4. **Riwayat & Audit Pemeriksaan AI (`RiwayatPemeriksaanPage`)**
   - Catatan permanen seluruh aktivitas audit draf berita beserta riwayat versi (Versi 2 aktif / Versi 1 arsip).
   - Peninjauan kembali naskah masa lalu secara *read-only*.

5. **Daftar Sumber Dikecualikan / Whitelist (`SumberPengecualianPage`)**
   - Pengelolaan domain berita terverifikasi (misal: Antara News) agar tidak menambah persentase plagiarisme draf.
   - Modal Tambah, Perbarui, dan Hapus Whitelist.

6. **Pengelolaan Buku Gaya Redaksi (`BukuGayaPage`)**
   - Pengunggahan dokumen panduan gaya redaksi format PDF (*Dropzone*).
   - Pengaktifan versi buku gaya aktif via toggle switch.
   - Peninjauan isi pasal & aturan Buku Gaya (Bab I, II, III) melalui modal interaktif.

7. **Manajemen Pengguna & Hak Akses (`ManajemenPenggunaPage`)**
   - 3 Kartu KPI: Total Akun Terdaftar, Kepatuhan 2FA, dan Status Akun Aktif.
   - Pengaturan hak akses (Administrator / Editor).
   - Modal Tambah Pengguna, Edit Data Pengguna, dan Nonaktifkan Akun.

8. **Audit Log Sistem & Rekam Jejak Keamanan (`AuditLogPage`)**
   - Pemantauan kronologis aktivitas autentikasi, perubahan konfigurasi, upload buku gaya, dan manajemen pengguna.

9. **Konfigurasi Layanan & Parameter AI (`KonfigurasiProviderPage`)**
   - Pilihan model LLM (Anthropic Claude 3.5 Sonnet, Gemini 3.8 Flash, GPT-OSS 120B).
   - Pengaturan arsitektur mesin deteksi (*In-House Vector DB* vs *External API*).
   - Konfigurasi ambang batas (*threshold*) skor toleransi kemiripan naskah.

10. **Pusat Notifikasi (`NotifikasiPage`)**
    - Notifikasi aktivitas sistem terkelompok (Hari Ini & Kemarin).

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Design System:** Falah One (`blue/700` primary accents)

---

## 📦 Menjalankan Proyek Secara Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/armansyahhkm1995/edit-tool.git
   cd edit-tool
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan pada `http://localhost:5173`.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

Hak Cipta © 2026 Radio Republik Indonesia (RRI).
