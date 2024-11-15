import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { formFornecedorSchema } from "@/pages/app/Fornecedores/validators/formFornecedorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Fornecedor } from "@/utils/data/products/interfaces";

interface DialogEditFornecedorProps {
    fornecedor: Fornecedor;
    onSubmit: SubmitHandler<FornecedorFormValues>;
    open: boolean;
    onClose: (open: boolean) => void;
    produtosLista: { label: string, value: string }[];
}


type FornecedorFormValues = z.infer<typeof formFornecedorSchema>;

export function DialogEditFornecedor({
    fornecedor,
    onSubmit,
    open,
    onClose,
    produtosLista
}: DialogEditFornecedorProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<FornecedorFormValues>({
        resolver: zodResolver(formFornecedorSchema),
        defaultValues: {
            nome: fornecedor.nome,
            email: fornecedor.email,
            produtos: fornecedor.produtosAssociados.map(pa => pa.value)
        },
    });


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
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input id="email" placeholder="E-mail" {...field} />
                            )}
                        />
                        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
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
