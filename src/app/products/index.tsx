import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import styles from "./styles";

import { Input } from '@/components/input';
import { ImageDisplayer } from '@/components/imageDisplayer';


export default function Products() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; price: number; category: string } | null>(null);
    const [selectedValue, setSelectedValue] = useState('');

    const data = [
        {
            id: 1,
            name: "Produto 1",
            price: 10.00,
            category: "Categoria 1"
        },
        {
            id: 2,
            name: "Produto 2",
            price: 20.00,
            category: "Categoria 2"
        },
        {
            id: 3,
            name: "Produto 3",
            price: 30.00,
            category: "Categoria 3",
            imageUrl: 'https://github.com/imaCod3r.png'
        },
        {
            id: 4,
            name: "Produto 4",
            price: 40.00,
            category: "Categoria 4"
        },
        {
            id: 5,
            name: "Produto 5",
            price: 50.00,
            category: "Categoria 5"
        },
        {
            id: 6,
            name: "Produto 6",
            price: 8000,
            category: "Categoria 6"
        }
    ]
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Gerenciar Produtos</Text>
                <Text>Adicione, edite ou remova produtos do cardápio.</Text>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => {
                setModalVisible(true);
                setSelectedProduct(null);
            }}>
                <MaterialIcons name="add" size={24} color="black" />
                <Text>Adicionar Produto</Text>
            </TouchableOpacity>

            {/* Cabeçalho */}
            <View style={[styles.row, styles.header]}>
                <Text style={styles.columnHeader}>Nome</Text>
                <Text style={styles.columnHeader}>Preço</Text>
                <Text style={styles.columnHeader}>Categoria</Text>
            </View>

            <ScrollView>
                <View>

                    {/* Linhas da Tabela */}
                    {data.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.row} onPress={() => {
                            setModalVisible(true);
                            setSelectedProduct(data.filter((product) => product.id === item.id)[0]);
                        }}>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                            <Text>{item.category}</Text>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <View>
                            <Text>Nome do produto</Text>
                            <Input placeholder="Ex: Refrigerante" value={selectedProduct?.name} />
                        </View>

                        <View>
                            <Text>Preço do produto</Text>
                            <Input placeholder="R$ 0,00" keyboardType="numeric" value={selectedProduct?.price !== undefined ? String(selectedProduct.price) : undefined} />
                        </View>

                        <View>
                            <Text>Categoria do produto</Text>
                            <View style={styles.select}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedValue(itemValue)
                                    }>
                                    <Picker.Item label="Pratos" value="pratos" />
                                    <Picker.Item label="Entradas" value="entradas" />
                                    <Picker.Item label="Sobremesas" value="sobremesas" />
                                    <Picker.Item label="Bebidas" value="bebidas" />
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <Text>Imagem do produto</Text>
                            <ImageDisplayer currentItem={selectedProduct} />
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                // Salvar lógica
                                setModalVisible(false);
                            }}>
                                <Text style={styles.text}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]} onPress={() => {
                                // Deletar lógica
                                setModalVisible(false)
                            }}>
                                <Text style={styles.text}>Descartar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal >

        </View>
    )
}