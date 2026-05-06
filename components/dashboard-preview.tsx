'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  BadgeCheck, 
  Mail, 
  Phone, 
  IdCard, 
  Briefcase, 
  Lock,
  Eye,
  Link2,
  FileText,
  Sparkles,
  MessageSquare,
  Calendar,
  Wallet,
  MapPin,
  Users,
  Dog,
  Home,
  Clock,
  Copy,
  Download,
  ChevronRight,
  ChevronDown,
  Image as ImageIcon,
  Flag,
  ThumbsDown,
  HelpCircle,
  Heart,
  X
} from 'lucide-react'

export function DashboardPreview() {
  const [activeMessageTab, setActiveMessageTab] = useState('new')
  const [expanded, setExpanded] = useState(false)

  if (!expanded) {
    return (
      <div className="text-center py-8 px-4 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">See what your dashboard looks like</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Preview your renter dashboard with messages, document access, AI tools and privacy controls.
          </p>
          <Button onClick={() => setExpanded(true)}>
            <ChevronDown className="h-4 w-4 mr-2" />
            Show dashboard preview
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with close button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Your Loftme dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Manage your renter profile, landlord messages, verification badges and document sharing.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(false)}>
          <X className="h-4 w-4 mr-2" />
          Close preview
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Strength Card */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                Profile strength
                <span className="text-primary font-bold">85%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={85} className="h-2" />
              <div className="space-y-2">
                <StrengthItem icon={BadgeCheck} label="Basic profile complete" checked />
                <StrengthItem icon={Mail} label="Email verified" checked />
                <StrengthItem icon={Phone} label="Phone verified" checked />
                <StrengthItem icon={IdCard} label="ID verified" checked />
                <StrengthItem icon={Briefcase} label="Employment added" checked />
                <StrengthItem icon={Lock} label="Documents private" checked />
              </div>
            </CardContent>
          </Card>

          {/* AI Application Kit */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI application kit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <QuickActionButton icon={MessageSquare} label="Landlord intro message" />
              <QuickActionButton icon={MessageSquare} label="WhatsApp message" />
              <QuickActionButton icon={Mail} label="Email template" />
              <QuickActionButton icon={FileText} label="Reliable tenant summary" />
            </CardContent>
          </Card>

          {/* Privacy Controls */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Privacy controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <PrivacyRow label="Show email" value={false} />
              <PrivacyRow label="Show phone" value={false} />
              <PrivacyRow label="Allow document requests" value={true} />
              <PrivacyRow label="Show verification badges" value={true} />
              <PrivacyRow label="Public profile link" value={true} active />
              <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                You stay in control. Landlords can view your profile and badges, but your contact details and documents stay private unless you choose to share them.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Summary Card */}
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    SM
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-foreground">Sofia M.</h3>
                      <Badge variant="secondary" className="text-xs">
                        <BadgeCheck className="h-3 w-3 mr-1" />
                        Verified renter
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Relocating from Spain to Budapest for work. Looking for a bright furnished apartment with good transport access.
                    </p>
                  </div>

                  {/* Rental Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <DetailItem icon={Wallet} label="Budget" value="€900–1200/mo" />
                    <DetailItem icon={Calendar} label="Move-in" value="September 1" />
                    <DetailItem icon={Clock} label="Lease" value="12+ months" />
                    <DetailItem icon={MapPin} label="Areas" value="VI, VII, XIII" />
                    <DetailItem icon={Home} label="Type" value="Furnished 1-bed" />
                    <DetailItem icon={Users} label="Occupants" value="1" />
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-2">
                    <TrustBadge icon={Mail} label="Email verified" />
                    <TrustBadge icon={Phone} label="Phone verified" />
                    <TrustBadge icon={IdCard} label="ID verified" />
                    <TrustBadge icon={Briefcase} label="Employment" />
                    <TrustBadge icon={Lock} label="Docs private" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View public profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy share link
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Messages Section */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Landlord messages
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Review messages and property suggestions from landlords, agents and property managers.
                  </p>
                </div>
                <Badge className="bg-primary text-primary-foreground">3 new</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeMessageTab} onValueChange={setActiveMessageTab}>
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="new" className="text-xs">New</TabsTrigger>
                  <TabsTrigger value="interested" className="text-xs">Interested</TabsTrigger>
                  <TabsTrigger value="waiting" className="text-xs">Waiting for info</TabsTrigger>
                  <TabsTrigger value="declined" className="text-xs">Declined</TabsTrigger>
                  <TabsTrigger value="reported" className="text-xs">Reported</TabsTrigger>
                </TabsList>
                
                <TabsContent value="new" className="space-y-4 mt-4">
                  <MessageCard
                    landlordName="Anna Kovács"
                    landlordType="Private landlord"
                    propertyTitle="Furnished 1-bedroom near Oktogon"
                    details="District VI · €1,050/month · Available September 1"
                    message="Hi Sofia, I have a furnished one-bedroom apartment in District VI that may match your profile. It is available from September and close to public transport."
                    email="anna@example.com"
                    phone="+36 30 123 4567"
                    status="new"
                    photos={['/images/apartment-1.jpg', '/images/apartment-2.jpg', '/images/apartment-3.jpg']}
                    docAccessEnabled={true}
                  />
                  <MessageCard
                    landlordName="Peter Nagy"
                    landlordType="Agent"
                    propertyTitle="Modern studio in the heart of Pest"
                    details="District VII · €850/month · Available September 15"
                    message="Hello Sofia, I represent several property owners in the Jewish Quarter. I have a newly renovated studio that might interest you."
                    email="peter@realestate.hu"
                    phone="+36 20 987 6543"
                    status="new"
                    photos={['/images/studio-1.jpg', '/images/studio-2.jpg']}
                  />
                </TabsContent>
                
                <TabsContent value="interested" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No messages marked as interested yet
                  </div>
                </TabsContent>
                
                <TabsContent value="waiting" className="mt-4">
                  <MessageCard
                    landlordName="Maria Tóth"
                    landlordType="Property manager"
                    propertyTitle="Spacious 1-bedroom with parking"
                    details="District XIII · €1,200/month · Available October 1"
                    message="Dear Sofia, We manage several residential properties in District XIII. I have a spacious one-bedroom apartment with underground parking available."
                    email="maria@pmbudapest.com"
                    status="waiting"
                    photos={['/images/apartment-1.jpg', '/images/apartment-3.jpg']}
                  />
                </TabsContent>
                
                <TabsContent value="declined" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No declined messages
                  </div>
                </TabsContent>
                
                <TabsContent value="reported" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No reported messages
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Document Access Card */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Document access
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Control which landlord can see your private documents.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <DocumentAccessRow
                landlordName="Anna Kovács"
                property="Furnished 1-bedroom near Oktogon"
                docsShared={3}
              />
              <DocumentAccessRow
                landlordName="Central Rentals"
                property="Studio in District XIII"
                docsShared={0}
              />
              <p className="text-xs text-muted-foreground pt-3 border-t border-border/50">
                Your documents are private by default. Share only with landlords you choose.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Collapse button at bottom */}
      <div className="text-center pt-4">
        <Button variant="outline" size="sm" onClick={() => setExpanded(false)}>
          <X className="h-4 w-4 mr-2" />
          Close dashboard preview
        </Button>
      </div>
    </div>
  )
}

