import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCategoriaSchema } from "@/pages/app/Categorias/validators/formCategoriaSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Brush } from "lucide-react";
import { useRef } from "react";
import { ProdutoApi } from "@/interfaces";

interface DialogAddCategoriaProps {
    produtosLista: ProdutoApi[];
    onSubmit: SubmitHandler<CategoriaFormValues>;
    isDialogAddCategoriaOpen: boolean;
    setDialogAddCategoriaOpen: (isOpen: boolean) => void;
}

type CategoriaFormValues = z.infer<typeof formCategoriaSchema>;
const valoresPadraoAdicionarCategoria: z.infer<typeof formCategoriaSchema> = {
    name: "",
    color: "#dc2626"
}


export const DialogAddCategoria: React.FC<DialogAddCategoriaProps> = ({ produtosLista, onSubmit, isDialogAddCategoriaOpen, setDialogAddCategoriaOpen }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBrushClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const { handleSubmit, control, formState: { errors }, reset } = useForm<CategoriaFormValues>({
        resolver: zodResolver(formCategoriaSchema),
        defaultValues: valoresPadraoAdicionarCategoria
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof formCategoriaSchema>> = (data) => {
        try {
            onSubmit(data);
            reset(valoresPadraoAdicionarCategoria)
        } catch (err) {}
    };

    const produtosSelect = produtosLista.map(pa => {
        return {label: pa.name, value: pa.id}
    })

    return (
        <Dialog open={isDialogAddCategoriaOpen} onOpenChange={setDialogAddCategoriaOpen}>
            <DialogTrigger asChild>
                <Button>+ Adicionar Categoria</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Categoria</DialogTitle>
                    <DialogDescription>Preencha os detalhes da categoria abaixo</DialogDescription>
                </DialogHeader>


                <form className="grid gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Nome" />
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


                    <Controller
                        name="productsIds"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={produtosSelect}
                                onValueChange={field.onChange}
                                placeholder="Produtos"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                                {...field}
                            />
                        )}
                    />

                    <Button className="w-100" type="submit">Salvar</Button>
                </form>

                <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
