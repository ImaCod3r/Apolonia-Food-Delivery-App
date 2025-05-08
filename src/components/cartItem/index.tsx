import { View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { COLORS } from "@/styles/colors";

import { QuantityControl } from "@/components/quantityControl";
import { ProductsController } from "@/controllers/productsController";

type Props = {
    item: any;
    onQuantityChange: (productId: string, newQuantity: number) => void; // Callback para notificar mudanças
};

export function CartItem({ item, onQuantityChange }: Props) {
    const [currentProduct, setCurrentProduct] = useState<any>({});

    useEffect(() => {
        ProductsController.getProductById(item.product_id).then((product) => {
            if (!product) return;
            setCurrentProduct(product);
        });
    }, []);

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

            <TouchableOpacity style={styles.deleteButton}>
                <MaterialIcons name="delete" size={20} color={COLORS.black} />
            </TouchableOpacity>
        </View>
    );
}