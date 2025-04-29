import { supabase } from "@/utils/supabase";

export class ProductsController {
    static async getAllProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;
        return data;
    }

    static async getProductById(id: string) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    static async createProduct(name: string, category: string, description: string, price: number, image_url: string) {
        const { error } = await supabase
            .from('products')
            .insert([{
                name: name,
                description: description,
                price: price,
                image_url: image_url,
                category: category
            }]);
        
        if (error) throw error;
        console.log('Product created successfully!');
    }

    static async updateProduct(id: any, updates: Partial<{ name: string; category: string; description: string; price: number; image_url: string }>) {
        const { error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
    }

    static async deleteProduct(id: string) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}