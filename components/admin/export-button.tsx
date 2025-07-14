"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Product } from "@/data/products"

interface ExportButtonProps {
  products: Product[]
}

export function ExportButton({ products }: ExportButtonProps) {
  const exportToCsv = () => {
    if (products.length === 0) {
      alert("No products to export.")
      return
    }

    const headers = [
      "ID",
      "Name",
      "Category",
      "Base Rate",
      "Unit",
      "Transhipment Rates",
      "Region Wise Rates",
      "Policies",
    ]

    const rows = products.map((product) => {
      const transhipment = product.transhipmentRates.map((r) => `${r.region}: ${r.rate}`).join("; ")
      const regionWise = product.regionWiseRates.map((r) => `${r.region}: ${r.rate}`).join("; ")
      const policies = product.policies.join("; ")

      return [
        product.id,
        product.name,
        product.category,
        product.rate,
        product.unit,
        `"${transhipment}"`, // Wrap in quotes to handle commas/semicolons
        `"${regionWise}"`,
        `"${policies}"`,
      ].join(",")
    })

    const csvContent = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `al-shafi-product-rates-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={exportToCsv} variant="outline">
      <Download className="mr-2 h-4 w-4" /> Export to CSV
    </Button>
  )
}
