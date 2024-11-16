import { createBrowserRouter, Navigate } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { Home } from "./pages/app/Home"
import { AppLayout } from "./pages/_layouts/App"
import { AuthLayout } from "./pages/_layouts/Auth"
import { Products } from "./pages/app/Products"
import { Fornecedores } from "./pages/app/Fornecedores"
import { Cadastro } from "./pages/auth/Cadastro"
import { ProtectedRoute } from "./utils/Protected/ProtectedRoute"
import { EsqueceuSenha } from "./pages/auth/EsqueceuSenha"
import { SenhaCodigo } from "./pages/auth/SenhaCodigo"
import { NovaSenha } from "./pages/auth/NovaSenha"
import { Categorias } from "./pages/app/Categorias"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />, // Protegendo todas as rotas dentro do AppLayout
        children: [
            {
                path: "/",
                element: <AppLayout />,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "/produtos",
                        element: <Products />
                    },
                    {
                        path: "/fornecedores",
                        element: <Fornecedores />
                    },
                    {
                        path: "/categorias",
                        element: <Categorias />
                    },
                ]
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <Login />
            },
            {
                path: "cadastro",
                element: <Cadastro />
            },
            {
                path: "esqueceu-senha",
                element: <EsqueceuSenha />
            },
            {
                path: "senha-codigo",
                element: <SenhaCodigo />
            },
            {
                path: "nova-senha",
                element: <NovaSenha />
            },
            {
                path: "*",
                element: <Navigate to="/auth" replace />
            }
        ]
    }
])