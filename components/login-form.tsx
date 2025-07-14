"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "@/app/login/actions"

export function LoginForm() {
  const [signInState, signInAction, signInPending] = useActionState(signIn, null)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to Admin Portal</CardTitle>
        <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signInAction} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full" disabled={signInPending}>
            {signInPending ? "Logging In..." : "Login"}
          </Button>
          {signInState && signInState.message && (
            <p className={`text-sm mt-2 ${signInState.success ? "text-green-600" : "text-red-600"}`}>
              {signInState.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
