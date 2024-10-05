import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { TooltipProvider } from "@radix-ui/react-tooltip"

function App() {

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="gm_estoque-theme">
        <TooltipProvider>
          <Helmet titleTemplate="%s | GM Estoque" />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
