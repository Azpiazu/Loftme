import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProfilePreviewCard } from '@/components/profile-preview-card'
import { Logo } from '@/components/logo'
import { HeroSearch } from '@/components/hero-search'
import Link from 'next/link'
import { 
  UserPlus, 
  BadgeCheck, 
  Share2, 
  Search, 
  Shield, 
  Lock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { mockRenter } from '@/lib/mock-data'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-medium text-primary tracking-wide uppercase">Built for trust</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              Create your rental profile once. Let landlords find you with trust.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Loftme helps renters build a verified rental profile they can share anywhere — while landlords can search serious renters without seeing private contact details or documents by default.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/create-profile">
                  Create my profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/profile/sofia-m">See example profile</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock size={14} />
              Your documents stay private. You decide what to share.
            </p>

            {/* Landlord Search */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">Are you a landlord? Search verified renters:</p>
              <HeroSearch />
            </div>
          </div>
          
          <div className="lg:pl-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-2xl opacity-60" />
            <ProfilePreviewCard
              name={`${mockRenter.firstName} ${mockRenter.lastName}`}
              intro="Relocating from Spain to Budapest for work. Looking for a furnished 1-bedroom apartment from September."
              budget={`${mockRenter.budgetCurrency}${mockRenter.budgetMin}–${mockRenter.budgetMax}/month`}
              moveIn={mockRenter.moveInDate}
              leaseLength={mockRenter.leaseLength}
              preferredAreas={mockRenter.preferredAreas}
              pets={mockRenter.pets}
              occupants={mockRenter.occupants}
              badges={mockRenter.badges}
              className="relative transform lg:rotate-1 lg:hover:rotate-0 transition-transform duration-300 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* How it works for Renters */}
      <section id="for-renters" className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How it works for renters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create a trusted rental profile in minutes and share it with any landlord, agent, or property manager.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<UserPlus className="h-6 w-6 text-primary" />}
              title="Create your profile"
              description="Tell landlords who you are and what you&apos;re looking for."
            />
            <FeatureCard
              icon={<BadgeCheck className="h-6 w-6 text-primary" />}
              title="Add trust badges"
              description="Verify email, phone, ID or employment details to build credibility."
            />
            <FeatureCard
              icon={<Share2 className="h-6 w-6 text-primary" />}
              title="Share anywhere"
              description="Use your Loftme profile link, PDF profile, email message or WhatsApp intro."
            />
          </div>
        </div>
      </section>

      {/* For Landlords Section */}
      <section id="for-landlords" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find serious renters before the first message
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Search verified renter profiles by budget, move-in date, lease length, preferred areas and rental needs — without seeing private documents or contact details unless the renter chooses to share them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={<BadgeCheck className="h-6 w-6 text-primary" />}
              title="Verified renter profiles"
              description="See trust badges like email verified, phone verified, ID verified and employment added."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-primary" />}
              title="Better rental inquiries"
              description="Understand the renter&apos;s budget, move-in date, lease length, pets, occupants and preferred areas before replying."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Privacy-safe by default"
              description="Landlords see badges and rental preferences, not private files. Renters control what they share."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" />
                Search verified renters
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/profile/sofia-m">See example renter profile</Link>
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Contact details and private documents are hidden by default. Renters decide what to share.
          </p>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Private by default</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Landlords see your rental profile and verification badges, not your private documents. You decide when to share more.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <PrivacyPoint text="Contact details hidden by default" />
              <PrivacyPoint text="Private documents never public" />
              <PrivacyPoint text="Revoke access anytime" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to look more serious as a renter?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your verified rental profile in minutes and share it with landlords anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/create-profile">
                Create my profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" />
                I&apos;m a landlord
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="lg" linkToHome={false} />
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/#for-renters" className="hover:text-foreground transition-colors">For renters</Link>
              <Link href="/#for-landlords" className="hover:text-foreground transition-colors">For landlords</Link>
              <Link href="/#privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/profile/sofia-m" className="hover:text-foreground transition-colors">Example profile</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Loftme. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

function PrivacyPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
      <span className="text-sm text-foreground">{text}</span>
    </div>
  )
}
