'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Home, 
  Mail, 
  Shield,
  Wallet,
  Calendar,
  Clock,
  MapPin,
  Users,
  Dog,
  Sofa,
  Check
} from 'lucide-react'
import { preferredAreaOptions, apartmentTypeOptions, leaseLengthOptions } from '@/lib/mock-data'

const steps = [
  { id: 1, name: 'About you', icon: User },
  { id: 2, name: 'Rental needs', icon: Home },
  { id: 3, name: 'Contact', icon: Mail },
  { id: 4, name: 'Privacy', icon: Shield },
]

export default function CreateProfilePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    currentCity: '',
    currentCountry: '',
    movingToCity: '',
    intro: '',
    // Step 2
    budgetMin: '',
    budgetMax: '',
    moveInDate: '',
    leaseLength: '',
    apartmentType: '',
    preferredAreas: [] as string[],
    furnished: true,
    occupants: '1',
    pets: false,
    // Step 3
    email: '',
    phone: '',
    // Step 4
    showEmail: false,
    showPhone: false,
    showFullName: false,
    allowDocumentRequests: true,
    showBadges: true,
  })

  const updateFormData = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete profile creation
      router.push('/dashboard')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            Cancel
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                      currentStep > step.id 
                        ? 'bg-primary border-primary text-primary-foreground'
                        : currentStep === step.id
                          ? 'border-primary text-primary bg-primary/10'
                          : 'border-border text-muted-foreground'
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check size={18} />
                    ) : (
                      <step.icon size={18} />
                    )}
                  </div>
                  <span className={cn(
                    'text-xs mt-2 font-medium hidden sm:block',
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      'w-full h-0.5 mx-2 sm:mx-4',
                      currentStep > step.id ? 'bg-primary' : 'bg-border'
                    )}
                    style={{ minWidth: '40px', maxWidth: '100px' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-border/50">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Tell us about you</CardTitle>
                <CardDescription>
                  This helps landlords understand who you are.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="Sofia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name (optional)</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="M."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentCity">Current city</Label>
                    <Input
                      id="currentCity"
                      value={formData.currentCity}
                      onChange={(e) => updateFormData('currentCity', e.target.value)}
                      placeholder="Madrid"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCountry">Current country</Label>
                    <Input
                      id="currentCountry"
                      value={formData.currentCountry}
                      onChange={(e) => updateFormData('currentCountry', e.target.value)}
                      placeholder="Spain"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movingToCity">Moving to</Label>
                  <Input
                    id="movingToCity"
                    value={formData.movingToCity}
                    onChange={(e) => updateFormData('movingToCity', e.target.value)}
                    placeholder="Budapest, Hungary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intro">Short intro</Label>
                  <Textarea
                    id="intro"
                    value={formData.intro}
                    onChange={(e) => updateFormData('intro', e.target.value)}
                    placeholder="I'm relocating to Budapest for work and looking for a bright furnished apartment with good transport access."
                    rows={3}
                  />
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>What are you looking for?</CardTitle>
                <CardDescription>
                  Tell landlords about your rental preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Wallet size={16} className="text-muted-foreground" />
                    Monthly budget range
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      value={formData.budgetMin}
                      onChange={(e) => updateFormData('budgetMin', e.target.value)}
                      placeholder="Min (e.g. 900)"
                    />
                    <Input
                      type="number"
                      value={formData.budgetMax}
                      onChange={(e) => updateFormData('budgetMax', e.target.value)}
                      placeholder="Max (e.g. 1200)"
                    />
                  </div>
                </div>

                {/* Move-in Date */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    Move-in date
                  </Label>
                  <Input
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => updateFormData('moveInDate', e.target.value)}
                  />
                </div>

                {/* Lease Length */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    Lease length
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {leaseLengthOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateFormData('leaseLength', option)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm border transition-colors',
                          formData.leaseLength === option
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border text-foreground hover:border-primary'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apartment Type */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Home size={16} className="text-muted-foreground" />
                    Apartment type
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {apartmentTypeOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateFormData('apartmentType', option)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm border transition-colors',
                          formData.apartmentType === option
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border text-foreground hover:border-primary'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Areas */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    Preferred areas
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {preferredAreaOptions.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleArea(area)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm border transition-colors',
                          formData.preferredAreas.includes(area)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border text-foreground hover:border-primary'
                        )}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnished */}
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Sofa size={16} className="text-muted-foreground" />
                    Furnished preference
                  </Label>
                  <Switch
                    checked={formData.furnished}
                    onCheckedChange={(checked) => updateFormData('furnished', checked)}
                  />
                </div>

                {/* Occupants & Pets */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      Occupants
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.occupants}
                      onChange={(e) => updateFormData('occupants', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Dog size={16} className="text-muted-foreground" />
                      Pets
                    </Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateFormData('pets', false)}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-lg text-sm border transition-colors',
                          !formData.pets
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border text-foreground hover:border-primary'
                        )}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData('pets', true)}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-lg text-sm border transition-colors',
                          formData.pets
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border text-foreground hover:border-primary'
                        )}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle>How can landlords reach you?</CardTitle>
                <CardDescription>
                  Your contact details are private by default. You decide what appears on your public profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="sofia@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+34 612 345 678"
                  />
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Shield size={16} className="mt-0.5 flex-shrink-0" />
                    Your contact details are private by default. You decide what appears on your public profile.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle>Choose what people can see</CardTitle>
                <CardDescription>
                  Control your privacy settings. You can update these anytime.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PrivacyToggle
                  label="Show email publicly"
                  description="Let anyone viewing your profile see your email"
                  checked={formData.showEmail}
                  onChange={(checked) => updateFormData('showEmail', checked)}
                />
                <PrivacyToggle
                  label="Show phone publicly"
                  description="Let anyone viewing your profile see your phone number"
                  checked={formData.showPhone}
                  onChange={(checked) => updateFormData('showPhone', checked)}
                />
                <PrivacyToggle
                  label="Show full name publicly"
                  description="Display your full name instead of first name only"
                  checked={formData.showFullName}
                  onChange={(checked) => updateFormData('showFullName', checked)}
                />
                <PrivacyToggle
                  label="Allow document requests"
                  description="Let landlords request access to your private documents"
                  checked={formData.allowDocumentRequests}
                  onChange={(checked) => updateFormData('allowDocumentRequests', checked)}
                />
                <PrivacyToggle
                  label="Show verification badges"
                  description="Display trust badges on your public profile"
                  checked={formData.showBadges}
                  onChange={(checked) => updateFormData('showBadges', checked)}
                />
                <div className="p-4 bg-secondary/30 rounded-lg mt-6">
                  <p className="text-sm text-muted-foreground">
                    You can update these settings anytime from your dashboard.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="p-6 pt-0 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={nextStep}>
              {currentStep === 4 ? 'Create my Loftme profile' : 'Continue'}
              {currentStep < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}

function PrivacyToggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
