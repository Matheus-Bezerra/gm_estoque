import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formCategoriaSchema } from "@/pages/app/Categorias/validators/formCategoriaSchema"
import { DialogAddCategoria } from "./components/Dialogs/DialogAddCategoria";
import { DataTable } from "./components/Datatable";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios";



export const Categorias = () => {
    const { toast } = useToast()
    const [isDialogAdd, setIsDialogAdd] = useState(false)
    const queryClient = useQueryClient();

    // Mutação para criar o produto
    const criarFornecedorMutation = useMutation({
        mutationFn: async (data: z.infer<typeof formCategoriaSchema>) => {
            if (!data.productsIds || data.productsIds.length < 1) {
                delete data.productsIds
            }
            const response = await api.post("/category", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            toast({
                title: "Sucesso",
                description: "Categoria adicionada com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setIsDialogAdd(false)
        },
        onError: (error) => {
            console.error("Erro ", error)
            toast({
                title: "Erro",
                description: `Erro ao adicionar Categoria: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });


    const addCategorias: SubmitHandler<z.infer<typeof formCategoriaSchema>> = (data) => {
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
            <Helmet title="Categorias" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Categorias</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie as categorias associados aos produtos do seu estoque</p>

            <div className="mt-5">
                <DialogAddCategoria
                    produtosLista={produtosAssociados}
                    onSubmit={addCategorias}
                    isDialogAddCategoriaOpen={isDialogAdd}
                    setDialogAddCategoriaOpen={setIsDialogAdd}
                />
            </div>

            <div className="mt-1">
                <DataTable />
            </div>
        </>
    );
};
