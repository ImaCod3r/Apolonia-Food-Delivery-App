import { View, FlatList, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";

import { CartItem } from "@/components/cartItem";
import { Back } from "@/components/back";
import { Button } from "@/components/button";

import { CartsController } from "@/controllers/cartsController";
import { getcurrentUser } from "@/utils/auth";

export default function Cart() {
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        getcurrentUser().then((user) => {
            if (user) {
                setCurrentUserId(user.id);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            }
        }).catch((error) => {
            console.error("Error fetching current user:", error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        });

        getItemsFromCart(currentUserId).then(() => calculateTotalPrice(cartItems));
    }, [currentUserId]);

    const getItemsFromCart = async (userId: string) => {
        try {
            const data = await CartsController.getCartByUserId(userId);
            setCartItems(data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            Alert.alert('Erro', 'Não foi possível carregar os itens do carrinho.');
        }
    }

    const calculateTotalPrice = (cartItems: any) => {
        let total = 0;
        cartItems.forEach((item: { price: number; quantity: number; }) => {
            total += item.price * item.quantity; // Assuming each item has a price and quantity property
            setTotalPrice(total);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Carrinho</Text>
            </View>
            <FlatList 
                data={cartItems}
                renderItem={({item}) => (
                    <CartItem item={item}/>
                )}
                contentContainerStyle={styles.cartList}
            />

            <View style={styles.footer}>
                <View>
                    <Text>Total</Text>
                    <Text style={styles.totalPrice}>{totalPrice}</Text>
                </View>
                <Button text="Confirmar" isPrimary onClick={() => void(0)}/>
            </View>
        </View>
    )
}