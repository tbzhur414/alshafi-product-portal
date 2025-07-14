"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-black text-white"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white leading-tight">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative group">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={`${product.name} bag`}
            width={200}
            height={200}
            className="w-full h-48 object-cover rounded-lg bg-gray-90 transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full shadow-lg">
            <span className="text-lg font-bold">{product.rate}</span>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-80 group-hover:bg-opacity-80 transition-all duration-300 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click for Details
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-white">{product.unit}</p>
          {/* Changed text-green-300 to text-gray-300 for better contrast on black background */}
          <p className="text-xs text-gray-300 font-medium">Click image for pricing policies & regional rates</p>
        </div>
      </CardContent>
    </Card>
  )
}
