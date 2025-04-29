import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import { uploadImage, getImageUrl, deleteImage } from '@/utils/storage'; 
import { ProductsController } from '@/controllers/productsController';
import { PickImage } from '@/utils/pickImage';

type Props = {
    currentItem: any; 
    onImageChange: (imageUrl: string) => void; 
};

export function ImageDisplayer({ currentItem, onImageChange }: Props) {
    const [localImageUrl, setLocalImageUrl] = useState(currentItem?.image_url || null);

    const AddNewImage = async () => {
        try {
            const result = await PickImage();

            if (result.canceled || !result.assets.length) {
                return;
            }

            // Obtém a URI da imagem selecionada
            const imageUri = result.assets[0].uri;

            // Faz o upload da imagem
            const data = await uploadImage(imageUri);
            if (!data || !data.path) {
                throw new Error("Erro ao fazer upload da imagem");
            }

            // Obtém a URL pública da imagem
            const imageUrl = await getImageUrl(data.path);

            if (!imageUrl) {
                Alert.alert("Erro ao obter a URL pública da imagem");
                return;
            }

            console.log("URL da imagem:", imageUrl);

            // Deleta a imagem anterior, se existir
            if (currentItem?.image_url) {
                try {
                    const path = currentItem.avatar_url.split('/').pop();
                    await deleteImage(path as string);
                } catch (deleteError) {
                    console.warn("Erro ao deletar a imagem anterior:", deleteError);
                }
            }

            // Atualiza o estado do componente pai com a nova URL da imagem
            ProductsController.updateProduct(currentItem.id, { image_url: imageUrl }).then(() => {
                onImageChange(imageUrl);
                setLocalImageUrl(imageUrl);
            }).catch((error) => {
                Alert.alert("Erro", "Erro ao atualizar/adicionar foto do produto. Tente novamente.");
            })
        } catch (error) {
            console.error("Erro ao adicionar nova imagem:", error);
            Alert.alert("Erro", "Erro ao adicionar nova imagem. Tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Botão para adicionar ou mudar a imagem */}
            <TouchableOpacity style={styles.editButton} onPress={() => AddNewImage()}>
                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                <Text>Add/Mudar imagem</Text>
            </TouchableOpacity>
            
            {!localImageUrl && (
                <Text >Nenhuma imagem disponível</Text>
            )}
                
            {/* Exibe a imagem se disponível */}    
            {localImageUrl && (
                <Image 
                source={{ uri: localImageUrl }} 
                resizeMode='contain'
                style={styles.image} />
            )}

            {!localImageUrl && currentItem?.image && (
                <Image 
                    source={{ uri: currentItem.image }} 
                    resizeMode='contain'
                    style={styles.image} 
                />
            )}


        </View>
    );
}