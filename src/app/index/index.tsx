import { View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { CartButton } from "@/components/cartButton";
import { SearchBar } from "@/components/searchBar";
import { Categories } from "@/components/categories";
import { Menu } from "@/components/menu";
import { router } from "expo-router";

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('@/assets/logo.png')} style={styles.logo} />

                <View style={styles.headerActions}>
                    <CartButton />
                    
                    <TouchableOpacity onPress={() => router.navigate('/profile')}>
                        <Image source={{ uri: "https://github.com/imaCod3r.png" }} style={styles.profile} /> 
                    </TouchableOpacity>
                </View>

            </View>
            
            <SearchBar icon="search" />

            <Categories />

            <Menu />
        </View>
    )
}