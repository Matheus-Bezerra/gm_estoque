import { api } from '@/axios';
import { Button } from '@/components/ui/button';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const FormMudarSenha = () => {
    const messageCurrentPassword = "Senha Inválida"

    const alterarSenhaSchema = z.object({
        currentPassword: z.string()
            .min(6, messageCurrentPassword)
            .max(20, messageCurrentPassword)
            .regex(/[A-Z]/, messageCurrentPassword)
            .regex(/[\W_]/, messageCurrentPassword),
        newPassword: z.string()
            .min(6, "A senha deve ter no mínimo 6 caracteres")
            .max(20, "A senha pode ter no máximo 20 caracteres")
            .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
            .regex(/[\W_]/, "A senha deve ter pelo menos um caractere especial"),
        confirmPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas precisam ser iguais",
        path: ["confirmPassword"],
    });

    type AlterarSenhaFormInputs = z.infer<typeof alterarSenhaSchema>;
    const { toast } = useToast()
    

    const { handleSubmit, control, formState: { errors } } = useForm<AlterarSenhaFormInputs>({
        resolver: zodResolver(alterarSenhaSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    })

    const onSubmit: SubmitHandler<AlterarSenhaFormInputs> = async (data) => {
        try {
            await api.post("/auth/reset-password", {
                oldPassword: data.currentPassword,
                newPassword: data.newPassword
            });

            toast({
                title: "Sucesso",
                description: "Senha Alterada com sucesso",
                duration: 2000,
                variant: "success",
            });
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro",
                // @ts-ignore
                description: `${(error as AxiosError).response.data.message ? (error as AxiosError).response.data.message : "Houve um erro. Tente novamente mais tarde!"}`,
                duration: 2000,
                variant: "destructive",
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="currentPassword">Senha atual</Label>
                <Controller
                    name="currentPassword"
                    control={control}
                    render={({ field }) => (
                        <InputPassword {...field} placeholder="Senha" />
                    )}
                />
                {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message}</span>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="newPassword">Nova senha</Label>
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <InputPassword {...field} placeholder="Senha" />
                    )}
                />
                {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <InputPassword {...field} placeholder="Confirme a senha" />
                    )}
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>

            <Button type="submit" className="w-min">
                Alterar
            </Button>
        </form>
    )
}
