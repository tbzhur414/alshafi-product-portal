"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Sign-in error:", error.message)
    return { success: false, message: error.message }
  }

  redirect("/admin")
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Sign-up error:", error.message)
    return { success: false, message: error.message }
  }

  return { success: true, message: "Sign-up successful! Please check your email for confirmation." }
}

export async function signOut() {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign-out error:", error.message)
  }

  redirect("/login")
}
