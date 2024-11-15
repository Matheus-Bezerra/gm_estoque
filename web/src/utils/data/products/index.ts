import { Produto } from "@/utils/data/products/interfaces/index";

export const produtos: Produto[] = [
    {
        id: "m5gr84i9",
        nome: "Hambúrguer",
        tipoControle: "quantidade",
        quantidade: 13,
        status: "ativo",
        fornecedor: {
            id: "1", nome: "Fornecedor A", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"]
        },
        categoria: { id: "1", nome: "Categoria A", produtosAssociados: [] },
        criado: new Date("2024-01-15")
    },
    {
        id: "3u1reuv4",
        nome: "Arroz",
        tipoControle: "peso",
        peso: 10,
        status: "ativo",
        fornecedor: {
            id: "2", nome: "Fornecedor B", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"]
        },
        categoria: { id: "2", nome: "Categoria B", produtosAssociados: [] },
        criado: new Date("2024-02-01")
    },
    {
        id: "derv1ws0",
        nome: "Filé de Frango",
        tipoControle: "peso",
        peso: 9,
        status: "ativo",
        fornecedor: {
            id: "3", nome: "Fornecedor C", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"]
        },
        categoria: { id: "3", nome: "Categoria C", produtosAssociados: [] },
        criado: new Date("2024-02-20")
    },
    {
        id: "5kma53ae",
        nome: "Sobrecoxa",
        tipoControle: "quantidade",
        quantidade: 7,
        status: "inativo",
        fornecedor: {
            id: "4", nome: "Fornecedor D", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"]
        },
        categoria: { id: "4", nome: "Categoria D", produtosAssociados: [] },
        criado: new Date("2024-03-05")
    },
    {
        id: "bhqecj4p",
        nome: "Pacote de Petiscos",
        tipoControle: "quantidade",
        quantidade: 15,
        status: "inativo",
        fornecedor: {
            id: "5", nome: "Fornecedor E", email: "fornecedorA@example.com", produtosAssociados: ["Hambúrguer"]
        },
        categoria: { id: "5", nome: "Categoria E", produtosAssociados: [] },
        criado: new Date("2024-04-10")
    }
];