import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/hooks/use-session";
import { Bolt, LogOut, User2 } from "lucide-react"
import { useNavigate } from "react-router-dom";

export const InfoUser = () => {
    const { session, logout } = useSession();
    const navigate = useNavigate()

    function handleLogout() {
        logout()
    }

    function navigateConfig() {
        navigate("/configuracoes")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <User2 />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-muted-foreground" onClick={navigateConfig}>
                    <Bolt className="h-4 w-4 mr-2" />  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-muted-foreground" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2 text-red-400" />  <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
