import { MaterialIcons } from "@expo/vector-icons"

export const categories = [
    {
        name: "Pratos",
        icon: "dinner-dining" as keyof typeof MaterialIcons.glyphMap
    },
    {
        name: "Bebidas",
        icon: "local-drink" as keyof typeof MaterialIcons.glyphMap
    },
    {
        name: "Sobremesas",
        icon: "cake" as keyof typeof MaterialIcons.glyphMap
    }
] 