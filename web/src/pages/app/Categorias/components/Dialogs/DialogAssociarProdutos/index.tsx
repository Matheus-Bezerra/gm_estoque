import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formAssociarProdutosSchema } from "../../../validators/formAssociarProdutosSchema";
import { Categoria } from "@/interfaces";

interface DialogAssociarProdutos {
    categoria: Categoria;
    onSubmit: SubmitHandler<FornecedorAssociarValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    produtosLista: { label: string, value: string }[];
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
            produtos: categoria.produtosAssociados.map(pa => pa.value)
        },
    });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Produtos associados</DialogTitle>
                    <DialogDescription>Associe a categoria "{categoria.nome}" para os produtos disponíveis</DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* MultiSelect para Fornecedores */}
                    <Controller
                        control={control}
                        name="produtos"
                        render={({ field: { onChange, value } }) => {

                            return (
                                <div>
                                    <MultiSelect
                                        options={produtosLista}
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