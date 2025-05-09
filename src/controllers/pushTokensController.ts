import { supabase } from "@/utils/supabase";

class PushTokensController {
    static async savePushToken(user_id: string, token: string) {
        const { error: insertError } = await supabase
        .from('push_tokens')
        .insert([{
            user_id: user_id,
            push_token: token
        }]);

        if(insertError) throw insertError;
    }
}