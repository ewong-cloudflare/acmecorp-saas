"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ComingSoonPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  // Don't render anything during server-side rendering to prevent hydration errors
  if (!isClient) {
    return null
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Full-page background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/under-construction-2.jpg?height=1080&width=1920"
          alt="Under Construction"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header with logo and logout */}
      <header className="relative z-10 flex items-center justify-between bg-black/30 p-4 backdrop-blur-sm">
        <div className="relative h-10 w-32">
          {/* <Image src="/under-constructionplaceholder.svg?height=40&width=128" alt="Company Logo" fill className="object-contain" /> */}
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="bg-white/10 text-white hover:bg-white/20">
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl rounded-lg bg-black/30 p-8 backdrop-blur-sm">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Coming Soon!</h1>
          <p className="mb-8 text-lg text-white/80">
            We're working hard to bring you an amazing new experience. Please check back later.
          </p>
        </div>
      </main>
    </div>
  )
}

