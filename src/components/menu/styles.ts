import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    items: {
        gap: 10
    },
    modalContainer: {
        backgroundColor: COLORS.white,
        flex: 1,
        position: 'relative'
    }, 
    modalFooter: {
        width: '100%',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        justifyContent: "center"
    },
    coverImage: {
        width: '100%',
        height: '40%',
        objectFit: 'cover'
    }, 
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10
    },
    itemInfo: {
        margin: 20,
        flexDirection: 'column',
        gap: 5
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemCategory: {
        fontSize: 12
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: 'bold' 
    }
});