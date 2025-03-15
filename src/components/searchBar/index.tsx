import { View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

type Props = {
    // onSearch: (text: string) => void
    icon: keyof typeof MaterialIcons.glyphMap
}

export function SearchBar({ icon }: Props) {
    return (
        <View style={styles.container}>
            <MaterialIcons name={icon} size={30} color={COLORS.secondary} />
            <TextInput
                placeholder="Search..."
                style={styles.input}
            />
        </View>
    )
}