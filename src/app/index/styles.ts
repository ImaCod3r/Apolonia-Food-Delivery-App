import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
        paddingHorizontal: 15,
        gap: 15
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