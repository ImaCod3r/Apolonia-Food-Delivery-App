import { MaterialIcons } from "@expo/vector-icons"

export const categories = [
    {
        name: "pratos",
        icon: "dinner-dining" as keyof typeof MaterialIcons.glyphMap
    },
    {
        name: "Bebidas",
        icon: "local-drink" as keyof typeof MaterialIcons.glyphMap
    },
    {
        name: "sobremesas",
        icon: "cake" as keyof typeof MaterialIcons.glyphMap
    },
    {
        name: "Lanches",
        icon: "fastfood" as keyof typeof MaterialIcons.glyphMap
    }
] 