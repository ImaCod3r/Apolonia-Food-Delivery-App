import { View, FlatList, Text } from "react-native";
import { styles } from "./styles";

import { CartItem } from "@/components/cartItem";
import { Back } from "@/components/back";
import { Button } from "@/components/button";

export default function Cart() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Carrinho</Text>
            </View>
            <FlatList 
                data={[0, 1, 2, 3, 4, 5]}
                renderItem={() => (
                    <CartItem />
                )}
                contentContainerStyle={styles.cartList}
            />

            <View style={styles.footer}>
                <View>
                    <Text>Total</Text>
                    <Text style={styles.totalPrice}>AOA 9000</Text>
                </View>
                <Button text="Confirmar" isPrimary onClick={() => void(0)}/>
            </View>
        </View>
    )
}