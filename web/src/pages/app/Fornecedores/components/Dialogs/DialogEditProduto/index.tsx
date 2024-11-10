import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Produto } from "@/utils/data/products/interfaces";

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
            fornecedores: produto.fornecedores.map((fr) => fr.id) || [],
            categorias: produto.categorias.map((pr) => pr.id) || [],
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
                <Button className="w-100 rounded-2xl" type="submit">Salvar</Button>
            </form>

            <DialogClose asChild>
                <Button className="rounded-2xl" variant="outline">Fechar</Button>
            </DialogClose>
        </DialogContent>
    </Dialog>
    );
}
