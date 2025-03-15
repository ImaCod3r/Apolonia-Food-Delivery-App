import { View, Image, TouchableOpacity, Modal, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { styles } from "./styles";

export function ProfilePicture() {
    const [modalActive, setModalActive] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={
                () => {
                    setModalActive(true);
                }
            }>
                <Image source={{ uri: 'https://github.com/imaCod3r.png' }} style={styles.image} />
            </TouchableOpacity>

            <Modal 
                visible={modalActive}
                transparent 
                onRequestClose={(e) => setModalActive(false)} 
                animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="photo-camera" size={30} />
                        <Text>Tirar uma foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="folder" size={30} />
                        <Text>Escolher uma foto</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}