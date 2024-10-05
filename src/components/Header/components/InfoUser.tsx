import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bolt, CircleUserRound, LogOut } from "lucide-react"

export const InfoUser = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CircleUserRound className="cursor-pointer" />
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
