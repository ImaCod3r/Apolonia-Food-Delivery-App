import { View, Text, FlatList } from "react-native";

import { styles } from "./styles";

import { Category } from "@/components/category";

import { categories } from "@/utils/categories";

export function Categories() {
    return (
        <View style={styles.container}>
            <FlatList 
                data={categories}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <Category icon={item.icon} name={item.name} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.items}
                horizontal
            />
        </View>
    )
}