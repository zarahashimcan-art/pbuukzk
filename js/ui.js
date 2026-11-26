/* ============================================================
   ui.js — Render semua modul, modal, tab, kalendar
   UKK Command Centre, Politeknik Balik Pulau
   ============================================================ */

'use strict';

// ============================================================
// UTILITI AM
// ============================================================

const BULAN_MY = ['Januari','Februari','Mac','April','Mei','Jun',
                  'Julai','Ogos','September','Oktober','November','Disember'];
const HARI_MY  = ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'];

function formatTarikh(str) {
  if (!str) return '—';
  const d = new Date(str);
  return d.getDate() + ' ' + BULAN_MY[d.getMonth()] + ' ' + d.getFullYear();
}

function platformBadge(p) {
  const cls = { Facebook:'badge-fb', Instagram:'badge-ig', TikTok:'badge-tt', X:'badge-x', YouTube:'badge-yt' };
  return `<span class="badge ${cls[p]||'badge-kelabu'}">${p}</span>`;
}

function peringkatBadge(p) {
  const icon = { Antarabangsa:'🌍', Kebangsaan:'🇲🇾', Komuniti:'🏘️', Institusi:'🏫' };
  const cls  = { Antarabangsa:'badge-antarabangsa', Kebangsaan:'badge-kebangsaan', Komuniti:'badge-komuniti', Institusi:'badge-institusi' };
  return `<span class="badge ${cls[p]||'badge-kelabu'}">${icon[p]||''} ${p}</span>`;
}

function statusBadgeJadual(s) {
  const map = { Draf:'badge-kelabu', DalamSemakan:'badge-oren', Diterbitkan:'badge-hijau' };
  const lbl = { Draf:'Draf', DalamSemakan:'Dalam Semakan', Diterbitkan:'Diterbitkan' };
  return `<span class="badge ${map[s]||'badge-kelabu'}">${lbl[s]||s}</span>`;
}

function statusBadgePermohonan(s) {
  const map = { Diterima:'badge-navy', DalamKerja:'badge-oren', MenungguSemakan:'badge-ungu', Selesai:'badge-hijau', Ditolak:'badge-merah' };
  const lbl = { Diterima:'Diterima', DalamKerja:'Dalam Kerja', MenungguSemakan:'Menunggu Semakan', Selesai:'Selesai', Ditolak:'Ditolak' };
  return `<span class="badge ${map[s]||'badge-kelabu'}">${lbl[s]||s}</span>`;
}

function statusBadgeProgram(s) {
  const map = { AkanDatang:'badge-navy', SedangBerjalan:'badge-oren', Selesai:'badge-hijau' };
  const lbl = { AkanDatang:'Akan Datang', SedangBerjalan:'Sedang Berjalan', Selesai:'Selesai' };
  return `<span class="badge ${map[s]||'badge-kelabu'}">${lbl[s]||s}</span>`;
}

function anugerahIcon(a) {
  if (!a) return '';
  if (a === 'Emas')  return '🥇';
  if (a === 'Perak') return '🥈';
  if (a === 'Gangsa')return '🥉';
  return '🏅';
}

function deadlineLabel(tarikhStr) {
  if (!tarikhStr) return '';
  const deadline = new Date(tarikhStr);
  const hari = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
  if (hari < 0)  return `<span class="deadline-label deadline-lewat">⚠ Lewat ${Math.abs(hari)} hari</span>`;
  if (hari <= 3) return `<span class="deadline-label deadline-soon">⏰ ${hari} hari lagi</span>`;
  return `<span class="deadline-label deadline-ok">${formatTarikh(tarikhStr)}</span>`;
}

// ============================================================
// TAB NAVIGATION
// ============================================================

function initTabs() {
  const tabs   = document.querySelectorAll('.nav-tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
      // Render modul apabila tab diklik
      renderByTab(target);
    });
  });
}

function renderByTab(tab) {
  switch (tab) {
    case 'utama':       renderUtama();       break;
    case 'hebahan':     renderHebahan();     break;
    case 'jadual':      renderJadual();      break;
    case 'permohonan':  renderPermohonan();  break;
    case 'program':     renderProgram();     break;
    case 'kejayaan':    renderKejayaan();    break;
  }
}

// ============================================================
// HEADER DATE
// ============================================================

function initHeaderDate() {
  const now = new Date();
  const elBulan  = document.getElementById('header-bulan');
  const elTarikh = document.getElementById('header-tarikh');
  const elKpiLbl = document.getElementById('kpi-bulan-label');
  const elTahun  = document.getElementById('tahun-footer');

  if (elBulan)  elBulan.textContent  = BULAN_MY[now.getMonth()] + ' ' + now.getFullYear();
  if (elTarikh) elTarikh.textContent = HARI_MY[now.getDay()] + ', ' + now.getDate() + ' ' + BULAN_MY[now.getMonth()] + ' ' + now.getFullYear();
  if (elKpiLbl) elKpiLbl.textContent = 'Laporan: ' + BULAN_MY[now.getMonth()] + ' ' + now.getFullYear();
  if (elTahun)  elTahun.textContent  = now.getFullYear();
}

// ============================================================
// TOAST
// ============================================================

let toastTimer = null;
function showToast(msg, type) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'toast show';
  el.style.borderLeftColor = (type === 'error') ? 'var(--merah)' : 'var(--oren)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast hidden'; }, 3000);
}

// ============================================================
// MODAL
// ============================================================

let modalCallback = null;

function bukaModal(tajuk, htmlBody, onSimpan) {
  document.getElementById('modal-title').textContent = tajuk;
  document.getElementById('modal-body').innerHTML    = htmlBody;
  document.getElementById('modal-overlay').classList.remove('hidden');
  modalCallback = onSimpan;
}

function tutupModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  modalCallback = null;
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', tutupModal);
  document.getElementById('modal-batal').addEventListener('click', tutupModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) tutupModal();
  });
  document.getElementById('modal-simpan').addEventListener('click', () => {
    if (modalCallback) modalCallback();
  });
}

// ============================================================
// MODUL 1: HALAMAN UTAMA
// ============================================================

function renderUtama() {
  renderKadKPI();
  renderPlatformKPI();
  renderUtamaProgram();
  renderUtamaPermohonan();
}

