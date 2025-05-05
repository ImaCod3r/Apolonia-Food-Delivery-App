import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
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

    return (
        <View style={styles.container}>
            <View>
                <Back />
                <Text style={styles.heading}>Gerenciar Produtos</Text>
                <Text>Adicione, edite ou remova produtos do cardápio.</Text>
            </View>

            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => {
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

            {/* Lista de produtos */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.row} 
                    onLongPress={() => handleDeleteProduct(item.id)}
                    onPress={() => {
                        setSelectedProduct(item);
                        setProductName(item.name); 
                        setProductPrice(item.price); 
                        setProductCategory(item.category);
                        setProductDescription(item.description);
                        setProductImage(item.image_url); 
                        setModalVisible(true); 
                    }}>
                        <Text>{item.name}</Text>
                        <Text>{item.price}</Text>
                        <Text>{item.category}</Text>
                    </TouchableOpacity>
                )
            } />

            < Modal visible={modalVisible} animationType="slide" transparent >
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <View style={styles.inputGroup}>
                            <Text>Nome do produto</Text>
                            <Input placeholder="Ex: Refrigerante" value={productName}
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
                            <ImageDisplayer currentItem={selectedProduct} onImageChange={(newImage) => setProductImage(newImage)}  />
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        // Salvar lógica
                        if(!selectedProduct?.id) {
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