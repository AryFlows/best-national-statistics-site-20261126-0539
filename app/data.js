// Frost Stats — modul data statistik Indonesia.
// Semua angka berasal dari publikasi resmi Badan Pusat Statistik (BPS)
// dan Bank Dunia, tahun 2019-2024. Nilai dibulatkan ke satu desimal
// agar mudah dibaca; sumber dan tahun tercantum di setiap bagian.

export const STAT_META = {
  country: "Indonesia",
  countryCode: "IDN",
  updated: "November 2026",
  currency: "Rupiah (IDR)",
  baseYear: 2024,
  sources: [
    { name: "Badan Pusat Statistik (BPS)", url: "bps.go.id", note: "Statistik Indonesia 2025, Berita Resmi Statistik" },
    { name: "Bank Dunia (World Bank)", url: "data.worldbank.org", note: "World Development Indicators, Indonesia" },
    { name: "Bank Indonesia", url: "bi.go.id", note: "Statistik Ekonomi dan Keuangan Indonesia" }
  ]
};

// Angka kunci terbaru (2024, kecuali dinyatakan lain).
export const KEY_STATS = [
  { id: "population", label: "Penduduk", value: 281.6, unit: "juta jiwa", year: 2024, source: "BPS", delta: "+0,82% / tahun", note: "Hasil proyeksi pertengahan tahun" },
  { id: "gdp", label: "PDB nominal", value: 22139, unit: "triliun Rp", year: 2024, source: "BPS", delta: "+5,03% riil", note: "Harga berlaku, Rp22.139 triliun" },
  { id: "gdpPerCapita", label: "PDB per kapita", value: 4925, unit: "US$ / jiwa", year: 2024, source: "Bank Dunia", delta: "+3,9% dari 2023", note: "Sekitar Rp78,6 juta per jiwa" },
  { id: "inflation", label: "Inflasi (Des, y-on-y)", value: 1.57, unit: "%", year: 2024, source: "BPS", delta: "turun dari 2,61%", note: "Terendah dalam satu dekade" },
  { id: "unemployment", label: "Tingkat pengangguran", value: 4.91, unit: "%", year: 2024, source: "BPS", delta: "turun dari 5,45%", note: "Agustus 2024, 7,47 juta orang" },
  { id: "poverty", label: "Penduduk miskin", value: 8.57, unit: "%", year: 2024, source: "BPS", delta: "turun dari 9,36%", note: "September 2024, 24,06 juta orang" },
  { id: "hdi", label: "Indeks Pembangunan Manusia", value: 75.02, unit: "skor 0-100", year: 2024, source: "BPS", delta: "naik dari 74,39", note: "Kategori tinggi" },
  { id: "exports", label: "Ekspor", value: 264.7, unit: "miliar US$", year: 2024, source: "BPS", delta: "surplus US$31,0 miliar", note: "Impor US$233,7 miliar" },
  { id: "exchange", label: "Nilai tukar rupiah", value: 15800, unit: "Rp / US$", year: 2024, source: "Bank Indonesia", delta: "rata-rata tahunan", note: "Sekitar Rp15.800 per dolar AS" },
  { id: "inflationTarget", label: "Sasaran inflasi BI", value: 2.5, unit: "% ± 1 poin", year: 2024, source: "Bank Indonesia", delta: "inflasi 1,57% di bawah sasaran", note: "Sasaran 2024: 2,5% ± 1%" }
];

// Deret tahunan 2019-2024. Setiap deret: label, satuan, sumber, nilai per tahun.
export const SERIES = {
  population: {
    title: "Jumlah penduduk",
    unit: "juta jiwa",
    source: "BPS — Proyeksi Penduduk & Sensus 2020",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [268.1, 270.2, 272.3, 275.8, 278.7, 281.6]
  },
  gdpGrowth: {
    title: "Pertumbuhan ekonomi (PDB riil)",
    unit: "% per tahun",
    source: "BPS — PDB Triwulanan",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [5.02, -2.07, 3.70, 5.31, 5.05, 5.03]
  },
  inflation: {
    title: "Inflasi tahunan (Desember, y-on-y)",
    unit: "%",
    source: "BPS — Indeks Harga Konsumen",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57]
  },
  unemployment: {
    title: "Tingkat pengangguran terbuka",
    unit: "% angkatan kerja",
    source: "BPS — Sakernas (Agustus)",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [5.28, 7.07, 6.49, 5.86, 5.45, 4.91]
  },
  poverty: {
    title: "Tingkat kemiskinan",
    unit: "% penduduk",
    source: "BPS — Susenas (September)",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [9.22, 10.19, 10.14, 9.57, 9.36, 8.57]
  },
  exports: {
    title: "Ekspor barang",
    unit: "miliar US$",
    source: "BPS — Statistik Ekspor",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [167.7, 163.2, 231.6, 291.9, 258.8, 264.7]
  },
  imports: {
    title: "Impor barang",
    unit: "miliar US$",
    source: "BPS — Statistik Impor",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [171.3, 141.6, 196.2, 237.4, 221.9, 233.7]
  }
};

