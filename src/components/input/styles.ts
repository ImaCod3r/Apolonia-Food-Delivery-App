import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray,
        height: 50,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderRadius: 10
    },
    input: {
        backgroundColor: "transparent",
        flex: 1
    }
})