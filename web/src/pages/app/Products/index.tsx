import { Helmet } from "react-helmet-async";
import { DataTable } from "./components/Datatable";
import { useToast } from "@/hooks/use-toast";
import { categoriasLista } from "@/utils/data/products/categorias";
import { fornecedoresLista } from "@/utils/data/products/fornecedores";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formProdutoSchema } from "@/pages/app/Products/validators/formProdutoSchema"
import { DialogAddProduto } from "./components/Datatable/Dialogs/DialogAddProduto";



export const Products = () => {
    const { toast } = useToast()

    const addProduto: SubmitHandler<z.infer<typeof formProdutoSchema>> = (data) => {
        console.log("Produtoss ", data)

        toast({
            title: "Sucesso",
            description: "Produto adicionado com sucesso!",
            duration: 5000,
            variant: "success"
        })
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
                />
            </div>

            <div className="mt-1">
                <DataTable />
            </div>
        </>
    );
};
