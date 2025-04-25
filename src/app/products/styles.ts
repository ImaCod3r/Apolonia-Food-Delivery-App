import { StyleSheet } from 'react-native';
import { COLORS } from '@/styles/colors';

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
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
        marginTop: 20,
        alignItems: 'center'
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
    }
});

export default styles;