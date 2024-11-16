import { z } from "zod";

export const formAssociarProdutosSchema = z.object({
    produtos: z.array(z.string()).optional()
});