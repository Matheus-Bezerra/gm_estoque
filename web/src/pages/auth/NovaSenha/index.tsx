import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { InputPassword } from "@/components/ui/input-password"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Boxes } from "lucide-react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

const novaSenhaSchema = z.object({
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

type NovaSenhaFormInputs = z.infer<typeof novaSenhaSchema>

export function NovaSenha() {
    const { handleSubmit, control, formState: { errors } } = useForm<NovaSenhaFormInputs>({
        resolver: zodResolver(novaSenhaSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    })
    const { toast } = useToast()

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<NovaSenhaFormInputs> = (data) => {
        console.log("Dados do Cadastro ", data)

        toast({
            title: "Sucesso",
            description: "Senha redefinida",
            duration: 3000,
            variant: "success"
        });

        navigate("/auth");
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl flex gap-3 justify-center">
                    <div
                        className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground  md:h-10 md:w-10 md:text-base`}
                    >
                        <Boxes className="h-6 w-6 transition-all group-hover:scale-110" />
                        <span className="sr-only">GM Estoque</span>
                    </div>
                </CardTitle>
                <CardDescription className="text-center">
                    Insira seus dados para criar sua conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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

                    <Button type="submit" className="w-full">
                        Redefinir
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <Link to="/auth" className="underline">
                        Voltar para o login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}