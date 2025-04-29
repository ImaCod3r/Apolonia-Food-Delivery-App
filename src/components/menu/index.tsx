import { FlatList, Modal, View, TouchableOpacity, Image, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { styles } from "./styles";

import { CardItem } from "@/components/cardItem";
import { Button } from '@/components/button';
import { Category } from "@/components/category";

import { categories } from "@/utils/categories";
import { getUserId } from '@/utils/auth';
import { CartsController } from '@/controllers/cartsController';

type Props = {
    data: {
        image_url: string;
        name: string;
        category: string;
        price: number;
        description: string;
    }[]
}

export function Menu({ data }: Props) {
    const [userId, setUserId] = useState<string>('');
    const [currentItem, setCurrentItem] = useState<{ image_url: string; name: string; category: string; price: number; description: string } | null>(null);
    const [modalActive, setModalActive] = useState(false);
    const [category, setCategory] = useState('Pratos');

    useEffect(() => {
        getUserId().then((user) => setUserId(user));
    }, [])

    const handleAddToCart = async (userId: string, product: any) => {
        CartsController.addItemToCart(userId, product).then(() => {
            Alert.alert('Sucesso', 'Produto adicionado ao carrinho com sucesso!');
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.categories}>
                <FlatList
                    data={categories}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <Category
                            icon={item.icon}
                            name={item.name}
                            onPress={() => {
                                setCategory(item.name)
                            }}
                            isSelected={item.name === category}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categories}
                    horizontal
                />
            </View>

            <FlatList
                data={data.filter(item => item.category === category)}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <CardItem item={item} onPress={() => {
                        setModalActive(true);
                        setCurrentItem(item);
                    }} />
                )}

                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.menu}
                numColumns={2}
            />


            <Modal
                animationType='slide'
                transparent={false}
                visible={modalActive} >
                <View style={styles.modalContainer}>
                    <Image source={{ uri: currentItem?.image_url }} style={styles.coverImage} />

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalActive(false);
                        }}>
                        <MaterialIcons name='close' size={30} color={"#fff"} />
                    </TouchableOpacity>

                    <View style={styles.itemInfo} >
                        <Text style={styles.itemName}>
                            {currentItem?.name}
                        </Text>
                        <Text style={styles.itemCategory}>
                            {currentItem?.category}
                        </Text>
                        <Text style={styles.itemPrice}>
                            {"AOA " + currentItem?.price}
                        </Text>
                        <Text>{currentItem?.description}</Text>
                    </View>

                    <View style={styles.modalFooter}>
                        <Button text="Adicionar ao Carrinho" isPrimary onClick={() => {
                            handleAddToCart(userId, currentItem);
                            setModalActive(false);
                        }} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}