import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { Boxes } from "lucide-react"
import { InputPassword } from "@/components/ui/input-password"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "@/hooks/use-session"

const loginSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  password: z.string().min(6, "A senha tem no mínimo 6 caracteres"),
})

type LoginFormInputs = z.infer<typeof loginSchema>

export function Login() {
  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: ""
    }
  })
  const { toast } = useToast()
  const navigate = useNavigate();
  const { setSession } = useSession();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {

    if (data.name == 'Matheus' && data.password == 'Teste@') {
      const session = {
        name: data.name,
        email: "teste@gmail.com"
      }
      setSession(session)
      navigate("/");
    } else {
      toast({
        title: "Login inválido",
        description: "Nome de usuário ou senha incorretos. Tente novamente.",
        duration: 4000,
        variant: "destructive" 
      });
    }
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
        <CardDescription>
          Digite seus dados para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do usuário</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} id="name" />
              )}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link to="/auth/esqueceu-senha" className="ml-auto inline-block text-sm underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputPassword
                  {...field}
                  id="password"
                  autoComplete="current-password"
                />
              )}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link to="/auth/cadastro" className="underline">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
