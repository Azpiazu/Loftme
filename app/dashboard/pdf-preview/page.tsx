'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrustBadgeList } from '@/components/trust-badge'
import { mockRenter } from '@/lib/mock-data'
import { 
  ArrowLeft,
  Download,
  Printer,
  Home,
  Calendar,
  Clock,
  MapPin,
  Users,
  Dog,
  Wallet,
  BadgeCheck,
  QrCode,
  Lock
} from 'lucide-react'

export default function PDFPreviewPage() {
  const renter = mockRenter

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - hidden when printing */}
      <header className="border-b border-border no-print">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft size={18} className="mr-2" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Action Buttons - hidden when printing */}
        <div className="flex justify-end gap-2 mb-6 no-print">
          <Button variant="outline" onClick={handlePrint}>
            <Printer size={18} className="mr-2" />
            Print / Save as PDF
          </Button>
          <Button onClick={handlePrint}>
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
        </div>

        {/* PDF Content */}
        <Card className="border-border/50 print:border-0 print:shadow-none">
          <CardContent className="p-8 print:p-0">
            {/* PDF Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Logo size="lg" linkToHome={false} />
                <span className="text-muted-foreground">|</span>
                <span className="text-lg font-medium text-muted-foreground">Renter Profile</span>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Generated on {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {renter.firstName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {renter.firstName} {renter.lastName}
                  </h1>
                  <p className="text-primary font-medium flex items-center gap-1 mt-1">
                    <BadgeCheck size={18} />
                    Verified renter
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Relocating from {renter.currentCity}, {renter.currentCountry} to {renter.movingToCity}, {renter.movingToCountry}
                  </p>
                </div>
              </div>
              
              {/* QR Code Placeholder */}
              <div className="text-center hidden sm:block">
                <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-2">
                  <QrCode size={48} className="text-muted-foreground/50" />
                </div>
                <p className="text-xs text-muted-foreground">{renter.shareLink}</p>
              </div>
            </div>

            {/* Intro */}
            <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
              <p className="text-foreground leading-relaxed">{renter.intro}</p>
            </div>

            {/* Rental Preferences */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Rental Preferences</h2>
              <div className="grid grid-cols-2 gap-4">
                <PDFDetailRow 
                  icon={<Wallet size={16} />} 
                  label="Monthly Budget" 
                  value={`${renter.budgetCurrency}${renter.budgetMin}–${renter.budgetMax}`} 
                />
                <PDFDetailRow 
                  icon={<Calendar size={16} />} 
                  label="Move-in Date" 
                  value={renter.moveInDate} 
                />
                <PDFDetailRow 
                  icon={<Clock size={16} />} 
                  label="Lease Length" 
                  value={renter.leaseLength} 
                />
                <PDFDetailRow 
                  icon={<Home size={16} />} 
                  label="Apartment Type" 
                  value={renter.apartmentType} 
                />
                <PDFDetailRow 
                  icon={<MapPin size={16} />} 
                  label="Preferred Areas" 
                  value={renter.preferredAreas.join(', ')} 
                  fullWidth
                />
                <PDFDetailRow 
                  icon={<Users size={16} />} 
                  label="Occupants" 
                  value={String(renter.occupants)} 
                />
                <PDFDetailRow 
                  icon={<Dog size={16} />} 
                  label="Pets" 
                  value={renter.pets ? 'Yes' : 'No'} 
                />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Verification Status</h2>
              <TrustBadgeList badges={renter.badges} />
            </div>

            {/* Privacy Note */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Privacy Note</h3>
                  <p className="text-sm text-muted-foreground">
                    Private documents are available on request. Contact details and sensitive documents are shared only with explicit permission from the renter.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                View full profile at: <span className="text-primary font-medium">https://{renter.shareLink}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Verified by Loftme • loftme.io
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function PDFDetailRow({ 
  icon, 
  label, 
  value,
  fullWidth = false
}: { 
  icon: React.ReactNode
  label: string
  value: string
  fullWidth?: boolean
}) {
  return (
    <div className={`flex items-start gap-3 p-3 bg-secondary/30 rounded-lg ${fullWidth ? 'col-span-2' : ''}`}>
      <span className="text-primary mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