function renderKadKPI() {
  const h = kiraPlatformKPI();
  const p = kiraPermohonanKPI();
  const pr = kiraProgramKPI();
  const s = kiraStoryKPI();

  setKadKPI('hebahan',    h.jumlahSebenar + '/' + h.jumlahSasaran + ' post', h.pct);
  setKadKPI('permohonan', p.selesai + '/' + p.jumlah + ' permohonan',         p.pct);
  setKadKPI('program',    pr.selesai + '/' + pr.jumlah + ' program',           pr.pct);
  setKadKPI('story',      s.diWarwar + '/' + s.jumlah + ' kejayaan',           s.pct);
}

function setKadKPI(id, nilai, pct) {
  const elVal = document.getElementById('kpi-' + id + '-val');
  const elBar = document.getElementById('kpi-' + id + '-bar');
  const elPct = document.getElementById('kpi-' + id + '-pct');
  if (!elVal) return;
  elVal.textContent = nilai;
  elPct.textContent = pct + '%';
  elBar.style.width = Math.min(pct, 100) + '%';
  elBar.className   = 'kpi-bar ' + warnaKPI(pct);
}

function renderPlatformKPI() {
  const h = kiraPlatformKPI();
  const el = document.getElementById('platform-kpi-list');
  if (!el) return;
  const platforms = ['Facebook', 'Instagram', 'TikTok', 'X', 'YouTube'];
  el.innerHTML = platforms.map(p => {
    const d = h.platform[p];
    const warna = warnaKPI(d.pct);
    const barColor = warna === 'hijau' ? 'var(--hijau)' : warna === 'oren' ? 'var(--oren)' : 'var(--merah)';
    const pctCapped = Math.min(d.pct, 100);
    return `<div class="platform-kpi-row">
      <span class="platform-kpi-name">${p}</span>
      <div class="platform-kpi-bar-wrap">
        <div class="platform-kpi-bar" style="width:${pctCapped}%;background:${barColor}"></div>
      </div>
      <span class="platform-kpi-count">${d.sebenar}/${d.sasaran} post</span>
      <span class="platform-kpi-pct text-${warna}">${d.pct}%</span>
    </div>`;
  }).join('');
}

function renderUtamaProgram() {
  const senarai = (dbGet('program') || [])
    .filter(p => p.status === 'AkanDatang')
    .sort((a, b) => new Date(a.tarikh) - new Date(b.tarikh))
    .slice(0, 3);
  const el = document.getElementById('utama-program-list');
  if (!el) return;
  if (!senarai.length) {
    el.innerHTML = '<li class="empty-msg">Tiada program akan datang</li>';
    return;
  }
  el.innerHTML = senarai.map(p =>
    `<li>
      <span>${p.namaProgram}</span>
      <span class="text-muted" style="font-size:0.78rem">${formatTarikh(p.tarikh)}</span>
    </li>`
  ).join('');
}

function renderUtamaPermohonan() {
  const senarai = (dbGet('permohonan') || [])
    .filter(r => r.status !== 'Selesai' && r.status !== 'Ditolak')
    .sort((a, b) => new Date(a.tarikhDeadline) - new Date(b.tarikhDeadline))
    .slice(0, 3);
  const el = document.getElementById('utama-permohonan-list');
  if (!el) return;
  if (!senarai.length) {
    el.innerHTML = '<li class="empty-msg">Tiada permohonan belum selesai</li>';
    return;
  }
  el.innerHTML = senarai.map(r =>
    `<li>
      <span>${r.noRujukan} — ${r.jenisKhidmat}</span>
      ${deadlineLabel(r.tarikhDeadline)}
    </li>`
  ).join('');
}

// ============================================================
// MODUL 2: REKOD HEBAHAN
// ============================================================

