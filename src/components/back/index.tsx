import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

export function Back({ ...rest }: TouchableOpacityProps) {
    return (
        <TouchableOpacity onPress={() => router.back()} style={styles.container}>
            <MaterialIcons name="arrow-back-ios" size={20} color={COLORS.black} />
        </TouchableOpacity>
    )
} 