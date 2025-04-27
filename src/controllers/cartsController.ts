import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";

export class CartsController {
    static async getCartByUserId(userId: any) {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', userId as any)
                .single();

            if (error) {
                throw error;
            }

            return JSON.parse(data.items); // Parse the items from JSON string to object
        } catch (error) {
            console.error("Error fetching cart:", error);

        }
    }

    static async addItemToCart(userId: string, product: any) {
        const getItems = async (userId: string) => {
            try {
                const { data, error } = await supabase
                    .from('carts')
                    .select('items')
                    .eq('user_id', userId)
                    .single();

                if (error) {
                    throw error;
                }

                return data.items;
            } catch (error) {
                Alert.alert("Error", "Error fetching items from cart. Please try again.");
                return null; 
            }
        }

        let items = await getItems(userId);
        if (!items) {
            items = [];
        } else {
            items = JSON.parse(items);
        }

        items.push({ product_id: product.id, quantity: 1, price: product.price});

        try {
            const { data, error } = await supabase
                .from('carts')
                .insert([{ user_id: userId, items: JSON.stringify(items)}])
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error("Error adding item to cart:", error);
            throw error;
        }
    }

}