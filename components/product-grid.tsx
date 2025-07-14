"use client"

import { ProductCard } from "./product-card"
import type { Product } from "@/data/products"

export function ProductGrid({
  searchTerm,
  onProductClick,
  products,
}: {
  searchTerm: string
  onProductClick: (product: Product) => void
  products: Product[]
}) {
  const categoriesMap = new Map<string, Product[]>()

  products.forEach((product) => {
    if (!categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, [])
    }
    categoriesMap.get(product.category)?.push(product)
  })

  const filteredCategories = Array.from(categoriesMap.entries())
    .map(([category, products]) => ({
      category,
      products: products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.products.length > 0)

  if (searchTerm && filteredCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching "{searchTerm}"</p>
        <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {filteredCategories.map((category) => (
        <div key={category.category} className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
            <p className="text-gray-600">{category.products.length} products available</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
