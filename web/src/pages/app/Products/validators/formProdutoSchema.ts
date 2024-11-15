import { z } from "zod";

export const formProdutoSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome do produto deve ter no mínimo 2 caracteres",
    }),
    status: z.enum(["ativo", "inativo"]),
    tipoControle: z.enum(["quantidade", "peso"]),
    peso: z.number().or(z.string()).optional(),
    quantidade: z.number().or(z.string()).optional(),
    fornecedor: z.string().optional(),
    categoria: z.string().optional()
}).refine((data) => {
    if (data.tipoControle === "peso") return data.peso && data.peso.toString().length > 0;

    if (data.tipoControle === "quantidade") return data.quantidade && data.quantidade.toString().length > 0;
    return true;
}, {
    message: "Campo Obrigatório conforme o tipo de controle escolhido",
    path: ["tipoControle"]
});