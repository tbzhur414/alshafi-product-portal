"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Product } from "@/data/products"

// Define the bucket name for Supabase Storage
const PRODUCT_IMAGES_BUCKET = "product-images"

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

  const imageFile = formData.get("imageFile") as File | null
  let imageUrl: string | null = null

  if (imageFile && imageFile.size > 0) {
    const fileExtension = imageFile.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
    const filePath = `${fileName}` // Store directly in the bucket root

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      return { success: false, message: "Failed to upload image: " + uploadError.message }
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath)

    imageUrl = publicUrlData.publicUrl
  }

  const newProduct: Omit<Product, "id"> = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    image: imageUrl || "/placeholder.svg", // Use uploaded URL or default placeholder
    rate: formData.get("rate") as string,
    unit: formData.get("unit") as string,
    transhipmentRates: JSON.parse(formData.get("transhipmentRates") as string),
    regionWiseRates: JSON.parse(formData.get("regionWiseRates") as string),
    policies: JSON.parse(formData.get("policies") as string),
  }

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

  const imageFile = formData.get("imageFile") as File | null
  let imageUrl: string | null = (formData.get("image") as string) || null // Start with existing URL

  if (imageFile && imageFile.size > 0) {
    // If a new image is uploaded, delete the old one first (optional but good practice)
    if (imageUrl && imageUrl.includes(PRODUCT_IMAGES_BUCKET)) {
      const oldFileName = imageUrl.split("/").pop()
      if (oldFileName) {
        await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([oldFileName])
      }
    }

    const fileExtension = imageFile.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
    const filePath = `${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: true, // Use upsert to overwrite if filename somehow conflicts
      })

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      return { success: false, message: "Failed to upload new image: " + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath)

    imageUrl = publicUrlData.publicUrl
  }

  const updatedProduct: Omit<Product, "id"> = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    image: imageUrl || "/placeholder.svg", // Use new URL, old URL, or default placeholder
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

  // Optional: Get product to delete its image from storage
  const { data: productToDelete, error: fetchError } = await supabase
    .from("products")
    .select("image")
    .eq("id", id)
    .single()

  if (fetchError) {
    console.error("Error fetching product for image deletion:", fetchError)
    // Continue with product deletion even if image fetch fails
  } else if (productToDelete?.image && productToDelete.image.includes(PRODUCT_IMAGES_BUCKET)) {
    const fileName = productToDelete.image.split("/").pop()
    if (fileName) {
      const { error: deleteImageError } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([fileName])
      if (deleteImageError) {
        console.error("Error deleting image from storage:", deleteImageError)
      }
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return { success: false, message: "Failed to delete product: " + error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  return { success: true, message: "Product deleted successfully!" }
}
