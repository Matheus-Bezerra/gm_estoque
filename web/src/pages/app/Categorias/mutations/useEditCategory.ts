import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formCategoriaSchema } from "../validators/formCategoriaSchema";
import { api } from "@/axios";

export const useEditCategoryMutation = (
    setOpenEdit: (value: boolean) => void,
    setOpenAssociarProdutos: (value: boolean) => void
) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: z.infer<typeof formCategoriaSchema> & { id: string }) => {
            const { id, ...payload } = data;
            const response = await api.put(`/category/${id}`, payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            setOpenEdit(false);
            setOpenAssociarProdutos(false);

            toast({
                title: "Sucesso",
                description: "Categoria editada com sucesso!",
                duration: 2000,
                variant: "success",
            });
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao editar Categoria: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
