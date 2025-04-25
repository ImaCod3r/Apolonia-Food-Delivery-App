import { StyleSheet } from 'react-native';
import { COLORS } from '@/styles/colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.gray,
        height: 250,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    }
})

export default styles;