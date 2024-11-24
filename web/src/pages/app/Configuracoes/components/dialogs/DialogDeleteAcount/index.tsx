import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DialogDeleteAcountProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DialogDeleteAcount({ open, onClose, onConfirm }: DialogDeleteAcountProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Conta</DialogTitle>
                    <DialogDescription>todos os seus dados e informações associados ao sistema serão permanentemente removidos e não poderão ser recuperados</DialogDescription>
                </DialogHeader>

                <p className="text-foreground">
                    Tem certeza que deseja excluir essa conta?
                </p>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
