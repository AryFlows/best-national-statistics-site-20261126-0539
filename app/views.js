// Frost Stats — modul tampilan: grafik kanvas, kartu angka, dan tabel.
// Semua grafik digambar sendiri dengan Canvas 2D, tanpa pustaka luar.

import { formatNumber, provinceDensity, totalPopulation } from "./data.js";

const INK = "#17293d";
const GRID = "#d7dee8";
const ACCENT = "#0e7a6d";
const ACCENT_SOFT = "#7fc4bb";
const WARM = "#d97706";
const RED = "#b3402e";
const BLUE = "#2563a8";
const DONUT_COLORS = ["#0e7a6d", "#2563a8", "#d97706", "#7c4d9e", "#b3402e", "#4d7c0f", "#0891b2", "#be185d", "#64748b"];

function setupCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 640;
  const height = canvas.clientHeight || 280;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

function niceMax(values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min;
  const top = max + span * 0.12;
  const step = Math.pow(10, Math.floor(Math.log10(top)));
  return Math.ceil(top / step) * step;
}

function drawAxes(ctx, width, height, labels, yMax, yMin, unit) {
  const padL = 52;
  const padR = 12;
  const padT = 14;
  const padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  ctx.font = "11px system-ui, sans-serif";
  ctx.fillStyle = "#5b6b7d";
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = yMin + ((yMax - yMin) * i) / 4;
    const y = padT + plotH - (plotH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(width - padR, y);
    ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(formatNumber(v, v < 10 ? 1 : 0), padL - 8, y + 4);
  }
  ctx.textAlign = "center";
  labels.forEach((label, i) => {
    const x = padL + (plotW * (i + 0.5)) / labels.length;
    ctx.fillText(String(label), x, height - 10);
  });
  ctx.textAlign = "left";
  ctx.fillStyle = "#8a99ab";
  // Satuan di kanan atas agar tidak bertabrakan dengan label sumbu-y.
  ctx.textAlign = "right";
  ctx.fillText(unit, width - padR, 12);
  return { padL, padR, padT, padB, plotW, plotH };
}

// Grafik batang untuk satu deret tahunan.
export function drawBarChart(canvas, series, color = ACCENT) {
  const { ctx, width, height } = setupCanvas(canvas);
  const min = Math.min(0, ...series.values);
  const max = niceMax(series.values);
  const area = drawAxes(ctx, width, height, series.years, max, min, series.unit);
  const slot = area.plotW / series.values.length;
  const barW = Math.min(44, slot * 0.62);
  series.values.forEach((value, i) => {
    const x = area.padL + slot * i + (slot - barW) / 2;
    const h = (area.plotH * (value - min)) / (max - min);
    const y = area.padT + area.plotH - h;
    ctx.fillStyle = i === series.values.length - 1 ? WARM : color;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(formatNumber(value, 2), x + barW / 2, y - 6);
  });
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", series.title + " " + series.years.join(", "));
}

// Grafik garis untuk satu deret tahunan.
export function drawLineChart(canvas, series, color = BLUE) {
  const { ctx, width, height } = setupCanvas(canvas);
  const min = Math.min(...series.values);
  const max = Math.max(...series.values);
  const lo = min - (max - min) * 0.25;
  const hi = max + (max - min) * 0.25;
  const area = drawAxes(ctx, width, height, series.years, hi, lo, series.unit);
  const point = (i) => ({
    x: area.padL + (area.plotW * (i + 0.5)) / series.values.length,
    y: area.padT + area.plotH - (area.plotH * (series.values[i] - lo)) / (hi - lo)
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.beginPath();
  series.values.forEach((_, i) => {
    const p = point(i);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.fillStyle = "rgba(37, 99, 168, 0.10)";
  ctx.lineTo(point(series.values.length - 1).x, area.padT + area.plotH);
  ctx.lineTo(point(0).x, area.padT + area.plotH);
  ctx.closePath();
  ctx.fill();
  series.values.forEach((value, i) => {
    const p = point(i);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(formatNumber(value, 2), p.x, p.y - 10);
  });
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", series.title + " " + series.years.join(", "));
}

// Grafik donat untuk komposisi persen.
export function drawDonutChart(canvas, parts, label, sublabel = "persen dari PDB") {
  const { ctx, width, height } = setupCanvas(canvas);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 16;
  const inner = radius * 0.62;
  let angle = -Math.PI / 2;
  parts.forEach((part, i) => {
    const sweep = (part.share / 100) * Math.PI * 2;
    ctx.fillStyle = DONUT_COLORS[i % DONUT_COLORS.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fill();
    // Tulis persen pada irisan yang cukup besar agar terbaca langsung.
    if (part.share >= 8) {
      const mid = angle + sweep / 2;
      const labelR = (radius + inner) / 2;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(formatNumber(part.share, 0) + "%", cx + Math.cos(mid) * labelR, cy + Math.sin(mid) * labelR + 4);
    }
    angle += sweep;
  });
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "bold 15px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, cx, cy - 2);
  ctx.font = "11px system-ui, sans-serif";
  ctx.fillStyle = "#5b6b7d";
  ctx.fillText(sublabel, cx, cy + 16);
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Komposisi " + label);
}

// Legenda donat sebagai daftar HTML.
export function donutLegend(parts) {
  return parts
    .map(
      (part, i) =>
        `<li><span class="swatch" style="background:${DONUT_COLORS[i % DONUT_COLORS.length]}"></span>` +
        `<span class="legend-name">${part.name}</span><strong>${formatNumber(part.share, 1)}%</strong></li>`
    )
    .join("");
}

// Kartu angka kunci di beranda.
export function keyStatCards(stats) {
  return stats
    .map(
      (s) => `<article class="stat-card">
        <p class="stat-label">${s.label} <span class="stat-year">${s.year}</span></p>
        <p class="stat-value">${formatNumber(s.value, s.value >= 1000 ? 0 : 2)} <span class="stat-unit">${s.unit}</span></p>
        <p class="stat-delta">${s.delta}</p>
        <p class="stat-note">${s.note} &middot; Sumber: ${s.source}</p>
      </article>`
    )
    .join("");
}

// Tabel provinsi: bisa diurutkan, bisa dicari.
export function provinceRows(provinces, sortKey, sortDir, query) {
  const total = totalPopulation();
  const q = query.trim().toLowerCase();
  const filtered = provinces.filter((p) => !q || p.name.toLowerCase().includes(q));
  const sorted = [...filtered].sort((a, b) => {
    const va = sortKey === "density" ? provinceDensity(a) : sortKey === "share" ? (a.pop / total) * 100 : a[sortKey];
    const vb = sortKey === "density" ? provinceDensity(b) : sortKey === "share" ? (b.pop / total) * 100 : b[sortKey];
    if (typeof va === "string") return sortDir * va.localeCompare(vb, "id");
    return sortDir * (va - vb);
  });
  return sorted
    .map((p, i) => {
      const share = (p.pop / total) * 100;
      return `<tr>
        <td>${i + 1}</td>
        <td class="cell-name">${p.name}</td>
        <td class="num">${formatNumber(p.pop, 2)}</td>
        <td class="num">${formatNumber(share, 2)}%</td>
        <td class="num">${formatNumber(p.area, 0)}</td>
        <td class="num">${formatNumber(provinceDensity(p), 0)}</td>
      </tr>`;
    })
    .join("");
}

export function provinceCountText(count, total) {
  return `Menampilkan ${count} dari ${total} provinsi &middot; penduduk 2024 (juta jiwa), luas (km&sup2;), kepadatan (jiwa/km&sup2;)`;
}
