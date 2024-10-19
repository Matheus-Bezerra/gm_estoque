import { Produto } from "@/utils/data/products/interfaces/index";

export const produtos: Produto[] = [
    {
        id: "m5gr84i9",
        nome: "Hambúrguer",
        tipoControle: "quantidade",
        quantidade: 13,
        status: "ativo",
        fornecedores: [
            { nome: "Fornecedor A", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"] }
        ],
        categorias: [
            { nome: "Comida", cor: "#FFA07A" },
            { nome: "Fast Food", cor: "#FF6347" },
            { nome: "Principais", cor: "#FF4500" }
        ],
        criado: new Date("2024-01-15")
    },
    {
        id: "3u1reuv4",
        nome: "Arroz",
        tipoControle: "peso",
        peso: 10,
        status: "ativo",
        fornecedores: [
            { nome: "Fornecedor B", email: "fornecedorB@example.com", produtosAssociados: ["Arroz"] }
        ],
        categorias: [
            { nome: "Comida", cor: "#FFD700" }
        ],
        criado: new Date("2024-02-01")
    },
    {
        id: "derv1ws0",
        nome: "Filé de Frango",
        tipoControle: "peso",
        peso: 9,
        status: "ativo",
        fornecedores: [
            { nome: "Fornecedor C", email: "fornecedorC@example.com", produtosAssociados: ["Filé de Frango"] }
        ],
        categorias: [
            { nome: "Mistura", cor: "#8B0000" },
            { nome: "Fritura", cor: "#FF8C00" }
        ],
        criado: new Date("2024-02-20")
    },
    {
        id: "5kma53ae",
        nome: "Sobrecoxa",
        tipoControle: "quantidade",
        quantidade: 7,
        status: "ativo",
        fornecedores: [
            { nome: "Fornecedor D", email: "fornecedorD@example.com", produtosAssociados: ["Sobrecoxa"] }
        ],
        categorias: [
            { nome: "Assado", cor: "#DEB887" }
        ],
        criado: new Date("2024-03-05")
    },
    {
        id: "bhqecj4p",
        nome: "Pacote de Petiscos",
        tipoControle: "quantidade",
        quantidade: 15,
        status: "ativo",
        fornecedores: [
            { nome: "Fornecedor E", email: "fornecedorE@example.com", produtosAssociados: ["Pacote de Petiscos"] }
        ],
        categorias: [
            { nome: "Petiscos", cor: "#D2691E" },
            { nome: "Lanches", cor: "#FF4500" }
        ],
        criado: new Date("2024-04-10")
    }
];