"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search products (e.g., Urea, DAP, Engro...)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-green-500 rounded-lg"
      />
    </div>
  )
}
