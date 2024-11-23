import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/axios";
import { formCategoriaSchema } from "../validators/formCategoriaSchema";

export const useCreateCategoryMutation = (setIsDialogAdd: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: z.infer<typeof formCategoriaSchema>) => {
            if (!data.productsIds || data.productsIds.length < 1) {
                delete data.productsIds;
            }
            const response = await api.post("/category", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            toast({
                title: "Sucesso",
                description: "Categoria adicionada com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setIsDialogAdd(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao adicionar Categoria: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
