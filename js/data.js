/* ============================================================
   data.js — Data contoh & struktur data semua 6 modul
   UKK Command Centre, Politeknik Balik Pulau
   ============================================================ */

'use strict';

// ---- Cuti Umum Malaysia 2025 ----
const CUTI_UMUM_2025 = [
  { tarikh: '2025-01-01', nama: 'Tahun Baru' },
  { tarikh: '2025-01-29', nama: 'Tahun Baru Cina' },
  { tarikh: '2025-01-30', nama: 'Tahun Baru Cina (Hari 2)' },
  { tarikh: '2025-02-01', nama: 'Hari Wilayah Persekutuan' },
  { tarikh: '2025-02-11', nama: 'Thaipusam' },
  { tarikh: '2025-03-01', nama: 'Israk Mikraj' },
  { tarikh: '2025-03-30', nama: 'Hari Wanita' },
  { tarikh: '2025-03-31', nama: 'Awal Ramadan' },
  { tarikh: '2025-04-18', nama: 'Jumaat Agung' },
  { tarikh: '2025-05-01', nama: 'Hari Pekerja' },
  { tarikh: '2025-05-12', nama: 'Hari Wesak' },
  { tarikh: '2025-05-31', nama: 'Hari Agong' },
  { tarikh: '2025-06-02', nama: 'Hari Keputeraan YDP Agong' },
  { tarikh: '2025-06-07', nama: 'Hari Keputeraan Yang di-Pertua Negeri Pulau Pinang' },
  { tarikh: '2025-07-07', nama: 'Hari Keputeraan Yang di-Pertua Negeri Pulau Pinang (Ganti)' },
  { tarikh: '2025-08-31', nama: 'Hari Merdeka' },
  { tarikh: '2025-09-16', nama: 'Hari Malaysia' },
  { tarikh: '2025-10-02', nama: 'Awal Muharram' },
  { tarikh: '2025-10-20', nama: 'Deepavali' },
  { tarikh: '2025-12-11', nama: 'Maulidur Rasul' },
  { tarikh: '2025-12-25', nama: 'Hari Krismas' },
  // Hari Raya Aidilfitri
  { tarikh: '2025-03-30', nama: 'Hari Raya Aidilfitri' },
  { tarikh: '2025-03-31', nama: 'Hari Raya Aidilfitri (Hari 2)' },
  // Hari Raya Aidiladha
  { tarikh: '2025-06-06', nama: 'Hari Raya Aidiladha' },
  { tarikh: '2025-06-07', nama: 'Hari Raya Aidiladha (Hari 2)' },
];

// ---- Sasaran KPI Bulanan ----
const DATA_KPI_SASARAN_DEFAULT = {
  bulan: new Date().getMonth() + 1,
  tahun: new Date().getFullYear(),
  sasaran: {
    Facebook:  20,
    Instagram: 20,
    TikTok:    12,
    X:         10,
    YouTube:    4
  }
};

