import { StyleSheet } from 'react-native';
import { COLORS } from '@/styles/colors';

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
         backgroundColor: COLORS.white
    },
    screenHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header:{
        borderBottomWidth: 2,
        borderColor: COLORS.gray,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    columnHeader: {
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    modalContent: {
        borderRadius: 10,
        padding: 20,
        gap: 10,
    },
    actions: {
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'fixed',
        bottom: 0,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
    },
    addButton: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: COLORS.gray,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.white
    },
    select: {
        marginTop: 10, 
        backgroundColor: COLORS.gray,
        borderRadius: 10,
    },
    inputGroup: {
        gap: 5
    }
});

export default styles;