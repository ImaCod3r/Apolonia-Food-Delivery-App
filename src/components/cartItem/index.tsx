import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

import { QuantityControl } from "@/components/quantityControl";
import { ProductsController } from "@/controllers/productsController";
import { CartsController } from "@/controllers/cartsController";
import { getUserId } from "@/utils/auth";

type Props = {
    item: any;
    onQuantityChange: (productId: string, newQuantity: number) => void; // Callback para notificar mudanças
    onItemRemove: (productId: string) => void; // Callback para notificar remoção
};

export function CartItem({ item, onQuantityChange, onItemRemove }: Props) {
    const [currentProduct, setCurrentProduct] = useState<any>({});

    useEffect(() => {
        ProductsController.getProductById(item.product_id).then((product) => {
            if (!product) return;
            setCurrentProduct(product);
        });
    }, []);

    const handleRemoveItem = async () => {
        try {
            const userId = await getUserId();
            await CartsController.removeItemFromCart(userId, item.product_id);
            onItemRemove(item.product_id); // Notifica o componente pai para atualizar a lista
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover o item do carrinho.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: currentProduct?.image_url }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <View>
                    <Text style={styles.itemName}>{currentProduct?.name}</Text>
                    <Text style={styles.itemCategory}>{currentProduct?.category}</Text>
                    <Text style={styles.itemPrice}>AOA {currentProduct?.price}</Text>
                </View>

                <QuantityControl item={item} onQuantityChange={onQuantityChange} />
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveItem}>
                <MaterialIcons name="delete" size={20} color={COLORS.black} />
            </TouchableOpacity>
        </View>
    );
}