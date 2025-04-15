import React from "react";
import { StatusBar } from "react-native";
import { Slot, Redirect } from "expo-router";

import { COLORS } from "@/styles/colors";

export default function Layout() {
    const isNew = true;
    return ( 
            <>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}  />
                {isNew && <Redirect href="/newUser" />}
                <Slot />
            </>
         )
}