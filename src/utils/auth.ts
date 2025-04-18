import { supabase } from "./supabase";

async function signUpWithProfile(email: string, password: string, name: string) {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
    });

    if (signUpError) throw signUpError;

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { error: insertError } = await supabase
        .from('profiles').insert([{
            id: user.id,
            name: name,
            email: email,
            avatar_url: null,
            isadmin: true,
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
        throw error;
    }

    return data
}

async function getcurrentUser() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error('User is not authenticated.');
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) {
        console.error('Erro ao buscar dados do usuário:', error)
    } else {
        return data;
    }
}

async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        return error;
    }
}


export { signUpWithProfile, signInWithEmail,  getcurrentUser, logout };