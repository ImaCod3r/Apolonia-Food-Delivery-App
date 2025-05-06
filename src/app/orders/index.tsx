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

    const [users, setUsers] = useState<any[]>([])
    const [currentOrder, setCurrentOrder] = useState<any | undefined>(undefined);
    const [products, setProducts] = useState<any[]>([]);

    const fetchOrders = async () => {
        try {
            const data = await OrdersController.getOrders();
            setOrders(data || null);
        } catch (error) {
            Alert.alert("Error ao carregar pedidos");
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

    const acceptOrder = async (orderId: number) => {
        try {
            await OrdersController.UpdateOrderStatus(orderId, "aceite");
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchOrders();
        console.log(users);
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
                    <Text style={styles.column}>#</Text>
                    <Text style={styles.column}>Nome</Text>
                    <Text style={styles.column}>Data</Text>
                    <Text style={styles.column}>status</Text>
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
                            <Text style={styles.column}>{item.id}</Text>
                            <Text style={styles.column}>{item.owner_name}</Text>
                            <Text style={styles.column}>{item.created_at}</Text>
                            <Text style={styles.column}>{item.status}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(false);
                    }}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.modalContent}>
                        <View style={{ gap: 10 }}>
                            <View style={styles.userInfo}>
                                <Image source={{ uri: currentOrder?.owner_avatar }} style={styles.userProfilePhoto} />
                                <View>
                                    <Text style={styles.userName}>{currentOrder?.owner_name}</Text>
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
                                    contentContainerStyle={{ gap: 10, marginTop: 10 }}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>

                    </ScrollView>
                    <View style={styles.modalFooter}>
                        <Button text="Aceitar pedido" isPrimary onClick={() => {
                            acceptOrder(currentOrder?.id).then(() => {
                                Alert.alert("Sucesso!", `O pedido "${currentOrder?.id}" foi aceite.`)
                                setModalVisible(false);
                            }).catch((error) => {
                                Alert.alert("Não foi possível aceitar pedido!", "Tente novamente.");
                            })
                        }}/>
                        <Button text="Recusar pedido" isPrimary={false} onClick={() => void (0)} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}