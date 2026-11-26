/* ============================================================
   kpi.js — Formula pengiraan KPI semua modul
   UKK Command Centre, Politeknik Balik Pulau
   ============================================================ */

'use strict';

// Bulan & Tahun semasa
function bulanTahunSekarang() {
  const now = new Date();
  return { bulan: now.getMonth() + 1, tahun: now.getFullYear() };
}

// Tapis rekod mengikut bulan & tahun semasa
function tapisBulanIni(senarai, medanTarikh) {
  const { bulan, tahun } = bulanTahunSekarang();
  return senarai.filter(r => {
    if (!r[medanTarikh]) return false;
    const d = new Date(r[medanTarikh]);
    return d.getMonth() + 1 === bulan && d.getFullYear() === tahun;
  });
}

// ---- KPI 1: Hebahan Media Sosial ----
function kiraPlatformKPI() {
  const sasaran = dbGet('kpiSasaran') || DATA_KPI_SASARAN_DEFAULT;
  const hebahan = dbGet('hebahan') || [];
  const { bulan, tahun } = bulanTahunSekarang();

  const hasilBulanIni = hebahan.filter(h => {
    const d = new Date(h.tarikh);
    return d.getMonth() + 1 === bulan && d.getFullYear() === tahun;
  });

  const platform = ['Facebook', 'Instagram', 'TikTok', 'X', 'YouTube'];
  const hasil = {};

  platform.forEach(p => {
    const bilSebenar = hasilBulanIni.filter(h => h.platform === p).length;
    const bilSasaran = sasaran.sasaran[p] || 0;
    const pct = bilSasaran > 0 ? Math.round((bilSebenar / bilSasaran) * 100) : 0;
    hasil[p] = { sebenar: bilSebenar, sasaran: bilSasaran, pct };
  });

  const jumlahSebenar = platform.reduce((s, p) => s + hasil[p].sebenar, 0);
  const jumlahSasaran = platform.reduce((s, p) => s + hasil[p].sasaran, 0);
  const pctKeseluruhan = jumlahSasaran > 0 ? Math.round((jumlahSebenar / jumlahSasaran) * 100) : 0;

  return { platform: hasil, jumlahSebenar, jumlahSasaran, pct: pctKeseluruhan };
}

// ---- KPI 2: Permohonan Selesai ----
function kiraPermohonanKPI() {
  const senarai = dbGet('permohonan') || [];
  const bulanIni = tapisBulanIni(senarai, 'tarikhPermohonan');
  const jumlah  = bulanIni.length;
  const selesai = bulanIni.filter(r => r.status === 'Selesai').length;
  const pct = jumlah > 0 ? Math.round((selesai / jumlah) * 100) : 0;
  return { selesai, jumlah, pct };
}

// ---- KPI 3: Program Dilaksana ----
function kiraProgramKPI() {
  const senarai  = dbGet('program') || [];
  const bulanIni = tapisBulanIni(senarai, 'tarikh');
  const jumlah   = bulanIni.length;
  const selesai  = bulanIni.filter(r => r.status === 'Selesai').length;
  const pct      = jumlah > 0 ? Math.round((selesai / jumlah) * 100) : 0;
  return { selesai, jumlah, pct };
}

// ---- KPI 4: Success Story Diwar-warkan ----
function kiraStoryKPI() {
  const senarai  = dbGet('story') || [];
  const jumlah   = senarai.length;
  const diWarwar = senarai.filter(r => r.statusHebahan === 'Ya').length;
  const pct      = jumlah > 0 ? Math.round((diWarwar / jumlah) * 100) : 0;
  return { diWarwar, jumlah, pct };
}

// ---- Warna bar mengikut % ----
function warnaKPI(pct) {
  if (pct >= 80) return 'hijau';
  if (pct >= 60) return 'oren';
  return 'merah';
}

// Export global
window.kiraPlatformKPI  = kiraPlatformKPI;
window.kiraPermohonanKPI = kiraPermohonanKPI;
window.kiraProgramKPI   = kiraProgramKPI;
window.kiraStoryKPI     = kiraStoryKPI;
window.warnaKPI         = warnaKPI;
window.tapisBulanIni    = tapisBulanIni;
window.bulanTahunSekarang = bulanTahunSekarang;
