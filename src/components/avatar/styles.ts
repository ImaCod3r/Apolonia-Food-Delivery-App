import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        overflow: 'hidden',
        alignSelf: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    modalContainer: {
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: COLORS.white
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: 300
    }
})