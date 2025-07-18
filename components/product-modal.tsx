"use client"

import { X, MapPin, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Product } from "@/data/products"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          {/* Enhanced close button for clarity */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Close product details"
          >
            <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Information Section */}
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle className="text-white">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} bag`}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg bg-gray-100"
                />
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{product.rate}</div>
                  <div className="text-gray-300">{product.unit}</div>
                  <p className="text-gray-300 mt-2">Category: {product.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Transhipment Policy Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {product.transhipmentRates.map((rate, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="font-medium text-blue-900">{rate.region}</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {rate.rate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Region Wise Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {product.regionWiseRates.map((rate, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-medium text-green-900">{rate.region}</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {rate.rate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Policies Section */}
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle className="text-white">Product Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.policies.map((policy, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white">{policy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
