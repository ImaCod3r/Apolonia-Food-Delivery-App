import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemImage: {
        width: 120,
        height: '100%',
        objectFit: 'cover',
        borderRadius: 10
    },
    itemInfo: {
        gap: 10
    },
    itemName: {
        fontWeight: 'bold'
    },
    itemCategory: {
        fontSize: 12,
        color: '#555'
    },
    itemPrice: {
        fontWeight: 'bold'
    },
    deleteButton: {
        width: 30,
        height: 30
    }
})