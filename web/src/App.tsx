import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/context/SessionContext"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="gm_estoque-theme">
        <QueryClientProvider client={queryClient}>

          <Toaster />
          <TooltipProvider>
            <Helmet titleTemplate="%s | GM Estoque" />
            <SessionProvider>
              <RouterProvider router={router} />
            </SessionProvider>

          </TooltipProvider>
        </QueryClientProvider>

      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
