import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!

// The build pre-renders each route to static HTML, so on first load the
// root already holds real content: hydrate it instead of re-rendering from
// scratch. If the HTML is empty (e.g. a fallback route served from the
// SPA rewrite), fall back to a normal client render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
