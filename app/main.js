// Frost Stats — pengendali utama: merender kartu, grafik, tab indikator,
// pemilih tahun, serta pencarian dan pengurutan tabel provinsi.

import {
  KEY_STATS,
  SERIES,
  SECTORS,
  AGE_GROUPS,
  TOP_EXPORTS,
  PROVINCES,
  formatNumber
} from "./data.js";
import {
  drawBarChart,
  drawLineChart,
  drawDonutChart,
  donutLegend,
  keyStatCards,
  provinceRows,
  provinceCountText
} from "./views.js";

const $ = (id) => document.getElementById(id);

// ---- Beranda: kartu angka kunci -------------------------------------------
$("stat-grid").innerHTML = keyStatCards(KEY_STATS);

// ---- Grafik tren penduduk (batang) ------------------------------------------
drawBarChart($("chart-population"), SERIES.population);

// ---- Grafik garis: pertumbuhan PDB, inflasi, pengangguran, kemiskinan -------
const LINE_SERIES = {
  gdp: SERIES.gdpGrowth,
  inflation: SERIES.inflation,
  unemployment: SERIES.unemployment,
  poverty: SERIES.poverty
};
const LINE_COLORS = { gdp: "#0e7a6d", inflation: "#d97706", unemployment: "#2563a8", poverty: "#b3402e" };
let activeLine = "gdp";

function renderLineChart() {
  const series = LINE_SERIES[activeLine];
  drawLineChart($("chart-line"), series, LINE_COLORS[activeLine]);
  $("line-title").textContent = series.title;
  $("line-source").textContent = "Sumber: " + series.source + " · " + series.years[0] + "-" + series.years[series.years.length - 1];
  document.querySelectorAll("#line-tabs button").forEach((btn) => {
    const on = btn.dataset.series === activeLine;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

document.querySelectorAll("#line-tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    activeLine = btn.dataset.series;
    renderLineChart();
  });
});
renderLineChart();

// ---- Donat komposisi PDB ----------------------------------------------------
drawDonutChart($("chart-sectors"), SECTORS, "PDB 2024");
$("sector-legend").innerHTML = donutLegend(SECTORS);

// ---- Donat struktur umur ----------------------------------------------------
drawDonutChart($("chart-age"), AGE_GROUPS, "Penduduk", "persen penduduk");
$("age-legend").innerHTML = donutLegend(AGE_GROUPS);

// ---- Pemilih tahun: angka tahun berjalan ------------------------------------
const yearSelect = $("year-select");
const yearOutput = $("year-output");

function yearFigures(year) {
  const i = SERIES.population.years.indexOf(year);
  if (i < 0) return null;
  return {
    population: SERIES.population.values[i],
    gdpGrowth: SERIES.gdpGrowth.values[i],
    inflation: SERIES.inflation.values[i],
    unemployment: SERIES.unemployment.values[i],
    poverty: SERIES.poverty.values[i],
    exports: SERIES.exports.values[i],
    imports: SERIES.imports.values[i]
  };
}

function renderYear(year) {
  const f = yearFigures(year);
  if (!f) return;
  const tradeBalance = f.exports - f.imports;
  yearOutput.innerHTML = `
    <div class="year-row"><span>Penduduk</span><strong>${formatNumber(f.population, 1)} juta jiwa</strong></div>
    <div class="year-row"><span>Pertumbuhan PDB</span><strong>${formatNumber(f.gdpGrowth, 2)}%</strong></div>
    <div class="year-row"><span>Inflasi (Des, y-on-y)</span><strong>${formatNumber(f.inflation, 2)}%</strong></div>
    <div class="year-row"><span>Pengangguran terbuka</span><strong>${formatNumber(f.unemployment, 2)}%</strong></div>
    <div class="year-row"><span>Tingkat kemiskinan</span><strong>${formatNumber(f.poverty, 2)}%</strong></div>
    <div class="year-row"><span>Ekspor</span><strong>US$${formatNumber(f.exports, 1)} miliar</strong></div>
    <div class="year-row"><span>Impor</span><strong>US$${formatNumber(f.imports, 1)} miliar</strong></div>
    <div class="year-row total"><span>Neraca perdagangan</span><strong>${tradeBalance >= 0 ? "Surplus" : "Defisit"} US$${formatNumber(Math.abs(tradeBalance), 1)} miliar</strong></div>
    <p class="fine">Sumber: BPS, ${year}. Pilih tahun lain untuk membandingkan.</p>`;
}

yearSelect.addEventListener("change", () => renderYear(Number(yearSelect.value)));
renderYear(2024);

// ---- Perdagangan: batang ekspor vs impor ------------------------------------
drawBarChart($("chart-exports"), SERIES.exports, "#0e7a6d");
drawBarChart($("chart-imports"), SERIES.imports, "#2563a8");

$("export-list").innerHTML = TOP_EXPORTS.map(
  (e) => `<li><span>${e.commodity}</span><strong>US$${formatNumber(e.value, 1)} miliar</strong></li>`
).join("");

// ---- Tabel provinsi: cari + urutkan -----------------------------------------
let sortKey = "pop";
let sortDir = -1;

function renderProvinces() {
  const query = $("province-search").value;
  const rows = provinceRows(PROVINCES, sortKey, sortDir, query);
  $("province-body").innerHTML = rows;
  const shown = $("province-body").children.length;
  $("province-count").innerHTML = provinceCountText(shown, PROVINCES.length);
  document.querySelectorAll("#province-table th[data-sort]").forEach((th) => {
    const on = th.dataset.sort === sortKey;
    th.classList.toggle("sorted", on);
    th.setAttribute("aria-sort", on ? (sortDir === 1 ? "ascending" : "descending") : "none");
    th.querySelector(".arrow").textContent = on ? (sortDir === 1 ? " ▲" : " ▼") : "";
  });
}

$("province-search").addEventListener("input", renderProvinces);
document.querySelectorAll("#province-table th[data-sort]").forEach((th) => {
  const activate = () => {
    const key = th.dataset.sort;
    if (key === sortKey) sortDir = -sortDir;
    else {
      sortKey = key;
      sortDir = key === "name" ? 1 : -1;
    }
    renderProvinces();
  };
  th.addEventListener("click", activate);
  // Judul kolom bisa diaktifkan dengan keyboard (Enter atau Spasi).
  th.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});
renderProvinces();

// ---- Tahun berjalan di kaki halaman -----------------------------------------
$("footer-year").textContent = String(new Date().getFullYear());
