"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/data/products"
import { deleteProduct } from "@/app/admin/actions"
import { useRouter } from "next/navigation"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter()

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

  return (
    <div className="rounded-md border bg-white">
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
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No products found. Add some!
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
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
