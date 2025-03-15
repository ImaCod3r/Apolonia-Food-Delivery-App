import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    label: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold'
    }   
}) 