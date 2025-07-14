import { Header } from "@/components/header"
import { ProductForm } from "@/components/admin/product-form"
import { getProductById, updateProduct } from "../../actions"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product: {product.name}</h1>
        <ProductForm action={updateProduct} initialData={product} />
      </main>
    </div>
  )
}
