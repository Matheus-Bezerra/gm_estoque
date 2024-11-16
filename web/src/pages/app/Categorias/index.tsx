import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { formCategoriaSchema } from "@/pages/app/Categorias/validators/formCategoriaSchema"
import { DialogAddCategoria } from "./components/Dialogs/DialogAddCategoria";
import { produtosLista } from "@/utils/data/products/lista";
import { DataTable } from "./components/Datatable";
import { useState } from "react";



export const Categorias = () => {
    const { toast } = useToast()
    const [isDialogAdd, setIsDialogAdd] = useState(false)

    const addCategorias: SubmitHandler<z.infer<typeof formCategoriaSchema>> = (data) => {
        console.log("Data ", data)
        toast({
            title: "Sucesso",
            description: "Categoria adicionado com sucesso!",
            duration: 4000,
            variant: "success"
        })

        setIsDialogAdd(false)
    }

    return (
        <>
            <Helmet title="Categorias" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Categorias</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie as categorias associados aos produtos do seu estoque</p>

            <div className="mt-5">
                <DialogAddCategoria
                    produtosLista={produtosLista}
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
