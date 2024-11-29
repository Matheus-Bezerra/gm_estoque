import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { formProdutoSchema } from "../validators/formProdutoSchema";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/axios";

export const useCreateProductMutation = (setIsDialogAdd: (value: boolean) => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: z.infer<typeof formProdutoSchema>) => {
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
            if (!data.supplierId) {
                delete data.supplierId;
            }
            if (!data.categoryId) {
                delete data.categoryId;
            }

            const response = await api.post("/product", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["associatedSuppliers"] });
            queryClient.invalidateQueries({ queryKey: ["associatedCategories"] });

            toast({
                title: "Sucesso",
                description: "Produto adicionado com sucesso!",
                duration: 2000,
                variant: "success",
            });

            setIsDialogAdd(false);
        },
        onError: (error) => {
            console.error("Erro ", error);
            toast({
                title: "Erro",
                description: `Erro ao adicionar produto: ${error.message}`,
                duration: 2000,
                variant: "destructive",
            });
        },
    });
};
