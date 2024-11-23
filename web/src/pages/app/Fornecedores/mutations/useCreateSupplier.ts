import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formFornecedorSchema } from "../validators/formFornecedorSchema";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/axios";

export const useCreateSupplierMutation = (setIsDialogAdd: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: z.infer<typeof formFornecedorSchema>) => {
            if (!data.productsIds || data.productsIds.length < 1) {
                delete data.productsIds;
            }
            const response = await api.post("/supplier", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            toast({
                title: "Sucesso",
                description: "Fornecedor adicionado com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setIsDialogAdd(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao adicionar fornecedor: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
