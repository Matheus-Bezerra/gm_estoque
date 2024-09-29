import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Helmet, HelmetProvider } from "react-helmet-async"

function App() {

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | GM Estoque" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App
