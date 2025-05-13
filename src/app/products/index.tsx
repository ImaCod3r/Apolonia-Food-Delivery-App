import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import styles from "./styles";

import { Input } from '@/components/input';
import { Back } from '@/components/back';
import { ImageDisplayer } from '@/components/imageDisplayer';

import { ProductsController } from '@/controllers/productsController';

export default function Products() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>({});
    const [selectedValue, setSelectedValue] = useState('');
    const [products, setProducts] = useState<any>([]);

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');

    const handleDeleteProduct = async (productId: string) => {
        try {
            Alert.alert(
                'Deletar produto',
                'Tem certeza de que deseja remover este produto?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            await ProductsController.deleteProduct(productId).then(() => {
                                setProducts(products.filter((product: any) => product.id !== productId));
                                Alert.alert('Sucesso', 'Produto removido com sucesso!');
                                getProducts();
                            });
                        },
                    },
                ],
                { cancelable: true }
            );

            getProducts();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover o produto.');
        }
    }

    const getProducts = async () => {
        try {
            const data = await ProductsController.getAllProducts();
            setProducts(data);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const renderUser = ({ item }: { item: any }) => (
        <TouchableOpacity style={tableStyles.row} 
            onPress={() => { 
                setSelectedProduct(item) 
                setModalVisible(true)
        }}>
            <Text style={tableStyles.cell}>{item.name}</Text>
            <Text style={tableStyles.cell}>{item.category}</Text>
            <Text style={tableStyles.cell}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <Back />
                <Text style={styles.heading}>Gerenciar Produtos</Text>
            </View>
            <Text>Adicione, edite ou remova produtos do cardápio.</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <MaterialIcons name="add" size={24} color="black" />
                <Text>Adicionar Produto</Text>
            </TouchableOpacity>

            <View style={tableStyles.table}>
                <View style={tableStyles.headerRow}>
                    <Text style={tableStyles.headerCell}>Nome</Text>
                    <Text style={tableStyles.headerCell}>Categoria</Text>
                    <Text style={tableStyles.headerCell}>Preço</Text>
                </View>
                <FlatList
                    data={products}
                    renderItem={renderUser}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent >
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <View style={styles.inputGroup}>
                            <Text>Nome do produto</Text>
                            <Input placeholder={selectedProduct?.name ? selectedProduct?.name : "Ex: Refrigerante"} value={productName}
                                onChangeText={(value) => setProductName(value)} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text>Preço do produto</Text>
                            <Input placeholder="AOA 0,00" keyboardType="numeric" value={productPrice.toString()}
                                onChangeText={(value) => setProductPrice(+value)} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text>Categoria do produto</Text>
                            <View style={styles.select}>
                                <Picker
                                    selectedValue={productCategory || selectedValue}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setProductCategory(itemValue);
                                        setProductCategory(itemValue);
                                    }}>
                                    <Picker.Item label="Pratos" value="Pratos" color="#000" />
                                    <Picker.Item label="Entradas" value="Entradas" color="#000" />
                                    <Picker.Item label="Sobremesas" value="Sobremesas" color="#000" />
                                    <Picker.Item label="Bebidas" value="Bebidas" color="#000" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text>Descrição do produto</Text>
                            <Input
                                placeholder="Ex: Refrigerante de 2L"
                                numberOfLines={4}
                                multiline
                                value={productDescription}
                                onChangeText={(value) => setProductDescription(value)} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text>Imagem do produto</Text>
                            <ImageDisplayer currentItem={selectedProduct} onImageChange={(newImage) => setProductImage(newImage)} />
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        // Salvar lógica
                        if (!selectedProduct?.id) {
                            ProductsController.createProduct(productName, productCategory, productDescription, productPrice, productImage)
                                .then(() => {
                                    setModalVisible(false);
                                }).catch(error => {
                                    Alert.alert('Error', error.message);
                                }).finally(() => {
                                    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
                                    getProducts();
                                })
                        } else {
                            ProductsController.updateProduct(selectedProduct.id, { name: productName, category: productCategory, description: productDescription, price: productPrice, image_url: productImage })
                                .then(() => {
                                    setModalVisible(false);
                                }).catch(error => {
                                    Alert.alert('Error', error.message);
                                }).finally(() => {
                                    Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
                                    getProducts();
                                })
                        }
                    }}>
                        <Text style={styles.text}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]} onPress={() => {
                        // Descartar
                        setSelectedProduct(null);
                        setModalVisible(false);
                    }}>
                        <Text style={styles.text}>Descartar</Text>
                    </TouchableOpacity>
                </View>
            </Modal >

        </View >
    )
}

const tableStyles = StyleSheet.create({
    table: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        maxHeight: 300
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        padding: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center"
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});