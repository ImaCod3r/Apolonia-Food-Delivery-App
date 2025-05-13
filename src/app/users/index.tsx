import { View, Text, FlatList, StyleSheet } from "react-native";
import styles from "./styles";

import { Back } from "@/components/back";
import { useEffect, useState } from "react";
import { UsersController } from "@/controllers/usersController"; // Supondo que exista um controlador para buscar usuários

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await UsersController.getAllUsers(); // Função para buscar usuários
            setUsers(response);
            console.log(response);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderUser = ({ item }: { item: any }) => (
        <View style={tableStyles.row}>
            <Text style={tableStyles.cell}>{item.name}</Text>
            <Text style={tableStyles.cell}>{item.email}</Text>
            <Text style={tableStyles.cell}>{Boolean(item.isAdmin) ? "Admin" : "User"}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Back />
                <Text style={styles.heading}>Usuários</Text>
            </View>

            <Text>Gerencie todos usuários cadastrados no sistema.</Text>

            <View style={tableStyles.table}>
                <View style={tableStyles.headerRow}>
                    <Text style={tableStyles.headerCell}>Nome</Text>
                    <Text style={tableStyles.headerCell}>Email</Text>
                    <Text style={tableStyles.headerCell}>Role</Text>
                </View>
                <FlatList
                    data={users}
                    renderItem={renderUser}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
}

const tableStyles = StyleSheet.create({
    table: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        padding: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center"
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});