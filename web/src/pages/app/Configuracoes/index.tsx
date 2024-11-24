import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async"
import { DialogDeleteAcount } from "./components/dialogs/DialogDeleteAcount";
import React from "react";
import { useSession } from "@/hooks/use-session";
import { FormMudarSenha } from "./components/forms/FormMudarSenha";
import { FormAlterarUsername } from "./components/forms/FormAlterarUsername";

export const Configuracoes = () => {
    const { logout,  } = useSession();
    const { toast } = useToast()
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleDeleteAcount = async () => {
        try {
            await api.delete(`/user`);
            logout()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível Deletar essa conta, tente novamente mais tarde",
                duration: 2000,
                variant: "destructive",
            });
        }

    };

    return (
        <>
            <Helmet title="Configurações" />
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Configurações</h3>
            <p className="mt-2 text-sm text-muted-foreground">Gerencie as configurações relacionadas a sua conta</p>

            <div className="mt-5 grid gap-6">

                <div>
                    <h4 className="text-xl font-semibold leading-none tracking-tight">Alterar nome do usuário</h4>
                    <Separator className="my-2" />

                    <p className="mb-3 text-xs">
                        Para sua segurança, atualize sua senha regularmente. Preencha os campos abaixo para alterar sua
                        senha no sistema.
                    </p>

                    <FormAlterarUsername />
                </div>

                <div>
                    <h4 className="text-xl font-semibold leading-none tracking-tight">Mudar Senha</h4>
                    <Separator className="my-2" />

                    <p className="mb-3 text-xs">
                        Para sua segurança, atualize sua senha regularmente. Preencha os campos abaixo para alterar sua
                        senha no sistema.
                    </p>

                    <FormMudarSenha />

                </div>

                <div>
                    <h4 className="text-xl font-semibold leading-none tracking-tight">Deletar Conta</h4>
                    <Separator className="my-2" />

                    <p className="mb-3 text-xs">
                        Caso você opte por deletar sua conta, todos os seus dados e informações associados ao sistema serão permanentemente removidos e não poderão ser recuperados
                    </p>

                    <Button className="bg-red-800" onClick={() => setOpenDelete(true)}>Apagar Conta</Button>
                </div>

                <DialogDeleteAcount
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={handleDeleteAcount}
                />


            </div>
        </>
    )
}
