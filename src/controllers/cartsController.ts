import { getcurrentUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";

export class CartsController {
    static async getCartByUserId(userId: string) {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                throw error;
            }

            return data ? JSON.parse(data.items) : []; 
        } catch (error) {
            console.error("Error fetching cart by user ID:", error);
            throw error;
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

    static async updateItemQuantity(productId: string, newQuantity: number): Promise<void> {
        try {
            const user = await getcurrentUser();
            if (!user) {
                throw new Error("User not authenticated");
            }

            const { data, error } = await supabase
                .from('carts')
                .select('items')
                .eq('user_id', user.id)
                .single();

            if (error) {
                throw error;
            }

            let items = JSON.parse(data.items);
            const itemIndex = items.findIndex((item: any) => item.product_id === productId);

            if (itemIndex !== -1) {
                items[itemIndex].quantity = newQuantity;

                const { error: updateError } = await supabase
                    .from('carts')
                    .update({ items: JSON.stringify(items) })
                    .eq('user_id', user.id);

                if (updateError) {
                    throw updateError;
                }
            }
        } catch (error) {
            console.error("Error updating item quantity:", error);
            throw error;
        }
    }
}