#!/usr/bin/env node
// scripts/submit-indexing.js
// Soumet toutes les URLs du site à Google Indexing API via Service Account
// Usage: node scripts/submit-indexing.js

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '..', 'google-credentials.json');
const INDEXING_API = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/indexing';

// Toutes les URLs du site
const URLS = [
  'https://lepanneausolaire.com/',
  'https://lepanneausolaire.com/simulateur',
  'https://lepanneausolaire.com/processus',
  'https://lepanneausolaire.com/realisations',
  'https://lepanneausolaire.com/garanties',
  'https://lepanneausolaire.com/blog',
  // 12 articles existants
  'https://lepanneausolaire.com/blog/combien-coute-installation-panneaux-solaires-2026',
  'https://lepanneausolaire.com/blog/aides-etat-panneaux-solaires-guide-complet',
  'https://lepanneausolaire.com/blog/panneaux-solaires-rentabilite-region-france',
  'https://lepanneausolaire.com/blog/autoconsommation-vs-revente-surplus',
  'https://lepanneausolaire.com/blog/monocristallin-vs-polycristallin',
  'https://lepanneausolaire.com/blog/installation-panneaux-solaires-ile-de-france',
  'https://lepanneausolaire.com/blog/installation-panneaux-solaires-paca',
  'https://lepanneausolaire.com/blog/choisir-installateur-panneaux-solaires-rge',
  'https://lepanneausolaire.com/blog/entretien-panneaux-solaires-guide',
  'https://lepanneausolaire.com/blog/batteries-stockage-solaire-guide',
  'https://lepanneausolaire.com/blog/panneaux-solaires-copropriete-guide',
  'https://lepanneausolaire.com/blog/panneaux-solaires-assurance-garanties-guide',
  // 20 nouveaux articles
  'https://lepanneausolaire.com/blog/prix-panneaux-solaires-2026-par-region',
  'https://lepanneausolaire.com/blog/panneau-solaire-maison-100m2-cout',
  'https://lepanneausolaire.com/blog/meilleur-panneau-solaire-2026-comparatif',
  'https://lepanneausolaire.com/blog/panneau-solaire-edf-obligation-achat-2026',
  'https://lepanneausolaire.com/blog/credit-impot-panneaux-solaires-2026',
  'https://lepanneausolaire.com/blog/panneau-solaire-hiver-rentabilite',
  'https://lepanneausolaire.com/blog/economies-panneaux-solaires-combien',
  'https://lepanneausolaire.com/blog/installation-panneaux-solaires-toiture-plate',
  'https://lepanneausolaire.com/blog/panneau-solaire-balcon-appartement-2026',
  'https://lepanneausolaire.com/blog/kit-solaire-autoconsommation-avis',
  'https://lepanneausolaire.com/blog/panneau-solaire-bifacial-avantages',
  'https://lepanneausolaire.com/blog/combien-panneaux-solaires-maison',
  'https://lepanneausolaire.com/blog/panneaux-solaires-revente-maison-plus-value',
  'https://lepanneausolaire.com/blog/micro-onduleur-vs-onduleur-central',
  'https://lepanneausolaire.com/blog/panneaux-solaires-nouvelle-aquitaine-aides',
  'https://lepanneausolaire.com/blog/panneaux-solaires-occitanie-aides',
  'https://lepanneausolaire.com/blog/panneaux-solaires-auvergne-rhone-alpes-aides',
  'https://lepanneausolaire.com/blog/duree-vie-panneaux-solaires',
  'https://lepanneausolaire.com/blog/panneaux-solaires-temps-pluie',
  'https://lepanneausolaire.com/blog/comment-lire-facture-edf-panneaux-solaires',
  // Pages légales
  'https://lepanneausolaire.com/mentions-legales',
  'https://lepanneausolaire.com/politique-de-confidentialite',
  'https://lepanneausolaire.com/cookies',
];

function base64url(data) {
  return Buffer.from(data).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createJWT(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: credentials.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const signInput = `${headerB64}.${payloadB64}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signInput);
  const signature = sign.sign(credentials.private_key);
  const signatureB64 = base64url(signature);

  return `${signInput}.${signatureB64}`;
}

async function getAccessToken(credentials) {
  const jwt = createJWT(credentials);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token error: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function submitUrl(accessToken, url) {
  const res = await fetch(INDEXING_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    }),
  });
  const data = await res.json();
  return { url, status: res.status, data };
}

async function main() {
  console.log('=== Google Indexing API - Soumission URLs ===\n');

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('Erreur: google-credentials.json introuvable');
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  console.log(`Service Account: ${credentials.client_email}`);
  console.log(`URLs à soumettre: ${URLS.length}\n`);

  // Obtenir le token
  console.log('Obtention du token OAuth2...');
  const accessToken = await getAccessToken(credentials);
  console.log('Token obtenu.\n');

  // Soumettre chaque URL (avec un délai pour éviter le rate limiting)
  let success = 0;
  let errors = 0;

  for (const url of URLS) {
    try {
      const result = await submitUrl(accessToken, url);
      if (result.status === 200) {
        console.log(`✓ ${url}`);
        success++;
      } else {
        console.log(`✗ ${url} — ${result.status}: ${JSON.stringify(result.data)}`);
        errors++;
      }
      // Petit délai pour éviter le rate limiting
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.log(`✗ ${url} — ${err.message}`);
      errors++;
    }
  }

  console.log(`\n=== Résultats ===`);
  console.log(`Succès: ${success}/${URLS.length}`);
  console.log(`Erreurs: ${errors}/${URLS.length}`);
}

main().catch(err => {
  console.error('Erreur fatale:', err.message);
  process.exit(1);
});
