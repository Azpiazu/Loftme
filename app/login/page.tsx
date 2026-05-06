'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, Lock, User, Building } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent, redirectTo: string) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push(redirectTo)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Logo size="md" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your Loftme account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="renter" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="renter" className="flex items-center gap-2">
                  <User size={16} />
                  Renter
                </TabsTrigger>
                <TabsTrigger value="landlord" className="flex items-center gap-2">
                  <Building size={16} />
                  Landlord
                </TabsTrigger>
              </TabsList>

              <TabsContent value="renter">
                <form onSubmit={(e) => handleLogin(e, '/dashboard')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="renter-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="renter-email" 
                        type="email" 
                        placeholder="sofia@example.com" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="renter-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="renter-password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Link href="#" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in as renter'}
                  </Button>
                </form>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Don&apos;t have an account?{' '}
                  <Link href="/create-profile" className="text-primary hover:underline">
                    Create your profile
                  </Link>
                </p>
              </TabsContent>

              <TabsContent value="landlord">
                <form onSubmit={(e) => handleLogin(e, '/search')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="landlord-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="landlord-email" 
                        type="email" 
                        placeholder="landlord@example.com" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landlord-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="landlord-password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Link href="#" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in as landlord'}
                  </Button>
                </form>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Want to list a property?{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Contact us
                  </Link>
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
