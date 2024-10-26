import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="gm_estoque-theme">
        <Toaster />
        <TooltipProvider>
          <Helmet titleTemplate="%s | GM Estoque" />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
