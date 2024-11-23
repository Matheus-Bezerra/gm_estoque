import { api } from "@/axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProductMutation = (setOpenDelete: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId: string) => {
            const response = await api.delete(`/product/${productId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["associatedSuppliers"] });
            queryClient.invalidateQueries({ queryKey: ["associatedCategories"] });
            toast({
                title: "Sucesso",
                description: "Produto removido com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setOpenDelete(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao deletar produto: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
