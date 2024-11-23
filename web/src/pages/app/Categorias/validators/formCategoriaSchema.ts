import { z } from "zod";

export const formCategoriaSchema = z.object({
    name: z.string({message: "Nome é Oobrigatório"}).min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    color: z.string().optional(),
    productsIds: z.array(z.string()).optional()
});