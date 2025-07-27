'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  // For demo purposes, we'll simulate authentication
  useEffect(() => {
    // In a real app, you'd check if user is authenticated
    const isAuthenticated = false // Change this based on your auth logic
    
    if (isAuthenticated) {
      router.push('/mood-selector')
    }
  }, [router])

  return <>{children}</>
}