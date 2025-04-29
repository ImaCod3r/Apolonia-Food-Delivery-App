import { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text } from "react-native";
import styles from "./styles";

import { Back } from "@/components/back";
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

    return (
        <View style={styles.container}>
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