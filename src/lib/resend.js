// src/lib/resend.js
// Client Resend pour l'envoi d'emails

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const ADMIN_EMAIL = 'aimarketing127@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

/**
 * Envoie l'email de confirmation au prospect
 */
export async function sendConfirmationEmail(leadData) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: leadData.email,
        subject: '✅ Votre demande d\'étude solaire a été reçue',
        html: generateConfirmationEmailHTML(leadData),
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Erreur Resend confirmation:', data);
      throw new Error(data.message || 'Erreur envoi email');
    }

    console.log('✅ Email confirmation envoyé:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Erreur sendConfirmationEmail:', error);
    throw error;
  }
}

/**
 * Envoie la notification admin pour nouveau lead
 */
export async function sendAdminNotification(leadData) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🔔 Nouveau Lead Solaire - ${leadData.firstName} ${leadData.lastName}`,
        html: generateAdminNotificationHTML(leadData),
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Erreur Resend notification:', data);
      throw new Error(data.message || 'Erreur envoi notification');
    }

    console.log('✅ Notification admin envoyée:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Erreur sendAdminNotification:', error);
    throw error;
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container principal -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header avec gradient -->
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

          <!-- Corps du message -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                Bonjour <strong>${lead.firstName}</strong>,
              </p>
              
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                Nous avons bien reçu votre demande d'étude pour votre projet de panneaux solaires.
                Un professionnel certifié va maintenant analyser la faisabilité technique et économique de votre installation.
              </p>

              <!-- Récapitulatif -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; margin: 30px 0; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                      📋 Récapitulatif de votre demande
                    </h3>
                    
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; width: 40%;">Date :</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${date}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Code postal :</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${lead.postalCode}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Type de bien :</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 500;">Maison individuelle</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Délai souhaité :</td>
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
                    <td style="vertical-align: top; width: 30px;">
                      <span style="display: inline-block; background-color: #f97316; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold;">1</span>
                    </td>
                    <td style="color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>Analyse de faisabilité</strong> (24-48h)<br>
                      <span style="color: #92400e;">Étude technique et économique de votre projet</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top;">
                      <span style="display: inline-block; background-color: #f97316; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold;">2</span>
                    </td>
                    <td style="color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>Contact téléphonique</strong><br>
                      <span style="color: #92400e;">Si votre projet est cohérent techniquement</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top;">
                      <span style="display: inline-block; background-color: #f97316; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold;">3</span>
                    </td>
                    <td style="color: #78350f; font-size: 14px; line-height: 1.6;">
                      <strong>Étude personnalisée</strong><br>
                      <span style="color: #92400e;">Devis détaillé et simulation financière</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Délai de réponse -->
              <div style="text-align: center; padding: 20px 0;">
                <p style="margin: 0; color: #1f2937; font-size: 15px;">
                  ⏱️ <strong>Réponse sous 48 heures ouvrées maximum</strong>
                </p>
              </div>

              <!-- RGPD -->
              <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #115e59; font-size: 14px; font-weight: 600;">
                  🔒 Protection de vos données
                </p>
                <p style="margin: 0; color: #0f766e; font-size: 13px; line-height: 1.6;">
                  Conformément au RGPD, vos données sont :<br>
                  ✓ Utilisées uniquement pour traiter votre demande<br>
                  ✓ Non revendues à des tiers<br>
                  ✓ Supprimables sur simple demande à <a href="mailto:privacy@leadspodium.com" style="color: #0d9488; text-decoration: none;">privacy@leadspodium.com</a>
                </p>
              </div>

              <p style="margin: 30px 0 0 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                Cordialement,<br>
                <strong style="color: #1f2937;">L'équipe Étude Solaire</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 13px;">
                IDTRADING LLC · La villa Torrimar, Reina Margarita 112<br>
                Guaynabo, 00969, Puerto Rico
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Cet email a été envoyé en réponse à votre demande sur notre site web.
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
            <td style="background: linear-gradient(135deg, ${isEligible ? '#10b981' : '#ef4444'} 0%, ${isEligible ? '#059669' : '#dc2626'} 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                ${isEligible ? '✅ NOUVEAU LEAD QUALIFIÉ' : '⚠️ LEAD NON ÉLIGIBLE'}
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                ${date}
              </p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Infos Contact -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 2px solid ${isEligible ? '#10b981' : '#ef4444'};">
                <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                  👤 Informations Contact
                </h3>
                
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #6b7280; font-size: 14px; width: 35%;">Nom complet :</td>
                    <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${lead.firstName} ${lead.lastName}</td>
                  </tr>
                  <tr>
                    <td style="color: #6b7280; font-size: 14px;">Email :</td>
                    <td style="color: #1f2937; font-size: 14px; font-weight: 500;">
                      <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #6b7280; font-size: 14px;">Téléphone :</td>
                    <td style="color: #1f2937; font-size: 14px; font-weight: 500;">
                      <a href="tel:${lead.phone}" style="color: #2563eb; text-decoration: none;">${lead.phone}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Détails Projet -->
              <div style="background-color: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 16px; font-weight: 600;">
                  🏠 Détails du Projet
                </h3>
                
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #78350f; font-size: 14px; width: 35%;">Code postal :</td>
                    <td style="color: #92400e; font-size: 14px; font-weight: 600;">${lead.postalCode}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Propriétaire :</td>
                    <td style="color: #92400e; font-size: 14px; font-weight: 500;">${lead.isOwner === 'yes' ? '✅ Oui' : '❌ Non'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Type de bien :</td>
                    <td style="color: #92400e; font-size: 14px; font-weight: 500;">${lead.housingType === 'house' ? '✅ Maison individuelle' : '❌ Autre'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Nature demande :</td>
                    <td style="color: #92400e; font-size: 14px; font-weight: 500;">${lead.requestType}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-size: 14px;">Délai souhaité :</td>
                    <td style="color: #92400e; font-size: 14px; font-weight: 500;">${lead.timeframe}</td>
                  </tr>
                </table>
              </div>

              <!-- Status éligibilité -->
              ${isEligible ? `
              <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600;">
                  ✅ LEAD ÉLIGIBLE - À TRAITER EN PRIORITÉ
                </p>
                <p style="margin: 10px 0 0 0; color: #047857; font-size: 13px;">
                  Ce prospect remplit tous les critères : propriétaire + maison individuelle
                </p>
              </div>
              ` : `
              <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">
                  ⚠️ LEAD NON ÉLIGIBLE
                </p>
                <p style="margin: 10px 0 0 0; color: #dc2626; font-size: 13px;">
                  ${lead.isOwner !== 'yes' ? 'Non propriétaire. ' : ''}
                  ${lead.housingType !== 'house' ? 'Type de bien non éligible (pas une maison individuelle).' : ''}
                </p>
              </div>
              `}

              <!-- Actions rapides -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${lead.email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 5px;">
                  📧 Répondre par Email
                </a>
                <a href="tel:${lead.phone}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 5px;">
                  📞 Appeler
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Email automatique envoyé depuis le formulaire landing-solaire-fr
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