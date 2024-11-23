import { z } from "zod";

export const formProdutoSchema = z.object({
    name: z.string({message: "Nome Obrigatório"}).min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    typeControl: z.enum(["UNIT", "WEITGHT"]),
    amount: z.number().or(z.string()).optional(),
    quantity: z.number().or(z.string()).optional(),
    supplierId: z.string().optional(),
    categoryId: z.string().optional()
}).refine((data) => {
    if (data.typeControl === "WEITGHT") return data.amount && data.amount.toString().length > 0;

    if (data.typeControl === "UNIT") return data.quantity && data.quantity.toString().length > 0;
    return true;
}, {
    message: "Campo Obrigatório conforme o tipo de controle escolhido",
    path: ["typeControl"]
});