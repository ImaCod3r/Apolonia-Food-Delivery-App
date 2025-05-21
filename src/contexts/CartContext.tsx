import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartsController } from "@/controllers/cartsController";
import { getUserId, logout } from "@/utils/auth";

type CartContextType = {
    cartItemsQuantity: number;
    setCartItemsQuantity: (quantity: number) => void;
    refreshCartQuantity: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItemsQuantity, setCartItemsQuantity] = useState<number>(0);

    const refreshCartQuantity = async () => {
        try {
            const userId = await getUserId();
            if (userId) {
                const cartItems = await CartsController.getCartItemsByUserId(userId);
                const totalQuantity = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
                setCartItemsQuantity(totalQuantity);
            }
        } catch (error) {
            logout();
        }
    };

    useEffect(() => {
        refreshCartQuantity();
    }, []);

    return (
        <CartContext.Provider value={{ cartItemsQuantity, setCartItemsQuantity, refreshCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};