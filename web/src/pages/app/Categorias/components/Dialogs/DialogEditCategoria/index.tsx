import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategoriaApi, ProdutoApi } from "@/interfaces";
import { formCategoriaSchema } from "../../../validators/formCategoriaSchema";
import { Brush } from "lucide-react";
import { useRef } from "react";

interface DialogEditCategoriaProps {
    categoria: CategoriaApi;
    onSubmit: SubmitHandler<CategoriaFormValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    produtosLista: ProdutoApi[];
}


type CategoriaFormValues = z.infer<typeof formCategoriaSchema>;

export function DialogEditCategoria({
    categoria,
    onSubmit,
    open,
    onClose,
    produtosLista
}: DialogEditCategoriaProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<CategoriaFormValues>({
        resolver: zodResolver(formCategoriaSchema),
        defaultValues: {
            name: categoria.name,
            color: categoria?.color,
            productsIds: categoria.products.map(pa => pa.id)
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleBrushClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    let produtosSelect = produtosLista.map(pa => {
        return {label: pa.name, value: pa.id}
    })
    const produtosSelecionadosCategorias = categoria.products.map(pa => {
        return {label: pa.name, value: pa.id}
    })
    produtosSelect = [...produtosSelect, ...produtosSelecionadosCategorias]

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Categoria</DialogTitle>
                    <DialogDescription>Altere os detalhes da categoria abaixo</DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input id="nome" placeholder="Nome" {...field} />
                            )}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    <div>
                        <Controller
                            name="color"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Brush
                                            onClick={handleBrushClick}
                                            className="cursor-pointer"
                                        />
                                        <Input
                                            {...field} type="color"
                                            ref={inputRef}
                                            placeholder="m@example.com" />
                                    </div>

                                </>


                            )}
                        />
                        {errors.color && <span className="text-red-500">{errors.color.message}</span>}
                    </div>


                    {/* MultiSelect para Fornecedores */}
                    <Controller
                        control={control}
                        name="productsIds"
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
