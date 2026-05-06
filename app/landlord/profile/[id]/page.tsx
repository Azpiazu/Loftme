'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrustBadgeList } from '@/components/trust-badge'
import { mockRenters } from '@/lib/mock-data'
import { LandlordContactModal } from '@/components/landlord-contact-modal'
import { RequestDocumentModal } from '@/components/request-document-modal'
import { 
  ArrowLeft,
  Home,
  Calendar,
  Clock,
  MapPin,
  Users,
  Dog,
  Wallet,
  Sofa,
  Lock,
  BadgeCheck,
  Copy,
  Check,
  Shield
} from 'lucide-react'

export default function LandlordProfileViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const renter = mockRenters.find(r => r.id === id) || mockRenters[0]
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${renter.shareLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Link */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/search">
            <ArrowLeft size={18} className="mr-2" />
            Back to search
          </Link>
        </Button>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Renter profile</h1>
        </div>

        {/* Profile Card */}
        <Card className="border-border/50 mb-6">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {renter.firstName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {renter.firstName} {renter.lastName?.charAt(0)}.
                  </h2>
                  <p className="text-primary font-medium flex items-center gap-1">
                    <BadgeCheck size={16} />
                    Verified renter
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Profile strength</p>
                <div className="flex items-center gap-2">
                  <Progress value={renter.profileStrength} className="w-20" />
                  <span className="text-sm font-semibold text-primary">{renter.profileStrength}%</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Trust badges</h3>
              <TrustBadgeList badges={renter.badges} />
            </div>

            {/* Intro */}
            <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-foreground leading-relaxed">{renter.intro}</p>
            </div>

            {/* Rental Needs */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Rental needs</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <DetailCard 
                  icon={<Wallet size={16} />} 
                  label="Budget" 
                  value={`${renter.budgetCurrency}${renter.budgetMin}–${renter.budgetMax}/month`} 
                />
                <DetailCard 
                  icon={<Calendar size={16} />} 
                  label="Move-in" 
                  value={renter.moveInDate} 
                />
                <DetailCard 
                  icon={<Clock size={16} />} 
                  label="Lease length" 
                  value={renter.leaseLength} 
                />
                <DetailCard 
                  icon={<Home size={16} />} 
                  label="Apartment type" 
                  value={renter.apartmentType} 
                />
                <DetailCard 
                  icon={<MapPin size={16} />} 
                  label="Preferred areas" 
                  value={renter.preferredAreas.join(', ')} 
                  className="sm:col-span-2"
                />
                <DetailCard 
                  icon={<Users size={16} />} 
                  label="Occupants" 
                  value={String(renter.occupants)} 
                />
                <DetailCard 
                  icon={<Dog size={16} />} 
                  label="Pets" 
                  value={renter.pets ? 'Yes' : 'No'} 
                />
                <DetailCard 
                  icon={<Sofa size={16} />} 
                  label="Furnished" 
                  value={renter.furnished ? 'Yes' : 'Flexible'} 
                />
              </div>
            </div>

            {/* Documents Section */}
            <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Documents</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Documents available privately on request.
                  </p>
                  <RequestDocumentModal renterName={renter.firstName} />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Contact this renter</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your property details and contact information. The renter will decide whether to reply.
                  </p>
                  <LandlordContactModal renterName={renter.firstName} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={copyLink}>
            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
            {copied ? 'Copied!' : 'Copy profile link'}
          </Button>
        </div>

        {/* Trust Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-8">
          Loftme displays verification badges based on completed renter verification steps. Private documents are shared only with renter permission.
        </p>
      </main>
    </div>
  )
}

function DetailCard({ 
  icon, 
  label, 
  value,
  className 
}: { 
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={`flex items-start gap-3 p-3 bg-card border border-border rounded-lg ${className || ''}`}>
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}
