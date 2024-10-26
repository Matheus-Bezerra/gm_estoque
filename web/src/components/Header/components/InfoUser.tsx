import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bolt, LogOut, User2 } from "lucide-react"

export const InfoUser = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <User2  />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Matheus Bezerra</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-muted-foreground">
                    <Bolt className="h-4 w-4 mr-2" />  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-muted-foreground">
                    <LogOut className="h-4 w-4 mr-2 text-red-400" />  <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
