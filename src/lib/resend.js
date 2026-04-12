// src/lib/resend.js
// Client Resend utilisant Cloudflare Functions

/**
 * Envoie l'email de confirmation au prospect via Cloudflare Function
 */
export async function sendConfirmationEmail(leadData) {
  console.log('[resend] Envoi email confirmation à:', leadData.email);
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
  console.log('[resend] Réponse confirmation:', { status: response.status, data });

  if (!response.ok) {
    console.error('[resend] Erreur envoi confirmation:', data);
    throw new Error(data.error || 'Erreur envoi email');
  }

  return data;
}

/**
 * Envoie la notification admin via Cloudflare Function
 */
export async function sendAdminNotification(leadData) {
  console.log('[resend] Envoi notification admin pour:', leadData.firstName, leadData.lastName);
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
  console.log('[resend] Réponse admin notification:', { status: response.status, data });

  if (!response.ok) {
    console.error('[resend] Erreur envoi notification admin:', data);
    throw new Error(data.error || 'Erreur envoi notification');
  }

  return data;
}
