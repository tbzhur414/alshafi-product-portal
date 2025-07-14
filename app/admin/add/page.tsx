import { Header } from "@/components/header"
import { ProductForm } from "@/components/admin/product-form"
import { addProduct } from "../actions"

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>
        <ProductForm action={addProduct} />
      </main>
    </div>
  )
}
