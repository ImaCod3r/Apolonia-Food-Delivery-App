import React from 'react';
import { StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { CartProvider } from '@/contexts/CartContext';
import { COLORS } from '@/styles/colors';

export default function Layout() {
    return (
        <CartProvider>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <Slot />
        </CartProvider>
    );
}