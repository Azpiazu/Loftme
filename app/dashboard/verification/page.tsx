'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrustBadge } from '@/components/trust-badge'
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  Shield, 
  Briefcase, 
  Lock,
  Check,
  Upload,
  FileText
} from 'lucide-react'

export default function VerificationPage() {
  const [phoneVerifying, setPhoneVerifying] = useState(false)
  const [employment, setEmployment] = useState({
    status: '',
    employer: '',
    jobTitle: ''
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft size={18} className="mr-2" />
              Back to dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Build trust with verification</h1>
          <p className="text-muted-foreground">
            Complete simple verification steps to make your rental profile more trustworthy.
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Verification */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">Email verification</h3>
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full flex items-center gap-1">
                      <Check size={12} />
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your email has been verified.
                  </p>
                  <TrustBadge type="email-verified" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phone Verification */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">Phone verification</h3>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                      Not started
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Verify your phone number to add another trust badge.
                  </p>
                  {phoneVerifying ? (
                    <div className="space-y-3">
                      <Input placeholder="Enter verification code" />
                      <div className="flex gap-2">
                        <Button size="sm">Verify</Button>
                        <Button size="sm" variant="ghost" onClick={() => setPhoneVerifying(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setPhoneVerifying(true)}>
                      Verify phone
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ID Verification */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">ID verification</h3>
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full flex items-center gap-1">
                      <Check size={12} />
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your ID has been verified. Landlords see the badge, not your actual ID.
                  </p>
                  <TrustBadge type="id-verified" />
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <Lock size={12} />
                    Your ID is never shown publicly. Landlords only see the verification badge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Info */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">Employment info</h3>
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full flex items-center gap-1">
                      <Check size={12} />
                      Added
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add employment information to show you have a stable income.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Employment status</Label>
                      <Input
                        id="status"
                        value={employment.status}
                        onChange={(e) => setEmployment({ ...employment, status: e.target.value })}
                        placeholder="e.g. Employed full-time"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer">Employer name (optional)</Label>
                      <Input
                        id="employer"
                        value={employment.employer}
                        onChange={(e) => setEmployment({ ...employment, employer: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job title (optional)</Label>
                      <Input
                        id="jobTitle"
                        value={employment.jobTitle}
                        onChange={(e) => setEmployment({ ...employment, jobTitle: e.target.value })}
                        placeholder="Your role"
                      />
                    </div>
                    <Button size="sm">Update employment info</Button>
                  </div>
                  <div className="mt-4">
                    <TrustBadge type="employment-added" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Private Document Upload */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">Private document upload</h3>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                      Optional
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload proof of employment, proof of income, student certificate or reference letter.
                  </p>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-start gap-2">
                      <Lock size={14} className="mt-0.5 flex-shrink-0" />
                      Documents stay private. Landlords can only request access, and you decide whether to share.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Landlords See */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">What landlords see</CardTitle>
              <CardDescription>
                Loftme displays trust badges based on completed verification steps. Private files are never public.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <TrustBadge type="email-verified" />
                <TrustBadge type="phone-verified" />
                <TrustBadge type="id-verified" />
                <TrustBadge type="employment-added" />
                <TrustBadge type="documents-private" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
