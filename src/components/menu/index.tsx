import { FlatList, Modal, View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from "./styles";

import { CardItem } from "@/components/cardItem";
import { Button } from '@/components/button';
import { Category } from "@/components/category";

import { categories } from "@/utils/categories"

export function Menu() {
    const [currentItem, setCurrentItem] = useState<{ image: string; name: string; category: string; price: number } | null>(null);
    const [modalActive, setModalActive] = useState(false);
    const [category, setCategory] = useState('Pratos');
    const data = 
        [{
            image: "https://github.com/imaCod3r.png",
            name: "Bolo",
            category: "Sobremesas",
            price: 1000
        },
        {
            image: "https://github.com/imaCod3r.png",
            name: "Peixe",
            category: "Sobremesas",
            price: 99999
        },
        {
            image: "https://github.com/imaCod3r.png",
            name: "Frango",
            category: "Pratos",
            price: 99999
        }]

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
                    }
                    } />
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
                    <Image source={{ uri: currentItem?.image }} style={styles.coverImage} />

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


                    </View>

                    <View style={styles.modalFooter}>
                        <Button text="Adicionar ao Carrinho" isGoogle={false} isPrimary onClick={() => {
                            console.log(`item: ${currentItem?.name} adicionado ao carrinho!`)
                        }} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}