import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { handlePesoInput } from "@/utils/validations/handlePesoInput";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Produto } from "@/interfaces";

interface DialogEditProdutoProps {
    produto: Produto;
    onSubmit: SubmitHandler<ProdutoFormValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    fornecedoresLista: { label: string, value: string }[];
    categoriasLista: { label: string, value: string }[];
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
            nome: produto.nome,
            status: produto.status,
            tipoControle: produto.tipoControle,
            peso: produto.peso,
            quantidade: produto.quantidade,
            fornecedor: produto.fornecedor?.id,
            categoria: produto.categoria?.id,
        },
    });

    const [tipoControle, setTipoControle] = useState<"quantidade" | "peso">(produto.tipoControle);

    const handleTipoControleChange = (value: "quantidade" | "peso") => {
        setTipoControle(value);
        setValue("quantidade", undefined);
        setValue("peso", undefined);
    };

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
                            <Select value={field.value} onValueChange={(value: "quantidade" | "peso") => {
                                field.onChange(value);
                                handleTipoControleChange(value);
                            }}>
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
                        name={tipoControle === "peso" ? "peso" : "quantidade"}
                        control={control}
                        rules={{
                            required: tipoControle === "peso"
                                ? "Peso é obrigatório."
                                : "Quantidade é obrigatória."
                        }}
                        render={({ field, field: { value } }) => (
                            tipoControle === "peso" ? (
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
                    {/* Select para Fornecedores */}
                    <Controller
                        control={control}
                        name="fornecedor"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={onChange}
                                defaultValue={value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Fornecedor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fornecedoresLista.map((fornecedor) => (
                                        <SelectItem value={fornecedor.value}>{fornecedor.label}</SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                        )}
                    />

                    {/* Select para Categorias */}
                    <Controller
                        control={control}
                        name="categoria"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Select
                                    onValueChange={onChange}
                                    defaultValue={value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoriasLista.map((categoria) => (
                                            <SelectItem value={categoria.value}>{categoria.label}</SelectItem>
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
