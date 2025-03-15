import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

import { COLORS } from "@/styles/colors";

type Props = {
    item: Object
}

export function QuantityControl({ item }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <MaterialIcons name="remove" color={COLORS.primary} size={20} />
            </TouchableOpacity>

            <View style={styles.quantityCounter}>
                <Text style={styles.counter}>0</Text>
            </View>

            <TouchableOpacity>
                <MaterialIcons name="add" color={COLORS.primary} size={20} />
            </TouchableOpacity>
        </View>
    )
}