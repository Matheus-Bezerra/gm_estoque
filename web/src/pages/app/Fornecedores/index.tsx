import { Helmet } from "react-helmet-async";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formFornecedorSchema } from "@/pages/app/Fornecedores/validators/formFornecedorSchema"
import { DialogAddFornecedor } from "./components/Dialogs/DialogAddFornecedor";
import { DataTable } from "./components/Datatable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios";
import { useCreateSupplierMutation } from "./mutations/useCreateSupplier";



export const Fornecedores = () => {
    const [isDialogAdd, setIsDialogAdd] = useState(false)
    const criarFornecedorMutation = useCreateSupplierMutation(setIsDialogAdd);
     

    const addFornecedor: SubmitHandler<z.infer<typeof formFornecedorSchema>> = (data) => {
        criarFornecedorMutation.mutate(data)
    }

    const { data: produtosAssociados = [] } = useQuery({
        queryKey: ["associatedProducts"],
        queryFn: async () => {
            const response = await api.get("/product?productsWithoutSupplier=true");
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
