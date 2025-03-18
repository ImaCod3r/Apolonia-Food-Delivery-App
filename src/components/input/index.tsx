import { View, TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

export function Input({...rest}: TextInputProps) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}  {...rest} />
        </View>
    )
}   