function StrengthItem({ icon: Icon, label, checked }: { icon: React.ElementType; label: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checked ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
        <Icon className="h-3 w-3" />
      </div>
      <span className={checked ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
    </div>
  )
}

function QuickActionButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <Button variant="ghost" size="sm" className="w-full justify-start text-sm font-normal h-9">
      <Icon className="h-4 w-4 mr-2 text-primary" />
      {label}
      <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
    </Button>
  )
}

function PrivacyRow({ label, value, active }: { label: string; value: boolean; active?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      {active ? (
        <Badge variant="secondary" className="text-xs bg-success/10 text-success">Active</Badge>
      ) : (
        <span className={value ? 'text-success' : 'text-muted-foreground'}>{value ? 'On' : 'Off'}</span>
      )}
    </div>
  )
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

function TrustBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-success/10 rounded-full text-xs text-success">
      <Icon className="h-3 w-3" />
      {label}
    </div>
  )
}

function MessageCard({
  landlordName,
  landlordType,
  propertyTitle,
  details,
  message,
  email,
  phone,
  status,
  photos,
  docAccessEnabled = false
}: {
  landlordName: string
  landlordType: string
  propertyTitle: string
  details: string
  message: string
  email: string
  phone?: string
  status: 'new' | 'interested' | 'waiting' | 'declined' | 'reported'
  photos?: string[]
  docAccessEnabled?: boolean
}) {
  const [docAccess, setDocAccess] = useState(docAccessEnabled)
  const statusColors = {
    new: 'bg-primary/10 text-primary',
    interested: 'bg-success/10 text-success',
    waiting: 'bg-warning/10 text-warning',
    declined: 'bg-muted text-muted-foreground',
    reported: 'bg-destructive/10 text-destructive'
  }

  return (
    <div className="p-4 border border-border/50 rounded-lg space-y-3 bg-card hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground">{landlordName}</h4>
            <Badge variant="outline" className="text-xs font-normal">{landlordType}</Badge>
          </div>
          <p className="font-medium text-foreground">{propertyTitle}</p>
          <p className="text-sm text-muted-foreground">{details}</p>
        </div>
        <Badge className={`text-xs ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{message}</p>

      {photos && photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((photo, i) => (
            <div key={i} className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={photo}
                alt={`Property photo ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Mail className="h-3 w-3" />
          {email}
        </span>
        {phone && (
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {phone}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
        <Button size="sm" variant="default">View details</Button>
        <Button size="sm" variant="outline">
          <Heart className="h-4 w-4 mr-1" />
          I&apos;m interested
        </Button>
        <Button size="sm" variant="ghost">
          <HelpCircle className="h-4 w-4 mr-1" />
          Request info
        </Button>
        <Button size="sm" variant="ghost" className="text-muted-foreground">
          <ThumbsDown className="h-4 w-4 mr-1" />
          Decline
        </Button>
        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
          <Flag className="h-4 w-4 mr-1" />
          Report
        </Button>
        
        {/* Document access switch */}
        <div className="ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <FileText className={`h-4 w-4 ${docAccess ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch
                    checked={docAccess}
                    onCheckedChange={setDocAccess}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">
                  {docAccess 
                    ? 'This landlord can view your documents' 
                    : 'Allow this landlord to view your documents'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

function DocumentAccessRow({ landlordName, property, docsShared }: { landlordName: string; property: string; docsShared: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm">{landlordName}</p>
        <p className="text-xs text-muted-foreground truncate">{property}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          {docsShared > 0 ? `${docsShared} documents shared` : 'No documents shared'}
        </span>
        <Button size="sm" variant="outline" className="text-xs h-7">
          Manage access
        </Button>
      </div>
    </div>
  )
}
