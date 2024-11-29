import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { handlePesoInput } from "@/utils/validators/handlePesoInput";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategoriaApi, FornecedorAPI, ProdutoApi } from "@/interfaces";

interface DialogEditProdutoProps {
    produto: ProdutoApi;
    onSubmit: SubmitHandler<ProdutoFormValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    fornecedoresLista: FornecedorAPI[];
    categoriasLista: CategoriaApi[];
}


type ProdutoFormValues = z.infer<typeof formProdutoSchema>;

export function DialogEditProduto({
    produto,
    onSubmit,
    open,
    onClose,
    fornecedoresLista,
    categoriasLista,
}: DialogEditProdutoProps) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProdutoFormValues>({
        resolver: zodResolver(formProdutoSchema),
        defaultValues: {
            name: produto.name,
            status: produto.status,
            typeControl: produto.typeControl,
            amount: produto.amount ? produto.amount : "",
            quantity: produto.quantity ? produto.quantity : "",
            supplierId: produto.supplierId ? produto.supplierId : "",
            categoryId: produto.categoryId ? produto.categoryId : ""
        },
    });

    const [tipoControle, setTipoControle] = useState<"UNIT" | "WEIGHT">(produto.typeControl);

    const handleTipoControleChange = (value: "UNIT" | "WEIGHT") => {
        setTipoControle(value);
        setValue("quantity", undefined);
        setValue("amount", undefined);
    };

    useEffect(() => {
        if (produto) {
            setValue("name", produto.name);
            setValue("status", produto.status);
            setValue("typeControl", produto.typeControl);
            setValue("amount", produto.amount ? produto.amount : "");
            setValue("quantity", produto.quantity ? produto.quantity : "");
            setValue("supplierId", produto.supplierId ? produto.supplierId : "");
            setValue("categoryId", produto.categoryId ? produto.categoryId : "");
            setTipoControle(produto.typeControl);
        }
    }, [produto, setValue]); 

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Produto</DialogTitle>
                    <DialogDescription>Altere os detalhes do produto abaixo</DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input id="product-name" placeholder="Nome" {...field} />
                            )}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
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
                                    <SelectItem value="ACTIVE"><span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-green-400"></span> Ativo</SelectItem>
                                    <SelectItem value="INACTIVE"><span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-red-400"></span> Inativo</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Controller
                        name="typeControl"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={(value: "UNIT" | "WEIGHT") => {
                                field.onChange(value);
                                handleTipoControleChange(value);
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo de Controle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UNIT">Controle: Quantidade</SelectItem>
                                    <SelectItem value="WEIGHT">Controle: Peso</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {/* Renderização Condicional com Controller para Peso ou Quantidade */}
                    <Controller
                        name={tipoControle === "WEIGHT" ? "amount" : "quantity"}
                        control={control}
                        rules={{
                            required: tipoControle === "WEIGHT"
                                ? "Peso é obrigatório."
                                : "Quantidade é obrigatória."
                        }}
                        render={({ field, field: { value } }) => (
                            tipoControle === "WEIGHT" ? (
                                <div>
                                    <Input
                                        {...field}
                                        placeholder="Peso (Kg)"
                                        className="capitalize"
                                        inputMode="decimal"
                                        onBeforeInput={handlePesoInput}
                                        value={value || ""}
                                    />
                                    {errors.typeControl && <span className="text-red-500">{errors.typeControl.message}</span>}
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
                                    {errors.typeControl && <span className="text-red-500">{errors.typeControl.message}</span>}
                                </div>
                            )
                        )}
                    />
                    {/* Select para Fornecedores */}
                    <Controller
                        control={control}
                        name="supplierId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={onChange}
                                defaultValue={value ? value : ''}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Fornecedor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fornecedoresLista.map((fornecedor) => (
                                        <SelectItem value={fornecedor.id}>{fornecedor.name}</SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                        )}
                    />

                    {/* Select para Categorias */}
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Select
                                    onValueChange={onChange}
                                    defaultValue={value ? value : ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoriasLista.map((categoria) => (
                                            <SelectItem value={categoria.id}>{categoria.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        }}
                    />
                    <Button className="w-100 rounded-2xl" type="submit">Salvar</Button>
                </form>

                <DialogClose asChild>
                    <Button className="rounded-2xl" variant="outline">Fechar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
