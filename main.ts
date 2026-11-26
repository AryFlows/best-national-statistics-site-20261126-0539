// Frost Stats — program penyerahan (main.ts, Node 22, pustaka standar saja).
//
// Tugasnya: menyalin app/ dan screenshots/ dari repositori ini ke direktori
// keluaran, lalu menulis dossier.json di sana dengan buildDossier dari
// vendor/makefun-frontend.ts. Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan
// /output. Program harus menulis byte yang sama pada dua kali jalan.

import { buildDossier } from "./vendor/makefun-frontend.ts";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Kosongkan isi direktori keluaran tanpa menghapus direktorinya sendiri:
// di grader, /output adalah volume yang dipasang dan tidak boleh dihapus.
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

// Salin situs dan tangkapan layarnya.
for (const name of ["app", "screenshots"]) {
  const source = join(repoRoot, name);
  if (!existsSync(source)) {
    throw new Error(`missing ${name}/ in repository at ${repoRoot}`);
  }
  cpSync(source, join(outDir, name), { recursive: true });
}

// Bangun dossier dari app/ dan screenshots/ di repositori.
const dossier = await buildDossier(repoRoot, { text_max_bytes: 163840 });
const dossierPath = join(outDir, "dossier.json");
if (dossier instanceof Uint8Array) {
  writeFileSync(dossierPath, dossier);
} else {
  writeFileSync(dossierPath, String(dossier), "utf8");
}

// Periksa hasil: dossier harus ada dan tidak kosong, dan kedua direktori
// yang disalin harus berisi berkas.
const dossierBytes = statSync(dossierPath).size;
if (dossierBytes === 0) throw new Error("dossier.json is empty");
const appCount = readdirSync(join(outDir, "app")).length;
const shotCount = readdirSync(join(outDir, "screenshots")).length;
if (appCount === 0 || shotCount === 0) throw new Error("output is missing app/ or screenshots/ files");

console.log(`wrote ${outDir}/app (${appCount} entries), ${outDir}/screenshots (${shotCount} files), ${outDir}/dossier.json (${dossierBytes} bytes)`);
