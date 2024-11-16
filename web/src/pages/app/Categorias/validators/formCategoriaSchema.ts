import { z } from "zod";

export const formCategoriaSchema = z.object({
    nome: z.string({message: "Nome é Oobrigatório"}).min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    cor: z.string().optional(),
    produtos: z.array(z.string()).optional()
});