"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  // Explicitly check if formData is null or undefined
  if (!formData) {
    console.error("signIn: formData parameter is null or undefined.")
    return { success: false, message: "Form submission failed: Missing data." }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  // Validate email and password exist and are strings
  if (!email || typeof email !== "string" || email.trim() === "") {
    console.error("Sign-in error: Email is required or invalid.")
    return { success: false, message: "Email is required." }
  }
  if (!password || typeof password !== "string" || password.trim() === "") {
    console.error("Sign-in error: Password is required or invalid.")
    return { success: false, message: "Password is required." }
  }

  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Sign-in error:", error.message)
    return { success: false, message: error.message }
  }

  revalidatePath("/admin") // Revalidate admin path after successful login
  redirect("/admin")
}

// Removed signUp action as per request
// export async function signUp(formData: FormData) { ... }

export async function signOut() {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign-out error:", error.message)
  }

  revalidatePath("/") // Revalidate home path after logout
  redirect("/login")
}
