import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";
import styles from "./styles";
import { useCart } from "@/contexts/CartContext";

export function CartButton() {
    const { cartItemsQuantity } = useCart();

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