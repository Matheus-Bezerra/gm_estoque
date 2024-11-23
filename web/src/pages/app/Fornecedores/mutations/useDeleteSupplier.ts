import { api } from "@/axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSupplierMutation = (setOpenDelete: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (supplierId: string) => {
            const response = await api.delete(`/supplier/${supplierId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            queryClient.invalidateQueries({ queryKey: ["associatedProducts"] });

            toast({
                title: "Sucesso",
                description: "Fornecedor removido com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setOpenDelete(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao deletar fornecedor: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
