
import { Aside } from "@/components/Aside"
import { Header } from "@/components/Header"
import { Outlet } from "react-router-dom"

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Aside /> 
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start px-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}