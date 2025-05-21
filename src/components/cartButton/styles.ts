import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        width: 30,
        height: 30, 
        position: 'absolute',
        right: -10,
        top: -10,
        backgroundColor: COLORS.primary,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%'
    }, text: {
        fontWeight: 'bold',
        color: COLORS.white,
        fontSize: 12
    }
})

export default styles;