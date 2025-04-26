import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import styles from "./styles";

import { Input } from '@/components/input';
import { ImageDisplayer } from '@/components/imageDisplayer';

import { ProductsController } from '@/controllers/productsController';

export default function Products() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; price: number; category: string } | null>(null);
    const [selectedValue, setSelectedValue] = useState('');

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Gerenciar Produtos</Text>
                <Text>Adicione, edite ou remova produtos do cardápio.</Text>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => {
                setModalVisible(true);
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


                </View>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <View>
                            <Text>Nome do produto</Text>
                            <Input placeholder="Ex: Refrigerante" value={selectedProduct?.name}
                                onChangeText={(value) => setProductName(value)} />
                        </View>

                        <View>
                            <Text>Preço do produto</Text>
                            <Input placeholder="R$ 0,00" keyboardType="numeric" value={selectedProduct?.price !== undefined ? String(selectedProduct.price) : undefined}
                                onChangeText={(value) => setProductPrice(+value)} />
                        </View>

                        <View>
                            <Text>Categoria do produto</Text>
                            <View style={styles.select}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedValue(itemValue)
                                        setProductCategory(itemValue)
                                    }}>
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
                                ProductsController.createProduct(productName, productCategory, productDescription, productPrice, productImage)
                                .then(() => {
                                    setModalVisible(false);
                                }).catch(error => {
                                    Alert.alert('Error', error.message);
                                }).finally(() => {
                                    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
                                })
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