// ---- Data Contoh: Hebahan Media Sosial ----
const DATA_HEBAHAN_DEFAULT = [
  { id: 1001, tarikh: '2025-07-02', platform: 'Facebook',  tajukKandungan: 'Sambutan Hari Raya Aidiladha bersama warga Politeknik Balik Pulau', jenisKandungan: 'Gambar',    pautan: '', reach: 1450, programBerkaitan: 'Majlis Hari Raya UKK', staf: 'Pn. Suhana' },
  { id: 1002, tarikh: '2025-07-04', platform: 'Instagram', tajukKandungan: 'Behind the scenes: Persediaan Forum Industri 4.0',                     jenisKandungan: 'Reels',     pautan: '', reach: 3200, programBerkaitan: 'Forum Industri 4.0',   staf: 'Cik Nurliana' },
  { id: 1003, tarikh: '2025-07-05', platform: 'TikTok',    tajukKandungan: 'Tips Komunikasi Korporat untuk Pelajar',                               jenisKandungan: 'Video',     pautan: '', reach: 7800, programBerkaitan: '',                       staf: 'En. Razif' },
  { id: 1004, tarikh: '2025-07-07', platform: 'Facebook',  tajukKandungan: 'Program CSR Komuniti Balik Pulau 2025 — Jom Sertai!',                  jenisKandungan: 'Gambar',    pautan: '', reach: 980,  programBerkaitan: 'Program CSR Komuniti',   staf: 'En. Hafizuddin' },
  { id: 1005, tarikh: '2025-07-08', platform: 'X',         tajukKandungan: 'Politeknik Balik Pulau raih pingat emas pertandingan inovasi ASEAN',   jenisKandungan: 'Teks',      pautan: '', reach: 420,  programBerkaitan: 'Inovasi ASEAN 2025',     staf: 'Pn. Balkish' },
  { id: 1006, tarikh: '2025-07-09', platform: 'YouTube',   tajukKandungan: 'Highlight: Minggu Inovasi PBP 2025',                                  jenisKandungan: 'Video',     pautan: '', reach: 560,  programBerkaitan: 'Minggu Inovasi PBP',     staf: 'En. Razif' },
  { id: 1007, tarikh: '2025-07-10', platform: 'Instagram', tajukKandungan: 'Pelajar PBP juara Pertandingan Robotik Kebangsaan',                    jenisKandungan: 'Gambar',    pautan: '', reach: 4100, programBerkaitan: 'Robotik Kebangsaan',     staf: 'Cik Nurliana' },
  { id: 1008, tarikh: '2025-07-11', platform: 'Facebook',  tajukKandungan: 'Lawatan industri ke Penang Science Cluster',                          jenisKandungan: 'Gambar',    pautan: '', reach: 720,  programBerkaitan: 'Lawatan Industri',       staf: 'Pn. Suhana' },
  { id: 1009, tarikh: '2025-07-12', platform: 'TikTok',    tajukKandungan: 'Hari Kerjaya PBP 2025 — lebih 50 syarikat hadir!',                    jenisKandungan: 'Reels',     pautan: '', reach: 9200, programBerkaitan: 'Hari Kerjaya 2025',      staf: 'En. Razif' },
  { id: 1010, tarikh: '2025-07-14', platform: 'Instagram', tajukKandungan: 'Seminar Komunikasi Korporat: Pembinaan Jenama Institusi',              jenisKandungan: 'Infografik',pautan: '', reach: 2300, programBerkaitan: 'Seminar Kom. Korporat',   staf: 'Pn. Balkish' },
  { id: 1011, tarikh: '2025-07-15', platform: 'X',         tajukKandungan: 'Taklimat Media: Pencapaian PBP Separuh Tahun 2025',                   jenisKandungan: 'Teks',      pautan: '', reach: 310,  programBerkaitan: '',                       staf: 'En. Hafizuddin' },
  { id: 1012, tarikh: '2025-07-16', platform: 'Facebook',  tajukKandungan: 'Infografik: 5 Sebab Pilih Politeknik Balik Pulau',                    jenisKandungan: 'Infografik',pautan: '', reach: 1890, programBerkaitan: '',                       staf: 'Pn. Suhana' },
];

// ---- Data Contoh: Jadual Kandungan ----
const DATA_JADUAL_DEFAULT = [
  { id: 2001, tajuk: 'Infografik Syarat Kemasukan Sesi 2026',         tarikhRancang: '2025-07-18', platform: 'Instagram', penanggungJawab: 'Cik Nurliana',   status: 'Draf',          nota: 'Perlu gambar rasmi dari Bahagian Pengajian' },
  { id: 2002, tajuk: 'Video pendek: Hari Pertama Semester Baharu',    tarikhRancang: '2025-07-21', platform: 'TikTok',    penanggungJawab: 'En. Razif',       status: 'DalamSemakan',  nota: 'Menunggu kelulusan Ketua Unit' },
  { id: 2003, tajuk: 'Post Hari Kemerdekaan Malaysia',                tarikhRancang: '2025-08-31', platform: 'Facebook',  penanggungJawab: 'Pn. Suhana',      status: 'Draf',          nota: 'Guna template rasmi PBP' },
  { id: 2004, tajuk: 'Reels: Keseronokan di Minggu Orientasi',        tarikhRancang: '2025-07-22', platform: 'Instagram', penanggungJawab: 'Cik Nurliana',    status: 'Diterbitkan',   nota: '' },
  { id: 2005, tajuk: 'Highlight Forum Industri 4.0',                  tarikhRancang: '2025-07-25', platform: 'YouTube',   penanggungJawab: 'En. Razif',       status: 'DalamSemakan',  nota: 'Edit video masih dalam proses' },
  { id: 2006, tajuk: 'Ucapan Hari Malaysia daripada Pengarah',        tarikhRancang: '2025-09-16', platform: 'Facebook',  penanggungJawab: 'En. Hafizuddin',  status: 'Draf',          nota: '' },
  { id: 2007, tajuk: 'Tips Kejayaan: Alumni PBP bercerita',           tarikhRancang: '2025-07-28', platform: 'TikTok',    penanggungJawab: 'En. Razif',       status: 'Draf',          nota: '' },
  { id: 2008, tajuk: 'Infografik Perkhidmatan UKK untuk Staf',        tarikhRancang: '2025-07-17', platform: 'X',         penanggungJawab: 'Pn. Balkish',     status: 'Diterbitkan',   nota: '' },
];

