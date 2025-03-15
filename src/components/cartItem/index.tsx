import { View, Image, Text, TouchableOpacity } from "react-native"; 
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

import { QuantityControl } from "@/components/quantityControl";

export function CartItem() {
    return (
        <View style={styles.container} >
            <Image source={{ uri: 'https://www.github.com/imaCod3r.png' }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <View>
                    <Text style={styles.itemName}>Item 1</Text>
                    <Text style={styles.itemCategory}>Categoria x</Text>
                    <Text style={styles.itemPrice}>AOA 9000</Text>
                </View>

                <QuantityControl item={[]} />
            </View>

            <TouchableOpacity style={styles.deleteButton}>
                <MaterialIcons name="delete" size={20} color={COLORS.black}/>
            </TouchableOpacity>
        </View>
    )
}