import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CategoriaApi } from "@/interfaces";

interface DialogDeleteCategoriaProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    categoria: CategoriaApi;
}

export function DialogDeleteCategoria({ open, onClose, onConfirm, categoria }: DialogDeleteCategoriaProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Categoria</DialogTitle>
                    <DialogDescription>Confirmação de exclusão</DialogDescription>
                </DialogHeader>
                
                <p className="text-foreground">
                    Tem certeza que deseja excluir a Categoria <span className="font-bold text-xl">"{categoria.name}"</span>?
                </p>
                
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