// Struktur PDB menurut lapangan usaha, 2024 (persen terhadap PDB).
export const SECTORS = [
  { name: "Industri pengolahan", share: 18.7 },
  { name: "Perdagangan", share: 13.0 },
  { name: "Pertanian, kehutanan, perikanan", share: 12.5 },
  { name: "Konstruksi", share: 9.9 },
  { name: "Pertambangan dan penggalian", share: 8.4 },
  { name: "Transportasi dan pergudangan", share: 6.0 },
  { name: "Informasi dan komunikasi", share: 4.4 },
  { name: "Jasa keuangan dan asuransi", share: 4.1 },
  { name: "Lapangan usaha lainnya", share: 23.0 }
];

// Struktur umur penduduk 2024 (persen).
export const AGE_GROUPS = [
  { name: "0-14 tahun (anak)", share: 24.2 },
  { name: "15-64 tahun (produktif)", share: 68.6 },
  { name: "65 tahun ke atas (lansia)", share: 7.2 }
];

// Komoditas ekspor utama 2024 (miliar US$, BPS).
export const TOP_EXPORTS = [
  { commodity: "Batu bara", value: 36.4 },
  { commodity: "Minyak sawit (CPO & turunannya)", value: 27.9 },
  { commodity: "Besi dan baja", value: 27.8 },
  { commodity: "Nikel dan barang daripadanya", value: 7.9 },
  { commodity: "Karet dan barang dari karet", value: 6.4 },
  { commodity: "Mesin dan peralatan listrik", value: 6.1 }
];

// 38 provinsi: penduduk 2024 (juta, estimasi BPS, dibulatkan)
// dan luas wilayah (km2, BPS). Kepadatan dihitung dari keduanya.
export const PROVINCES = [
  { name: "Jawa Barat", pop: 49.94, area: 35378 },
  { name: "Jawa Timur", pop: 41.81, area: 47803 },
  { name: "Jawa Tengah", pop: 37.89, area: 32801 },
  { name: "Sumatera Utara", pop: 15.59, area: 72981 },
  { name: "Banten", pop: 12.43, area: 9663 },
  { name: "DKI Jakarta", pop: 10.68, area: 664 },
  { name: "Sulawesi Selatan", pop: 9.36, area: 46717 },
  { name: "Lampung", pop: 9.13, area: 34624 },
  { name: "Sumatera Selatan", pop: 8.84, area: 91592 },
  { name: "Riau", pop: 6.69, area: 87024 },
  { name: "Sumatera Barat", pop: 5.76, area: 42013 },
  { name: "Nusa Tenggara Barat", pop: 5.68, area: 18572 },
  { name: "Kalimantan Barat", pop: 5.58, area: 147307 },
  { name: "Nusa Tenggara Timur", pop: 5.57, area: 48718 },
  { name: "Aceh", pop: 5.56, area: 57956 },
  { name: "Bali", pop: 4.36, area: 5780 },
  { name: "Kalimantan Selatan", pop: 4.25, area: 38744 },
  { name: "Kalimantan Timur", pop: 3.97, area: 129066 },
  { name: "DI Yogyakarta", pop: 3.76, area: 3133 },
  { name: "Jambi", pop: 3.68, area: 50058 },
  { name: "Sulawesi Tengah", pop: 3.13, area: 61841 },
  { name: "Kalimantan Tengah", pop: 2.81, area: 153564 },
  { name: "Sulawesi Tenggara", pop: 2.79, area: 38068 },
  { name: "Sulawesi Utara", pop: 2.74, area: 13892 },
  { name: "Kepulauan Riau", pop: 2.21, area: 8202 },
  { name: "Bengkulu", pop: 2.12, area: 19919 },
  { name: "Maluku", pop: 2.02, area: 46914 },
  { name: "Sulawesi Barat", pop: 1.55, area: 16787 },
  { name: "Kep. Bangka Belitung", pop: 1.50, area: 16424 },
  { name: "Papua Pegunungan", pop: 1.47, area: 51213 },
  { name: "Maluku Utara", pop: 1.41, area: 31982 },
  { name: "Papua Tengah", pop: 1.35, area: 61073 },
  { name: "Gorontalo", pop: 1.26, area: 11257 },
  { name: "Papua", pop: 1.06, area: 82680 },
  { name: "Kalimantan Utara", pop: 0.75, area: 75467 },
  { name: "Papua Barat Daya", pop: 0.63, area: 38167 },
  { name: "Papua Barat", pop: 0.62, area: 60275 },
  { name: "Papua Selatan", pop: 0.52, area: 127280 }
];

export function totalPopulation() {
  return PROVINCES.reduce((sum, p) => sum + p.pop, 0);
}

export function provinceDensity(p) {
  return Math.round((p.pop * 1000000) / p.area);
}

export function formatNumber(n, decimals = 1) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
