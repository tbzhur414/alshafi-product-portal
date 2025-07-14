import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { signOut } from "@/app/login/actions"

export async function Header() {
  // Make Header an async component
  const supabase = createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-lg">
                <Image
                  src="/placeholder.svg?height=50&width=50" // Replace with your logo path
                  alt="Al-Shafi Group Global Logo"
                  width={50}
                  height={50}
                  className="rounded"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Al-Shafi Group Global</h1>
                <p className="text-green-100">Daily Product Rates & Policies Portal</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-100">
              <Calendar className="h-5 w-5" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {session ? (
              <form action={signOut}>
                <Button type="submit" variant="secondary" className="text-green-800">
                  Logout
                </Button>
              </form>
            ) : (
              <Button asChild variant="secondary" className="text-green-800">
                <Link href="/login">Admin Login</Link>
              </Button>
            )}
            {session && (
              <Button asChild variant="secondary" className="text-green-800">
                <Link href="/admin">Admin Portal</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
