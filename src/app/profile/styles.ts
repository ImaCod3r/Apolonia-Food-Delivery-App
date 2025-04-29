import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
         backgroundColor: COLORS.white,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 15
    },
    menuOptions: {
        margin: 20,
        gap: 10
    }
})