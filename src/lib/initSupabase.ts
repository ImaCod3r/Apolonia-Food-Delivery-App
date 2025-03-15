import 'react-native-url-polyfill/auto';
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabase_url = process.env.SUPABASE_URL as string;
const supabase_api_key = process.env.SUPABASE_API_KEY as string;

export const supabase = createClient(supabase_url, supabase_api_key, {
    auth: {
        storage: AsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})