import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        paddingHorizontal: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    text: {
        fontSize: 14,
        color: COLORS.white
    }
})

export default styles;