import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/styles/colors";

const { height, width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: COLORS.white
    },
    hero: {
        position: 'relative'
    },
    heroImage: {
        width: '100%',
        marginTop: 0 - (height / 8)
    },
    heroText: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        width: '100%',
    },
    head: {
        fontWeight: 'bold',
        fontSize: 32,
        color: COLORS.primary
    },
    text: {
        color: COLORS.primary,
        marginTop: -10
    },
    buttonWrapper: {
        marginHorizontal: (width / 4),
        gap: 10,
        alignItems: 'center'
    },
    footerText: { 
        alignSelf: 'center',
        color: COLORS.black,
        marginTop: height - (height - 50) 
    }
})