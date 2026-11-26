/* app.js — Titik masuk utama */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  dbInit();          // Muatkan data contoh jika pertama kali buka
  initHeaderDate();
  initModal();
  initTabs();
  initHebahan();
  initJadual();
  initPermohonan();
  initProgram();
  initKejayaan();
  renderUtama();     // Render halaman utama secara automatik
});
