import { Fornecedor } from "../../../interfaces";
export const fornecedores: Fornecedor[] = [
    {
        id: "1",
        email: "matheusTeste@gmail.com",
        nome: "Matheus",
        produtosAssociados: [
            { value: "1", text: "Produto A" }
        ]
    },
    {
        id: "2",
        email: "flaviaSilva@gmail.com",
        nome: "Flávia Silva",
        produtosAssociados: [
            { value: "1", text: "Produto A" },
            { value: "2", text: "Produto B" }
        ]
    },
    {
        id: "3",
        email: "joaoSouza@gmail.com",
        nome: "João Souza",
        produtosAssociados: [
            { value: "3", text: "Produto C" }
        ]
    },
    {
        id: "4",
        email: "anaLima@gmail.com",
        nome: "Ana Lima",
        produtosAssociados: [
            { value: "4", text: "Produto D" },
            { value: "1", text: "Produto A" },
            { value: "2", text: "Produto B" }
        ]
    },
    {
        id: "5",
        email: "carlaMendes@gmail.com",
        nome: "Carla Mendes",
        produtosAssociados: []
    },
    {
        id: "6",
        email: "luizPereira@gmail.com",
        nome: "Luiz Pereira",
        produtosAssociados: [
            { value: "8", text: "Produto G" },
            { value: "9", text: "Produto H" }
        ]
    }
];
