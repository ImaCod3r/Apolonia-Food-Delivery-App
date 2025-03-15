import { View, TouchableOpacity, TouchableOpacityProps, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { COLORS } from '@/styles/colors';

type Props = TouchableOpacityProps & {
    item: any
}

export function CardItem({ item, ...rest }: Props) {
    let cart = [];

    return (
        <TouchableOpacity style={styles.container} {...rest}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>{item.category}</Text>
                </View>

                <View style={styles.itemFooter}>
                    <Text style={styles.price}>AOA {item.price}</Text>

                    <TouchableOpacity onPress={() => {
                        cart.push(item);
                        console.log(cart);
                    }}>
                        <MaterialIcons name="shopping-cart" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}