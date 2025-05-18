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
    screenHeader: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: "#fff",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
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
    select: {
        backgroundColor: COLORS.gray,
        borderRadius: 10
    },
    openModalButton: {
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 10
    },
    closeModal: {
        alignSelf: "flex-end"
    },
    screenFooter:{
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        width: "100%",
        zIndex: 9
    }

})

export default styles;