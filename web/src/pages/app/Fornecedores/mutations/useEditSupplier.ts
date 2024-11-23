import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formFornecedorSchema } from "../validators/formFornecedorSchema";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/axios";

export const useEditSupplierMutation = (
    setOpenEdit: (value: boolean) => void,
    setOpenAssociarProdutos: (value: boolean) => void
) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: z.infer<typeof formFornecedorSchema> & { id: string }) => {
            const { id, ...payload } = data;
            const response = await api.put(`/supplier/${id}`, payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            setOpenEdit(false);
            setOpenAssociarProdutos(false);

            toast({
                title: "Sucesso",
                description: "Fornecedor editado com sucesso!",
                duration: 2000,
                variant: "success",
            });
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao editar fornecedor: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
