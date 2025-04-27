import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { styles } from "./styles";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Back } from "@/components/back";

import { signInWithEmail } from "@/utils/auth";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await signInWithEmail(email, password);
            if(result) {
                Alert.alert('Login realizado com sucesso', 'Você está logado!')
                router.replace('/' as any);
            }
        } catch(error) {
            if(error instanceof Error) {
                Alert.alert('Erro', error.message)
            }
        }

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Inicie Sessão</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <Input placeholder="Seu melhor email" onChangeText={setEmail} />

                <Text style={styles.label}>Senha</Text>
                <Input placeholder="Senha" secureTextEntry={true} onChangeText={setPassword} />

                <Button text="Iniciar sessão" isPrimary onClick={() => handleLogin()} />

                <View style={styles.linkLine}>
                    <Text>
                        Ainda não tem uma conta?
                    </Text>
                    <TouchableOpacity onPress={() => router.navigate("/signUp")}>
                        <Text style={styles.link}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}