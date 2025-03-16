import { TouchableOpacity, Text, Image } from "react-native";

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

type Props = {
    isGoogle?: boolean
    text: string
    isPrimary?: boolean,
    onClick: () => void
}


export function Button({ text, isGoogle, isPrimary, onClick }: Props) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: isPrimary ? COLORS.primary : COLORS.secondary }]} onPress={onClick}>
            {isGoogle && <Image source={require('@/assets/google_icon.png')} style={styles.icon} />}
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}