import { View, Text, Modal, TouchableOpacity, Alert, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef } from "react";
import styles from "./styles";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from "expo-location";

import { OrdersController } from "@/controllers/ordersController";
import { getUserId, getcurrentUser } from "@/utils/auth";

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
            const currentLocation = await getCurrentPositionAsync();
            setLocation(currentLocation);
        } else {
            Alert.alert("Permissão de localização negada", "Por favor, ative a permissão de localização nas configurações do aplicativo.");
            return;
        }
    }

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        },
            (response) => {
                setLocation(response);
                mapRef.current?.animateCamera({
                    pitch: 70,
                    center: response.coords
                })
            })
    }, []);

    useEffect(() => {
        setModalVisible(true);
    }, [])

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
    }

    const fetchUser= async () => {
        try {
            const user = await getcurrentUser();
            return user;
        } catch (error) {
            Alert.alert("Erro", "Não foi possível buscar os dados do usuário.");
        }
    }

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
            fetchUser().then((user) => {
                if (user) {
                    const userLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude }
                    OrdersController.createOrder(user.id, contact, paymentMethod, userLocation.latitude, userLocation.longitude, items as string, user.name, user.avatar_url);
                } else {
                    Alert.alert("Erro", "ID do usuário não encontrado.");
                }
            })
        } catch (error) {
            throw error;
        }

        return true;
    }

    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                setModalVisible(false);
            }}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Informações de entrega</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Sua localização</Text>
                        <Input value={`${location?.coords.latitude}, ${location?.coords.longitude}`} />
                    </View>
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => Keyboard.dismiss()} 
                        style={{ flex: 1 }}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Informe seu contacto</Text>
                            <Input 
                                placeholder="923 000 000"
                                keyboardType="phone-pad"
                                onChangeText={(text) => {
                                    setContact(text);
                                }} 
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Método de pagamento</Text>
                        <View style={styles.select}>
                            <Picker
                                onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                                selectedValue={paymentMethod} >
                                <Picker.Item label="TPA" value="TPA" color="#000" />
                                <Picker.Item label="Dinheiro" value="Dinheiro" color="#000" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Button text="Pedir" onClick={() => {
                            handleCreateOrder().then((result) => {
                                if(result) {
                                    Alert.alert("Sucesso", "Pedido realizado com sucesso!");
                                    setModalVisible(false);
                                    router.push("/" as any);
                                }
                            })
                        }} isPrimary />
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.openModalButton}>
                <Text style={styles.openModalButtonText}>
                    Adicionar informações de entrega
                </Text>
            </TouchableOpacity>

            {location && (
                <MapView
                    ref={mapRef}
                    style={{ flex: 1, width: "100%" }}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}>
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />
                </MapView>
            )}
        </View>
    )
}