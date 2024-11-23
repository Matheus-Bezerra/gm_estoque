import { z } from "zod";

export const formAssociarProdutosSchema = z.object({
    productsId: z.array(z.string()).optional()
});