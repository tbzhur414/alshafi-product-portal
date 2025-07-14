"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Product } from "@/data/products"

export async function getProducts(): Promise<Product[]> {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }
  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return undefined
  }
  return data as Product
}

export async function addProduct(formData: FormData) {
  const supabase = createSupabaseServerClient()
  const newProduct: Omit<Product, "id"> = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    rate: formData.get("rate") as string,
    unit: formData.get("unit") as string,
    transhipmentRates: JSON.parse(formData.get("transhipmentRates") as string),
    regionWiseRates: JSON.parse(formData.get("regionWiseRates") as string),
    policies: JSON.parse(formData.get("policies") as string),
  }

  // Using Date.now().toString() for ID, assuming 'id' column in Supabase is 'text'
  const productWithId = { ...newProduct, id: Date.now().toString() }

  const { error } = await supabase.from("products").insert(productWithId)

  if (error) {
    console.error("Error adding product:", error)
    return { success: false, message: "Failed to add product: " + error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  return { success: true, message: "Product added successfully!" }
}

export async function updateProduct(formData: FormData) {
  const supabase = createSupabaseServerClient()
  const id = formData.get("id") as string
  const updatedProduct: Omit<Product, "id"> = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    rate: formData.get("rate") as string,
    unit: formData.get("unit") as string,
    transhipmentRates: JSON.parse(formData.get("transhipmentRates") as string),
    regionWiseRates: JSON.parse(formData.get("regionWiseRates") as string),
    policies: JSON.parse(formData.get("policies") as string),
  }

  const { error } = await supabase.from("products").update(updatedProduct).eq("id", id)

  if (error) {
    console.error("Error updating product:", error)
    return { success: false, message: "Failed to update product: " + error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  return { success: true, message: "Product updated successfully!" }
}

export async function deleteProduct(id: string) {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return { success: false, message: "Failed to delete product: " + error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  return { success: true, message: "Product deleted successfully!" }
}
