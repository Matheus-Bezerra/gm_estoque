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
import { ArrowUpDown, Boxes, ChevronDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

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
import { Categoria, objetoAssociado } from "@/interfaces"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { DialogDeleteCategoria } from "../Dialogs/DialogDeleteCategoria"
import { DialogEditCategoria } from "../Dialogs/DialogEditCategoria"
import { produtosLista } from "@/utils/data/products/lista"
import { DialogAssociarProdutos } from "../Dialogs/DialogAssociarProdutos"
import { formAssociarProdutosSchema } from "../../validators/formAssociarProdutosSchema"
import { formCategoriaSchema } from "../../validators/formCategoriaSchema"
import { categorias } from "@/utils/data/categorias"
import { Badge } from "@/components/ui/badge"


export const columns: ColumnDef<Categoria>[] = [
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
        cell: ({ row }) => <div className="capitalize">
            <Badge className="rounded-3xl" style={{backgroundColor: row.getValue("cor") }}>{row.getValue("nome")}</Badge>
        </div>,
    },
    {
        accessorKey: "cor",
        header: "Cor",
        cell: ({ row }) => <div className="capitalize flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: row.getValue("cor") }}></div>
            {row.getValue("cor")}
        </div>,
    },
    {
        accessorKey: "produtosAssociados",
        header: "Produtos",
        cell: ({ row }) => {
            const produtos = row.getValue("produtosAssociados") as objetoAssociado[]; // Asserção de tipo
            return (
                <div>
                    {produtos.map((produto) => produto.text).join(", ")}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const categoria = row.original;
            const [openEdit, setOpenEdit] = React.useState(false);
            const [openAssociarProdutos, setOpenAssociarProdutos] = React.useState(false);
            const [openDelete, setOpenDelete] = React.useState(false);
            const { toast } = useToast()

            const handleEditSubmit: SubmitHandler<z.infer<typeof formCategoriaSchema>> = (data) => {
                console.log(data);

                setOpenEdit(false);

                toast({
                    title: "Sucesso",
                    description: "Categoria Editado com sucesso!",
                    duration: 4000,
                    variant: "success"
                });
            };

            const handleAssociarSubmit: SubmitHandler<z.infer<typeof formAssociarProdutosSchema>> = (data) => {
                console.log("Dataaa ", data);

                setOpenAssociarProdutos(false);

                toast({
                    title: "Sucesso",
                    description: "Produtos associados com sucesso",
                    duration: 4000,
                    variant: "success"
                });
            };

            const handleDeleteCategoria = () => {
                console.log("Categoria deletado!", categoria)
                setOpenDelete(false);

                toast({
                    title: "Sucesso",
                    description: "Categoria removido com sucesso!",
                    duration: 4000,
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
                                onClick={() => setOpenAssociarProdutos(true)}
                            >
                                <Boxes className="h-4 w-4 mr-2" /> Produtos associados
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
                    <DialogEditCategoria
                        categoria={categoria}
                        open={openEdit}
                        produtosLista={produtosLista}
                        onClose={() => setOpenEdit(false)}
                        onSubmit={handleEditSubmit}
                    />

                    <DialogAssociarProdutos
                        categoria={categoria}
                        open={openAssociarProdutos}
                        produtosLista={produtosLista}
                        onClose={() => setOpenAssociarProdutos(false)}
                        onSubmit={handleAssociarSubmit}
                    />

                    {/* Modal de confirmação de exclusão */}
                    <DialogDeleteCategoria
                        open={openDelete}
                        onClose={() => setOpenDelete(false)}
                        onConfirm={handleDeleteCategoria}
                        categoria={categoria}
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
    const data = categorias

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
                    placeholder="Procurar categoria"
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
