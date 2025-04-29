import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        height: "auto",
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#fff",
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.black
    },
    inputContainer: {
        marginTop: 16,
    },
    label: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 8,
    },
    openModalButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 15,
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 9
    },
    openModalButtonText: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
    },
})

export default styles;