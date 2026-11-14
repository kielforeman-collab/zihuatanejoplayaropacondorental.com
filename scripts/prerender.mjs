/**
 * Pre-render every route to static HTML.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * Takes the client build's dist/index.html as the template, renders each
 * route with the server bundle, injects the HTML into #root, and rewrites
 * the per-route title/meta/canonical/OG tags from ROUTE_META. Writes
 * dist/index.html plus dist/about/index.html, dist/rates/index.html and
 * dist/contact/index.html — real files Vercel serves directly, so the first
 * paint no longer waits for the JavaScript bundle to download and React to
 * mount (that was the 2s mobile LCP render delay). The client then hydrates
 * the static HTML (see main.tsx) instead of re-rendering from scratch.
 *
 * Usage: node scripts/prerender.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

const { render, ROUTE_META, SITE_URL } = await import(join(root, 'dist-ssr', 'entry-server.js'));

const template = readFileSync(join(dist, 'index.html'), 'utf-8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: template dist/index.html has no empty <div id="root"></div> to inject into');
}

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/about', file: 'about/index.html' },
  { path: '/rates', file: 'rates/index.html' },
  { path: '/contact', file: 'contact/index.html' },
];

function replaceOrThrow(out, pattern, replacement, label) {
  if (!pattern.test(out)) throw new Error(`prerender: could not find ${label} in template`);
  return out.replace(pattern, replacement);
}

for (const { path, file } of routes) {
  const meta = ROUTE_META[path];
  if (!meta) throw new Error(`prerender: no ROUTE_META for ${path}`);
  const url = `${SITE_URL}${path}`;

  const html = await render(path);
  if (html.length < 1000) throw new Error(`prerender: ${path} rendered suspiciously small (${html.length} bytes)`);

  let out = template;
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  out = replaceOrThrow(out, /<title>[^<]*<\/title>/, `<title>${meta.title}</title>`, 'title');
  out = replaceOrThrow(
    out,
    /(<meta name="description" content=")[^"]*(")/,
    `$1${meta.description}$2`,
    'meta description',
  );
  out = replaceOrThrow(out, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical');
  out = replaceOrThrow(out, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url');
  out = replaceOrThrow(out, /(<meta property="og:title" content=")[^"]*(")/, `$1${meta.title}$2`, 'og:title');
  out = replaceOrThrow(
    out,
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${meta.description}$2`,
    'og:description',
  );
  out = replaceOrThrow(out, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${meta.title}$2`, 'twitter:title');
  out = replaceOrThrow(
    out,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${meta.description}$2`,
    'twitter:description',
  );

  const dest = join(dist, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, out);
  console.log(`prerendered ${path} -> ${file} (${(out.length / 1024).toFixed(1)} KiB, root HTML ${(html.length / 1024).toFixed(1)} KiB)`);
}
