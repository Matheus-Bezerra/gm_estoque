import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { ThemeProvider } from "@/components/theme/theme-provider"

function App() {

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="gm_estoque-theme">
        <Helmet titleTemplate="%s | GM Estoque" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
