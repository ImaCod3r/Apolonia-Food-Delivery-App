import { supabase } from "@/utils/supabase";

export class OrdersController {
    static async createOrder(userId: string, contact: string, paymentMethod: string, latitude: number, longitude: number, cart_items: string) {
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([
                    {
                        user_id: userId,
                        phone_number: contact,
                        payment_method: paymentMethod,
                        latitude: latitude,
                        longitude: longitude,
                        cart_items: cart_items
                    }
                ])
                .select('*')
                .single();

            if (error) {
                throw error;
            }

            return data;

        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    }

    static async getOrders() {
        const { data, error } = await supabase
            .from("orders")
            .select("*")

        if (error) throw error;
        return data;
    }

    static async getOrderItems(id: number) {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                return
            }

            return data ? JSON.parse(data.items) : [];
        } catch (error) {
            throw error;
        }
    }
}