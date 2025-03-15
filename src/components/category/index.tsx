import { Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    name: string
}

export function Category({ icon, name }: Props) {
    return (
        <Pressable style={styles.container} onPress={() => console.log(name)}>
                <MaterialIcons name={icon} size={25} color={COLORS.white} />
                <Text style={styles.label}>{name}</Text>
        </Pressable>
    )
}