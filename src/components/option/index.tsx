import { View, TouchableOpacity, Text } from "react-native";
import { RelativePathString, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = {
    label: string
    route: string
}

export function Option({ label, route }: Props) {
    return (
        <View>
            <TouchableOpacity 
                onPress={() => {
                    router.navigate(`./${route}`)
                }}
                style={styles.container} >
                    <Text>{label}</Text>

                    <MaterialIcons name="arrow-forward-ios" size={20} />
            </TouchableOpacity>
        </View>
    )
}