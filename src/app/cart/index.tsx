import { View, FlatList, Text, Alert } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { styles } from "./styles";

import { CartItem } from "@/components/cartItem";
import { Back } from "@/components/back";
import { Button } from "@/components/button";

import { CartsController } from "@/controllers/cartsController";
import { getUserId } from "@/utils/auth";

export default function Cart() {
    const [cartItems, setCartItems] = useState<{ product_id: string; price: number; quantity: number }[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const fetchCartData = async () => {
        try {
            const userId = await getUserId();
            if (!userId) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                return;
            }

            CartsController.getCartItemsByUserId(userId).then((data) => {
                setCartItems(data);
            });

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os itens do carrinho.');
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    function calculateTotalPrice(cartItems: any[]) {
        const total = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity; // Assuming each item has a price and quantity property
        }, 0);
        setTotalPrice(total);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Carrinho</Text>
            </View>

            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem item={item} />
                )}
                contentContainerStyle={styles.cartList}
            />

            <View style={styles.footer}>
                <View>
                    <Text>Total</Text>
                    <Text style={styles.totalPrice}>{totalPrice}</Text>
                </View>
                <Button text="Confirmar" isPrimary onClick={() => {
                    if (cartItems.length === 0) {
                        Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de prosseguir.');
                        return;
                    }

                    router.push({
                        pathname: '/ordering',
                        params: { cartItems: JSON.stringify(cartItems) }
                    })

                }} />
            </View>
        </View>
    )
}