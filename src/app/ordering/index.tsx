import { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";

import { Input } from "@/components/input";

import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from "expo-location";

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
                        <Text style={styles.label}>Onde deseja receber?</Text>
                        <Input placeholder="Procurar localização" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Informe seu contacto</Text>
                        <Input placeholder="+244 923 000 000" />
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