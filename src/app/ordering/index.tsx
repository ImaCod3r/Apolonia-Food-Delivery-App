import { View, Text, Modal, TouchableOpacity, Alert, Keyboard } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect, useRef } from "react";
import styles from "./styles";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    LocationObject,
    LocationAccuracy
} from "expo-location";

import { OrdersController } from "@/controllers/ordersController";
import { getcurrentUser } from "@/utils/auth";
import { Back } from "@/components/back";
import { MaterialIcons } from "@expo/vector-icons";

export default function Ordering() {
    const params = useLocalSearchParams();
    const [contact, setContact] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("TPA");
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<MapView>(null);

    const requestLocationPermissions = async () => {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            await watchPositionAsync(
                {
                    accuracy: LocationAccuracy.BestForNavigation, // Maior precisão possível
                    timeInterval: 1000, // Atualizações a cada 1 segundo
                    distanceInterval: 0.5, // Atualizações a cada 0.5 metros
                },
                (newLocation) => {
                    setLocation(newLocation);
                    mapRef.current?.animateCamera({
                        center: {
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                        },
                        pitch: 70,
                        heading: newLocation.coords.heading ?? 0,
                    });
                }
            );
        } else {
            Alert.alert(
                "Permissão de localização negada",
                "Por favor, ative a permissão de localização nas configurações do aplicativo."
            );
        }
    };

    useEffect(() => {
        requestLocationPermissions().then(() => {
            setModalVisible(true);
        })
    }, []);

    const verifyFields = (contact: string, paymentMethod: string) => {
        const isContactValid = contact.trim() !== '' && contact.length === 9;
        const isPaymentMethodValid = paymentMethod.trim() !== '';

        if (!isContactValid) {
            Alert.alert("Campo vazio", "Por favor, preencha o campo de contacto.");
            return false;
        }

        if (!isPaymentMethodValid) {
            Alert.alert("Campo vazio", "Por favor, selecione o método de pagamento.");
            return false;
        }

        return true;
    };

    const handleCreateOrder = async () => {
        if (!location) {
            Alert.alert("Erro", "Localização não encontrada.");
            return;
        }

        const isValid = verifyFields(contact, paymentMethod);

        if (!isValid) {
            return;
        }

        const items = params.cartItems;

        try {
            const user = await getcurrentUser();
            if (user) {
                const userLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
                await OrdersController.createOrder(
                    user.id,
                    contact,
                    paymentMethod,
                    userLocation.latitude,
                    userLocation.longitude,
                    items as string,
                    user.name,
                    user.avatar_url
                );
                Alert.alert("Sucesso", "Pedido realizado com sucesso!");
                setModalVisible(false);
                router.push("/" as any);
            } else {
                Alert.alert("Erro", "ID do usuário não encontrado.");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar o pedido.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <Back />
            </View>


            <View style={styles.screenFooter}>
                <TouchableOpacity style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="keyboard-arrow-up" size={25} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeModal} onPress={() => setModalVisible(false)}>
                        <MaterialIcons name="close" size={25} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Informações de entrega</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Sua localização</Text>
                        <Input value={`${location?.coords.latitude}, ${location?.coords.longitude}`} editable={false} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => Keyboard.dismiss()}
                        style={{ flex: 1 }} >
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Informe seu contacto</Text>
                            <Input
                                placeholder="923 000 000"
                                keyboardType="phone-pad"
                                onChangeText={(text) => setContact(text)}
                                value={contact}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Método de pagamento</Text>
                        <View style={styles.select}>
                            <Picker
                                onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                                selectedValue={paymentMethod}
                            >
                                <Picker.Item label="TPA" value="TPA" color="#000" />
                                <Picker.Item label="Dinheiro" value="Dinheiro" color="#000" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Button
                            text="Pedir"
                            onClick={handleCreateOrder}
                            isPrimary
                        />
                    </View>
                </View>
            </Modal>

            {location && (
                <MapView
                    ref={mapRef}
                    style={{ flex: 1, width: "100%" }}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />
                </MapView>
            )}
        </View>
    );
}