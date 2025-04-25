import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors"

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 25,
        backgroundColor: COLORS.gray,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: COLORS.black,
    }
});

export default styles;