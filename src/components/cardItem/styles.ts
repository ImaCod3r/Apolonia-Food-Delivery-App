import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

import { COLORS } from "@/styles/colors";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: width / 2 - 20, // Adjusting for margin and gap
        height: 250,
        backgroundColor: COLORS.gray,
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '60%',
        borderRadius: 8,
        objectFit: 'cover'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    }, 
    price: {
        fontWeight: 'bold'
    },
    itemFooter: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})