import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white
    }, 
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        padding: 20,
    },
    modalContent: {
        flex: 1
    },
    modalFooter: {
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        gap: 5
    },
    userInfo: {
        flexDirection: "row",
        gap: 10
    },
    userProfilePhoto: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    userName: {
        fontWeight: "bold"
    },
    mapView: {
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        gap: 8,
        paddingVertical: 8
    },
    cardItem: {
        width: 160,
        height: 250,
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: COLORS.gray,
        borderRadius: 10
    },
    cardImage: {
        height: 150,
        width: "100%",
        borderRadius: 10
    },
    cardItemName: {
        fontWeight: "bold",
        marginTop: 10
    },
    cardItemPrice: {
        fontSize: 12,
        fontWeight: "bold"
    }
})

export default styles;