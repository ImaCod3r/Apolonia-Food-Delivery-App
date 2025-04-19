import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

import { Link } from "@/components/link";

export default function Admin() {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.heading}>Painel de Administrador</Text>
            </View>
            <View>
                <Link name="Gerenciar Produtos" url="/products" icon="inventory" />
            </View>
        </ScrollView>
    )
}