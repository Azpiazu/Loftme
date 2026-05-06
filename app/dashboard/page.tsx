'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TrustBadgeList } from '@/components/trust-badge'
import { Progress } from '@/components/ui/progress'
import { mockRenter, mockLandlordMessages, mockLandlordDocumentAccess } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { 
  Eye, 
  Link2, 
  Sparkles, 
  FileText, 
  Shield, 
  BadgeCheck,
  Copy,
  Check,
  Home,
  Calendar,
  Clock,
  MapPin,
  Users,
  Dog,
  LogOut,
  Settings,
  Wallet,
  Mail,
  Lock
} from 'lucide-react'

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const renter = mockRenter
  const newMessagesCount = mockLandlordMessages.filter(m => m.status === 'new').length
  const accessGrantedCount = mockLandlordDocumentAccess.filter(l => l.documentAccess === 'granted').length
  const accessRequestedCount = mockLandlordDocumentAccess.filter(l => l.documentAccess === 'requested').length

  const copyShareLink = () => {
    navigator.clipboard.writeText(`https://${renter.shareLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const actionCards = [
    { 
      title: 'Landlord messages', 
      icon: Mail, 
      href: '/dashboard/messages',
      description: newMessagesCount > 0 ? `${newMessagesCount} new message${newMessagesCount > 1 ? 's' : ''}` : 'View property offers',
      highlight: newMessagesCount > 0
    },
    { 
      title: 'Document access', 
      icon: Lock, 
      href: '/dashboard/documents',
      description: accessRequestedCount > 0 
        ? `${accessRequestedCount} pending request${accessRequestedCount > 1 ? 's' : ''}` 
        : accessGrantedCount > 0 
          ? `${accessGrantedCount} landlord${accessGrantedCount > 1 ? 's' : ''} have access`
          : 'Control who sees your documents',
      highlight: accessRequestedCount > 0
    },
    { 
      title: 'View public profile', 
      icon: Eye, 
      href: `/profile/${renter.id}`,
      description: 'See how landlords view your profile'
    },
    { 
      title: 'Copy share link', 
      icon: copied ? Check : Link2, 
      onClick: copyShareLink,
      description: copied ? 'Copied!' : renter.shareLink
    },
    { 
      title: 'Generate application message', 
      icon: Sparkles, 
      href: '/dashboard/ai-kit',
      description: 'AI-powered rental messages'
    },
    { 
      title: 'Download profile PDF', 
      icon: FileText, 
      href: '/dashboard/pdf-preview',
      description: 'Print-ready renter profile'
    },
    { 
      title: 'Manage privacy', 
      icon: Shield, 
      href: '/dashboard/privacy',
      description: 'Control what landlords see'
    },
    { 
      title: 'Add verification', 
      icon: BadgeCheck, 
      href: '/dashboard/verification',
      description: 'Build more trust'
    },
  ]

  const checklistItems = [
    { label: 'Basic profile complete', done: true },
    { label: 'Email verified', done: true },
    { label: 'Phone verification missing', done: false },
    { label: 'ID verification optional', done: true },
    { label: 'Employment info optional', done: true },
    { label: 'Documents private', done: true },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/privacy">
                <Settings size={18} />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <LogOut size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Loftme profile</h1>
          <p className="text-muted-foreground">
            Manage your renter profile, verification badges and shareable application tools.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Strength & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Strength Card */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Profile strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Progress value={renter.profileStrength} className="flex-1" />
                  <span className="text-2xl font-bold text-primary">{renter.profileStrength}%</span>
                </div>
                <div className="space-y-2">
                  {checklistItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm">
                      {item.done ? (
                        <Check size={16} className="text-success" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className={item.done ? 'text-foreground' : 'text-muted-foreground'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Complete more steps to build more trust with landlords.
                </p>
              </CardContent>
            </Card>

            {/* Action Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {actionCards.map((action) => (
                <ActionCard key={action.title} {...action} />
              ))}
            </div>
          </div>

          {/* Right Column - Profile Summary */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {renter.firstName} {renter.lastName}
                    </h3>
                    <p className="text-sm text-primary font-medium">Verified renter</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-semibold text-primary">
                      {renter.firstName.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Intro */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {renter.intro}
                </p>

                {/* Rental Details */}
                <div className="space-y-3 mb-6">
                  <DetailRow 
                    icon={<Wallet size={14} />} 
                    label="Budget" 
                    value={`${renter.budgetCurrency}${renter.budgetMin}–${renter.budgetMax}/month`} 
                  />
                  <DetailRow 
                    icon={<Calendar size={14} />} 
                    label="Move-in" 
                    value={renter.moveInDate} 
                  />
                  <DetailRow 
                    icon={<Clock size={14} />} 
                    label="Lease length" 
                    value={renter.leaseLength} 
                  />
                  <DetailRow 
                    icon={<Home size={14} />} 
                    label="Apartment type" 
                    value={renter.apartmentType} 
                  />
                  <DetailRow 
                    icon={<MapPin size={14} />} 
                    label="Preferred areas" 
                    value={renter.preferredAreas.join(', ')} 
                  />
                  <DetailRow 
                    icon={<Users size={14} />} 
                    label="Occupants" 
                    value={String(renter.occupants)} 
                  />
                  <DetailRow 
                    icon={<Dog size={14} />} 
                    label="Pets" 
                    value={renter.pets ? 'Yes' : 'No'} 
                  />
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Trust badges</p>
                  <TrustBadgeList badges={renter.badges} size="sm" />
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" asChild>
              <Link href={`/profile/${renter.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View public profile
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function ActionCard({ 
  title, 
  icon: Icon, 
  href, 
  onClick,
  description,
  highlight
}: { 
  title: string
  icon: React.ElementType
  href?: string
  onClick?: () => void
  description: string
  highlight?: boolean
}) {
  const content = (
    <Card className={cn(
      "border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full",
      highlight && "border-primary bg-primary/5"
    )}>
      <CardContent className="p-4 flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
          highlight ? "bg-primary text-primary-foreground" : "bg-primary/10"
        )}>
          <Icon size={20} className={highlight ? "text-primary-foreground" : "text-primary"} />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className={cn(
            "text-sm truncate",
            highlight ? "text-primary font-medium" : "text-muted-foreground"
          )}>{description}</p>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return <button onClick={onClick} className="text-left w-full">{content}</button>
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <span className="text-muted-foreground min-w-[80px]">{label}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
