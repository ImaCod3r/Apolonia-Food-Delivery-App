import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    quantityCounter: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.primary    
    },
    counter: {
        color: COLORS.black
    }
})