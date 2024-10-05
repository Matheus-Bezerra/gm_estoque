import { Header } from "@/components/Header"
import { Outlet } from "react-router-dom"

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col antialiased">
        <Header />

        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
    </div>
  )
}
