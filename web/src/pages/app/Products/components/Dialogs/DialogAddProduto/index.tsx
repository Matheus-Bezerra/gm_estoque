import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema";
import { useToast } from "@/hooks/use-toast";
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

export const DialogAddProduto: React.FC<DialogAddProdutoProps> = ({ fornecedoresLista, categoriasLista, onSubmit, isDialogAddProdutoOpen, setDialogAddProdutoOpen }) => {
    const [addTipoControle, setAddTipoControle] = useState("quantidade");
    const { toast } = useToast();

    const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof formProdutoSchema>>({
        resolver: zodResolver(formProdutoSchema),
        defaultValues: {
            nome: "",
            status: "ativo",
            tipoControle: "quantidade",
            peso: "",
            quantidade: "",
            fornecedor: "",
            categoria: ""
        }
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
        onSubmit(data);
        toast({
            title: "Sucesso",
            description: "Produto adicionado com sucesso!",
            duration: 4000,
            variant: "success"
        });
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
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Nome" />
                            )}
                        />
                        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
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
                                    <SelectItem value="ativo">
                                        <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-green-400"></span> Ativo
                                    </SelectItem>
                                    <SelectItem value="inativo">
                                        <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-red-400"></span> Inativo
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <Controller
                        name="tipoControle"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} onValueChange={(value) => {
                                field.onChange(value);
                                setAddTipoControle(value);
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

                    {addTipoControle === "peso" ? (
                        <div>
                            <Controller
                                name="peso"
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
                            {errors.tipoControle && <span className="text-red-500">{errors.tipoControle.message}</span>}
                        </div>
                    ) : (
                        <div>
                            <Controller
                                name="quantidade"
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
                            {errors.tipoControle && <span className="text-red-500">{errors.tipoControle.message}</span>}
                        </div>
                    )}

                    <Controller
                        name="fornecedor"
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
                        name="categoria"
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
