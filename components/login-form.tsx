"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn, signUp } from "@/app/login/actions"

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [signInState, signInAction, signInPending] = useActionState(signIn, null)
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, null)

  const action = isSignUp ? signUpAction : signInAction
  const pending = isSignUp ? signUpPending : signInPending
  const state = isSignUp ? signUpState : signInState

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isSignUp ? "Sign Up" : "Login to Admin Portal"}</CardTitle>
        <CardDescription>
          {isSignUp ? "Create an account to manage products." : "Enter your credentials to access the admin dashboard."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m.ali@alshafi.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (isSignUp ? "Signing Up..." : "Logging In...") : isSignUp ? "Sign Up" : "Login"}
          </Button>
          {state && state.message && (
            <p className={`text-sm mt-2 ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
          )}
        </form>
        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <Button variant="link" onClick={() => setIsSignUp(false)} className="p-0 h-auto">
                Login
              </Button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => setIsSignUp(true)} className="p-0 h-auto">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
