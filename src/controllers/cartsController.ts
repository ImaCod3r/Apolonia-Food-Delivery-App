import { getcurrentUser } from "@/utils/auth";
import { supabase } from "@/utils/supabase";

export class CartsController {
    static async getCartItemsByUserId(userId: string) {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                throw error;
            }

            if(!data) {
                return
            }

            return data ? JSON.parse(data.items) : []; 
        } catch (error) {
            throw error;
        }
    }

    static async addItemToCart(userId: any, product: any) {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('items')
                .eq('user_id', userId)
                .single();

            if (error && error.code !== 'PGRST116') { // Ignore "row not found" error
                throw error;
            }

            console.log(data);
            
            let items = data ? JSON.parse(data.items) : [];
            const existingItemIndex = items.findIndex((item: any) => item.product_id === product.id);

            if (existingItemIndex !== -1) {
                items[existingItemIndex].quantity += 1;
            } else {
                items.push({ product_id: product.id, quantity: 1, price: product.price });
            }

            const { error: updateError } = await supabase
                .from('carts')
                .upsert({ user_id: userId, items: JSON.stringify(items) }, { onConflict: 'user_id' });

            if (updateError) {
                throw updateError;
            }
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