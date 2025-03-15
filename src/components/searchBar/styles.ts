import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 10,
        height: 50,
        backgroundColor: COLORS.gray,
        borderRadius: 10 
    }, input: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        flex: 1
    }
})