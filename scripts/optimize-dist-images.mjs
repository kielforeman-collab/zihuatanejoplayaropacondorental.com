/**
 * Optimize images in dist/ after `vite build`.
 *
 * Why this runs at build time instead of committing recompressed files:
 * the GitHub connector used to publish this repo can only push UTF-8 text,
 * not binary files — so the 30 MB of originals stay in the repo untouched
 * and Vercel produces the optimized copies on every deploy.
 *
 * - public/images/*.webp (gallery + hero, up to 4032px / 2.7 MB each):
 *   resized to max 1600px wide, WebP quality 68, effort 6. Display size is
 *   ~1344px at most, so 1600px covers high-density screens without the
 *   4000px cost. A second 800px-wide copy (`name-800.webp`, quality 65,
 *   effort 6) is emitted for every wide WebP so the hero carousel can serve
 *   phones a smaller file via srcset instead of the 1600px version.
 *   (Was quality 75/72, effort 4 — PageSpeed's image-delivery audit put
 *   372 KiB of further savings on the table, and effort 6 buys back
 *   ~5-10% at the same quality for build time only.)
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
  if (/-800\.webp$/i.test(entry)) continue; // generated variant, not an original

  const inputBytes = (await stat(file)).size;
  const metadata = await sharp(file).metadata();
  const maxWidth = isWebp ? 1600 : 1200;

  // Small variant for phones, generated for EVERY WebP before any skip
  // below: the hero carousel's srcset references it for every slide, and a
  // missing srcset candidate does not fall back to the other one. (Files
  // already <=800px wide are just re-encoded at their own width.)
  if (isWebp) {
    const smallFile = file.replace(/\.webp$/i, '-800.webp');
    const small = await sharp(file)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 65, effort: 6 })
      .toBuffer();
    await writeFile(smallFile, small);
  }

  if ((metadata.width ?? 0) <= maxWidth && inputBytes < 300 * 1024) continue;

  const pipeline = sharp(file).resize({
    width: Math.min(metadata.width ?? maxWidth, maxWidth),
    withoutEnlargement: true,
  });
  const out = isWebp
    ? await pipeline.webp({ quality: 68, effort: 6 }).toBuffer()
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
