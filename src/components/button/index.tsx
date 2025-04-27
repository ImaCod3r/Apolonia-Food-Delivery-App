import { TouchableOpacity, Text, Image } from "react-native";

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

type Props = {
    text: string
    isPrimary?: boolean,
    onClick: () => void
}


export function Button({ text, isPrimary, onClick }: Props) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: isPrimary ? COLORS.primary : COLORS.secondary }]} onPress={onClick}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}