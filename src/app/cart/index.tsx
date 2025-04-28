import { View, FlatList, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";

import { CartItem } from "@/components/cartItem";
import { Back } from "@/components/back";
import { Button } from "@/components/button";

import { CartsController } from "@/controllers/cartsController";
import { getcurrentUser } from "@/utils/auth";

export default function Cart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const user = await getcurrentUser();
                if (!user) {
                    Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                    return;
                }

                const cartData = await CartsController.getCartByUserId(user.id);
                setCartItems(cartData);
                calculateTotalPrice(cartData);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os itens do carrinho.');
            }
        };

        fetchCartData();
    }, []);

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
                <Button text="Confirmar" isPrimary onClick={() => void (0)} />
            </View>
        </View>
    )
}