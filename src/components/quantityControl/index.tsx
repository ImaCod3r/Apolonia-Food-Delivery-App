import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

import { COLORS } from "@/styles/colors";

import { ProductsController } from "@/controllers/productsController";
import { CartsController } from "@/controllers/cartsController";

type Props = {
    item: any
}

export function QuantityControl({ item }: Props) {
    const [quantity, setQuantity] = useState(item.quantity);

    const updateQuantity = async (newQuantity: number) => {
        try {
            setQuantity(newQuantity);
            await CartsController.updateItemQuantity(item.product_id, newQuantity);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                if (quantity > 1) {
                    updateQuantity(quantity - 1);
                }
            }}>
                <MaterialIcons name="remove" color={COLORS.primary} size={20} />
            </TouchableOpacity>

            <View style={styles.quantityCounter}>
                <Text style={styles.counter}>{quantity}</Text>
            </View>

            <TouchableOpacity onPress={() => {
                updateQuantity(quantity + 1);
            }}>
                <MaterialIcons name="add" color={COLORS.primary} size={20} />
            </TouchableOpacity>
        </View>
    );
}