import { Header } from "@/components/header"
import { ProductDisplay } from "@/components/product-display"
import { getProducts } from "@/app/admin/actions"

export default async function HomePage() {
  const products = await getProducts() // Data fetching on the server

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDisplay products={products} /> {/* Pass fetched data to client component */}
      </main>
    </div>
  )
}
