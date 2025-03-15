import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

export function CartButton() {
    return (
        <TouchableOpacity onPress={() => router.navigate('/cart')} >
            <View style={styles.container}>
                <MaterialIcons name="shopping-cart" size={30} color={COLORS.black} />
                    <View style={styles.circle}>
                        <Text style={styles.text}>2</Text>
                    </View>
                </View>
        </TouchableOpacity>
    )
}