import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";

import { Back } from "@/components/back";

export default function History() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Histórico</Text>
            </View>

            <FlatList
                data={[
                    {
                        name: 'Item 1',
                        date: '2021-09-01',
                        value: 100
                    },
                    {
                        name: 'Item 2',
                        date: '2021-09-02',
                        value: 200
                    },
                    {
                        name: 'Item 3',
                        date: '2021-09-03',
                        value: 300
                    }
                ]}
                renderItem={({item}) => (
                    <View style={styles.historyItem}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text>{item.value} AOA</Text>
                        <Text style={styles.itemDate}>{item.date}</Text>
                    </View>
                )}
            />    
        </View>
    )
}