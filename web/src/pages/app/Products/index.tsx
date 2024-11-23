import { Helmet } from "react-helmet-async";
import { DataTable } from "./components/Datatable";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema"
import { DialogAddProduto } from "./components/Dialogs/DialogAddProduto";
import { useState } from "react";
import { api } from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { useCreateProductMutation } from "./mutations/useCreateProduct";

export const Products = () => {
    const [isDialogAdd, setIsDialogAdd] = useState(false)
    const criarProdutoMutation = useCreateProductMutation(setIsDialogAdd);

    const addProduto: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
        criarProdutoMutation.mutate(data)
    }

    const { data: fornecedoresLista = [] } = useQuery({
        queryKey: ["associatedSuppliers"],
        queryFn: async () => {
            const response = await api.get("/supplier");
            return response.data;
        },
    });

    const { data: categoriasLista = [] } = useQuery({
        queryKey: ["associatedCategories"],
        queryFn: async () => {
            const response = await api.get("/category");
            return response.data;
        },
    });


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
