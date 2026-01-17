// src/lib/resend.js
// Client Resend utilisant Cloudflare Functions

/**
 * Envoie l'email de confirmation au prospect via Cloudflare Function
 */
export async function sendConfirmationEmail(leadData) {
  const response = await fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'confirmation',
      leadData: leadData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur envoi email');
  }

  return data;
}

/**
 * Envoie la notification admin via Cloudflare Function
 */
export async function sendAdminNotification(leadData) {
  const response = await fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'admin',
      leadData: leadData,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur envoi notification');
  }

  return data;
}
