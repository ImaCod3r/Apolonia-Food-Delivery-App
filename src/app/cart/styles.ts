import { COLORS } from "@/styles/colors";
import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {   
        flexDirection: 'row',
        alignSelf: 'flex-start',
        gap: 5,
        marginBottom: 10
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cartList: {
        gap: 10,
        paddingBottom: 25
    },
    footer: {
        backgroundColor: COLORS.white,
        width: '100%',
        marginHorizontal: 20,
        paddingVertical: 10,
        gap: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 20
    }
})