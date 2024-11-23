import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formAssociarProdutosSchema } from "../../../validators/formAssociarProdutosSchema";
import { CategoriaApi, ProdutoApi } from "@/interfaces";

interface DialogAssociarProdutos {
    categoria: CategoriaApi;
    onSubmit: SubmitHandler<FornecedorAssociarValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    produtosLista: ProdutoApi[];
}

type FornecedorAssociarValues = z.infer<typeof formAssociarProdutosSchema>;

export function DialogAssociarProdutos({
    categoria,
    onSubmit,
    open,
    onClose,
    produtosLista
}: DialogAssociarProdutos) {
    const { control, handleSubmit } = useForm<FornecedorAssociarValues>({
        resolver: zodResolver(formAssociarProdutosSchema),
        defaultValues: {
            productsId: categoria.products.map(pa => pa.id)
        },
    });
    const produtosSelect = produtosLista.map(pa => {
        return { label: pa.name, value: pa.id }
    })


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Produtos associados</DialogTitle>
                    <DialogDescription>Associe a categoria "{categoria.name}" para os produtos disponíveis</DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* MultiSelect para Fornecedores */}
                    <Controller
                        control={control}
                        name="productsId"
                        render={({ field: { onChange, value } }) => {

                            return (
                                <div>
                                    <MultiSelect
                                        options={produtosSelect}
                                        onValueChange={onChange}
                                        defaultValue={value || []}
                                        placeholder="Produtos"
                                        variant="inverted"
                                        animation={2}
                                        maxCount={3}
                                    />
                                </div>)
                        }}
                    />

                    <Button className="w-100 rounded-2xl" type="submit">Salvar</Button>
                </form>

                <DialogClose asChild>
                    <Button className="rounded-2xl" variant="outline">Fechar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
