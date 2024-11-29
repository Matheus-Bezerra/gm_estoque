import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formProdutoSchema } from "../validators/formProdutoSchema";
import { api } from "@/axios";
import { useToast } from "@/hooks/use-toast";

export const useEditProductMutation = (setOpenEdit: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: z.infer<typeof formProdutoSchema> & { id: string }) => {
            if (data.typeControl === "UNIT") {
                delete data.amount;
                if (data.quantity && typeof data.quantity === "string") {
                    data.quantity = parseInt(data.quantity, 10);
                }
            } else if (data.typeControl === "WEIGHT") {
                delete data.quantity;
                if (typeof data.amount === "string") {
                    data.amount = parseFloat(data.amount.replace(",", "."));
                }
            }
            if (!data.supplierId) delete data.supplierId;
            if (!data.categoryId) delete data.categoryId;

            const response = await api.put(`/product/${data.id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["associatedSuppliers"] });
            queryClient.invalidateQueries({ queryKey: ["associatedCategories"] });

            toast({
                title: "Sucesso",
                description: "Produto editado com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setOpenEdit(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao editar produto: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};