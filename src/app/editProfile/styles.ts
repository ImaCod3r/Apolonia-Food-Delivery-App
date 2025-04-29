import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
        gap: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20
    }
})