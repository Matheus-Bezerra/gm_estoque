import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formFornecedorSchema } from "@/pages/app/Fornecedores/validators/formFornecedorSchema"
import { DialogAddFornecedor } from "./components/Dialogs/DialogAddFornecedor";
import { produtosLista } from "@/utils/data/products/lista";
import { DataTable } from "./components/Datatable";
import { useState } from "react";



export const Fornecedores = () => {
    const { toast } = useToast()
    const [isDialogAdd, setIsDialogAdd] = useState(false)

    const addFornecedor: SubmitHandler<z.infer<typeof formFornecedorSchema>> = (data) => {
        console.log("Data ", data)
        toast({
            title: "Sucesso",
            description: "Fornecedor adicionado com sucesso!",
            duration: 4000,
            variant: "success"
        })

        setIsDialogAdd(false)
    }

    return (
        <>
            <Helmet title="Fornecedores" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Fornecedores</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie os fornecedores associados aos produtos do seu estoque</p>

            <div className="mt-5">
                <DialogAddFornecedor
                    produtosLista={produtosLista}
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
