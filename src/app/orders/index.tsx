import { ScrollView, View, Text, FlatList, TouchableOpacity, Modal, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";

import { Back } from "@/components/back";
import { Button } from "@/components/button";

import { OrdersController } from "@/controllers/ordersController";
import { UsersController } from "@/controllers/usersController";
import { ProductsController } from "@/controllers/productsController";

export default function Orders() {
    const [modalVisible, setModalVisible] = useState(false);
    const [orders, setOrders] = useState<any[] | null>(null);

    const [currentUser, setCurrentUser] = useState<any | null>(null)
    const [currentOrder, setCurrentOrder] = useState<any | undefined>(undefined);
    const [products, setProducts] = useState<any[]>([]);

    const fetchOrders = async () => {
        try {
            const data = await OrdersController.getOrders();
            return data;
        } catch (error) {
            Alert.alert("Error ao carregar pedidos");
        }
    }

    const fetchUser = async (order: any): Promise<any> => {
        try {
            const user = await UsersController.getUserById(order.user_id);
            return user;
        } catch (error) {
            throw error
        }
    }

    const fetchMatchedProduct = async (id: string) => {
        try {
            const result = await ProductsController.getProductById(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchOrders().then((data) => {
            setOrders(data || null);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Pedidos</Text>
            </View>

            <Text>
                Aqui você pode visualizar todos os pedidos realizados.
            </Text>

            <View>
                <View style={[styles.row, styles.tableHeader]}>
                    <Text>#</Text>
                    <Text>Nome</Text>
                    <Text>Data</Text>
                    <Text>status</Text>
                </View>

                <FlatList
                    data={orders}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => {
                                setCurrentOrder(item);

                                const waitForCartToLoad = async () => {
                                    while (!item.cart_items) {
                                        await new Promise((resolve) => setTimeout(resolve, 100));
                                    }
                                    let productsList = [];

                                    try{
                                        const userFetched = await fetchUser(item);
                                        setCurrentUser(userFetched)
                                    } catch(error) {

                                    }

                                    for (let i of JSON.parse(item.cart_items || "[]")) {
                                        console.log(i);
                                        try {
                                            const productInfo = await fetchMatchedProduct(i.product_id);
                                            productsList.push(productInfo);
                                        } catch (error) {
                                            throw error;
                                        }
                                    }
                                    
                                    setProducts(productsList);
                                    setModalVisible(true);
                                };
                                waitForCartToLoad();
                            }}
                        >
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.created_at}</Text>
                            <Text>{item.status}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.modalContent}>
                        <View style={{ gap: 10 }}>
                            <View style={styles.userInfo}>
                                <Image source={{ uri: currentUser?.avatar_url }} style={styles.userProfilePhoto} />
                                <View>
                                    <Text style={styles.userName}>{currentUser?.name}</Text>
                                    <Text>{currentOrder?.phone_number}</Text>
                                    <Text>{currentOrder?.created_at && new Date(currentOrder.created_at).toLocaleDateString()}</Text>
                                </View>
                            </View>

                            <View style={styles.mapView}>
                                <Text style={styles.heading}>Localização</Text>

                                <MapView
                                    initialRegion={{
                                        latitude: currentOrder?.latitude || 0,
                                        longitude: currentOrder?.longitude || 0,
                                        latitudeDelta: 0.005, // Reduced latitudeDelta for closer zoom
                                        longitudeDelta: 0.005 // Reduced longitudeDelta for closer zoom
                                    }}
                                    style={{ height: 200, width: "100%" }}>
                                    {currentOrder?.latitude && currentOrder?.longitude && (
                                        <Marker
                                            coordinate={{
                                                latitude: currentOrder.latitude,
                                                longitude: currentOrder.longitude
                                            }}
                                            title={currentOrder.name}
                                        />
                                    )}
                                </MapView>
                            </View>

                            <View>
                                <Text style={styles.heading}>Carrinho</Text>
                                <FlatList
                                    data={products}
                                    renderItem={({ item }) => (
                                        <View style={styles.cardItem}>
                                            <View>
                                                <Image source={{ uri: item.image_url }} style={styles.cardImage} />
                                                <Text style={styles.cardItemName}>{item.name}</Text>
                                            </View>
                                            <Text style={styles.cardItemPrice}>AOA {item.price}</Text>
                                        </View>
                                    )}
                                    horizontal
                                    style={{ marginBottom: 10 }}
                                />
                            </View>
                        </View>

                    </ScrollView>
                        <View style={styles.modalFooter}>
                            <Button text="Atender pedido" isPrimary onClick={() => void (0)} />
                        </View>
                </View>
            </Modal>

        </View>
    )
}