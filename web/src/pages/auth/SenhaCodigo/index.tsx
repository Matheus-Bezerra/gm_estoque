import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"; // Importando os componentes
import { Boxes, RefreshCw } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const senhaCodigoSchema = z.object({
    otp: z.string().length(6, { message: "O código precisa ter 6 dígitos" }), // Validação para 6 caracteres
});

type SenhaCodigoFormInputs = z.infer<typeof senhaCodigoSchema>;

export function SenhaCodigo() {
    const location = useLocation();
    const { handleSubmit, control, formState: { errors } } = useForm<SenhaCodigoFormInputs>({
        resolver: zodResolver(senhaCodigoSchema),
        defaultValues: {
            otp: "",
        },
    });

    console.log("Location ", location)

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SenhaCodigoFormInputs> = (data) => {
        console.log("Código enviado", data);

        navigate("/auth/nova-senha");
    };


    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(40);

    const handleResendCode = () => {
        setIsButtonDisabled(true);
        setSecondsRemaining(40);
    };

    // Temporizador para contar os 40 segundos
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isButtonDisabled && secondsRemaining > 0) {
            timer = setInterval(() => {
                setSecondsRemaining((prev) => prev - 1);
            }, 1000);
        } else if (secondsRemaining === 0) {
            setIsButtonDisabled(false); // Reabilita o botão após 40 segundos
        }
        return () => clearInterval(timer);
    }, [isButtonDisabled, secondsRemaining]);


    return (
        <>
            <Helmet title="Insira o código" />
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl flex gap-3 justify-center">
                        <div
                            className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground md:h-10 md:w-10 md:text-base`}
                        >
                            <Boxes className="h-6 w-6 transition-all group-hover:scale-110" />
                            <span className="sr-only">GM Estoque</span>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Insira o código enviado para seu e-mail
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="otp">Código de Segurança</Label>
                            {/* Controller para o InputOTP */}
                            <Controller
                                name="otp"
                                control={control}
                                render={({ field }) => (
                                    <InputOTP {...field} maxLength={6}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                            />
                            {errors.otp && <span className="text-red-500">{errors.otp.message}</span>}
                        </div>
                        <Button type="submit" className="w-full">
                            Confirmar Código
                        </Button>
                        <Button
                            type="button"
                            className="w-full"
                            variant="secondary"
                            disabled={isButtonDisabled}
                            onClick={handleResendCode}
                        >
                            {isButtonDisabled ? (
                                <>
                                    <RefreshCw className="animate-spin h-4 w-4 mr-2" /> Reenviar em: {secondsRemaining} s
                                </>
                            ) : (
                                "Reenviar código"
                            )}
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
    );
}
