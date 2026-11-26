# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/AryFlows/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/AryFlows/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Frost Stats — situs statistik nasional Indonesia yang statis dan cepat: penduduk, ekonomi, harga dan inflasi, ketenagakerjaan, kemiskinan dan kesejahteraan, perdagangan luar negeri, serta perbandingan 38 provinsi. Semua angka berasal dari BPS, Bank Dunia, dan Bank Indonesia (2019–2024) dan tercantum sumber serta tahunnya di setiap bagian. Grafik digambar sendiri dengan Canvas — tanpa pustaka, tanpa permintaan jaringan, tanpa font dari luar.

## Run it

```sh
python3 -m http.server 8080 --directory app
```

Lalu buka http://localhost:8080/ di peramban desktop atau ponsel.

Untuk membangun dossier penyerahan:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Struktur

- `app/index.html` — satu halaman dengan semua bagian, dijangkau lewat navigasi
- `app/data.js` — modul data statistik Indonesia (BPS / Bank Dunia, 2019–2024)
- `app/views.js` — grafik kanvas (batang, garis, donat), kartu angka, tabel provinsi
- `app/main.js` — interaksi: tab indikator, pemilih tahun, cari dan urutkan provinsi
- `app/style.css` — gaya situs (responsif, tanpa aset luar)
- `screenshots/` — tangkapan layar asli situs ini
- `main.ts` — program penyerahan: menyalin app/ dan screenshots/ ke /output dan menulis dossier.json

## Data

Semua angka berasal dari publikasi resmi: BPS (Statistik Indonesia 2025, Berita Resmi Statistik, Susenas, Sakernas, Proyeksi Penduduk), Bank Dunia (World Development Indicators), dan Bank Indonesia (sasaran inflasi). Tahun rujukan setiap angka tercantum di halaman dan di `app/data.js`; bagian "Sumber & Metode" di situs menjelaskan pembulatan dan catatan lainnya.

---

<sub>Entered on [make.fun](https://make.fun/?ref=aryflows&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