// ---- Data Contoh: Permohonan Bahan Kreatif ----
const DATA_PERMOHONAN_DEFAULT = [
  { id: 3001, noRujukan: 'UKK-2025-001', namaPemohon: 'Dr. Zulaikha Azman',    jabatan: 'Jabatan Perdagangan',      jenisKhidmat: 'Poster',     tajukProgram: 'Forum Industri 4.0',         tarikhProgram: '2025-07-25', tarikhPermohonan: '2025-07-05', tarikhDeadline: '2025-07-20', stafDitugaskan: 'Cik Nurliana',   status: 'Selesai',          nota: 'Poster A1 dan banner' },
  { id: 3002, noRujukan: 'UKK-2025-002', namaPemohon: 'En. Shahril Nizam',     jabatan: 'Jabatan Kejuruteraan',     jenisKhidmat: 'Fotografi',  tajukProgram: 'Pertandingan Robotik',        tarikhProgram: '2025-07-18', tarikhPermohonan: '2025-07-08', tarikhDeadline: '2025-07-18', stafDitugaskan: 'En. Hafizuddin', status: 'DalamKerja',       nota: '' },
  { id: 3003, noRujukan: 'UKK-2025-003', namaPemohon: 'Pn. Faridah Hamid',     jabatan: 'Hal Ehwal Pelajar',        jenisKhidmat: 'Video',      tajukProgram: 'Minggu Orientasi 2025',       tarikhProgram: '2025-07-21', tarikhPermohonan: '2025-07-09', tarikhDeadline: '2025-07-28', stafDitugaskan: 'En. Razif',      status: 'MenungguSemakan',  nota: 'Video 3-5 minit' },
  { id: 3004, noRujukan: 'UKK-2025-004', namaPemohon: 'Dr. Azrul Hisham',      jabatan: 'Jabatan Teknologi Maklumat',jenisKhidmat: 'Liputan',   tajukProgram: 'Seminar Siber Pulau Pinang',  tarikhProgram: '2025-07-30', tarikhPermohonan: '2025-07-10', tarikhDeadline: '2025-07-30', stafDitugaskan: 'Pn. Suhana',     status: 'Diterima',         nota: '' },
  { id: 3005, noRujukan: 'UKK-2025-005', namaPemohon: 'En. Shahril Nizam',     jabatan: 'Jabatan Kejuruteraan',     jenisKhidmat: 'Poster',     tajukProgram: 'Hari Kerjaya PBP 2025',       tarikhProgram: '2025-08-05', tarikhPermohonan: '2025-07-12', tarikhDeadline: '2025-08-01', stafDitugaskan: 'Pn. Balkish',    status: 'DalamKerja',       nota: 'Poster digital dan cetak' },
  { id: 3006, noRujukan: 'UKK-2025-006', namaPemohon: 'Pn. Faridah Hamid',     jabatan: 'Hal Ehwal Pelajar',        jenisKhidmat: 'Fotografi',  tajukProgram: 'Majlis Anugerah Pelajar',     tarikhProgram: '2025-08-10', tarikhPermohonan: '2025-07-13', tarikhDeadline: '2025-08-10', stafDitugaskan: 'En. Hafizuddin', status: 'Diterima',         nota: '' },
  { id: 3007, noRujukan: 'UKK-2025-007', namaPemohon: 'Dr. Zulaikha Azman',    jabatan: 'Jabatan Perdagangan',      jenisKhidmat: 'Video',      tajukProgram: 'Program CSR Komuniti',        tarikhProgram: '2025-07-26', tarikhPermohonan: '2025-07-14', tarikhDeadline: '2025-08-02', stafDitugaskan: 'En. Razif',      status: 'Selesai',          nota: 'Video dokumentari 10 minit' },
];

