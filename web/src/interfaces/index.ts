export interface objetoAssociado {
    value: string
    text: string
}
export interface Fornecedor {
    id: string,
    nome: string,
    email: string,
    produtosAssociados: objetoAssociado[]
}

export interface Categoria {
    id: string,
    nome: string,
    cor?: string // caso não vier, vai ser usada a cor padrão do sistema,
    produtosAssociados: objetoAssociado[]
}

export interface Produto {
    id: string
    nome: string
    tipoControle: "quantidade" | "peso" 
    quantidade?: number 
    peso?: number
    status: "ativo" | "inativo"
    fornecedor?: Fornecedor | null
    categoria?: Categoria | null
    criado: Date
}

export interface CategoriaApi {
    id: string,
    name: string,
    color?: string // caso não vier, vai ser usada a cor padrão do sistema,
    createdAt: Date,
    updateAt: string,
    userId: string,
    products: ProdutoApi[]
}

export interface FornecedorAPI {
    id: string,
    name: string,
    email: string,
    createAt: Date,
    updateAt: Date,
    userId: string,
    products: ProdutoApi[]
}

export interface ProdutoApi {
    id: string
    name: string
    typeControl: "UNIT" |  "WEIGHT"
    quantity?: number 
    amount?: number
    status: "ACTIVE" | "INACTIVE"
    supplierId?: string
    categoryId?: string
    category: CategoriaApi
    supplier: FornecedorAPI
    createAt: Date
    updateAt: Date
    userId: string
}

