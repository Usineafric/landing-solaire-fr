import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Note: Le tracking (GA4, Meta Pixel) est géré par CookieConsent.jsx après consentement utilisateur

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
