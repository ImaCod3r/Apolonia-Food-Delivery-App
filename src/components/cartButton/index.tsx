import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { CartsController } from "@/controllers/cartsController";
import { getUserId } from "@/utils/auth";

export function CartButton() {
    const [cartItemsQuantity, setCartItemsQuantity] = useState<number>(0);

    const loadCartData = async () => {
        try {
            const userId = await getUserId();
            if (userId) {
                const cartData = await CartsController.getCartByUserId(userId);
                setCartItemsQuantity(cartData.length);
            }
        } catch (error) {
            if ((error as { code?: string }).code === "PGRST116") {
                return;
            }
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        loadCartData();
    }, []);

    return (
        <TouchableOpacity onPress={() => router.navigate('/cart')} >
            <View style={styles.container}>
                <MaterialIcons name="shopping-cart" size={30} color={COLORS.black} />
                <View style={styles.circle}>
                    <Text style={styles.text}>{cartItemsQuantity}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}