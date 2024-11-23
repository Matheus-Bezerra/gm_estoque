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
import { CategoriaApi, FornecedorAPI, ProdutoApi } from "@/interfaces"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema"
import { DialogDeleteProduto } from "@/pages/app/Products/components/Dialogs/DialogDeleteProduto"
import { DialogEditProduto } from "@/pages/app/Products/components/Dialogs/DialogEditProduto"
import { api } from "@/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"


export const columns = (fornecedoresLista: FornecedorAPI[], categoriasLista: CategoriaApi[]): ColumnDef<ProdutoApi>[] => [
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
        accessorKey: "updateAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Última Atualização
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            function formatDate(date: Date): string {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");

                return `${day}/${month}/${year} ${hours}:${minutes}`;
            }


            const rawDate = row.getValue("updateAt") as string;
            const formattedDate = formatDate(new Date(rawDate));
            return <div className="capitalize">{formattedDate}</div>;

        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize"><span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${row.getValue('status') == 'ACTIVE' ? 'bg-green-400' : 'bg-red-400'}`}></span>{row.getValue("status") == 'ACTIVE' ? 'Ativo' : 'Inativo'}</div>
        ),
    },
    {
        accessorKey: "typeControl",
        header: "Tipo de Controle",
        cell: ({ row }) => <div>{row.getValue("typeControl") === "UNIT" ? "Quantidade" : "Peso"}</div>,
    },
    {
        accessorKey: "quantity",
        header: () => <div>Quantidade</div>,
        cell: ({ row }) => (
            <div>{row.getValue("quantity") == 0 ? 0 : row.getValue("quantity") || "-"}</div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "amount",
        header: () => <div>Peso</div>,
        cell: ({ row }) => (
            <div>{row.getValue("amount") == 0 ? 0 : row.getValue("amount") || "-"}</div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "supplier",
        header: "Fornecedor",
        cell: ({ row }) => {
            const fornecedor = row.getValue("supplier") as FornecedorAPI; // Asserção de tipo
            return (
                <div>
                    {fornecedor ? fornecedor.name : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Categoria",
        cell: ({ row }) => {
            const categoria = row.getValue("category") as CategoriaApi
            return (
                <div>
                    {categoria ? <Badge className="rounded-3xl" style={{ backgroundColor: categoria.color }}>{categoria.name}</Badge> : '-'}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const queryClient = useQueryClient();
            const produto = row.original;
            const [openEdit, setOpenEdit] = React.useState(false);
            const [openDelete, setOpenDelete] = React.useState(false);
            const { toast } = useToast()

            const editarProdutoMutation = useMutation({
                mutationFn: async (data: z.infer<typeof formProdutoSchema>) => {
                    if (data.typeControl == 'UNIT') {
                        delete data.amount
                        if (data.quantity && typeof data.quantity === 'string') {
                            data.quantity = parseInt(data.quantity, 10);
                        }
                    } else if (data.typeControl == 'WEITGHT') {
                        delete data.quantity
                        if (typeof data.amount === 'string') {
                            data.amount = parseFloat(data.amount.replace(',', '.'));
                        }
                    }
                    if (!data.supplierId) {
                        delete data.supplierId
                    }
                    if (!data.categoryId) {
                        delete data.categoryId
                    }

                    const response = await api.put(`/product/${produto.id}`, data);
                    return response.data;
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["products"] });
                    queryClient.invalidateQueries({ queryKey: ["associatedSuppliers"] });
                    queryClient.invalidateQueries({ queryKey: ["associatedCategories"] });

                    toast({
                        title: "Sucesso",
                        description: "Produto editado com sucesso!",
                        duration: 2000,
                        variant: "success",
                    });

                    setOpenEdit(false)
                },
                onError: (error) => {
                    console.error("Erro ", error)
                    toast({
                        title: "Erro",
                        description: `Erro ao editar produto: ${error.message}`,
                        duration: 2000,
                        variant: "destructive",
                    });
                },
            });

            const handleEditSubmit: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
                editarProdutoMutation.mutate(data)
            };

            const deletarProdutoMutation = useMutation({
                mutationFn: async (produtoId: string) => {
                    const response = await api.delete(`/product/${produtoId}`,);
                    return response.data;
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["products"] });
                    queryClient.invalidateQueries({ queryKey: ["associatedSuppliers"] });
                    queryClient.invalidateQueries({ queryKey: ["associatedCategories"] });

                    toast({
                        title: "Sucesso",
                        description: "Produto remvoido com sucesso!",
                        duration: 2000,
                        variant: "success",
                    });

                    setOpenDelete(false);
                },
                onError: (error) => {
                    console.error("erro ", error)
                    toast({
                        title: "Erro",
                        description: `Erro ao deletar produto: ${error.message}`,
                        duration: 2000,
                        variant: "destructive",
                    });
                },
            });


            const handleDeleteProduto = () => {
                deletarProdutoMutation.mutate(produto.id);
            };


            return (
                <>
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
                                onClick={() => setOpenEdit(true)}
                            >
                                <SquarePen className="h-4 w-4 mr-2" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setOpenDelete(true)}
                                className="cursor-pointer text-red-400 hover:bg-muted-foreground"
                            >
                                <Trash2 className="h-4 w-4 mr-2 text-red-400" /> Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Modal de edição */}
                    <DialogEditProduto
                        produto={produto}
                        open={openEdit}
                        onClose={() => setOpenEdit(false)}
                        onSubmit={handleEditSubmit}
                        fornecedoresLista={fornecedoresLista}
                        categoriasLista={categoriasLista}
                    />

                    {/* Modal de confirmação de exclusão */}
                    <DialogDeleteProduto
                        open={openDelete}
                        onClose={() => setOpenDelete(false)}
                        onConfirm={handleDeleteProduto}
                        produto={produto}
                    />
                </>
            );
        },
    },

]

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const { data: produtos = [], isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await api.get("/product")
            return response.data
        },
    })

    const { data: fornecedoresLista = [] } = useQuery({
        queryKey: ["associatedSuppliers"],
        queryFn: async () => {
            const response = await api.get("/supplier");
            return response.data;
        },
    });

    const { data: categoriasLista = [] } = useQuery({
        queryKey: ["associatedCategories"],
        queryFn: async () => {
            const response = await api.get("/category");
            return response.data;
        },
    });

    const table = useReactTable({
        data: produtos, // Dados retornados pela API
        columns: columns(fornecedoresLista, categoriasLista),
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

    if (isLoading) {
        return (
            <div className="w-full">
                <Skeleton className="h-10 w-full mb-4 mt-4" />
                <Skeleton className="h-44 w-full" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center text-red-500">
                Erro ao carregar os produtos. Tente novamente mais tarde.
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Procurar produto"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
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
                        className="rounded-2xl"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-2xl"
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