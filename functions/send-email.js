// functions/send-email.js
// Fonction serverless Cloudflare pour envoyer les emails via Resend

const ADMIN_EMAIL = 'aimarketing127@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function onRequest(context) {
  const { request, env } = context;
  
  // Headers CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Gérer les requêtes OPTIONS (preflight CORS)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Vérifier méthode POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const { type, leadData } = await request.json();

    // Préparer les données de l'email selon le type
    let emailData;

    if (type === 'confirmation') {
      emailData = {
        from: FROM_EMAIL,
        to: leadData.email,
        subject: '✅ Votre demande d\'étude solaire a été reçue',
        html: generateConfirmationEmailHTML(leadData),
      };
    } else if (type === 'admin') {
      emailData = {
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🔔 Nouveau Lead Solaire - ${leadData.firstName} ${leadData.lastName}`,
        html: generateAdminNotificationHTML(leadData),
      };
    } else {
      throw new Error('Type invalide');
    }

    // Envoyer via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.VITE_RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur envoi email');
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Template HTML pour l'email de confirmation prospect
 */
function generateConfirmationEmailHTML(lead) {
  const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre demande</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #000000; font-size: 28px; font-weight: bold;">
                ☀️ Demande Bien Reçue !
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(0,0,0,0.8); font-size: 16px;">
                Votre étude solaire est en cours d'analyse
              </p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                Bonjour <strong>${lead.firstName}</strong>,
              </p>
              
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                Nous avons bien reçu votre demande d'étude pour votre projet de panneaux solaires.
              </p>

              <!-- Récap -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; margin: 30px 0; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                      📋 Récapitulatif
                    </h3>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Date :</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${date}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Code postal :</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${lead.postalCode}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Délai :</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${lead.timeframe}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Prochaines étapes -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-radius: 12px; padding: 25px; margin: 30px 0;">
                <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 16px; font-weight: 600;">
                  🎯 Prochaines étapes
                </h3>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>1.</strong> Analyse de faisabilité (24-48h)
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>2.</strong> Contact téléphonique si éligible
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>3.</strong> Étude personnalisée gratuite
                    </td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; padding: 20px 0;">
                <p style="margin: 0; color: #1f2937; font-size: 15px;">
                  ⏱️ <strong>Réponse sous 48h ouvrées</strong>
                </p>
              </div>

              <!-- RGPD -->
              <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #115e59; font-size: 14px; font-weight: 600;">
                  🔒 Protection de vos données
                </p>
                <p style="margin: 0; color: #0f766e; font-size: 13px; line-height: 1.6;">
                  Vos données sont utilisées uniquement pour votre demande.<br>
                  Contact : <a href="mailto:contact@lepanneausolaire.com" style="color: #0d9488;">contact@lepanneausolaire.com</a>
                </p>
              </div>

              <p style="margin: 30px 0 0 0; color: #4b5563; font-size: 15px;">
                Cordialement,<br>
                <strong style="color: #1f2937;">L'équipe Étude Solaire</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 30px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                Le Panneau Solaire
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Template HTML pour la notification admin
 */
function generateAdminNotificationHTML(lead) {
  const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isEligible = lead.isOwner === 'yes' && lead.housingType === 'house';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Lead</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: ${isEligible ? '#10b981' : '#ef4444'}; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                ${isEligible ? '✅ LEAD QUALIFIÉ' : '⚠️ LEAD NON ÉLIGIBLE'}
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                ${date}
              </p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Contact -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">👤 Contact</h3>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #6b7280; font-size: 14px;">Nom :</td>
                    <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${lead.firstName} ${lead.lastName}</td>
                  </tr>
                  <tr>
                    <td style="color: #6b7280; font-size: 14px;">Email :</td>
                    <td><a href="mailto:${lead.email}" style="color: #2563eb; font-size: 14px;">${lead.email}</a></td>
                  </tr>
                  <tr>
                    <td style="color: #6b7280; font-size: 14px;">Tél :</td>
                    <td><a href="tel:${lead.phone}" style="color: #2563eb; font-size: 14px;">${lead.phone}</a></td>
                  </tr>
                </table>
              </div>

              <!-- Projet -->
              <div style="background-color: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 16px;">🏠 Projet</h3>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Code postal :</td>
                    <td style="color: #92400e; font-size: 14px; font-weight: 600;">${lead.postalCode}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Propriétaire :</td>
                    <td style="color: #92400e; font-size: 14px;">${lead.isOwner === 'yes' ? '✅ Oui' : '❌ Non'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Type bien :</td>
                    <td style="color: #92400e; font-size: 14px;">${lead.housingType === 'house' ? '✅ Maison' : '❌ Autre'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Délai :</td>
                    <td style="color: #92400e; font-size: 14px;">${lead.timeframe}</td>
                  </tr>
                </table>
              </div>

              <!-- Actions -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${lead.email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 0 5px;">
                  📧 Répondre
                </a>
                <a href="tel:${lead.phone}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 0 5px;">
                  📞 Appeler
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Le Panneau Solaire
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}