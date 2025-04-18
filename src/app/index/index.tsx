import { View, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";

import { CartButton } from "@/components/cartButton";
import { SearchBar } from "@/components/searchBar";

import { Menu } from "@/components/menu";
import { router } from "expo-router";

import { getcurrentUser } from "@/utils/auth";

export default function Index() {
    const [currentUser, setCurrentUser] = useState<{ name: string; email: string, avatar_url: string, isadmin: boolean } | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await getcurrentUser();
            if (currentUser) {
                setCurrentUser(currentUser);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            }
        };

        loadUser();
    }, []);

    if(currentUser?.isadmin) {
        router.navigate("/admin")
    }
    
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('@/assets/logo.png')} style={styles.logo} />

                <View style={styles.headerActions}>
                    <CartButton />
                    
                    <TouchableOpacity onPress={() => router.navigate('/profile')}>
                        <Image source={{ uri: currentUser?.avatar_url }} style={styles.profile} /> 
                    </TouchableOpacity>
                </View>

            </View>
            
            <SearchBar icon="search" />

            <Menu />
        </View>
    )
}