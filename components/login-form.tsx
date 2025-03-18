"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LockIcon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real application, you would validate credentials against a backend
    // This is a simple demo that accepts any non-empty email/password
    try {
      if (email.trim() && password.trim()) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Store auth state in localStorage
        localStorage.setItem("isAuthenticated", "true")

        // Redirect to coming soon page
        router.push("/coming-soon")
      } else {
        toast.error("Authentication Error", {
          description: "Please enter both email and password",
        })
      }
    } catch (error) {
      toast.error("Authentication Error", {
        description: "Failed to authenticate. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border bg-white p-8 shadow-lg">
      <div className="mb-6 flex justify-center">
        <div className="relative h-30 w-30">
          <Image
            src="/acme-black.svg"
            alt="Company Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <h1 className="mb-6 text-center text-2xl font-bold">Portal Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <MailIcon className="h-5 w-5" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <LockIcon className="h-5 w-5" />
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}

