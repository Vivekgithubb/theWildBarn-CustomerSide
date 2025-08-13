import { createClient } from "@supabase/supabase-js";

// This client uses the SECRET "service_role" key for admin tasks.
// It MUST NEVER be used in the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
