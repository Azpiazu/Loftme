'use client'

import { use } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrustBadgeList } from '@/components/trust-badge'
import { mockRenters } from '@/lib/mock-data'
import { RequestContactModal } from '@/components/request-contact-modal'
import { RequestDocumentModal } from '@/components/request-document-modal'
import { 
  Home,
  Calendar,
  Clock,
  MapPin,
  Users,
  Dog,
  Wallet,
  Sofa,
  Lock,
  MessageSquare,
  FileText,
  BadgeCheck
} from 'lucide-react'

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const renter = mockRenters.find(r => r.id === id) || mockRenters[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <p className="text-sm text-muted-foreground hidden sm:block">Loftme profile</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Card */}
        <Card className="border-border/50 overflow-hidden">
          <CardContent className="p-0">
            {/* Header with avatar */}
            <div className="bg-primary/5 p-6 pb-8 relative">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background">
                  <span className="text-2xl font-bold text-primary">
                    {renter.firstName.charAt(0)}
                  </span>
                </div>
                <div className="pt-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {renter.firstName} {renter.showFullName ? renter.lastName : renter.lastName?.charAt(0) + '.'}
                  </h1>
                  <p className="text-primary font-medium flex items-center gap-1">
                    <BadgeCheck size={16} />
                    Verified renter
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Intro */}
              <div>
                <p className="text-muted-foreground leading-relaxed">{renter.intro}</p>
              </div>

              {/* Trust Badges */}
              {renter.showBadges && (
                <div>
                  <h2 className="text-sm font-semibold text-foreground mb-3">Trust badges</h2>
                  <TrustBadgeList badges={renter.badges} />
                </div>
              )}

              {/* Rental Preferences */}
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3">Rental preferences</h2>
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
              {renter.allowDocumentRequests && (
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock size={18} className="text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">Documents</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Available privately on request
                      </p>
                      <RequestDocumentModal renterName={renter.firstName} />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              <div className="pt-4 border-t border-border">
                {renter.showEmail || renter.showPhone ? (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-foreground mb-3">Contact</h2>
                    {renter.showEmail && renter.email && (
                      <p className="text-sm text-foreground">{renter.email}</p>
                    )}
                    {renter.showPhone && renter.phone && (
                      <p className="text-sm text-foreground">{renter.phone}</p>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MessageSquare size={18} className="text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          Contact {renter.firstName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {renter.firstName} has chosen to keep contact details private. You can send a request through Loftme.
                        </p>
                        <RequestContactModal renterName={renter.firstName} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-6 px-4">
          Loftme verifies selected profile information and displays badges based on completed verification steps. Private documents are shared only with renter permission.
        </p>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to create your own verified rental profile?
          </p>
          <Button asChild>
            <Link href="/create-profile">Create my Loftme profile</Link>
          </Button>
        </div>
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
    <div className={`flex items-start gap-3 p-3 bg-secondary/30 rounded-lg ${className || ''}`}>
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}
