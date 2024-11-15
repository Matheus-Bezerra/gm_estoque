import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFornecedorSchema } from "@/pages/app/Fornecedores/validators/formFornecedorSchema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface DialogAddFornecedorProps {
    produtosLista: { label: string, value: string }[];
    onSubmit: SubmitHandler<z.infer<typeof formFornecedorSchema>>;
    isDialogAddFornecedorOpen: boolean;
    setDialogAddFornecedorOpen: (isOpen: boolean) => void;
}

export const DialogAddFornecedor: React.FC<DialogAddFornecedorProps> = ({ produtosLista, onSubmit, isDialogAddFornecedorOpen, setDialogAddFornecedorOpen }) => {
    const { toast } = useToast();

    const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof formFornecedorSchema>>({
        resolver: zodResolver(formFornecedorSchema),
        defaultValues: {
            nome: "",

        }
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof formFornecedorSchema>> = (data) => {
        onSubmit(data);
        toast({
            title: "Sucesso",
            description: "Fornecedor adicionado com sucesso!",
            duration: 4000,
            variant: "success"
        });
    };

    return (
        <Dialog open={isDialogAddFornecedorOpen} onOpenChange={setDialogAddFornecedorOpen}>
            <DialogTrigger asChild>
                <Button>+ Adicionar Fornecedor</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Fornecedor</DialogTitle>
                    <DialogDescription>Preencha os detalhes do fornecedor abaixo</DialogDescription>
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
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="email" placeholder="m@example.com" />
                            )}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
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
