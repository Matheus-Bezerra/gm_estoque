import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Categoria } from "@/interfaces";
import { formCategoriaSchema } from "../../../validators/formCategoriaSchema";
import { Brush } from "lucide-react";
import { useRef } from "react";

interface DialogEditCategoriaProps {
    categoria: Categoria;
    onSubmit: SubmitHandler<CategoriaFormValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    produtosLista: { label: string, value: string }[];
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
            nome: categoria.nome,
            cor: categoria?.cor,
            produtos: categoria.produtosAssociados.map(pa => pa.value)
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleBrushClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Fornecedor</DialogTitle>
                    <DialogDescription>Altere os detalhes do fornecedor abaixo</DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <Input id="nome" placeholder="Nome" {...field} />
                            )}
                        />
                        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                    </div>

                    <div>
                        <Controller
                            name="cor"
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
                        {errors.cor && <span className="text-red-500">{errors.cor.message}</span>}
                    </div>


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
