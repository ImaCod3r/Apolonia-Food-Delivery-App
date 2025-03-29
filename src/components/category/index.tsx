import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

type Props = PressableProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    name: string
}

export function Category({ icon, name, ...rest }: Props) {
    return (
        <Pressable style={styles.container} onPress={() => console.log(name)} {...rest}>
                <MaterialIcons name={icon} size={25} color={COLORS.white} />
                <Text style={styles.label}>{name}</Text>
        </Pressable>
    )
}