// ---- Data Contoh: Program UKK ----
const DATA_PROGRAM_DEFAULT = [
  { id: 4001, namaProgram: 'Forum Industri 4.0',                     tarikh: '2025-07-25', masa: '08:30', lokasi: 'Dewan Budiman PBP',         kategori: 'Akademik',  peringkat: 'Kebangsaan',     sasaranPeserta: 200, pesertaSebenar: 0,   stafTerlibat: 'Pn. Suhana, En. Hafizuddin', status: 'AkanDatang',    dokumentasi: '' },
  { id: 4002, namaProgram: 'Program CSR Komuniti Balik Pulau',        tarikh: '2025-07-26', masa: '09:00', lokasi: 'Kampung Pulau Betong',       kategori: 'Komuniti',  peringkat: 'Komuniti',       sasaranPeserta: 80,  pesertaSebenar: 0,   stafTerlibat: 'En. Razif, Pn. Balkish',     status: 'AkanDatang',    dokumentasi: '' },
  { id: 4003, namaProgram: 'Minggu Orientasi Pelajar Baharu',         tarikh: '2025-07-21', masa: '07:30', lokasi: 'Dewan Budiman PBP',         kategori: 'Pelajar',   peringkat: 'Institusi',      sasaranPeserta: 500, pesertaSebenar: 488, stafTerlibat: 'Semua staf UKK',             status: 'Selesai',       dokumentasi: '' },
  { id: 4004, namaProgram: 'Hari Kerjaya PBP 2025',                   tarikh: '2025-08-05', masa: '09:00', lokasi: 'Kawasan Luar Dewan Budiman', kategori: 'Kerjaya',   peringkat: 'Institusi',      sasaranPeserta: 300, pesertaSebenar: 0,   stafTerlibat: 'Pn. Suhana, Cik Nurliana',   status: 'AkanDatang',    dokumentasi: '' },
  { id: 4005, namaProgram: 'Seminar Komunikasi Korporat',             tarikh: '2025-07-15', masa: '09:00', lokasi: 'Bilik Seminar Utama',        kategori: 'Akademik',  peringkat: 'Institusi',      sasaranPeserta: 80,  pesertaSebenar: 74,  stafTerlibat: 'En. Hafizuddin, Pn. Balkish', status: 'Selesai',       dokumentasi: '' },
  { id: 4006, namaProgram: 'Pertandingan Robotik Kebangsaan 2025',    tarikh: '2025-07-18', masa: '08:00', lokasi: 'Dewan Serbaguna PBP',        kategori: 'Akademik',  peringkat: 'Kebangsaan',     sasaranPeserta: 150, pesertaSebenar: 143, stafTerlibat: 'Cik Nurliana, En. Razif',     status: 'Selesai',       dokumentasi: '' },
  { id: 4007, namaProgram: 'Inovasi ASEAN Summit 2025',               tarikh: '2025-09-10', masa: '08:30', lokasi: 'Kompleks Sukan ASEAN',       kategori: 'Akademik',  peringkat: 'Antarabangsa',   sasaranPeserta: 60,  pesertaSebenar: 0,   stafTerlibat: 'Pn. Suhana, En. Hafizuddin', status: 'AkanDatang',    dokumentasi: '' },
];

