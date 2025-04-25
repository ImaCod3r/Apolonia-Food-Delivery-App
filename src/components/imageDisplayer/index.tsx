import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import { uploadImage, getImageUrl, deleteImage } from '@/utils/storage'; 
import { PickImage } from '@/utils/pickImage';

type Props = {
    currentItem: any
}

export function ImageDisplayer({ currentItem }: Props) {
    const AddNewImage = async (currentItem: any) => {
        const result = await PickImage();

        if (result.canceled || !result.assets.length) {
            return;
        }

        if(currentItem.imageUrl) {
            const path = currentItem.imageUrl.split('/').pop();
            await deleteImage(path as string);
        }

        const image = result.assets[0].uri;
        const data = await uploadImage(image as string);
        const imageUrl = await getImageUrl(data.path);

        return imageUrl;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editButton} onPress={() => { 
                AddNewImage(currentItem);
            }}>
                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                <Text>Add/Mudar imagem</Text>
            </TouchableOpacity>
            
            {!currentItem?.imageUrl && <Text style={{ textAlign: 'center', marginTop: 10 }}>Nenhuma imagem selecionada</Text>}

            {currentItem?.imageUrl && <Image
                source={{ uri: currentItem?.imageUrl }}
                style={styles.image}
                alt="Imagem do produto"
                resizeMode='contain'
            />}
        </View>
    );
}