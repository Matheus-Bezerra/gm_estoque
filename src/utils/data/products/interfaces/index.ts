export interface Fornecedor {
    nome: string,
    email: string,
    produtosAssociados: string[]
}

export interface Categorias {
    nome: string,
    cor: string
}

export interface Produto {
    id: string
    nome: string
    tipoControle: "quantidade" | "peso" 
    quantidade?: number 
    peso?: number
    status: "ativo" | "inativo"
    fornecedores: Fornecedor[]
    categorias: Categorias[]
    criado: Date
}