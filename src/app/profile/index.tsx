import { View, Image, Text, ScrollView } from "react-native";
import { styles } from "./styles";

import { ProfilePicture } from "@/components/profilePic";

export default function Profile() {
    return (
        <ScrollView style={styles.container}>

            <ProfilePicture />

            <Text style={styles.userName}>Edson Rodrigues</Text>
        </ScrollView>
    )
}