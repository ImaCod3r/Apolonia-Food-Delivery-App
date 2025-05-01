import { supabase } from "@/utils/supabase";

export class OrdersController {
    static async createOrder(userId: string, contact: string, paymentMethod: string, location: any, cartItems: any) {
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([
                    {
                        user_id: userId,
                        phone_number: contact,
                        payment_method: paymentMethod,
                        location: JSON.stringify(location),
                        items: cartItems
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
}