import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

import { Link } from "@/components/link";
import { Button } from '@/components/button';
import { router } from 'expo-router';

export default function Admin() {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.heading}>Painel de Administrador</Text>
            </View>
            <View style={styles.linksContainer}>
                <Link name="Pedidos" url="/orders" icon="book" />
                <Link name="Cardápio" url="/products" icon="inventory" />
                <Link name="Usuários" url="/products" icon="supervised-user-circle" />
            </View>

            <Button text='Ir para o App' isPrimary={false} onClick={() => router.replace('/' as any)}/>
        </ScrollView>
    )
}