
import { Aside } from "@/components/Aside"
import { Header } from "@/components/Header"
import { Outlet } from "react-router-dom"

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Aside /> 
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start px-4 sm:px-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}