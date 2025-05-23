import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        flex: 1,
        padding: 15,
        gap: 15,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        width: 60,
        height: 60
    }, 
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    adminButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 50
    }
})

export default styles;