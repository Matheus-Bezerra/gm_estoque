import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const esqueceuSenhaSchema = z.object({
    email: z.string().email("E-mail inválido"),
})

type EsqueceuSenhaFormInputs = z.infer<typeof esqueceuSenhaSchema>

export function EsqueceuSenha() {
    const { handleSubmit, control, formState: { errors } } = useForm<EsqueceuSenhaFormInputs>({
        resolver: zodResolver(esqueceuSenhaSchema),
        defaultValues: {
            email: ""
        }
    })

    const { toast } = useToast()
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<EsqueceuSenhaFormInputs> = (data) => {
        console.log("Email enviado ", data)

        // Chegou aqui é sucesso
        toast({
            title: "Sucesso",
            description: "Código enviado para o email da conta",
            duration: 3000,
            variant: "success"
        });

        navigate("/auth/senha-codigo", { state: { email: data.email } });
    }

    return (
        <>
            <Helmet title="Esqueceu a senha" />
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
                    <CardDescription>
                        Insira seu email para enviarmos um código
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} type="email" placeholder="m@example.com" />
                                )}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        <Link to="/auth" className="underline">
                            Voltar para o login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
