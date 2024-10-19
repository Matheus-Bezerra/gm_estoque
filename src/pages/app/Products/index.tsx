import { Button } from "@/components/ui/button"

export const Products = () => {
    return (
        <>
            <Helmet title="Produtos" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Produtos</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie seus produtos de forma eficiente</p>
            <div className="mt-5">
                <Button>+ Adicionar Produto</Button>
            </div>
            <div className="mt-1">
                <DataTable />
            </div>
        </>
    )
}

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Helmet } from "react-helmet-async"

const data: Produto[] = [
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

export const columns: ColumnDef<Produto>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "nome",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("nome")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "tipoControle",
        header: "Tipo de Controle",
        cell: ({ row }) => <div>{row.getValue("tipoControle") === "quantidade" ? "Quantidade" : "Peso"}</div>,
    },
    {
        accessorKey: "quantidade",
        header: () => <div>Quantidade</div>,
        cell: ({ row }) => (
            <div>{row.getValue("quantidade") || "-"}</div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "peso",
        header: () => <div>Peso</div>,
        cell: ({ row }) => (
            <div>{row.getValue("peso") || "-"}</div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "fornecedores",
        header: "Fornecedores",
        cell: ({ row }) => {
            const fornecedores = row.getValue("fornecedores") as Fornecedor[]; // Asserção de tipo
            return (
                <div>
                    {fornecedores.map((fornecedor) => fornecedor.nome).join(", ")}
                </div>
            );
        },
    },
    {
        accessorKey: "categorias",
        header: "Categorias",
        cell: ({ row }) => {
            const categorias = row.getValue("categorias") as Categorias[]; // Asserção de tipo
            return (
                <div>
                    {categorias.map((categoria) => categoria.nome).join(", ")}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const produto = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(produto.id)}
                        >
                            <SquarePen className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-muted-foreground">
                            <Trash2 className="h-4 w-4 mr-2 text-red-400" />  <span>Excluir</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Procurar produto"
                    value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nome")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linha(s) Selecionadas
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </div>
    )
}
