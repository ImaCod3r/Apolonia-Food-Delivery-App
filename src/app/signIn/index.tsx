import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Back } from "@/components/back";

export default function SignIn() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Inicie Sessão</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Email/Telefone</Text>
                <Input placeholder="Email ou telefone" />

                <Text style={styles.label}>Senha</Text>
                <Input placeholder="Senha" secureTextEntry={true} />

                <Button text="Iniciar sessão" isPrimary onClick={() => {
                    console.log("Logar")
                }} />

                <Text style={{ alignSelf: "center" }}>Ou</Text>

                <Button text="Continuar com Google" isPrimary={false} onClick={() => 0} isGoogle />

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