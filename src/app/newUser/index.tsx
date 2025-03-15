import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

import { Button } from "@/components/button";

export default function NewUser() {
    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image source={require('@/assets/hero.png')} style={styles.heroImage} />

                <View style={styles.heroText}>
                    <Text style={styles.head}>Nosso menu</Text>
                    <Text style={styles.text}>Na palma da sua mão</Text>
                </View>
            </View>

            <View style={styles.buttonWrapper}>
                <Button text="Entrar" isPrimary onClick={() => router.navigate("/signIn")} />
                <Button text="Criar uma conta" isPrimary={false} onClick={() => router.navigate("/signUp")} />
            </View>

            <Text style={styles.footerText}>Todos diretos reservados</Text>
        </View>
    )
}