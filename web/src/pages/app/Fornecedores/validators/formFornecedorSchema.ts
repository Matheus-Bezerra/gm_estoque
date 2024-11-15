import { z } from "zod";

export const formFornecedorSchema = z.object({
    nome: z.string({message: "Nome é Oobrigatório"}).min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    email: z.string({message: "E-mail é obrigatório"}).email("E-mail inválido"),
    produtos: z.array(z.string()).optional()
});