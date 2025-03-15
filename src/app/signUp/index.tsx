import { View, ScrollView, Text, TouchableOpacity, AppState, Alert } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { useState } from "react";
import { supabase } from "@/lib/initSupabase";
import { isValidEmail } from "@/utils/validators";

import { Back } from "@/components/back";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

// AppState.addEventListener("change", (state) => {
//     if (state === "active") {
//         supabase.auth.startAutoRefresh();
//     } else {
//         supabase.auth.stopAutoRefresh();
//     }
// })

export default function SignUp() {
    // const [name, setName] = useState('');
    // const [surname, setSurname] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // async function signUpWithEmail() {
    //     setLoading(true);

    //     if(!isValidEmail(email)) Alert.alert("Insira um email valido!");

    //     const {
    //         data: { session },
    //         error,
    //     } = await supabase.auth.signUp({
    //         email: email,
    //         password: password
    //     })

    //     if(error) Alert.alert(error.message);
    //     if(!session) Alert.alert('Verifique sua caixa de entrada para validar o seu email');
    //     setLoading(false);
    // }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Crie uma conta</Text>
            </View>

            <View style={styles.form}>

                <Text style={styles.label}>Nome</Text>
                <Input placeholder="Nome" />

                <Text style={styles.label}>Sobrenome</Text>
                <Input placeholder="Sobrenome" />

                <Text style={styles.label}>Email</Text>
                <Input 
                placeholder="seuemail@provedor.com"
                autoComplete="email"
                onChangeText={setEmail}
                value={email}
                />

                <Text style={styles.label}>Senha</Text>
                <Input 
                placeholder="Senha" 
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                />

                <Button text="Criar conta" isPrimary onClick={() => console.log("Criar conta")}/>

                <Text style={{ alignSelf: "center" }}>Ou</Text>

                <Button text="Continuar com Google" isPrimary={false} onClick={() => 0} isGoogle />

                <View style={styles.linkLine}>
                    <Text>
                        Já tem uma conta?
                    </Text>
                    <TouchableOpacity onPress={() => router.navigate("/signIn")}>
                        <Text style={styles.link}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}