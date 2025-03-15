import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center'
    },
    form: {
        marginTop: 20,
        gap: 15
    },
    label: {
        fontWeight: 500,
        marginBottom: -10
    },
    linkLine: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    link: {
        color: COLORS.primary,
        textDecorationLine: "underline"
    }
})