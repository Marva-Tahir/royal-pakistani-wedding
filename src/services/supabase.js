import { createClient } from '@supabase/supabase-js';
import { weddingData } from '../config/weddingData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid credentials are provided (not empty or template string)
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-supabase-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'royal_wedding_blessings_v1';

// Seed initial blessings from config if none exist locally
const getLocalStoredBlessings = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Unable to read localStorage:', e);
  }
  return weddingData.initialBlessings;
};

const saveLocalStoredBlessings = (blessings) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blessings));
  } catch (e) {
    console.warn('Unable to save to localStorage:', e);
  }
};

/**
 * Fetch all blessings/prayers
 */
export async function fetchBlessings() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blessings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Supabase fetch error, falling back to local:', error);
        return { data: getLocalStoredBlessings(), isLocalMode: true, error: error.message };
      }

      return { data: data || [], isLocalMode: false, error: null };
    } catch (err) {
      console.error('Network error during Supabase fetch:', err);
      return { data: getLocalStoredBlessings(), isLocalMode: true, error: err.message };
    }
  }

  // Fallback to local storage
  return {
    data: getLocalStoredBlessings(),
    isLocalMode: true,
    error: null,
  };
}

// Spam protection tracker in memory
let lastSubmissionTimestamp = 0;

/**
 * Submit a new prayer/blessing
 */
export async function submitBlessing({ guest_name, relation, message }) {
  // 1. Validation
  const trimmedMessage = (message || '').trim();
  const trimmedName = (guest_name || '').trim() || 'Well Wisher';
  const trimmedRelation = (relation || '').trim() || 'Guest';

  if (!trimmedMessage || trimmedMessage.length < 3) {
    throw new Error('Please write a heartfelt prayer or message (at least 3 characters).');
  }

  if (trimmedMessage.length > 1000) {
    throw new Error('Message is too long. Please keep it under 1000 characters.');
  }

  // 2. Spam protection (min 4 seconds between submissions)
  const now = Date.now();
  if (now - lastSubmissionTimestamp < 4000) {
    throw new Error('Please wait a moment before sending another blessing.');
  }
  lastSubmissionTimestamp = now;

  const newBlessing = {
    id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    guest_name: trimmedName.slice(0, 100),
    relation: trimmedRelation.slice(0, 100),
    message: trimmedMessage,
    created_at: new Date().toISOString(),
  };

  // 3. Supabase Submission if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blessings')
        .insert([
          {
            guest_name: newBlessing.guest_name,
            relation: newBlessing.relation,
            message: newBlessing.message,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert failed, saving locally:', error);
        // Save locally as backup
        const current = getLocalStoredBlessings();
        const updated = [newBlessing, ...current];
        saveLocalStoredBlessings(updated);
        return { blessing: newBlessing, isLocalMode: true, error: error.message };
      }

      return { blessing: data, isLocalMode: false, error: null };
    } catch (err) {
      console.warn('Supabase network error, saving locally:', err);
      const current = getLocalStoredBlessings();
      const updated = [newBlessing, ...current];
      saveLocalStoredBlessings(updated);
      return { blessing: newBlessing, isLocalMode: true, error: err.message };
    }
  }

  // 4. Local storage mode
  const current = getLocalStoredBlessings();
  const updated = [newBlessing, ...current];
  saveLocalStoredBlessings(updated);

  return {
    blessing: newBlessing,
    isLocalMode: true,
    error: null,
  };
}
