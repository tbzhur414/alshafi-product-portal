"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/data/products"
import { deleteProduct } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { useState } from "react" // Import useState
import { SearchBar } from "@/components/search-bar" // Import SearchBar

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("") // State for search term

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(id)
      if (result.success) {
        alert(result.message)
        router.refresh() // Refresh the page to show updated list
      } else {
        alert("Error: " + result.message)
      }
    }
  }

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="rounded-md border bg-white p-4">
      {" "}
      {/* Added padding */}
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                {searchTerm ? `No products found matching "${searchTerm}"` : "No products found. Add some!"}
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.rate}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm" className="mr-2">
                    <Link href={`/admin/edit/${product.id}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
