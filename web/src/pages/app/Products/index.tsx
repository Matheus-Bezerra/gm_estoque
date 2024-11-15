import { Helmet } from "react-helmet-async";
import { DataTable } from "./components/Datatable";
import { useToast } from "@/hooks/use-toast";
import { categoriasLista } from "@/utils/data/products/categorias";
import { fornecedoresLista } from "@/utils/data/fornecedores/lista";
import { SubmitHandler } from "react-hook-form"; 
import { z } from "zod"
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema"
import { DialogAddProduto } from "./components/Dialogs/DialogAddProduto";
import { useState } from "react";



export const Products = () => {
    const { toast } = useToast()
    const [isDialogAdd, setIsDialogAdd] = useState(false)

    const addProduto: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
        console.log("Data ", data)
        toast({
            title: "Sucesso",
            description: "Produto adicionado com sucesso!",
            duration: 4000,
            variant: "success"
        })

        setIsDialogAdd(false)
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
