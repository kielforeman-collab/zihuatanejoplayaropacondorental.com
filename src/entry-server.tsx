import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppShell, ROUTE_META, SITE_URL } from './App';

export { ROUTE_META, SITE_URL };

/**
 * Render one route to its full static HTML string. Used by
 * scripts/prerender.mjs at build time — there is no runtime server.
 *
 * renderToString (not the streaming renderer) so the output is plain HTML
 * with no hidden Suspense segments or swap scripts: the page is complete
 * and readable even with JavaScript disabled, and search engines see the
 * content in the raw HTML. That requires no lazy components in the tree —
 * see the note in App.tsx.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
}
