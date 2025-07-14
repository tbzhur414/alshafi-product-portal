import { Header } from "@/components/header"
import { ProductTable } from "@/components/admin/product-table"
import { getProducts } from "./actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ExportButton } from "@/components/admin/export-button"

export default async function AdminPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <ExportButton products={products} />
            <Button asChild>
              <Link href="/admin/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              </Link>
            </Button>
          </div>
        </div>
        <ProductTable products={products} />
      </main>
    </div>
  )
}
