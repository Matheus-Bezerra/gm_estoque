import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCategoriaSchema } from "@/pages/app/Categorias/validators/formCategoriaSchema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Brush } from "lucide-react";
import { useRef } from "react";

interface DialogAddCategoriaProps {
    produtosLista: { label: string, value: string }[];
    onSubmit: SubmitHandler<CategoriaFormValues>;
    isDialogAddCategoriaOpen: boolean;
    setDialogAddCategoriaOpen: (isOpen: boolean) => void;
}

type CategoriaFormValues = z.infer<typeof formCategoriaSchema>;

export const DialogAddCategoria: React.FC<DialogAddCategoriaProps> = ({ produtosLista, onSubmit, isDialogAddCategoriaOpen, setDialogAddCategoriaOpen }) => {
    const { toast } = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBrushClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const { handleSubmit, control, formState: { errors } } = useForm<CategoriaFormValues>({
        resolver: zodResolver(formCategoriaSchema),
        defaultValues: {
            nome: "",
            cor: "#dc2626"
        }
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof formCategoriaSchema>> = (data) => {
        onSubmit(data);
        toast({
            title: "Sucesso",
            description: "Categoria adicionado com sucesso!",
            duration: 4000,
            variant: "success"
        });
    };



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
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Nome" />
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


                    <Controller
                        name="produtos"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={produtosLista}
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
