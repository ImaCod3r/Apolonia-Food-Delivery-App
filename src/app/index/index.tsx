import { View, Image, TouchableOpacity, Alert, Text } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";

import { CartButton } from "@/components/cartButton";
import { SearchBar } from "@/components/searchBar";

import { Menu } from "@/components/menu";
import { router } from "expo-router";

import { getcurrentUser } from "@/utils/auth";
import { ProductsController } from "@/controllers/productsController";

export default function Index() {
    const [currentUser, setCurrentUser] = useState<{ name: string; email: string, avatar_url: string, isadmin: boolean } | null>(null);
    const [products, setProducts] = useState<any>([]);

    const loadUser = async () => {
        const currentUser = await getcurrentUser();
        if (currentUser) {
            setCurrentUser(currentUser);
        } else {
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
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

    useEffect(() => {
        // Load user data when the component mounts
        loadUser();
        // Load products data when the component mounts
        getProducts();
    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('@/assets/logo.png')} style={styles.logo} />

                <View style={styles.headerActions}>
                    <CartButton />

                    {currentUser?.isadmin && (
                        <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/admin')}>
                            <Text style={{color: '#fff'}}>Admin</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={() => router.navigate('/profile')}>
                        <Image source={{ uri: currentUser?.avatar_url }} style={styles.profile} />
                    </TouchableOpacity>
                </View>

            </View>

            <SearchBar icon="search" />

            <Menu data={products} />
        </View>
    )
}