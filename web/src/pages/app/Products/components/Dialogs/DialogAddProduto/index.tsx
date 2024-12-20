import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { handlePesoInput } from "@/utils/validators/handlePesoInput";
import { CategoriaApi, FornecedorAPI } from "@/interfaces";


interface DialogAddProdutoProps {
    fornecedoresLista: FornecedorAPI[];
    categoriasLista: CategoriaApi[];
    onSubmit: SubmitHandler<z.infer<typeof formProdutoSchema>>;
    isDialogAddProdutoOpen: boolean;
    setDialogAddProdutoOpen: (isOpen: boolean) => void;
}
const valoresPadraoAdicionarProduto: z.infer<typeof formProdutoSchema> = {
    name: "",
    status: "ACTIVE",
    typeControl: "UNIT",
    amount: "",
    quantity: "",
    supplierId: "",
    categoryId: ""
}

export const DialogAddProduto: React.FC<DialogAddProdutoProps> = ({ fornecedoresLista, categoriasLista, onSubmit, isDialogAddProdutoOpen, setDialogAddProdutoOpen }) => {
    const [addTipoControle, setAddTipoControle] = useState("quantidade");

    const { handleSubmit, control, reset, formState: { errors } } = useForm<z.infer<typeof formProdutoSchema>>({
        resolver: zodResolver(formProdutoSchema),
        defaultValues: valoresPadraoAdicionarProduto
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
        try {
            onSubmit(data);
            reset(valoresPadraoAdicionarProduto)
        } catch (err) { }
    };

    return (
        <Dialog open={isDialogAddProdutoOpen} onOpenChange={(isOpen) => {
            setDialogAddProdutoOpen(isOpen);
            if (!isOpen) {
                setAddTipoControle("quantidade")
                reset(valoresPadraoAdicionarProduto); // Reseta os valores ao fechar a modal
            }
        }}>
            <DialogTrigger asChild>
                <Button>+ Adicionar Produto</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Produto</DialogTitle>
                    <DialogDescription>Preencha os detalhes do produto abaixo</DialogDescription>
                </DialogHeader>


                <form className="grid gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Nome" />
                            )}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">
                                        <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-green-400"></span> Ativo
                                    </SelectItem>
                                    <SelectItem value="INACTIVE">
                                        <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-red-400"></span> Inativo
                                    </SelectItem>
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
                                setAddTipoControle(value);
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

                    {addTipoControle === "WEIGHT" ? (
                        <div>
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Peso (Kg)"
                                        className="capitalize"
                                        inputMode="decimal"
                                        onBeforeInput={handlePesoInput}
                                    />
                                )}
                            />
                            {errors.typeControl && <span className="text-red-500">{errors.typeControl.message}</span>}
                        </div>
                    ) : (
                        <div>
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Quantidade"
                                        className="capitalize"
                                        type="number"
                                    />
                                )}
                            />
                            {errors.typeControl && <span className="text-red-500">{errors.typeControl.message}</span>}
                        </div>
                    )}

                    <Controller
                        name="supplierId"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Select
                                onValueChange={onChange}
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

                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field: { onChange } }) => {
                            return (
                                <Select
                                    onValueChange={onChange}
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

                    <Button className="w-100" type="submit">Salvar</Button>
                </form>

                <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
