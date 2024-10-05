import { Boxes } from "lucide-react"
import { ModeToggle } from "../theme/ModeToggle"
import { InfoUser } from "./components/InfoUser"

export const Header = () => {
  return (
    <header className="py-5 px-6 flex justify-between items-center border-b">
        <div className="pr-4 border-r border-primary">
            <Boxes className="h-8 w-8" />
        </div>
        <nav>
            <ul className="flex gap-8 tracking-tight text-muted-foreground">
                <li className="p-1 text-primary cursor-pointer">

                    <span>Produtos</span>
                </li>
                <li className="p-1 cursor-pointer">Fornecedores</li>
                <li className="p-1 cursor-pointer">Categorias</li>
            </ul>
        </nav>

        <div className="flex gap-4 items-center">
            <ModeToggle />
            <InfoUser />
        </div>
    </header>
  )
}

