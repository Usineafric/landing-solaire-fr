// functions/add-to-brevo.js
// Fonction serverless Cloudflare pour ajouter un contact à Brevo

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
    const { email, listId, source } = await request.json();

    if (!email) {
      throw new Error('Email requis');
    }

    // Ajouter le contact à Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: listId ? [parseInt(listId)] : [],
        updateEnabled: true,
        attributes: {
          SOURCE: source || 'Lead Magnet PDF',
          DATE_INSCRIPTION: new Date().toISOString().split('T')[0],
        },
      }),
    });

    const data = await response.json();

    // Brevo retourne 201 pour un nouveau contact, 204 pour mise à jour
    if (!response.ok && response.status !== 204) {
      // Si le contact existe déjà, c'est ok
      if (data.code === 'duplicate_parameter') {
        return new Response(JSON.stringify({ success: true, message: 'Contact déjà existant' }), {
          status: 200,
          headers: corsHeaders,
        });
      }
      throw new Error(data.message || 'Erreur Brevo');
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('Erreur Brevo:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
