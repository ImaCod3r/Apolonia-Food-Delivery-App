import { View, Text, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";

import { Avatar } from "@/components/avatar";
import { Option } from "@/components/option";
import { Back } from "@/components/back";
import { Button } from "@/components/button";
import { router } from "expo-router";

import { getcurrentUser, logout } from "@/utils/auth";

export default function Profile() {
    const [user, setUser] = useState<{ name: string; email: string, avatar_url: string } | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await getcurrentUser();
            if (currentUser) {
                setUser(currentUser);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            }
        };

        loadUser();
    }, []);

    const handleAvatarUpdate = (newAvatarUrl: string) => {
        if (user) {
            setUser({ ...user, avatar_url: newAvatarUrl });
        }
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            Alert.alert('Erro', result.message)
        }

        router.replace('/newUser');
    }


    return (
        <ScrollView style={styles.container}>
            <Back />
            <Avatar currentUser={user} onAvatarUpdate={handleAvatarUpdate} />
            <Text style={styles.userName}>{user?.name || "Carregando..."}</Text>

            <View style={styles.menuOptions}>
                <Option label="Detalhes pessoais" route="editProfile" />
                <Option label="Histórico de pedidos" route="history" />
                <Option label="Termos de Serviço" route="terms" />

                <Button text="Terminar sessão" onClick={handleLogout} />
            </View>
        </ScrollView>
    )
}