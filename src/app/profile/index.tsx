import { View, Image, Text, ScrollView } from "react-native";
import { styles } from "./styles";

import { ProfilePicture } from "@/components/profilePic";
import { Option } from "@/components/option";
import { Back } from "@/components/back";
import { Button } from "@/components/button";
import { router } from "expo-router";

export default function Profile() {
    return (
        <ScrollView style={styles.container}>
            <Back />
            <ProfilePicture />
            <Text style={styles.userName}>Edson Rodrigues</Text>

            <View style={styles.menuOptions}>
                <Option label="Detalhes pessoais" route="cart" />
                <Option label="Histórico de pedidos" route="history" />
                <Option label="Termos de Serviço" route="terms" />

                <Button text="Terminar sessão" onClick={() => router.navigate('/newUser')}/>                 
            </View>
        </ScrollView>
    )
}