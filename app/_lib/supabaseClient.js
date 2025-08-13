import { createClient } from "@supabase/supabase-js";

// This client uses the PUBLIC "anon" key and is safe for the browser.
// It will be used for 99% of your app's code.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
