/**
 * Optimize images in dist/ after `vite build`.
 *
 * Why this runs at build time instead of committing recompressed files:
 * the GitHub connector used to publish this repo can only push UTF-8 text,
 * not binary files — so the 30 MB of originals stay in the repo untouched
 * and Vercel produces the optimized copies on every deploy.
 *
 * - public/images/*.webp (gallery + hero, up to 4032px / 2.7 MB each):
 *   resized to max 1600px wide, WebP quality 75. Display size is ~1344px
 *   at most, so 1600px covers high-density screens without the 4000px cost.
 * - public/images/*.jpg (restaurant photos): max 1200px wide, JPEG quality 80.
 * - public/mobile/* (single-character CAPTCHA images, ~250 bytes): skipped.
 * - Files already small enough are left alone; output is only written when
 *   it is actually smaller than the input. Extensions are never changed.
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const DIST_IMAGES = new URL('../dist/images', import.meta.url).pathname;

let before = 0;
let after = 0;
let count = 0;

for (const entry of await readdir(DIST_IMAGES)) {
  const file = join(DIST_IMAGES, entry);
  if ((await stat(file)).isDirectory()) continue;

  const isWebp = /\.webp$/i.test(entry);
  const isJpeg = /\.(jpg|jpeg)$/i.test(entry);
  if (!isWebp && !isJpeg) continue;

  const inputBytes = (await stat(file)).size;
  const metadata = await sharp(file).metadata();
  const maxWidth = isWebp ? 1600 : 1200;
  if ((metadata.width ?? 0) <= maxWidth && inputBytes < 300 * 1024) continue;

  const pipeline = sharp(file).resize({
    width: Math.min(metadata.width ?? maxWidth, maxWidth),
    withoutEnlargement: true,
  });
  const out = isWebp
    ? await pipeline.webp({ quality: 75, effort: 4 }).toBuffer()
    : await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  if (out.length < inputBytes) {
    await writeFile(file, out);
    before += inputBytes;
    after += out.length;
    count += 1;
    console.log(`  ${entry}: ${(inputBytes / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(0)} KB`);
  }
}

console.log(
  `image optimization: ${count} files, ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB`,
);
