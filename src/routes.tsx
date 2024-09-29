import { createBrowserRouter } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { Home } from "./pages/app/Home"
import { AppLayout } from "./pages/_layouts/App"
import { AuthLayout } from "./pages/_layouts/Auth"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])