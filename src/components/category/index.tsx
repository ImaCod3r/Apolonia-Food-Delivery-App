import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    name: string
    isSelected: boolean
}

export function Category({ icon, name, isSelected, ...rest }: Props) {
    return (
        <TouchableOpacity 
            style={[styles.container, isSelected ? {backgroundColor: COLORS.gray} : null]} 
            {...rest}>
                <MaterialIcons name={icon} size={25} color={isSelected ? COLORS.primary :  COLORS.white} />
                <Text style={[styles.label, isSelected ? {color: COLORS.primary} : null]}>{name}</Text>
        </TouchableOpacity>
    )
}