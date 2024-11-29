import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ArrowUpRight, Boxes, Tag, Upload, Users } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import CardInfo from "@/pages/app/Home/components/CardInfo/index"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/axios"
import { CategoriaApi, FornecedorAPI, ProdutoApi } from "@/interfaces"

export const Home = () => {
    const { data: produtos = [], isLoading: isLoadingProdutos = true } = useQuery<ProdutoApi[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await api.get("/product")
            return response.data
        },
    })

    const { data: fornecedores = [], isLoading: isLoadingFornecedores = true } = useQuery<FornecedorAPI[]>({
        queryKey: ["suppliers"],
        queryFn: async () => {
            const response = await api.get("/supplier")
            return response.data
        },
    })

    const { data: categorias = [], isLoading: isLoadingCategorias = true } = useQuery<CategoriaApi[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await api.get("/category")
            return response.data
        },
    })

    const quantidadeProdutosAtivos = produtos.filter(produto => produto.status === 'ACTIVE').length;

    return (
        <>
            <Helmet title="Inicial" />
            <div className="grid gap-6">
                <div className="grid grid-cols-4 gap-3">
                    <CardInfo
                        title="Produtos cadastrados"
                        value={produtos.length}
                        linkText="produtos"
                        linkUrl="/produtos"
                        Icon={Boxes} // Usando o ícone do Lucide
                        isLoading={isLoadingProdutos}
                    />
                    <CardInfo
                        title="Produtos ativos"
                        value={quantidadeProdutosAtivos}
                        linkText="produtos"
                        linkUrl="/produtos"
                        Icon={Upload}
                        isLoading={isLoadingProdutos}
                    />
                    <CardInfo
                        title="Total de Fornecedores"
                        value={fornecedores.length}
                        linkText="Fornecedores"
                        linkUrl="/fornecedores"
                        Icon={Users}
                        isLoading={isLoadingFornecedores}
                    />
                    <CardInfo
                        title="Total de Categorias"
                        value={categorias.length}
                        linkText="Categorias"
                        linkUrl="/categorias"
                        Icon={Tag}
                        isLoading={isLoadingCategorias}
                    />
                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                    >

                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Produtos</CardTitle>
                                <CardDescription>
                                    Os produtos mais recentes alterados no seu estoque
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <Link to="/produtos">
                                    Ver todos
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {produtos.length > 0 && produtos.slice(0, 5).map(produto => (
                                        <TableRow key={produto.id}>
                                            <TableCell>
                                                <div className="font-medium">{produto.name}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {produto.category && (
                                                        <Badge
                                                            className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none"
                                                            style={{ backgroundColor: produto.category.color }}
                                                        >
                                                            {produto.category.name}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${produto.status == 'ACTIVE' ? 'bg-green-400' : 'bg-red-400'}`}></span>{produto.status == 'ACTIVE' ? 'Ativo' : 'Inativo'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="">Fornecedores</CardTitle>
                                <p>Produtos Associados</p>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            {
                                fornecedores.length > 0 && fornecedores.slice(0, 5).map(fornecedor => (
                                    <div className="flex items-center gap-4" key={fornecedor.id}>
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                            <AvatarFallback>
                                                {
                                                    (() => {
                                                        const nameParts = fornecedor.name.split(" ");
                                                        if (nameParts.length > 1) {
                                                            // Se tiver Sobrenome
                                                            return `${nameParts[0][0].toUpperCase()}${nameParts[nameParts.length - 1][0].toUpperCase()}`;
                                                        } else {
                                                            // Se não tiver Sobrenome, Pega as duas primeiras letras do nome
                                                            return `${nameParts[0][0].toUpperCase()}${nameParts[0][1]?.toUpperCase() || ""}`;
                                                        }
                                                    })()
                                                }
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                {fornecedor.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {fornecedor.email}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">{fornecedor.products.length}</div>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
