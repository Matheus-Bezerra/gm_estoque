import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { DataTable } from "./components/Datatable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fornecedoresLista = [
    { value: "fornecedorA", label: "Fornecedor A" },
    { value: "fornecedorB", label: "Fornecedor B" },
    { value: "fornecedorC", label: "Fornecedor C" },
    { value: "fornecedorD", label: "Fornecedor D" },
    { value: "fornecedorE", label: "Fornecedor E" },
];

const categoriasLista = [
    { value: "comida", label: "Fornecedor A" },
    { value: "fastFood", label: "Fornecedor B" },
    { value: "fritura", label: "Fornecedor C" },
    { value: "mistura", label: "Fornecedor D" },
    { value: "assado", label: "Fornecedor E" },
    { value: "lanches", label: "Fornecedor E" },
    { value: "pizza", label: "Fornecedor E" },
];

export const Products = () => {
    const [addTipoControle, setAddTipoControle] = useState("quantidade")
    const [addFornecedores, setAddFornecedores] = useState<string[]>([]);
    const [addCategorias, setAddCategorias] = useState<string[]>([]);
    const { toast } = useToast()

    const handlePesoInput = (e: FormEvent) => {
        // @ts-ignore
        const value = e.target.value
        if (!/^[0-9]*[.,]?[0-9]*$/.test(value)) {
            e.preventDefault()
        }
    }

    const addProduto = (e: FormEvent) => {
        e.preventDefault()
        
        toast({
            title: "Sucesso",
            description: "Produto adicionado com sucesso!",
            duration: 5000,
            variant: "default"
        })
    }

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

                        <form className="grid gap-4" onSubmit={addProduto}>
                            <Input id="product-name" placeholder="Nome" />
                            <Select value="ativo">
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ativo"><span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-green-400"></span> Ativo</SelectItem>
                                    <SelectItem value="inativo"> <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-red-400"></span> Inativo</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={addTipoControle} onValueChange={setAddTipoControle}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Tipo de Controle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="quantidade">Controle: Quantidade</SelectItem>
                                    <SelectItem value="peso">Controle: Peso</SelectItem>
                                </SelectContent>
                            </Select>

                            {addTipoControle === "peso" ? (
                                <Input
                                    placeholder="Peso (Kg)"
                                    className="capitalize"
                                    inputMode="decimal" // Permite números decimais
                                    onBeforeInput={handlePesoInput} // Bloqueia caracteres especiais
                                />
                            ) : (
                                <Input
                                    placeholder="Quantidade"
                                    className="capitalize"
                                    type="number" // Somente números
                                />
                            )}

                            <MultiSelect
                                options={fornecedoresLista}
                                onValueChange={setAddFornecedores}
                                defaultValue={addFornecedores}
                                placeholder="Fornecedores"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />

                            <MultiSelect
                                options={categoriasLista}
                                onValueChange={setAddCategorias}
                                defaultValue={addCategorias}
                                placeholder="Categorias"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
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
