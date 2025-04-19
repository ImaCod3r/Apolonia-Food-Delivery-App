import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function  Products() {
    return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Gerenciar Produtos</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={{ padding: 10, backgroundColor: "#ccc", borderRadius: 5 }}>
                    <Text>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}