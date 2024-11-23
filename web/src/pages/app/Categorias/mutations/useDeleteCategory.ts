import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/axios";

export const useDeleteCategoryMutation = (setOpenDelete: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (categoriaId: string) => {
            const response = await api.delete(`/category/${categoriaId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            toast({
                title: "Sucesso",
                description: "Categoria removida com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setOpenDelete(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao deletar Categoria: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
