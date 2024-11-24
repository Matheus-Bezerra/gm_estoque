import { Boxes, Home, Users2, Tag, Settings, PackageOpen } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const Aside = () => {
  const location = useLocation(); // Pega a localização atual

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground  md:h-8 md:w-8 md:text-base`}
        >
          <Boxes className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">GM Estoque</span>
        </Link>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${location.pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Início</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Início</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/produtos"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${location.pathname === '/produtos' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
            >
              <PackageOpen className="h-5 w-5" />
              <span className="sr-only">Produtos</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Produtos</TooltipContent>
        </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="fornecedores"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${location.pathname === '/fornecedores' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
          >
            <Users2 className="h-5 w-5" />
            <span className="sr-only">Fornecedores</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Fornecedores</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="categorias"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${location.pathname === '/categorias' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
          >
            <Tag className="h-5 w-5" />
            <span className="sr-only">Categorias</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Categorias</TooltipContent>
      </Tooltip>
      {/* <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="analise"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${location.pathname === '/analise' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
          >
            <LineChart className="h-5 w-5" />
            <span className="sr-only">Análise</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Análise</TooltipContent>
      </Tooltip> */}
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="configuracoes"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${location.pathname === '/configuracoes' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Settings</TooltipContent>
      </Tooltip>
    </nav>
  </aside>
  )
}
