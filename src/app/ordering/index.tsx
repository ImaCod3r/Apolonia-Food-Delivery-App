import { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import styles from "./styles";

import { Input } from "@/components/input";

import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from "expo-location";
import { Button } from "@/components/button";

export default function Ordering() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<MapView>(null);

    const requestLocationPermissions = async () => {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentLocation = await getCurrentPositionAsync();
            setLocation(currentLocation);
            console.log(currentLocation)
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
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Informe seu contacto</Text>
                        <Input placeholder="+244 923 000 000" />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Método de pagamento</Text>
                        <View style={styles.select}>
                            <Picker>
                                <Picker.Item label="TPA" value="TPA" />
                                <Picker.Item label="Numarario" value="Numerario" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Button text="Pedir" onClick={() => void (0)} isPrimary />
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