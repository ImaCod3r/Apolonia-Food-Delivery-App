import { View, TouchableOpacity, TouchableOpacityProps, Text, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import { COLORS } from '@/styles/colors';

import { getcurrentUser } from '@/utils/auth';

import { useEffect, useState } from 'react';
import { CartsController } from '@/controllers/cartsController';
import { useCart } from "@/contexts/CartContext";

type Props = TouchableOpacityProps & {
    item: any
}

export function CardItem({ item, ...rest }: Props) {
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const { cartItemsQuantity, setCartItemsQuantity } = useCart();

    useEffect(() => {
        getcurrentUser().then((user) => {
            if (user) {
                setCurrentUserId(user.id);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            }
        }).catch((error) => {
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        });
    }, []);

    const handleAddToCart = async (userId: string, product: any) => {
        CartsController.addItemToCart(userId, product).then(() => {
            Alert.alert('Sucesso', 'Produto adicionado ao carrinho com sucesso!');
            setCartItemsQuantity(cartItemsQuantity + 1); // Update the cart quantity
        }).catch(error => {
            Alert.alert("Erro", "Não foi possivel adicionar item ao carrinho, tente novamente!")
        })
    };

    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Image source={{ uri: item.image_url }} style={styles.image} />

            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.category}</Text>
            </View> 

            <View style={styles.itemFooter}>
                <Text style={styles.price}>AOA {item.price}</Text>

                <TouchableOpacity onPress={() => handleAddToCart(currentUserId, item)}>
                    <MaterialIcons name="shopping-cart" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}