import { supabase } from "@/utils/supabase";

export class PushTokensController {
    static async savePushToken(user_id: string, token: string) {
        const { error: insertError } = await supabase
        .from('push_tokens')
        .insert([{
            user_id: user_id,
            push_token: token
        }]);

        if((insertError as any)["code"] !== "23505") {
            throw insertError;
        }
    }
}