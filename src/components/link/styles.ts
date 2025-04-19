import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors"

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
        backgroundColor: COLORS.gray
    },
    text: {
        fontSize: 16,
        color: COLORS.black,
    }
});

export default styles;