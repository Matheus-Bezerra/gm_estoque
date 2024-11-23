import { Helmet } from "react-helmet-async";
import { DataTable } from "./components/Datatable";
import { useToast } from "@/hooks/use-toast";
import { categoriasLista } from "@/utils/data/categorias/lista";
import { fornecedoresLista } from "@/utils/data/fornecedores/lista";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema"
import { DialogAddProduto } from "./components/Dialogs/DialogAddProduto";
import { useState } from "react";
import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const Products = () => {
    const { toast } = useToast()
    const [isDialogAdd, setIsDialogAdd] = useState(false)
    const queryClient = useQueryClient();

    // Mutação para criar o produto
    const criarProdutoMutation = useMutation({
        mutationFn: async (data: z.infer<typeof formProdutoSchema>) => {
            if (data.typeControl == 'UNIT') {
                delete data.amount
                if (data.quantity && typeof data.quantity === 'string') {
                    data.quantity = parseInt(data.quantity, 10);
                }
            } else if (data.typeControl == 'WEITGHT') {
                delete data.quantity
                if (typeof data.amount === 'string') {
                    data.amount = parseFloat(data.amount.replace(',', '.'));
                }
            }
            if(!data.supplierId) {
                delete data.supplierId
            }
            if(!data.categoryId) {
                delete data.categoryId
            }

            const response = await api.post("/product", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });

            toast({
                title: "Sucesso",
                description: "Produto adicionado com sucesso!",
                duration: 4000,
                variant: "success",
            });

            setIsDialogAdd(false)
        },
        onError: (error) => {
            console.error("Erro ", error)
            toast({
                title: "Erro",
                description: `Erro ao adicionar produto: ${error.message}`,
                duration: 4000,
                variant: "destructive",
            });
        },
    });

    const addProduto: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
        criarProdutoMutation.mutate(data)
    }

    return (
        <>
            <Helmet title="Produtos" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Produtos</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie seus produtos de forma eficiente</p>

            <div className="mt-5">
                <DialogAddProduto
                    fornecedoresLista={fornecedoresLista}
                    categoriasLista={categoriasLista}
                    onSubmit={addProduto}
                    isDialogAddProdutoOpen={isDialogAdd}
                    setDialogAddProdutoOpen={setIsDialogAdd}
                />
            </div>

            <div className="mt-1">
                <DataTable />
            </div>
        </>
    );
};
