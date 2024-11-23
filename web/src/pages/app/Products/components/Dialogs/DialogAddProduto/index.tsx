import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { handlePesoInput } from "@/utils/validations/handlePesoInput";


interface DialogAddProdutoProps {
    fornecedoresLista: { label: string, value: string }[];
    categoriasLista: { label: string, value: string }[];
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
        } catch (err) {}
    };

    return (
        <Dialog open={isDialogAddProdutoOpen} onOpenChange={setDialogAddProdutoOpen}>
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
                            <Select value={field.value} onValueChange={(value: "UNIT" | "WEITGHT") => {
                                field.onChange(value);
                                setAddTipoControle(value);
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo de Controle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UNIT">Controle: Quantidade</SelectItem>
                                    <SelectItem value="WEITGHT">Controle: Peso</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {addTipoControle === "WEITGHT" ? (
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
                                        <SelectItem value={fornecedor.value}>{fornecedor.label}</SelectItem>
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
                                            <SelectItem value={categoria.value}>{categoria.label}</SelectItem>
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
