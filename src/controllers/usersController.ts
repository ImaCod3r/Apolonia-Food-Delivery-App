import { supabase } from "@/utils/supabase";

export class UsersController {
    static async getUserById(id: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    static async createUser(id: any, name: string, email: string, password: string) {
        const { error: insertError } = await supabase
        .from('profiles').insert([{
            id: id,
            name: name,
            email: email,
            avatar_url: null,
            isadmin: false,
        }]);

        if (insertError) throw insertError;
    }

    static async updateUser(id: string, name?: string, email?: string, password?: string, avatar_url?: string, isadmin?: boolean) {
        const { data, error } = await supabase
            .from('profiles')
            .update({
                name: name,
                email: email,
                password: password,
                avatar_url: avatar_url,
                isadmin: isadmin
            })
            .eq('id', id);

        if (error) throw error;
    }
}