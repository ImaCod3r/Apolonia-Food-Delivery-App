import { View, Image, TouchableOpacity, Alert, Text, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";

import { CartButton } from "@/components/cartButton";

import { Menu } from "@/components/menu";
import { router } from "expo-router";

import { getcurrentUser, logout } from "@/utils/auth";
import { ProductsController } from "@/controllers/productsController";
import { PushTokensController } from "@/controllers/pushTokensController";

import { setNotificationsHandler, registerForPushNotifications } from "@/utils/notifications";

setNotificationsHandler();

export default function Index() {
    const [currentUser, setCurrentUser] = useState<{ id: string, name: string; email: string, avatar_url: string, isadmin: boolean } | null>(null);
    const [products, setProducts] = useState<any>([]);

    const loadUser = async () => {
        const currentUser = await getcurrentUser();
        if (currentUser) {
            setCurrentUser(currentUser);
        } else {
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            logout();
        }
    };

    const getProducts = async () => {
        try {
            const data = await ProductsController.getAllProducts();
            setProducts(data);
        } catch (error) {
            throw error;
        }
    }

    const handlePushTokenSaving = async () => {
        try {
            const token = await registerForPushNotifications();
            if (token) {
                await PushTokensController.savePushToken(currentUser?.id as string, token);
            }
        } catch (error) {
            // console.error(error);
            // Alert.alert("Erro", "Não foi possível salvar o push token.")
        }
    }

    useEffect(() => {
        // Load user data when the component mounts
        loadUser().then(() => {
            handlePushTokenSaving();
        })
        // Load products data when the component mounts
        getProducts();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('@/assets/logo.png')} style={styles.logo} />

                    <View style={styles.headerActions}>
                        <CartButton />

                        {currentUser?.isadmin && (
                            <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/admin')}>
                                <Text style={{ color: '#fff' }}>Admin</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => router.navigate('/profile')}>
                            <Image source={{ uri: currentUser?.avatar_url }} style={styles.profile} />
                        </TouchableOpacity>
                    </View>

                </View>

                <Menu data={products} />
            </View>
        </SafeAreaView>
    )
}