// ---- Data Contoh: Success Story ----
const DATA_STORY_DEFAULT = [
  { id: 5001, nama: 'Muhammad Harith Izzwan',  kategori: 'Pelajar',    tajukPencapaian: 'Emas — Pertandingan Robotik ASEAN Skill Competition 2025',       peringkat: 'Antarabangsa', pertandingan: 'ASEAN Skill Competition 2025',   anjuran: 'ASEAN Secretariat',        tarikhPencapaian: '2025-06-20', anugerah: 'Emas',   jabatan: 'Jabatan Kejuruteraan',          dokumentasi: '', statusHebahan: 'Ya' },
  { id: 5002, nama: 'Nur Izzati Nadhirah',     kategori: 'Pelajar',    tajukPencapaian: 'Naib Johan — Debat Bahasa Melayu Peringkat Kebangsaan',            peringkat: 'Kebangsaan',   pertandingan: 'Debat IPTA/IPTS KPT 2025',      anjuran: 'KPT',                      tarikhPencapaian: '2025-05-14', anugerah: 'Perak',  jabatan: 'Jabatan Perdagangan',           dokumentasi: '', statusHebahan: 'Ya' },
  { id: 5003, nama: 'Dr. Zulaikha Azman',      kategori: 'Pensyarah',  tajukPencapaian: 'Anugerah Inovasi Terbaik — KPT Industry Expo 2025',                peringkat: 'Kebangsaan',   pertandingan: 'KPT Industry Expo 2025',        anjuran: 'KPT',                      tarikhPencapaian: '2025-04-28', anugerah: 'Sijil',  jabatan: 'Jabatan Perdagangan',           dokumentasi: '', statusHebahan: 'Ya' },
  { id: 5004, nama: 'Aiman Syafiq Zulkifli',   kategori: 'Pelajar',    tajukPencapaian: 'Johan — Pertandingan Inovasi Produk Politeknik 2025',              peringkat: 'Kebangsaan',   pertandingan: 'InovaTech Politeknik 2025',     anjuran: 'JPP',                      tarikhPencapaian: '2025-06-05', anugerah: 'Emas',   jabatan: 'Jabatan Teknologi Maklumat',    dokumentasi: '', statusHebahan: 'Belum' },
  { id: 5005, nama: 'Siti Nabilah Mustafa',    kategori: 'Pelajar',    tajukPencapaian: 'Pelajar Terbaik Keseluruhan Politeknik Balik Pulau 2024/2025',     peringkat: 'Institusi',    pertandingan: 'Anugerah Pelajar PBP',          anjuran: 'Politeknik Balik Pulau',   tarikhPencapaian: '2025-07-01', anugerah: 'Emas',   jabatan: 'Jabatan Perdagangan',           dokumentasi: '', statusHebahan: 'Belum' },
  { id: 5006, nama: 'En. Shahril Nizam Yahya', kategori: 'Pensyarah',  tajukPencapaian: 'Anugerah Perkhidmatan Cemerlang — Politeknik Balik Pulau',         peringkat: 'Institusi',    pertandingan: 'Hari Anugerah PBP 2025',        anjuran: 'Politeknik Balik Pulau',   tarikhPencapaian: '2025-07-01', anugerah: 'Sijil',  jabatan: 'Jabatan Kejuruteraan',          dokumentasi: '', statusHebahan: 'Ya' },
  { id: 5007, nama: 'Hazwan Firdaus Rosli',    kategori: 'Pelajar',    tajukPencapaian: 'Sukarelawan Terbaik — Program Literasi Digital Komuniti',          peringkat: 'Komuniti',     pertandingan: 'Program Literasi Digital 2025', anjuran: 'MCMC',                     tarikhPencapaian: '2025-05-30', anugerah: 'Sijil',  jabatan: 'Jabatan Teknologi Maklumat',    dokumentasi: '', statusHebahan: 'Ya' },
  { id: 5008, nama: 'Pn. Faridah Hamid',       kategori: 'Pensyarah',  tajukPencapaian: 'Pingat Perak — Pameran Penyelidikan & Inovasi Antarabangsa ITEX',  peringkat: 'Antarabangsa', pertandingan: 'ITEX 2025',                     anjuran: 'MINDS Malaysia',           tarikhPencapaian: '2025-05-09', anugerah: 'Perak',  jabatan: 'Hal Ehwal Pelajar',             dokumentasi: '', statusHebahan: 'Ya' },
];

// Export sebagai objek global
window.CUTI_UMUM_2025 = CUTI_UMUM_2025;
window.DATA_KPI_SASARAN_DEFAULT = DATA_KPI_SASARAN_DEFAULT;
window.DATA_HEBAHAN_DEFAULT     = DATA_HEBAHAN_DEFAULT;
window.DATA_JADUAL_DEFAULT      = DATA_JADUAL_DEFAULT;
window.DATA_PERMOHONAN_DEFAULT  = DATA_PERMOHONAN_DEFAULT;
window.DATA_PROGRAM_DEFAULT     = DATA_PROGRAM_DEFAULT;
window.DATA_STORY_DEFAULT       = DATA_STORY_DEFAULT;
