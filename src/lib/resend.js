// src/lib/resend.js
// Client Resend utilisant Netlify Functions

/**
 * Envoie l'email de confirmation au prospect via Netlify Function
 */
export async function sendConfirmationEmail(leadData) {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
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
      console.error('❌ Erreur email confirmation:', data);
      throw new Error(data.error || 'Erreur envoi email');
    }

    console.log('✅ Email confirmation envoyé:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Erreur sendConfirmationEmail:', error);
    throw error;
  }
}

/**
 * Envoie la notification admin via Netlify Function
 */
export async function sendAdminNotification(leadData) {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
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
      console.error('❌ Erreur notification admin:', data);
      throw new Error(data.error || 'Erreur envoi notification');
    }

    console.log('✅ Notification admin envoyée:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Erreur sendAdminNotification:', error);
    throw error;
  }
}