import * as ImagePicker from "expo-image-picker";

export async function PickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [1, 1],
        quality: 1,
    });

    return result
}