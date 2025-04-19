import { TouchableOpacity, Text } from 'react-native';
import { RelativePathString, router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

import styles from "./styles";

type Props = {
    name: string
    url: any
    icon: keyof typeof MaterialIcons.glyphMap
}

export function Link({ name, url, icon }: Props) {
    return (
        <TouchableOpacity onPress={() => router.navigate(url)} style={styles.container}>
            <MaterialIcons name={icon} size={24} color="black" />
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}