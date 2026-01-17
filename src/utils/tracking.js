// src/utils/tracking.js
// Utilitaires de tracking pour Google Analytics 4 et Meta Pixel

// IDs de tracking - A CONFIGURER
const GA4_ID = import.meta.env.VITE_GA4_ID || null;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || null;

/**
 * Initialise Google Analytics 4
 * Ajoute le script gtag.js et configure le tracking
 */
export function initGA4() {
  if (!GA4_ID || typeof window === 'undefined') return;

  // Ajouter le script gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  // Configurer gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });
}

/**
 * Initialise Meta Pixel (Facebook)
 */
export function initMetaPixel() {
  if (!META_PIXEL_ID || typeof window === 'undefined') return;

  // Code Meta Pixel standard
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

/**
 * Track un evenement personnalise sur GA4
 */
export function trackGA4Event(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Track un evenement personnalise sur Meta Pixel
 */
export function trackMetaEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

/**
 * Track une conversion de lead
 * Appeler quand un formulaire est soumis avec succes
 */
export function trackLeadConversion(leadData = {}) {
  // GA4
  trackGA4Event('generate_lead', {
    currency: 'EUR',
    value: 50, // Valeur estimee d'un lead
    ...leadData
  });

  // Meta Pixel
  trackMetaEvent('Lead', {
    currency: 'EUR',
    value: 50,
    ...leadData
  });
}

/**
 * Track le debut du formulaire
 */
export function trackFormStart() {
  trackGA4Event('form_start', { form_name: 'lead_form' });
  trackMetaEvent('InitiateCheckout');
}

/**
 * Track une etape du formulaire
 */
export function trackFormStep(step) {
  trackGA4Event('form_progress', {
    form_name: 'lead_form',
    step: step
  });
}

/**
 * Initialise tous les trackers
 */
export function initAllTracking() {
  initGA4();
  initMetaPixel();
}
