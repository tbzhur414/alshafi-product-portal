import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex justify-center items-center">
        <LoginForm />
      </main>
    </div>
  )
}
