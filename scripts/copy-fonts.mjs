/**
 * Copy the self-hosted font files into public/fonts/ at build time.
 *
 * The woff2 files are binaries, so they cannot live in the repo — the GitHub
 * connector only pushes UTF-8 text, and the Vercel build is the place that
 * turns the versioned @fontsource-variable npm packages into served files.
 * Runs first in `npm run build`, before `vite build` copies public/ to dist/.
 * The filenames are stable on purpose: index.html preloads two of them, and
 * src/styles/fonts.css references all three.
 */
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'fonts');
mkdirSync(outDir, { recursive: true });

const files = [
  // [source in node_modules, served filename]
  ['@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2', 'outfit-variable.woff2'],
  ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2', 'playfair-display-variable.woff2'],
  ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2', 'playfair-display-variable-italic.woff2'],
];

for (const [src, dest] of files) {
  const srcPath = join(root, 'node_modules', ...src.split('/'));
  copyFileSync(srcPath, join(outDir, dest));
  console.log(`font: ${dest} (${(statSync(join(outDir, dest)).size / 1024).toFixed(1)} KiB)`);
}