function renderHebahan() {
  const senarai = dbGet('hebahan') || [];
  const platform = document.getElementById('filter-hebahan-platform').value;
  const bulanVal = document.getElementById('filter-hebahan-bulan').value;
  const jenis    = document.getElementById('filter-hebahan-jenis').value;

  let filtered = senarai.slice();
  if (platform) filtered = filtered.filter(r => r.platform === platform);
  if (jenis)    filtered = filtered.filter(r => r.jenisKandungan === jenis);
  if (bulanVal) {
    const [y, m] = bulanVal.split('-').map(Number);
    filtered = filtered.filter(r => {
      const d = new Date(r.tarikh);
      return d.getFullYear() === y && d.getMonth() + 1 === m;
    });
  }

  filtered.sort((a, b) => new Date(b.tarikh) - new Date(a.tarikh));

  // Populate bulan filter
  const senaraiTarikh = [...new Set(senarai.map(r => r.tarikh.slice(0, 7)))].sort().reverse();
  const selBulan = document.getElementById('filter-hebahan-bulan');
  const curVal   = selBulan.value;
  selBulan.innerHTML = '<option value="">Semua Bulan</option>' +
    senaraiTarikh.map(t => {
      const [y, m] = t.split('-');
      return `<option value="${t}" ${t === curVal ? 'selected' : ''}>${BULAN_MY[+m - 1]} ${y}</option>`;
    }).join('');

  // Ringkasan platform
  const platforms = ['Facebook', 'Instagram', 'TikTok', 'X', 'YouTube'];
  const ringkasanEl = document.getElementById('hebahan-ringkasan');
  if (ringkasanEl) {
    ringkasanEl.innerHTML = platforms.map(p => {
      const bil = senarai.filter(r => r.platform === p).length;
      return `<div class="platform-pill">${p}: <span class="platform-pill-count">${bil}</span></div>`;
    }).join('');
  }

  const tbody = document.getElementById('tbody-hebahan');
  if (!tbody) return;
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">Tiada rekod hebahan dijumpai.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td>${formatTarikh(r.tarikh)}</td>
      <td>${platformBadge(r.platform)}</td>
      <td style="max-width:200px">${r.tajukKandungan}</td>
      <td><span class="badge badge-kelabu">${r.jenisKandungan}</span></td>
      <td>${r.reach ? r.reach.toLocaleString() : '—'}</td>
      <td>${r.programBerkaitan || '—'}</td>
      <td>${r.staf}</td>
      <td class="td-actions">
        <button class="btn btn-outline btn-sm" onclick="editHebahan(${r.id})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="padamHebahan(${r.id})">🗑️</button>
      </td>
    </tr>`).join('');
}

function initHebahan() {
  document.getElementById('btn-tambah-hebahan').addEventListener('click', () => tambahHebahan());
  document.getElementById('filter-hebahan-platform').addEventListener('change', renderHebahan);
  document.getElementById('filter-hebahan-bulan').addEventListener('change', renderHebahan);
  document.getElementById('filter-hebahan-jenis').addEventListener('change', renderHebahan);
}

function formHebahan(r) {
  r = r || {};
  return `
    <div class="form-group"><label>Tarikh *</label>
      <input type="date" id="f-tarikh" value="${r.tarikh||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Platform *</label>
        <select id="f-platform">
          ${['Facebook','Instagram','TikTok','X','YouTube'].map(p => `<option ${r.platform===p?'selected':''}>${p}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Jenis Kandungan</label>
        <select id="f-jenis">
          ${['Gambar','Video','Reels','Infografik','Teks'].map(j => `<option ${r.jenisKandungan===j?'selected':''}>${j}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-group"><label>Tajuk / Kapsyen *</label>
      <textarea id="f-tajuk">${r.tajukKandungan||''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label>Reach / Tayangan</label>
        <input type="number" id="f-reach" value="${r.reach||''}"></div>
      <div class="form-group"><label>Staf Bertanggungjawab</label>
        <input type="text" id="f-staf" value="${r.staf||''}"></div>
    </div>
    <div class="form-group"><label>Program Berkaitan</label>
      <input type="text" id="f-program" value="${r.programBerkaitan||''}"></div>
    <div class="form-group"><label>Pautan Post</label>
      <input type="url" id="f-pautan" placeholder="https://" value="${r.pautan||''}"></div>`;
}

function tambahHebahan() {
  bukaModal('Tambah Rekod Hebahan', formHebahan(), () => {
    const rekod = {
      tarikh: document.getElementById('f-tarikh').value,
      platform: document.getElementById('f-platform').value,
      jenisKandungan: document.getElementById('f-jenis').value,
      tajukKandungan: document.getElementById('f-tajuk').value.trim(),
      reach: parseInt(document.getElementById('f-reach').value) || 0,
      staf: document.getElementById('f-staf').value.trim(),
      programBerkaitan: document.getElementById('f-program').value.trim(),
      pautan: document.getElementById('f-pautan').value.trim(),
    };
    if (!rekod.tarikh || !rekod.tajukKandungan) { showToast('Sila isi Tarikh dan Tajuk.', 'error'); return; }
    dbTambah('hebahan', rekod);
    tutupModal();
    renderHebahan();
    renderUtama();
    showToast('Rekod hebahan berjaya ditambah! ✅');
  });
}

window.editHebahan = function(id) {
  const r = dbCari('hebahan', id);
  if (!r) return;
  bukaModal('Sunting Rekod Hebahan', formHebahan(r), () => {
    r.tarikh          = document.getElementById('f-tarikh').value;
    r.platform        = document.getElementById('f-platform').value;
    r.jenisKandungan  = document.getElementById('f-jenis').value;
    r.tajukKandungan  = document.getElementById('f-tajuk').value.trim();
    r.reach           = parseInt(document.getElementById('f-reach').value) || 0;
    r.staf            = document.getElementById('f-staf').value.trim();
    r.programBerkaitan= document.getElementById('f-program').value.trim();
    r.pautan          = document.getElementById('f-pautan').value.trim();
    if (!r.tarikh || !r.tajukKandungan) { showToast('Sila isi Tarikh dan Tajuk.', 'error'); return; }
    dbKemaskini('hebahan', r);
    tutupModal();
    renderHebahan();
    renderUtama();
    showToast('Rekod berjaya dikemaskini! ✅');
  });
};

window.padamHebahan = function(id) {
  if (!confirm('Padam rekod ini?')) return;
  dbPadam('hebahan', id);
  renderHebahan();
  renderUtama();
  showToast('Rekod berjaya dipadam.');
};

// ============================================================
// MODUL 3: JADUAL KANDUNGAN + KALENDAR
// ============================================================

let kalBulan = new Date().getMonth();
let kalTahun = new Date().getFullYear();

function initJadual() {
  document.getElementById('btn-tambah-jadual').addEventListener('click', () => tambahJadual());
  document.getElementById('btn-view-kalendar').addEventListener('click', () => toggleViewJadual('kalendar'));
  document.getElementById('btn-view-senarai').addEventListener('click',  () => toggleViewJadual('senarai'));
  document.getElementById('btn-bulan-prev').addEventListener('click',   () => { kalBulan--; if (kalBulan < 0) { kalBulan = 11; kalTahun--; } renderKalendar(); });
  document.getElementById('btn-bulan-next').addEventListener('click',   () => { kalBulan++; if (kalBulan > 11) { kalBulan = 0; kalTahun++; } renderKalendar(); });
  document.getElementById('btn-tutup-hari').addEventListener('click',   () => document.getElementById('panel-hari').classList.add('hidden'));
  document.getElementById('filter-jadual-status').addEventListener('change', renderSenaraiJadual);
  document.getElementById('filter-jadual-platform').addEventListener('change', renderSenaraiJadual);
}

function toggleViewJadual(view) {
  document.getElementById('view-kalendar').classList.toggle('hidden', view !== 'kalendar');
  document.getElementById('view-senarai').classList.toggle('hidden', view !== 'senarai');
  document.getElementById('btn-view-kalendar').classList.toggle('active', view === 'kalendar');
  document.getElementById('btn-view-senarai').classList.toggle('active', view === 'senarai');
  if (view === 'senarai') renderSenaraiJadual();
}

function renderJadual() {
  renderKalendar();
}

function renderKalendar() {
  const senarai = dbGet('jadual') || [];
  const grid    = document.getElementById('kalendar-grid');
  const label   = document.getElementById('kalendar-bulan-label');
  if (!grid) return;

  label.textContent = BULAN_MY[kalBulan] + ' ' + kalTahun;

  const firstDay = new Date(kalTahun, kalBulan, 1).getDay();
  const lastDate = new Date(kalTahun, kalBulan + 1, 0).getDate();
  const today    = new Date();

  // Bina set cuti
  const cutiSet = {};
  CUTI_UMUM_2025.forEach(c => { cutiSet[c.tarikh] = c.nama; });

  // Bina map kandungan mengikut tarikh
  const kandunganMap = {};
  senarai.forEach(r => {
    const key = r.tarikhRancang ? r.tarikhRancang.slice(0, 10) : null;
    if (!key) return;
    if (!kandunganMap[key]) kandunganMap[key] = [];
    kandunganMap[key].push(r);
  });

  let html = '';

  // Sel kosong sebelum hari pertama
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="kal-cell kosong"></div>';
  }

  for (let d = 1; d <= lastDate; d++) {
    const tStr  = kalTahun + '-' + String(kalBulan + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    const hariIdx = (firstDay + d - 1) % 7;
    const isHariIni = d === today.getDate() && kalBulan === today.getMonth() && kalTahun === today.getFullYear();
    const isCuti    = !!cutiSet[tStr];
    const isAhad    = hariIdx === 0;
    const isSabtu   = hariIdx === 6;

    let cls = 'kal-cell';
    if (isHariIni) cls += ' hari-ini';
    else if (isCuti) cls += ' cuti-umum';
    else if (isAhad) cls += ' ahad';
    else if (isSabtu) cls += ' sabtu';

    const rekodHari = kandunganMap[tStr] || [];
    const dots = rekodHari.map(r => {
      const dotCls = r.status === 'Diterbitkan' ? 'dot-terbit' : r.status === 'DalamSemakan' ? 'dot-semakan' : 'dot-draf';
      return `<span class="dot ${dotCls}" title="${r.tajuk}"></span>`;
    }).join('');

    const cutiLabel = isCuti ? `<span class="kal-cuti-label">${cutiSet[tStr]}</span>` : '';

    html += `<div class="${cls}" data-tarikh="${tStr}" onclick="bukaPanelHari('${tStr}')">
      <span class="kal-tarikh">${d}</span>
      ${cutiLabel}
      <div class="kal-dots">${dots}</div>
    </div>`;
  }

  grid.innerHTML = html;
  document.getElementById('panel-hari').classList.add('hidden');
}

window.bukaPanelHari = function(tStr) {
  const senarai = (dbGet('jadual') || []).filter(r => r.tarikhRancang && r.tarikhRancang.slice(0, 10) === tStr);
  const panel   = document.getElementById('panel-hari');
  const title   = document.getElementById('panel-hari-title');
  const list    = document.getElementById('panel-hari-list');

  const d = new Date(tStr);
  title.textContent = HARI_MY[d.getDay()] + ', ' + formatTarikh(tStr);

  if (!senarai.length) {
    list.innerHTML = '<li class="empty-msg">Tiada kandungan dirancang untuk hari ini.</li>';
  } else {
    list.innerHTML = senarai.map(r =>
      `<li>
        <span>${r.tajuk} ${platformBadge(r.platform)} ${statusBadgeJadual(r.status)}</span>
        <span class="text-muted" style="font-size:0.75rem">${r.penanggungJawab}</span>
      </li>`
    ).join('');
  }
  panel.classList.remove('hidden');
};

function renderSenaraiJadual() {
  const senarai  = dbGet('jadual') || [];
  const status   = document.getElementById('filter-jadual-status').value;
  const platform = document.getElementById('filter-jadual-platform').value;

  let filtered = senarai.slice();
  if (status)   filtered = filtered.filter(r => r.status === status);
  if (platform) filtered = filtered.filter(r => r.platform === platform);
  filtered.sort((a, b) => new Date(a.tarikhRancang) - new Date(b.tarikhRancang));

  const tbody = document.getElementById('tbody-jadual');
  if (!tbody) return;
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Tiada rekod jadual kandungan.</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td>${formatTarikh(r.tarikhRancang)}</td>
      <td>${r.tajuk}</td>
      <td>${platformBadge(r.platform)}</td>
      <td>${r.penanggungJawab}</td>
      <td>${statusBadgeJadual(r.status)}</td>
      <td style="max-width:150px;font-size:0.78rem">${r.nota||'—'}</td>
      <td class="td-actions">
        ${r.status !== 'Diterbitkan' ? `<button class="btn btn-hijau btn-sm" onclick="tandakanTerbit(${r.id})">✅ Terbit</button>` : ''}
        <button class="btn btn-outline btn-sm" onclick="editJadual(${r.id})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="padamJadual(${r.id})">🗑️</button>
      </td>
    </tr>`).join('');
}

function formJadual(r) {
  r = r || {};
  return `
    <div class="form-group"><label>Tajuk Kandungan *</label>
      <input type="text" id="f-tajuk" value="${r.tajuk||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Tarikh Rancang *</label>
        <input type="date" id="f-tarikh" value="${r.tarikhRancang||''}"></div>
      <div class="form-group"><label>Platform</label>
        <select id="f-platform">
          ${['Facebook','Instagram','TikTok','X','YouTube'].map(p=>`<option ${r.platform===p?'selected':''}>${p}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Penanggung Jawab</label>
        <input type="text" id="f-pj" value="${r.penanggungJawab||''}"></div>
      <div class="form-group"><label>Status</label>
        <select id="f-status">
          <option value="Draf" ${r.status==='Draf'?'selected':''}>Draf</option>
          <option value="DalamSemakan" ${r.status==='DalamSemakan'?'selected':''}>Dalam Semakan</option>
          <option value="Diterbitkan" ${r.status==='Diterbitkan'?'selected':''}>Diterbitkan</option>
        </select></div>
    </div>
    <div class="form-group"><label>Nota</label>
      <textarea id="f-nota">${r.nota||''}</textarea></div>`;
}

function tambahJadual() {
  bukaModal('Rancang Kandungan Baru', formJadual(), () => {
    const rekod = {
      tajuk: document.getElementById('f-tajuk').value.trim(),
      tarikhRancang: document.getElementById('f-tarikh').value,
      platform: document.getElementById('f-platform').value,
      penanggungJawab: document.getElementById('f-pj').value.trim(),
      status: document.getElementById('f-status').value,
      nota: document.getElementById('f-nota').value.trim(),
    };
    if (!rekod.tajuk || !rekod.tarikhRancang) { showToast('Sila isi Tajuk dan Tarikh.', 'error'); return; }
    dbTambah('jadual', rekod);
    tutupModal();
    renderJadual();
    showToast('Jadual kandungan berjaya ditambah! ✅');
  });
}

window.editJadual = function(id) {
  const r = dbCari('jadual', id);
  if (!r) return;
  bukaModal('Sunting Jadual Kandungan', formJadual(r), () => {
    r.tajuk = document.getElementById('f-tajuk').value.trim();
    r.tarikhRancang = document.getElementById('f-tarikh').value;
    r.platform = document.getElementById('f-platform').value;
    r.penanggungJawab = document.getElementById('f-pj').value.trim();
    r.status = document.getElementById('f-status').value;
    r.nota = document.getElementById('f-nota').value.trim();
    if (!r.tajuk || !r.tarikhRancang) { showToast('Sila isi Tajuk dan Tarikh.', 'error'); return; }
    dbKemaskini('jadual', r);
    tutupModal();
    renderJadual();
    showToast('Rekod berjaya dikemaskini! ✅');
  });
};

window.padamJadual = function(id) {
  if (!confirm('Padam rekod ini?')) return;
  dbPadam('jadual', id);
  renderJadual();
  if (!document.getElementById('view-senarai').classList.contains('hidden')) renderSenaraiJadual();
  showToast('Rekod berjaya dipadam.');
};

window.tandakanTerbit = function(id) {
  const r = dbCari('jadual', id);
  if (!r) return;
  r.status = 'Diterbitkan';
  dbKemaskini('jadual', r);
  renderJadual();
  renderSenaraiJadual();
  showToast('Kandungan ditanda sebagai Diterbitkan! ✅');
};

// ============================================================
// MODUL 4: TRACKER PERMOHONAN (KANBAN)
// ============================================================

const STATUS_URUTAN = ['Diterima', 'DalamKerja', 'MenungguSemakan', 'Selesai'];

function renderPermohonan() {
  const senarai = dbGet('permohonan') || [];
  const jenis   = document.getElementById('filter-permohonan-jenis').value;
  const bulanVal= document.getElementById('filter-permohonan-bulan').value;

  let filtered = senarai.slice();
  if (jenis) filtered = filtered.filter(r => r.jenisKhidmat === jenis);
  if (bulanVal) {
    const [y, m] = bulanVal.split('-').map(Number);
    filtered = filtered.filter(r => {
      const d = new Date(r.tarikhPermohonan);
      return d.getFullYear() === y && d.getMonth() + 1 === m;
    });
  }

  // Populate bulan filter
  const senaraiTarikh = [...new Set(senarai.map(r => r.tarikhPermohonan.slice(0, 7)))].sort().reverse();
  const selBulan = document.getElementById('filter-permohonan-bulan');
  const curVal   = selBulan.value;
  selBulan.innerHTML = '<option value="">Semua Bulan</option>' +
    senaraiTarikh.map(t => {
      const [y, m] = t.split('-');
      return `<option value="${t}" ${t === curVal ? 'selected' : ''}>${BULAN_MY[+m-1]} ${y}</option>`;
    }).join('');

  STATUS_URUTAN.forEach(status => {
    const kad = filtered.filter(r => r.status === status);
    const container = document.getElementById('kanban-' + status);
    const count     = document.getElementById('count-' + status);
    if (!container) return;
    count.textContent = kad.length;
    if (!kad.length) {
      container.innerHTML = '<div class="text-muted" style="padding:12px;font-size:0.8rem;text-align:center">Tiada permohonan</div>';
      return;
    }
    container.innerHTML = kad.map(r => {
      const nextStatus = STATUS_URUTAN[STATUS_URUTAN.indexOf(r.status) + 1];
      return `<div class="kanban-card jenis-${r.jenisKhidmat}">
        <div class="kanban-card-title">${r.tajukProgram}</div>
        <div class="kanban-card-meta">
          <span>${r.noRujukan}</span>
          <span class="badge badge-kelabu">${r.jenisKhidmat}</span>
        </div>
        <div class="kanban-card-meta">👤 ${r.namaPemohon}</div>
        <div class="kanban-card-meta">🏛️ ${r.jabatan}</div>
        <div class="kanban-card-meta">📅 Program: ${formatTarikh(r.tarikhProgram)}</div>
        <div class="kanban-card-footer">
          ${deadlineLabel(r.tarikhDeadline)}
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            ${nextStatus ? `<button class="btn btn-hijau btn-sm" onclick="gerakPermohonan(${r.id})">→ Seterusnya</button>` : ''}
            <button class="btn btn-outline btn-sm" onclick="editPermohonan(${r.id})">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="padamPermohonan(${r.id})">🗑️</button>
          </div>
        </div>
      </div>`;
    }).join('');
  });
}

function initPermohonan() {
  document.getElementById('btn-tambah-permohonan').addEventListener('click', () => tambahPermohonan());
  document.getElementById('filter-permohonan-jenis').addEventListener('change', renderPermohonan);
  document.getElementById('filter-permohonan-bulan').addEventListener('change', renderPermohonan);
}

function formPermohonan(r) {
  r = r || {};
  const today = new Date().toISOString().slice(0, 10);
  return `
    <div class="form-row">
      <div class="form-group"><label>Nama Pemohon *</label>
        <input type="text" id="f-pemohon" value="${r.namaPemohon||''}"></div>
      <div class="form-group"><label>Jabatan</label>
        <input type="text" id="f-jabatan" value="${r.jabatan||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Jenis Khidmat *</label>
        <select id="f-jenis">
          ${['Poster','Fotografi','Video','Liputan'].map(j=>`<option ${r.jenisKhidmat===j?'selected':''}>${j}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Status</label>
        <select id="f-status">
          ${STATUS_URUTAN.map(s=>`<option value="${s}" ${r.status===s?'selected':''}>${s==='DalamKerja'?'Dalam Kerja':s==='MenungguSemakan'?'Menunggu Semakan':s}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-group"><label>Tajuk Program *</label>
      <input type="text" id="f-tajuk" value="${r.tajukProgram||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Tarikh Program</label>
        <input type="date" id="f-tarikh-prog" value="${r.tarikhProgram||''}"></div>
      <div class="form-group"><label>Tarikh Deadline</label>
        <input type="date" id="f-deadline" value="${r.tarikhDeadline||''}"></div>
    </div>
    <div class="form-group"><label>Staf Ditugaskan</label>
      <input type="text" id="f-staf" value="${r.stafDitugaskan||''}"></div>
    <div class="form-group"><label>Nota</label>
      <textarea id="f-nota">${r.nota||''}</textarea></div>`;
}

function tambahPermohonan() {
  const senarai = dbGet('permohonan') || [];
  const noRujukan = 'UKK-' + new Date().getFullYear() + '-' + String(senarai.length + 1).padStart(3, '0');
  bukaModal('Permohonan Baru', formPermohonan(), () => {
    const rekod = {
      noRujukan,
      namaPemohon: document.getElementById('f-pemohon').value.trim(),
      jabatan: document.getElementById('f-jabatan').value.trim(),
      jenisKhidmat: document.getElementById('f-jenis').value,
      status: document.getElementById('f-status').value,
      tajukProgram: document.getElementById('f-tajuk').value.trim(),
      tarikhProgram: document.getElementById('f-tarikh-prog').value,
      tarikhDeadline: document.getElementById('f-deadline').value,
      tarikhPermohonan: new Date().toISOString().slice(0, 10),
      stafDitugaskan: document.getElementById('f-staf').value.trim(),
      nota: document.getElementById('f-nota').value.trim(),
    };
    if (!rekod.namaPemohon || !rekod.tajukProgram) { showToast('Sila isi Nama Pemohon dan Tajuk Program.', 'error'); return; }
    dbTambah('permohonan', rekod);
    tutupModal();
    renderPermohonan();
    renderUtama();
    showToast('Permohonan baru berjaya ditambah! ✅');
  });
}

window.gerakPermohonan = function(id) {
  const r = dbCari('permohonan', id);
  if (!r) return;
  const idx = STATUS_URUTAN.indexOf(r.status);
  if (idx < STATUS_URUTAN.length - 1) {
    r.status = STATUS_URUTAN[idx + 1];
    dbKemaskini('permohonan', r);
    renderPermohonan();
    renderUtama();
    showToast('Status permohonan dikemaskini! ✅');
  }
};

window.editPermohonan = function(id) {
  const r = dbCari('permohonan', id);
  if (!r) return;
  bukaModal('Sunting Permohonan', formPermohonan(r), () => {
    r.namaPemohon     = document.getElementById('f-pemohon').value.trim();
    r.jabatan         = document.getElementById('f-jabatan').value.trim();
    r.jenisKhidmat    = document.getElementById('f-jenis').value;
    r.status          = document.getElementById('f-status').value;
    r.tajukProgram    = document.getElementById('f-tajuk').value.trim();
    r.tarikhProgram   = document.getElementById('f-tarikh-prog').value;
    r.tarikhDeadline  = document.getElementById('f-deadline').value;
    r.stafDitugaskan  = document.getElementById('f-staf').value.trim();
    r.nota            = document.getElementById('f-nota').value.trim();
    dbKemaskini('permohonan', r);
    tutupModal();
    renderPermohonan();
    renderUtama();
    showToast('Permohonan berjaya dikemaskini! ✅');
  });
};

window.padamPermohonan = function(id) {
  if (!confirm('Padam permohonan ini?')) return;
  dbPadam('permohonan', id);
  renderPermohonan();
  renderUtama();
  showToast('Permohonan berjaya dipadam.');
};

// ============================================================
// MODUL 5: STATUS PROGRAM UKK
// ============================================================

function renderProgram() {
  const senarai  = dbGet('program') || [];
  const status   = document.getElementById('filter-program-status').value;
  const peringkat= document.getElementById('filter-program-peringkat').value;

  let filtered = senarai.slice();
  if (status)    filtered = filtered.filter(r => r.status === status);
  if (peringkat) filtered = filtered.filter(r => r.peringkat === peringkat);
  filtered.sort((a, b) => new Date(a.tarikh) - new Date(b.tarikh));

  // Ringkasan statistik
  const jumlah   = senarai.length;
  const selesai  = senarai.filter(r => r.status === 'Selesai').length;
  const aktif    = senarai.filter(r => r.status === 'SedangBerjalan').length;
  const tPeserta = senarai.reduce((s, r) => s + (r.pesertaSebenar || 0), 0);
  const strip    = document.getElementById('program-ringkasan');
  if (strip) {
    strip.innerHTML = `
      <div class="stat-pill"><span class="stat-pill-val">${jumlah}</span><span class="stat-pill-label">Jumlah Program</span></div>
      <div class="stat-pill"><span class="stat-pill-val text-hijau">${selesai}</span><span class="stat-pill-label">Selesai</span></div>
      <div class="stat-pill"><span class="stat-pill-val text-oren">${aktif}</span><span class="stat-pill-label">Sedang Berjalan</span></div>
      <div class="stat-pill"><span class="stat-pill-val text-navy">${jumlah - selesai - aktif}</span><span class="stat-pill-label">Akan Datang</span></div>
      <div class="stat-pill"><span class="stat-pill-val">${tPeserta.toLocaleString()}</span><span class="stat-pill-label">Jumlah Peserta</span></div>`;
  }

  const tbody = document.getElementById('tbody-program');
  if (!tbody) return;
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="empty-state">Tiada program dijumpai.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const pctHadir = r.sasaranPeserta > 0 && r.pesertaSebenar > 0
      ? Math.round((r.pesertaSebenar / r.sasaranPeserta) * 100) + '%' : '—';
    const rowCls = r.status === 'Selesai' ? 'row-hijau' : r.status === 'SedangBerjalan' ? 'row-oren' : 'row-navy';
    return `<tr class="${rowCls}">
      <td><strong>${r.namaProgram}</strong></td>
      <td>${formatTarikh(r.tarikh)}</td>
      <td>${r.lokasi}</td>
      <td>${peringkatBadge(r.peringkat)}</td>
      <td style="text-align:center">${r.sasaranPeserta}</td>
      <td style="text-align:center">${r.pesertaSebenar || '—'}</td>
      <td style="text-align:center">${pctHadir}</td>
      <td>${statusBadgeProgram(r.status)}</td>
      <td class="td-actions">
        <button class="btn btn-outline btn-sm" onclick="editProgram(${r.id})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="padamProgram(${r.id})">🗑️</button>
      </td>
    </tr>`;
  }).join('');
}

function initProgram() {
  document.getElementById('btn-tambah-program').addEventListener('click', () => tambahProgram());
  document.getElementById('filter-program-status').addEventListener('change', renderProgram);
  document.getElementById('filter-program-peringkat').addEventListener('change', renderProgram);
}

function formProgram(r) {
  r = r || {};
  return `
    <div class="form-group"><label>Nama Program *</label>
      <input type="text" id="f-nama" value="${r.namaProgram||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Tarikh *</label>
        <input type="date" id="f-tarikh" value="${r.tarikh||''}"></div>
      <div class="form-group"><label>Masa</label>
        <input type="time" id="f-masa" value="${r.masa||''}"></div>
    </div>
    <div class="form-group"><label>Lokasi</label>
      <input type="text" id="f-lokasi" value="${r.lokasi||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Peringkat</label>
        <select id="f-peringkat">
          ${['Antarabangsa','Kebangsaan','Komuniti','Institusi'].map(p=>`<option ${r.peringkat===p?'selected':''}>${p}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Status</label>
        <select id="f-status">
          <option value="AkanDatang" ${r.status==='AkanDatang'?'selected':''}>Akan Datang</option>
          <option value="SedangBerjalan" ${r.status==='SedangBerjalan'?'selected':''}>Sedang Berjalan</option>
          <option value="Selesai" ${r.status==='Selesai'?'selected':''}>Selesai</option>
        </select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Sasaran Peserta</label>
        <input type="number" id="f-sasaran" value="${r.sasaranPeserta||''}"></div>
      <div class="form-group"><label>Peserta Sebenar</label>
        <input type="number" id="f-sebenar" value="${r.pesertaSebenar||''}"></div>
    </div>
    <div class="form-group"><label>Staf Terlibat</label>
      <input type="text" id="f-staf" value="${r.stafTerlibat||''}"></div>`;
}

function tambahProgram() {
  bukaModal('Tambah Program Baharu', formProgram(), () => {
    const rekod = {
      namaProgram: document.getElementById('f-nama').value.trim(),
      tarikh: document.getElementById('f-tarikh').value,
      masa: document.getElementById('f-masa').value,
      lokasi: document.getElementById('f-lokasi').value.trim(),
      peringkat: document.getElementById('f-peringkat').value,
      status: document.getElementById('f-status').value,
      sasaranPeserta: parseInt(document.getElementById('f-sasaran').value) || 0,
      pesertaSebenar: parseInt(document.getElementById('f-sebenar').value) || 0,
      stafTerlibat: document.getElementById('f-staf').value.trim(),
      dokumentasi: '',
    };
    if (!rekod.namaProgram || !rekod.tarikh) { showToast('Sila isi Nama Program dan Tarikh.', 'error'); return; }
    dbTambah('program', rekod);
    tutupModal();
    renderProgram();
    renderUtama();
    showToast('Program berjaya ditambah! ✅');
  });
}

window.editProgram = function(id) {
  const r = dbCari('program', id);
  if (!r) return;
  bukaModal('Sunting Program', formProgram(r), () => {
    r.namaProgram    = document.getElementById('f-nama').value.trim();
    r.tarikh         = document.getElementById('f-tarikh').value;
    r.masa           = document.getElementById('f-masa').value;
    r.lokasi         = document.getElementById('f-lokasi').value.trim();
    r.peringkat      = document.getElementById('f-peringkat').value;
    r.status         = document.getElementById('f-status').value;
    r.sasaranPeserta = parseInt(document.getElementById('f-sasaran').value) || 0;
    r.pesertaSebenar = parseInt(document.getElementById('f-sebenar').value) || 0;
    r.stafTerlibat   = document.getElementById('f-staf').value.trim();
    dbKemaskini('program', r);
    tutupModal();
    renderProgram();
    renderUtama();
    showToast('Program berjaya dikemaskini! ✅');
  });
};

window.padamProgram = function(id) {
  if (!confirm('Padam program ini?')) return;
  dbPadam('program', id);
  renderProgram();
  renderUtama();
  showToast('Program berjaya dipadam.');
};

// ============================================================
// MODUL 6: KEJAYAAN & SUCCESS STORY
// ============================================================

function renderKejayaan() {
  const senarai   = dbGet('story') || [];
  const kategori  = document.getElementById('filter-kejayaan-kategori').value;
  const peringkat = document.getElementById('filter-kejayaan-peringkat').value;
  const hebahan   = document.getElementById('filter-kejayaan-hebahan').value;

  let filtered = senarai.slice();
  if (kategori)  filtered = filtered.filter(r => r.kategori === kategori);
  if (peringkat) filtered = filtered.filter(r => r.peringkat === peringkat);
  if (hebahan)   filtered = filtered.filter(r => r.statusHebahan === hebahan);
  filtered.sort((a, b) => new Date(b.tarikhPencapaian) - new Date(a.tarikhPencapaian));

  // Ringkasan peringkat
  const strip = document.getElementById('kejayaan-ringkasan');
  if (strip) {
    const peringkatList = ['Antarabangsa','Kebangsaan','Komuniti','Institusi'];
    const icons = { Antarabangsa:'🌍', Kebangsaan:'🇲🇾', Komuniti:'🏘️', Institusi:'🏫' };
    strip.innerHTML = peringkatList.map(p => {
      const bil = senarai.filter(r => r.peringkat === p).length;
      return `<div class="peringkat-pill peringkat-pill-${p.toLowerCase()}">
        <span class="peringkat-pill-val">${bil}</span>
        <span class="peringkat-pill-label">${icons[p]} ${p}</span>
      </div>`;
    }).join('');
  }

  const grid = document.getElementById('kejayaan-grid');
  if (!grid) return;
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">Tiada rekod kejayaan dijumpai.</div>';
    return;
  }

  grid.innerHTML = filtered.map(r => `
    <div class="kejayaan-card peringkat-${r.peringkat}">
      <div class="kejayaan-card-header">
        <div>
          <div class="kejayaan-nama">${r.nama}</div>
          <div style="font-size:0.75rem;color:var(--muted)">${r.jabatan}</div>
        </div>
        <span class="badge badge-kelabu">${r.kategori}</span>
      </div>
      <div class="kejayaan-pencapaian">${r.tajukPencapaian}</div>
      <div class="kejayaan-meta">
        ${peringkatBadge(r.peringkat)}
        <span class="text-muted" style="font-size:0.75rem">${formatTarikh(r.tarikhPencapaian)}</span>
      </div>
      <div class="kejayaan-meta">
        <span style="font-size:0.78rem;color:var(--muted)">📌 ${r.pertandingan}</span>
      </div>
      <div class="kejayaan-card-footer">
        <span class="anugerah-label">${anugerahIcon(r.anugerah)} ${r.anugerah||'—'}</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          ${r.statusHebahan === 'Belum'
            ? `<button class="btn btn-hijau btn-sm" onclick="tandakanWarwar(${r.id})">📢 War-warkan</button>`
            : '<span class="badge badge-hijau">✅ Diwar-warkan</span>'}
          <button class="btn btn-outline btn-sm" onclick="editKejayaan(${r.id})">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="padamKejayaan(${r.id})">🗑️</button>
        </div>
      </div>
    </div>`).join('');
}

function initKejayaan() {
  document.getElementById('btn-tambah-kejayaan').addEventListener('click', () => tambahKejayaan());
  document.getElementById('filter-kejayaan-kategori').addEventListener('change', renderKejayaan);
  document.getElementById('filter-kejayaan-peringkat').addEventListener('change', renderKejayaan);
  document.getElementById('filter-kejayaan-hebahan').addEventListener('change', renderKejayaan);
}

function formKejayaan(r) {
  r = r || {};
  return `
    <div class="form-row">
      <div class="form-group"><label>Nama *</label>
        <input type="text" id="f-nama" value="${r.nama||''}"></div>
      <div class="form-group"><label>Kategori</label>
        <select id="f-kategori">
          <option ${r.kategori==='Pelajar'?'selected':''}>Pelajar</option>
          <option ${r.kategori==='Pensyarah'?'selected':''}>Pensyarah</option>
        </select></div>
    </div>
    <div class="form-group"><label>Tajuk Pencapaian *</label>
      <textarea id="f-tajuk">${r.tajukPencapaian||''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label>Peringkat</label>
        <select id="f-peringkat">
          ${['Antarabangsa','Kebangsaan','Komuniti','Institusi'].map(p=>`<option ${r.peringkat===p?'selected':''}>${p}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Anugerah</label>
        <select id="f-anugerah">
          ${['Emas','Perak','Gangsa','Sijil','Lain-lain'].map(a=>`<option ${r.anugerah===a?'selected':''}>${a}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-group"><label>Pertandingan / Program</label>
      <input type="text" id="f-pertandingan" value="${r.pertandingan||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Anjuran</label>
        <input type="text" id="f-anjuran" value="${r.anjuran||''}"></div>
      <div class="form-group"><label>Tarikh Pencapaian</label>
        <input type="date" id="f-tarikh" value="${r.tarikhPencapaian||''}"></div>
    </div>
    <div class="form-group"><label>Jabatan / Program Pengajian</label>
      <input type="text" id="f-jabatan" value="${r.jabatan||''}"></div>
    <div class="form-group"><label>Status Hebahan</label>
      <select id="f-hebahan">
        <option value="Belum" ${r.statusHebahan==='Belum'?'selected':''}>Belum Diwar-warkan</option>
        <option value="Ya" ${r.statusHebahan==='Ya'?'selected':''}>Sudah Diwar-warkan</option>
      </select></div>`;
}

function tambahKejayaan() {
  bukaModal('Tambah Kejayaan Baharu', formKejayaan(), () => {
    const rekod = {
      nama: document.getElementById('f-nama').value.trim(),
      kategori: document.getElementById('f-kategori').value,
      tajukPencapaian: document.getElementById('f-tajuk').value.trim(),
      peringkat: document.getElementById('f-peringkat').value,
      anugerah: document.getElementById('f-anugerah').value,
      pertandingan: document.getElementById('f-pertandingan').value.trim(),
      anjuran: document.getElementById('f-anjuran').value.trim(),
      tarikhPencapaian: document.getElementById('f-tarikh').value,
      jabatan: document.getElementById('f-jabatan').value.trim(),
      statusHebahan: document.getElementById('f-hebahan').value,
      dokumentasi: '',
    };
    if (!rekod.nama || !rekod.tajukPencapaian) { showToast('Sila isi Nama dan Tajuk Pencapaian.', 'error'); return; }
    dbTambah('story', rekod);
    tutupModal();
    renderKejayaan();
    renderUtama();
    showToast('Kejayaan berjaya ditambah! 🏆');
  });
}

window.tandakanWarwar = function(id) {
  const r = dbCari('story', id);
  if (!r) return;
  r.statusHebahan = 'Ya';
  dbKemaskini('story', r);
  renderKejayaan();
  renderUtama();
  showToast('Kejayaan ditanda sebagai Sudah Diwar-warkan! 📢');
};

window.editKejayaan = function(id) {
  const r = dbCari('story', id);
  if (!r) return;
  bukaModal('Sunting Rekod Kejayaan', formKejayaan(r), () => {
    r.nama             = document.getElementById('f-nama').value.trim();
    r.kategori         = document.getElementById('f-kategori').value;
    r.tajukPencapaian  = document.getElementById('f-tajuk').value.trim();
    r.peringkat        = document.getElementById('f-peringkat').value;
    r.anugerah         = document.getElementById('f-anugerah').value;
    r.pertandingan     = document.getElementById('f-pertandingan').value.trim();
    r.anjuran          = document.getElementById('f-anjuran').value.trim();
    r.tarikhPencapaian = document.getElementById('f-tarikh').value;
    r.jabatan          = document.getElementById('f-jabatan').value.trim();
    r.statusHebahan    = document.getElementById('f-hebahan').value;
    dbKemaskini('story', r);
    tutupModal();
    renderKejayaan();
    renderUtama();
    showToast('Rekod berjaya dikemaskini! ✅');
  });
};

window.padamKejayaan = function(id) {
  if (!confirm('Padam rekod kejayaan ini?')) return;
  dbPadam('story', id);
  renderKejayaan();
  renderUtama();
  showToast('Rekod berjaya dipadam.');
};

// Export global
window.initTabs       = initTabs;
window.initHeaderDate = initHeaderDate;
window.initModal      = initModal;
window.initHebahan    = initHebahan;
window.initJadual     = initJadual;
window.initPermohonan = initPermohonan;
window.initProgram    = initProgram;
window.initKejayaan   = initKejayaan;
window.showToast      = showToast;
window.renderUtama    = renderUtama;
window.renderByTab    = renderByTab;
