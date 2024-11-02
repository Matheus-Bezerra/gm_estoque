import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { DataTable } from "./components/Datatable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { categoriasLista } from "@/utils/data/products/categorias";
import { fornecedoresLista } from "@/utils/data/products/fornecedores";
import { handlePesoInput } from "@/utils/validations/handlePesoInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    status: z.enum(["ativo", "inativo"]),
    tipoControle: z.enum(["quantidade", "peso"]),
    peso: z.string().optional(), 
    quantidade: z.string().optional(), 
    fornecedores: z.array(z.string()).optional(),
    categorias: z.array(z.string()).optional()
}).refine((data) => {
    if (data.tipoControle === "peso") return data.peso && data.peso.length > 0;
    
    if (data.tipoControle === "quantidade") return data.quantidade && data.quantidade.length > 0;
    return true;
}, {
    message: "Campo Obrigatório conforme o tipo de controle escolhido",
    path: ["tipoControle"] 
});

export const Products = () => {
    const [addTipoControle, setAddTipoControle] = useState("quantidade")
    const { toast } = useToast()

    const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            status: "ativo",
            tipoControle: "quantidade",
            peso: "",
            quantidade: "",
            fornecedores: [],
            categorias: []
        },
    });

    const addProduto: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        console.log("Produtoss ", data)
        toast({
            title: "Sucesso",
            description: "Produto adicionado com sucesso!",
            duration: 5000,
            variant: "default"
        })
    }

    console.log("Errors ", errors)

    return (
        <>
            <Helmet title="Produtos" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Produtos</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie seus produtos de forma eficiente</p>

            <div className="mt-5">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>+ Adicionar Produto</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar Produto</DialogTitle>
                            <DialogDescription>Preencha os detalhes do produto abaixo</DialogDescription>
                        </DialogHeader>

                       
                        <form className="grid gap-4" onSubmit={handleSubmit(addProduto)}>
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
                                name="fornecedores"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect
                                        options={fornecedoresLista}
                                        onValueChange={field.onChange}
                                        placeholder="Fornecedores"
                                        variant="inverted"
                                        animation={2}
                                        maxCount={3}
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                name="categorias"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect
                                        options={categoriasLista}
                                        onValueChange={field.onChange}
                                        placeholder="Categorias"
                                        variant="inverted"
                                        animation={2}
                                        maxCount={3}
                                        {...field}
                                    />
                                )}
                            />

                            <Button className="w-100" type="submit">Salvar</Button>
                        </form>

                        <DialogClose asChild>
                            <Button variant="outline">Fechar</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mt-1">
                <DataTable />
            </div>
        </>
    );
};
