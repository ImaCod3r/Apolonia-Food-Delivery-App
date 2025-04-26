import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import { uploadImage, getImageUrl } from '@/utils/storage'; 
import { PickImage } from '@/utils/pickImage';

type Props = {
    currentItem?: any; // O item atual (opcional para novos itens)
    onImageChange: (imageUrl: string) => void; // Callback para atualizar a imagem no componente pai
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

            // Atualiza a pré-visualização local
            setLocalImageUrl(imageUri);

            // Faz o upload da imagem
            const data = await uploadImage(imageUri);
            if (!data || !data.path) {
                throw new Error("Erro ao fazer upload da imagem");
            }

            // Obtém a URL pública da imagem
            const imageUrl = await getImageUrl(data.path);

            // Atualiza o estado local e chama o callback para o componente pai
            setLocalImageUrl(imageUrl); // Atualiza a pré-visualização com a URL pública
            onImageChange(imageUrl); // Atualiza o estado no componente pai
        } catch (error) {
            console.error("Erro ao adicionar nova imagem:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Botão para adicionar ou mudar a imagem */}
            <TouchableOpacity style={styles.editButton} onPress={AddNewImage}>
                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                <Text>Add/Mudar imagem</Text>
            </TouchableOpacity>
            
            {/* Exibe mensagem caso não tenha imagem */}
            {!localImageUrl && !currentItem?.image_url && (
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                    Nenhuma imagem selecionada
                </Text>
            )}

            {/* Exibe a imagem selecionada ou a imagem antiga */}
            {localImageUrl ? (
                <Image
                    source={{ uri: localImageUrl }}
                    style={styles.image}
                    alt="Imagem do produto"
                    resizeMode="contain"
                />
            ) : currentItem?.image_url ? (
                <Image
                    source={{ uri: currentItem.image_url }}
                    style={styles.image}
                    alt="Imagem do produto"
                    resizeMode="contain"
                />
            ) : null}
        </View>
    );
}