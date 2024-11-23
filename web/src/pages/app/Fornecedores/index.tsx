import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formFornecedorSchema } from "@/pages/app/Fornecedores/validators/formFornecedorSchema"
import { DialogAddFornecedor } from "./components/Dialogs/DialogAddFornecedor";
import { DataTable } from "./components/Datatable";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios";



export const Fornecedores = () => {
    const { toast } = useToast()
    const [isDialogAdd, setIsDialogAdd] = useState(false)
    const queryClient = useQueryClient();

        // Mutação para criar o produto
        const criarFornecedorMutation = useMutation({
            mutationFn: async (data: z.infer<typeof formFornecedorSchema>) => {
                if(!data.productsIds || data.productsIds.length < 1) {
                    delete data.productsIds
                }
                const response = await api.post("/supplier", data);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["suppliers"] });
                queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });
    
                toast({
                    title: "Sucesso",
                    description: "Fornecedor adicionado com sucesso!",
                    duration: 4000,
                    variant: "success",
                });
    
                setIsDialogAdd(false)
            },
            onError: (error) => {
                console.error("Erro ", error)
                toast({
                    title: "Erro",
                    description: `Erro ao adicionar fornecedor: ${error.message}`,
                    duration: 4000,
                    variant: "destructive",
                });
            },
        });

    const addFornecedor: SubmitHandler<z.infer<typeof formFornecedorSchema>> = (data) => {
        criarFornecedorMutation.mutate(data)
    }

    const { data: produtosAssociados = [] } = useQuery({
        queryKey: ["associatedProducts"],
        queryFn: async () => {
            const response = await api.get("/product");
            return response.data;
        },
    });

    return (
        <>
            <Helmet title="Fornecedores" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Fornecedores</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie os fornecedores associados aos produtos do seu estoque</p>

            <div className="mt-5">
                <DialogAddFornecedor
                    produtosLista={produtosAssociados}
                    onSubmit={addFornecedor}
                    isDialogAddFornecedorOpen={isDialogAdd}
                    setDialogAddFornecedorOpen={setIsDialogAdd}
                />
            </div>

            <div className="mt-1">
                <DataTable />
            </div>
        </>
    );
};
