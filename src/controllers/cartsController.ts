import { supabase } from "@/utils/supabase";

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

            return data;
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
                return null; // Return null if there's an error fetching items
            }
        }

        let items = await getItems(userId);
        if (!items) {
            items = [];
        } else {
            items = JSON.parse(items);
        }

        items.push({ product_id: product.id, quantity: 1, price: product.price}); // Assuming price is 0 for now

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