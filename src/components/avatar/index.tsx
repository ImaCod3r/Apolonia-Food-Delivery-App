import { View, Image, TouchableOpacity, Modal, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { styles } from "./styles";

import { uploadImage, deleteImage,getImageUrl } from "@/utils/storage";
import { UsersController } from "@/controllers/usersController";
import { PickImage } from "@/utils/pickImage";

type Props = {
    currentUser: any,
    onAvatarUpdate?: (newAvatarUrl: string) => void;
}

export function Avatar({ currentUser, onAvatarUpdate }: Props) {
    const [modalActive, setModalActive] = useState(false);

    const uploadAvatar = async (currentUser: any) => {
        const result = await PickImage();

        if(result.canceled || !result.assets.length) {
            return;
        }

        if(currentUser.avatar_url) {
            const path = currentUser.avatar_url.split('/').pop();
            await deleteImage(path as string);
        }

        const image = result.assets[0].uri;
        const data = await uploadImage(image as string);
        const imageUrl = await getImageUrl(data.path);
        
        UsersController.updateUser(currentUser.id, currentUser.name, currentUser.email, currentUser.password, imageUrl);

        if (onAvatarUpdate) {
            onAvatarUpdate(imageUrl);
        }
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} 
                onPress={() => setModalActive(true)}>
                <Image source={{ uri: currentUser?.avatar_url || 'https://github.com/imaCod3r.png' }} style={styles.image} />
            </TouchableOpacity>

            <Modal 
                visible={modalActive}
                transparent 
                onRequestClose={(e) => setModalActive(false)} 
                animationType="fade">
                <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.option}
                    onPress={async () => {
                        uploadAvatar(currentUser);
                        setModalActive(false);
                    }}>
                        <MaterialIcons name="folder" size={30} />
                        <Text>Escolher uma foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="delete" size={30} />
                        <Text>Remover foto</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}