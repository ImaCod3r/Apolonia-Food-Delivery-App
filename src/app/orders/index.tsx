import { ScrollView, View, Text, FlatList, TouchableOpacity, Modal, Alert, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";

import { Back } from "@/components/back";
import { Button } from "@/components/button";

import { OrdersController } from "@/controllers/ordersController";
import { ProductsController } from "@/controllers/productsController";
import { MaterialIcons } from "@expo/vector-icons";

export default function Orders() {
    const [modalVisible, setModalVisible] = useState(false);
    const [orders, setOrders] = useState<any[] | null>(null);

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

    const rejectOrder = async (orderId: number) => {
        try {
            await OrdersController.UpdateOrderStatus(orderId, "rejeitado");
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [orders]);

    interface Order {
        id: number;
        owner_name: string;
        created_at: string;
        status: string;
        cart_items?: string;
    }

    const renderOrder = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={tableStyles.row}
            onPress={() => {
                setCurrentOrder(item);

                const waitForCartToLoad = async () => {
                    while (!item.cart_items) {
                        await new Promise((resolve) => setTimeout(resolve, 100));
                    }

                    let productsList = [];

                    for (let i of JSON.parse(item.cart_items || "[]")) {
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
            }}>
                <Text style={tableStyles.cell}>{item.owner_name}</Text>
                <Text style={tableStyles.cell}>
                    {item.created_at
                        ? `${new Date(item.created_at).toLocaleDateString()} ${new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : ""}
                </Text>
                <Text style={tableStyles.cell}>{item.status}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Pedidos</Text>
            </View>

            <Text>
                Aqui você pode visualizar todos os pedidos realizados.
            </Text>

            <View style={tableStyles.table}>
                <View style={tableStyles.headerRow}>
                    {/* <Text style={tableStyles.headerCell}>#</Text> */}
                    <Text style={tableStyles.headerCell}>Nome</Text>
                    <Text style={tableStyles.headerCell}>Data</Text>
                    <Text style={tableStyles.headerCell}>Estado</Text>
                </View>
                <FlatList
                    data={orders}
                    renderItem={renderOrder}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                        setModalVisible(false);
                    }}>
                        <MaterialIcons name="close" size={25} />
                    </TouchableOpacity>
                    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
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
                        }} />
                        <Button text="Recusar pedido" isPrimary={false} onClick={() => {
                            rejectOrder(currentOrder?.id).then(() => {
                                Alert.alert("Sucesso!", `O pedido "${currentOrder?.id}" foi rejeitado.`)
                                setModalVisible(false);
                            }).catch((error) => {
                                Alert.alert("Não foi possível rejeitar pedido!", "Tente novamente.");
                            })
                        }} />
                    </View>
                </View>
            </Modal>

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