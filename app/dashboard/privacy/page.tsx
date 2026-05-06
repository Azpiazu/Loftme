'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Mail,
  Phone,
  User,
  FileText,
  BadgeCheck,
  Link2,
  AlertTriangle
} from 'lucide-react'

export default function PrivacyPage() {
  const [settings, setSettings] = useState({
    showFullName: false,
    showEmail: false,
    showPhone: false,
    showCurrentCity: true,
    showEmployerName: false,
    showBadges: true,
    allowDocumentRequests: true,
    profileActive: true
  })

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Privacy controls</h1>
          </div>
          <p className="text-muted-foreground">
            You decide what landlords can see.
          </p>
        </div>

        <div className="space-y-6">
          {/* Privacy Toggles */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Profile visibility</CardTitle>
              <CardDescription>
                Control what information appears on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PrivacyToggle
                icon={<User size={18} />}
                label="Show full name"
                description="Display your full name instead of first name only"
                checked={settings.showFullName}
                onChange={(checked) => updateSetting('showFullName', checked)}
              />
              <PrivacyToggle
                icon={<Mail size={18} />}
                label="Show email"
                description="Let anyone viewing your profile see your email"
                checked={settings.showEmail}
                onChange={(checked) => updateSetting('showEmail', checked)}
              />
              <PrivacyToggle
                icon={<Phone size={18} />}
                label="Show phone number"
                description="Let anyone viewing your profile see your phone number"
                checked={settings.showPhone}
                onChange={(checked) => updateSetting('showPhone', checked)}
              />
              <PrivacyToggle
                icon={<Eye size={18} />}
                label="Show current city"
                description="Display where you currently live"
                checked={settings.showCurrentCity}
                onChange={(checked) => updateSetting('showCurrentCity', checked)}
              />
              <PrivacyToggle
                icon={<FileText size={18} />}
                label="Show employer name"
                description="Display your employer on your profile"
                checked={settings.showEmployerName}
                onChange={(checked) => updateSetting('showEmployerName', checked)}
              />
              <PrivacyToggle
                icon={<BadgeCheck size={18} />}
                label="Show verification badges"
                description="Display trust badges on your public profile"
                checked={settings.showBadges}
                onChange={(checked) => updateSetting('showBadges', checked)}
              />
              <PrivacyToggle
                icon={<FileText size={18} />}
                label="Allow document requests"
                description="Let landlords request access to your private documents"
                checked={settings.allowDocumentRequests}
                onChange={(checked) => updateSetting('allowDocumentRequests', checked)}
              />
              <PrivacyToggle
                icon={<Link2 size={18} />}
                label="Make profile link active"
                description="Allow your public profile link to be accessible"
                checked={settings.profileActive}
                onChange={(checked) => updateSetting('profileActive', checked)}
              />
            </CardContent>
          </Card>

          {/* Private by Default Card */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Private by default</h3>
                  <p className="text-sm text-muted-foreground">
                    Your documents are never public. Landlords only see badges such as &quot;ID verified&quot; or &quot;Employment added&quot; unless you choose to share the actual files.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revoke Link */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Revoke public link</h3>
                  <p className="text-sm text-muted-foreground">
                    This will make your current profile link inaccessible.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Revoke link
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Revoke this profile link?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Anyone with the old link will no longer be able to view your public Loftme profile. You can create a new link anytime.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Revoke link
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function PrivacyToggle({
  icon,
  label,
  description,
  checked,
  onChange
}: {
  icon: React.ReactNode
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
      <div className="flex items-start gap-3">
        <span className="text-muted-foreground mt-0.5">{icon}</span>
        <div>
          <Label className="text-sm font-medium">{label}</Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
