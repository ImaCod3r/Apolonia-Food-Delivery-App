import { CartProvider } from "@/contexts/CartContext";

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    );
}