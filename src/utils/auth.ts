import { supabase } from "./supabase";

async function signUpWithProfile(email: string, password: string, name: string) {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'foodapp://confirm'
        }
    });

    if (signUpError) throw signUpError;

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { error: insertError } = await supabase.from('profiles').insert([{
            id: user.id,
            name: name,
            avatar_url: null
        }]);

        if (insertError) throw insertError;
    }

    return signUpData;
}

async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error('Erro ao fazer login:', error.message)
        return null
    }

    return data
}


export { signUpWithProfile, signInWithEmail };