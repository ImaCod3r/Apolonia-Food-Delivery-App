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
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default styles;