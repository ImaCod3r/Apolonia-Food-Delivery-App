import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        paddingHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    icon: {
        width: 30,
        height: 30
    },
    text: {
        fontSize: 14,
        color: COLORS.white
    }
})