import { api } from '@/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from '@/hooks/use-session'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export const FormAlterarUsername = () => {
    const {  session, setSession } = useSession();
    const { toast } = useToast()

    const alterarNomeSchema = z.object({
        name: z
            .string()
            .min(3, "Mínimo 3 caracteres")
            .max(35, "Máximo 35 caracteres"),
    });

    type AlterarNomeFormInputs = z.infer<typeof alterarNomeSchema>;

    const { handleSubmit, control, formState: { errors } } = useForm<AlterarNomeFormInputs>({
        resolver: zodResolver(alterarNomeSchema),
        defaultValues: { name: session?.username },
    });

    const onSubmit: SubmitHandler<AlterarNomeFormInputs> = async (data) => {
        try {
            const response = await api.put("/user", { name: data.name });
            setSession({
                email: response.data.email as string,
                username: response.data.name as string
            })

            toast({
                title: "Sucesso",
                description: "Nome do usuário alterado com sucesso!",
                duration: 2000,
                variant: "success",
            });
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível alterar o nome. Tente novamente.",
                duration: 2000,
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <div className="flex items-end gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Digite seu novo nome" />
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-min">
                        Alterar Nome
                    </Button>
                </div>
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </div>
        </form>
    )
}
