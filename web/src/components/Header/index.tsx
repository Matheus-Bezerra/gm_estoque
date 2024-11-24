import { Boxes, Home, PackageOpen, PanelLeft, Tag, Users2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "../theme/ModeToggle"
import { InfoUser } from "./components/InfoUser"
import { BreadcrumbLayout } from "./components/BreadcrumbLayout"
export const Header = () => {
    const location = useLocation(); // Pega a localização atual

    return (
        <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Boxes className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">GM Estoque</span>
                        </Link>
                        <Link
                            to="/"
                            className={`flex items-center gap-4 px-2.5 ${location.pathname === '/' ? 'text-primary-foreground' : 'text-foreground'}`}
                        >
                            <Home className="h-5 w-5" />
                            Início
                        </Link>
                        <Link
                            to="produtos"
                            className={`flex items-center gap-4 px-2.5 ${location.pathname === '/produtos' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <PackageOpen className="h-5 w-5" />
                            Produtos
                        </Link>
                        <Link
                            to="fornecedores"
                            className={`flex items-center gap-4 px-2.5 ${location.pathname === '/fornecedores' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Users2 className="h-5 w-5" />
                            Fornecedores
                        </Link>
                        <Link
                            to="categorias"
                            className={`flex items-center gap-4 px-2.5 ${location.pathname === '/categorias' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Tag className="h-5 w-5" />
                            Categorias
                        </Link>
                        {/* <Link
                            to="analise"
                            className={`flex items-center gap-4 px-2.5 ${location.pathname === '/analise' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <LineChart className="h-5 w-5" />
                            Análise
                        </Link> */}
                    </nav>
                </SheetContent>
            </Sheet>
            <BreadcrumbLayout />
            <div className="flex items-center md:grow-0 gap-3">
                <ModeToggle />
                <InfoUser />
            </div>
        </header>
    );
};