import { Produto } from "@/utils/data/products/interfaces/index";

export const produtos: Produto[] = [
    {
        id: "m5gr84i9",
        nome: "Hambúrguer",
        tipoControle: "quantidade",
        quantidade: 13,
        status: "ativo",
        fornecedores: [
            { id: "1", nome: "Fornecedor A", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"] }
        ],
        categorias: [
            { id: "1", nome: "Categoria A"},
            { id: "2", nome: "Categoria B" },
            { id: "3", nome: "Categoria C"}
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
            { id: "2", nome: "Fornecedor B", email: "fornecedorB@example.com", produtosAssociados: ["Arroz"] }
        ],
        categorias: [
            { id: "4", nome: "Categoria D" }
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
            { id: "3", nome: "Fornecedor C", email: "fornecedorC@example.com", produtosAssociados: ["Filé de Frango"] }
        ],
        categorias: [
            { id: "4", nome: "Categoria D"},
            { id: "3", nome: "Categoria C" }
        ],
        criado: new Date("2024-02-20")
    },
    {
        id: "5kma53ae",
        nome: "Sobrecoxa",
        tipoControle: "quantidade",
        quantidade: 7,
        status: "inativo",
        fornecedores: [
            { id: "4", nome: "Fornecedor D", email: "fornecedorD@example.com", produtosAssociados: ["Sobrecoxa"] }
        ],
        categorias: [
            { id: "3", nome: "Categoria C",  }
        ],
        criado: new Date("2024-03-05")
    },
    {
        id: "bhqecj4p",
        nome: "Pacote de Petiscos",
        tipoControle: "quantidade",
        quantidade: 15,
        status: "inativo",
        fornecedores: [
            { id: "5", nome: "Fornecedor E", email: "fornecedorE@example.com", produtosAssociados: ["Pacote de Petiscos"] }
        ],
        categorias: [
            { id: "2", nome: "Categoria B", cor: "#D2691E" },
            { id: "1", nome: "Categoria A", cor: "#FF4500" }
        ],
        criado: new Date("2024-04-10")
    }
];