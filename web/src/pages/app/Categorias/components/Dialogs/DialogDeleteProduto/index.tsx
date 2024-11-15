import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Produto } from "@/utils/data/products/interfaces";

interface DialogDeleteProdutoProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    produto: Produto;
}

export function DialogDeleteProduto({ open, onClose, onConfirm, produto }: DialogDeleteProdutoProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Produto</DialogTitle>
                    <DialogDescription>Confirmação de exclusão</DialogDescription>
                </DialogHeader>
                
                <p className="text-foreground">
                    Tem certeza que deseja excluir o produto <span className="font-bold text-xl">"{produto.nome}"</span>?
                </p>
                
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}