import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Fornecedor } from "@/utils/data/products/interfaces";

interface DialogDeleteFornecedorProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    fornecedor: Fornecedor;
}

export function DialogDeleteFornecedor({ open, onClose, onConfirm, fornecedor }: DialogDeleteFornecedorProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Fornecedor</DialogTitle>
                    <DialogDescription>Confirmação de exclusão</DialogDescription>
                </DialogHeader>
                
                <p className="text-foreground">
                    Tem certeza que deseja excluir o Fornecedor <span className="font-bold text-xl">"{fornecedor.nome}"</span>?
                </p>
                
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
