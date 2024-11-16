import { Categoria } from "@/interfaces";

export const categorias: Categoria[] = [
    {
        id: "1",
        nome: "Fast Food",
        cor: "#dc2626",
        produtosAssociados: [
            { value: "1", text: "Produto A" }
        ]
    },
    {
        id: "2",
        nome: "Assado",
        cor: "#183dc2",
        produtosAssociados: [
            { value: "1", text: "Produto A" },
            { value: "2", text: "Produto B" }
        ]
    },
    {
        id: "3",
        nome: "Bebidas",
        cor: "#0d9488",
        produtosAssociados: [
            { value: "3", text: "Produto C" }
        ]
    },
    {
        id: "4",
        nome: "Doces",
        cor: "#d97706",
        produtosAssociados: [
            { value: "4", text: "Produto D" },
            { value: "1", text: "Produto A" },
            { value: "2", text: "Produto B" }
        ]
    },
    {
        id: "5",
        nome: "Vegetariano",
        cor: "#16a34a",
        produtosAssociados: [],
    },
    {
        id: "6",
        nome: "Massas",
        cor: "#9333ea",
        produtosAssociados: [
            { value: "4", text: "Produto D" },
            { value: "2", text: "Produto B" }
        ]
    },
];
