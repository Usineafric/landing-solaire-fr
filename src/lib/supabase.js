import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

export async function saveLead(leadData) {
  try {
    // 1. D'ABORD : Se connecter anonymement
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    
    if (authError) {
      throw new Error('Erreur d\'authentification');
    }

    // 2. ENSUITE : Insérer le lead
    const payload = {
      is_owner: leadData.isOwner,
      housing_type: leadData.housingType,
      postal_code: leadData.postalCode,
      request_type: leadData.requestType,
      timeframe: leadData.timeframe,
      first_name: leadData.firstName,
      last_name: leadData.lastName,
      phone: leadData.phone,
      email: leadData.email,
      consent: leadData.consent,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([payload])
      .select()
      .single();

    if (error) {
      throw new Error('Erreur lors de l\'enregistrement');
    }

    return data;

  } catch (err) {
    throw err;
  }
}

export async function checkDuplicateEmail(email) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('leads')
    .select('created_at')
    .eq('email', email)
    .gte('created_at', sevenDaysAgo.toISOString())
    .limit(1);

  if (error) {
    return false;
  }

  return data && data.length > 0;
}