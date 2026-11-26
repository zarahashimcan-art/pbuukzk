/* ============================================================
   storage.js — Fungsi CRUD generik untuk localStorage
   UKK Command Centre, Politeknik Balik Pulau
   ============================================================ */

'use strict';

const KEYS = {
  hebahan:    'ukk_hebahan',
  jadual:     'ukk_jadual',
  permohonan: 'ukk_permohonan',
  program:    'ukk_program',
  story:      'ukk_story',
  kpiSasaran: 'ukk_kpi_sasaran',
  mulaDimuat: 'ukk_data_loaded'
};

// ---- Baca data dari localStorage ----
function dbGet(modul) {
  try {
    const raw = localStorage.getItem(KEYS[modul]);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('dbGet error:', modul, e);
    return null;
  }
}

// ---- Simpan data ke localStorage ----
function dbSet(modul, data) {
  try {
    localStorage.setItem(KEYS[modul], JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('dbSet error:', modul, e);
    return false;
  }
}

// ---- Tambah rekod baru ----
function dbTambah(modul, rekod) {
  const senarai = dbGet(modul) || [];
  rekod.id = rekod.id || Date.now();
  senarai.push(rekod);
  dbSet(modul, senarai);
  return rekod;
}

// ---- Kemaskini rekod sedia ada (cari mengikut id) ----
function dbKemaskini(modul, rekodBaru) {
  const senarai = dbGet(modul) || [];
  const idx = senarai.findIndex(r => r.id === rekodBaru.id);
  if (idx === -1) return false;
  senarai[idx] = rekodBaru;
  dbSet(modul, senarai);
  return true;
}

// ---- Padam rekod mengikut id ----
function dbPadam(modul, id) {
  const senarai = dbGet(modul) || [];
  const baru = senarai.filter(r => r.id !== id);
  dbSet(modul, baru);
  return true;
}

// ---- Cari rekod mengikut id ----
function dbCari(modul, id) {
  const senarai = dbGet(modul) || [];
  return senarai.find(r => r.id === id) || null;
}

// ---- Reset: buang semua data UKK ----
function dbReset() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

// ---- Inisialisasi: muatkan data contoh jika belum ada ----
function dbInit() {
  if (localStorage.getItem(KEYS.mulaDimuat)) return; // sudah dimuatkan

  dbSet('hebahan',    DATA_HEBAHAN_DEFAULT);
  dbSet('jadual',     DATA_JADUAL_DEFAULT);
  dbSet('permohonan', DATA_PERMOHONAN_DEFAULT);
  dbSet('program',    DATA_PROGRAM_DEFAULT);
  dbSet('story',      DATA_STORY_DEFAULT);
  dbSet('kpiSasaran', DATA_KPI_SASARAN_DEFAULT);

  localStorage.setItem(KEYS.mulaDimuat, '1');
}

// Export global
window.dbGet       = dbGet;
window.dbSet       = dbSet;
window.dbTambah    = dbTambah;
window.dbKemaskini = dbKemaskini;
window.dbPadam     = dbPadam;
window.dbCari      = dbCari;
window.dbReset     = dbReset;
window.dbInit      = dbInit;
