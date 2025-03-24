import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        padding: 20
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemName: {
        fontWeight: 'bold'
    },
    itemDate: {
        fontStyle: 'italic'
    }
})