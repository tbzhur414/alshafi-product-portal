"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"
import { ProductModal } from "@/components/product-modal"
import type { Product } from "@/data/products"

interface ProductDisplayProps {
  products: Product[]
}

export function ProductDisplay({ products }: ProductDisplayProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Product Rates</h1>
        <p className="text-gray-600 mb-6">
          Updated rates and policies for sales team - {new Date().toLocaleDateString()}
        </p>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <ProductGrid searchTerm={searchTerm} onProductClick={setSelectedProduct} products={products} />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
