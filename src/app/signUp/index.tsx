import { View, ScrollView, Text, TouchableOpacity, AppState, Alert } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { useState } from "react";
import { signUpWithProfile } from "@/utils/auth";

import { Back } from "@/components/back";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            console.log({ name, email, password });
            await signUpWithProfile(email, password, name);
            Alert.alert('Conta criada', 'Faça login para começar a experiência.');
            router.push('/signIn');
        } catch (error: any) {
            Alert.alert('Erro', error.message)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Crie uma conta</Text>
            </View>

            <View style={styles.form}>

                <Text style={styles.label}>Nome completo</Text>
                <Input
                    placeholder="Ex: Gracinda Lopes"
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <Input
                    placeholder="seuemail@provedor.com"
                    autoComplete="email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />

                <Text style={styles.label}>Senha</Text>
                <Input
                    placeholder="Senha segura"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />

                <Button
                    text="Criar conta"
                    isPrimary
                    onClick={() => handleSignUp()}
                />

                <Text
                    style={{ alignSelf: "center" }}>Ou</Text>

                <Button
                    text="Continuar com Google"
                    isPrimary={false}
                    onClick={() => 0} isGoogle
                />

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