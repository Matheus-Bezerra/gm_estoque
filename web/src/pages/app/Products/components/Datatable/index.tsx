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
import { Categorias, Fornecedor, Produto } from "@/utils/data/products/interfaces"
import { Button } from "@/components/ui/button"
import { produtos } from "@/utils/data/products"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { handlePesoInput } from "@/utils/validations/handlePesoInput"
import { fornecedoresLista } from "@/utils/data/products/fornecedores"
import { categoriasLista } from "@/utils/data/products/categorias"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    status: z.enum(["ativo", "inativo"]),
    tipoControle: z.enum(["quantidade", "peso"]),
    peso: z.number().or(z.string()).optional(),
    quantidade: z.number().or(z.string()).optional(),
    fornecedores: z.array(z.string()).optional(),
    categorias: z.array(z.string()).optional()
}).refine((data) => {
    if (data.tipoControle === "peso") return data.peso && data.peso.toString().length > 0;

    if (data.tipoControle === "quantidade") return data.quantidade && data.quantidade.toString().length > 0;
    return true;
}, {
    message: "Campo Obrigatório conforme o tipo de controle escolhido",
    path: ["tipoControle"]
});

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
            const produto = row.original;
            const [openEdit, setOpenEdit] = React.useState(false);
            const [openDelete, setOpenDelete] = React.useState(false);
            const { toast } = useToast()

            const { control, handleSubmit, getValues, formState: { errors } } = useForm({
                resolver: zodResolver(formSchema),
                defaultValues: {
                    nome: produto.nome,
                    status: produto.status,
                    tipoControle: produto.tipoControle,
                    peso: produto.peso,
                    quantidade: produto.quantidade,
                    fornecedores: produto.fornecedores.map(fr => fr.id) || [],
                    categorias: produto.categorias.map(pr => pr.id) || []
                },
            });

            const editProduto: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
                
                console.log(data);
                toast({
                    title: "Sucesso",
                    description: "Produto Editado com sucesso!",
                    duration: 5000,
                    variant: "success"
                });
                setOpenEdit(false);
            }

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
                    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Editar Produto</DialogTitle>
                                <DialogDescription>Altere os detalhes do produto abaixo</DialogDescription>
                            </DialogHeader>

                            <form className="grid gap-4" onSubmit={handleSubmit(editProduto)}>
                                <div>
                                    <Controller
                                        name="nome"
                                        control={control}
                                        render={({ field }) => (
                                            <Input id="product-name" placeholder="Nome" {...field} />
                                        )}
                                    />
                                    {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                                </div>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ativo"><span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-green-400"></span> Ativo</SelectItem>
                                                <SelectItem value="inativo"><span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-red-400"></span> Inativo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <Controller
                                    name="tipoControle"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tipo de Controle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="quantidade">Controle: Quantidade</SelectItem>
                                                <SelectItem value="peso">Controle: Peso</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {/* Renderização Condicional com Controller para Peso ou Quantidade */}
                                <Controller
                                    name={getValues("tipoControle") === "peso" ? "peso" : "quantidade"}
                                    control={control}
                                    rules={{
                                        required: getValues("tipoControle") === "peso"
                                            ? "Peso é obrigatório."
                                            : "Quantidade é obrigatória."
                                    }}
                                    render={({ field, field: {value} }) => (
                                        getValues("tipoControle") === "peso" ? (
                                            <div>
                                                <Input
                                                    {...field}
                                                    placeholder="Peso (Kg)"
                                                    className="capitalize"
                                                    inputMode="decimal"
                                                    onBeforeInput={handlePesoInput}
                                                    value={value || ""}
                                                />
                                                {errors.tipoControle && <span className="text-red-500">{errors.tipoControle.message}</span>}
                                            </div>
                                        ) : (
                                            <div>
                                                <Input
                                                    {...field}
                                                    placeholder="Quantidade"
                                                    className="capitalize"
                                                    type="number"
                                                    value={value || ""}
                                                />
                                                {errors.tipoControle && <span className="text-red-500">{errors.tipoControle.message}</span>}
                                            </div>
                                        )
                                    )}
                                />
                                {/* MultiSelect para Fornecedores */}
                                <Controller
                                    control={control}
                                    name="fornecedores"
                                    render={({ field: { onChange, value } }) => (
                                        <div>
                                            <MultiSelect
                                                options={fornecedoresLista}
                                                onValueChange={onChange}
                                                defaultValue={value || []}
                                                placeholder="Fornecedores"
                                                variant="inverted"
                                                animation={2}
                                                maxCount={3}
                                            />
                                        </div>
                                    )}
                                />

                                {/* MultiSelect para Categorias */}
                                <Controller
                                    control={control}
                                    name="categorias"
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <div>
                                                <MultiSelect
                                                    options={categoriasLista}
                                                    onValueChange={onChange}
                                                    defaultValue={value || []}
                                                    placeholder="Categorias"
                                                    variant="inverted"
                                                    animation={2}
                                                    maxCount={3}
                                                />
                                            </div>

                                        )
                                    }}
                                />
                                <Button className="w-100" type="submit">Salvar</Button>
                            </form>

                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>

                    {/* Modal de confirmação de exclusão */}
                    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Excluir Produto</DialogTitle>
                                <DialogDescription>Confirmação de exclusão</DialogDescription>
                            </DialogHeader>
                            <p className="text-foreground">Tem certeza que deseja excluir o produto <span className="font-bold text-xl">"{produto.nome}"</span> ?</p>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancelar</Button>
                                <Button>Excluir</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
