import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet-async"
import { DataTable } from "./components/Datatable"

export const Products = () => {
    return (
        <>
            <Helmet title="Produtos" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Produtos</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie seus produtos de forma eficiente</p>
            <div className="mt-5">
                <Button>+ Adicionar Produto</Button>
            </div>
            <div className="mt-1">
                <DataTable />
            </div>
        </>
    )
}