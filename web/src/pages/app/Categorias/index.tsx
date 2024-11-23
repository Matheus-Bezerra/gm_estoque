import { Helmet } from "react-helmet-async";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formCategoriaSchema } from "@/pages/app/Categorias/validators/formCategoriaSchema"
import { DialogAddCategoria } from "./components/Dialogs/DialogAddCategoria";
import { DataTable } from "./components/Datatable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios";
import { useCreateCategoryMutation } from "./mutations/useCreateCategory";



export const Categorias = () => {
    const [isDialogAdd, setIsDialogAdd] = useState(false)
    const criarFornecedorMutation = useCreateCategoryMutation(setIsDialogAdd);

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
