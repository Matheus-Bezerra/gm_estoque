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
import { Categoria, Fornecedor, Produto } from "@/utils/data/products/interfaces"
import { Button } from "@/components/ui/button"
import { produtos } from "@/utils/data/products"
import { fornecedoresLista } from "@/utils/data/fornecedores/lista"
import { categoriasLista } from "@/utils/data/products/categorias"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod";
import {SubmitHandler } from "react-hook-form";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema"
import { DialogDeleteProduto } from "@/pages/app/Products/components/Dialogs/DialogDeleteProduto"
import { DialogEditProduto } from "@/pages/app/Products/components/Dialogs/DialogEditProduto"


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
            <div className="capitalize"><span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${row.getValue('status') == 'ativo' ? 'bg-green-400' : 'bg-red-400'}`}></span>{row.getValue("status")}</div>
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
        accessorKey: "fornecedor",
        header: "Fornecedor",
        cell: ({ row }) => {
            const fornecedores = row.getValue("fornecedor") as Fornecedor; // Asserção de tipo
            return (
                <div>
                    {fornecedores.nome}
                </div>
            );
        },
    },
    {
        accessorKey: "categoria",
        header: "Categoria",
        cell: ({ row }) => {
            const categoria = row.getValue("categoria") as Categoria; // Asserção de tipo
            return (
                <div>
                    {categoria.nome}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const produto = row.original;
            const [openEdit, setOpenEdit] = React.useState(false);
            const [openDelete, setOpenDelete] = React.useState(false);
            const { toast } = useToast()

            const handleEditSubmit: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
                console.log(data);

                setOpenEdit(false);

                toast({
                    title: "Sucesso",
                    description: "Produto Editado com sucesso!",
                    duration: 5000,
                    variant: "success"
                });
            };

            const handleDeleteProduto = () => {
                console.log("Produto deletado!", produto)
                setOpenDelete(false); 

                toast({
                    title: "Sucesso",
                    description: "Produto removido com sucesso!",
                    duration: 5000,
                    variant: "success"
                });
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
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const data = produtos

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
