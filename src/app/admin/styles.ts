import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
         backgroundColor: COLORS.white
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    linksContainer: {
        gap: 10,
        marginTop: 20,
        marginBottom: 10
    }
});

export default styles;