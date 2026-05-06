'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { 
  mockLandlordDocumentAccess,
  mockRenterDocuments,
  landlordRoleLabels,
  documentAccessStatusLabels,
  type LandlordDocumentAccess,
  type DocumentAccessStatus
} from '@/lib/mock-data'
import { 
  ArrowLeft,
  FileText,
  Shield,
  Settings,
  LogOut,
  Check,
  X,
  Lock,
  Unlock,
  MapPin,
  Wallet,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

function ManageAccessModal({ 
  landlord, 
  onClose 
}: { 
  landlord: LandlordDocumentAccess
  onClose: () => void 
}) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>(landlord.documentsShared)
  const [saved, setSaved] = useState(false)
  const [revoked, setRevoked] = useState(false)

  const toggleDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const selectAll = () => {
    setSelectedDocs(mockRenterDocuments.map(d => d.id))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const handleRevoke = () => {
    setRevoked(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  if (saved) {
    return (
      <div className="py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Access saved</h3>
        <p className="text-sm text-muted-foreground">
          {landlord.landlordName} can now view {selectedDocs.length} document{selectedDocs.length !== 1 ? 's' : ''}.
        </p>
      </div>
    )
  }

  if (revoked) {
    return (
      <div className="py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Access revoked</h3>
        <p className="text-sm text-muted-foreground">
          {landlord.landlordName} can no longer view your private documents.
        </p>
      </div>
    )
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Manage document access</DialogTitle>
        <DialogDescription>
          Choose which documents {landlord.landlordName} can view.
        </DialogDescription>
      </DialogHeader>

      {/* Landlord info */}
      <div className="p-3 bg-muted/50 rounded-lg mt-4">
        <p className="font-medium text-foreground">{landlord.landlordName}</p>
        <p className="text-sm text-muted-foreground">{landlordRoleLabels[landlord.landlordRole]}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {landlord.propertyArea}
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="h-3 w-3" />
            {landlord.monthlyRent}
          </span>
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Documents</Label>
          <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs h-7">
            Select all
          </Button>
        </div>
        
        {mockRenterDocuments.map((doc) => (
          <div 
            key={doc.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
              selectedDocs.includes(doc.id) 
                ? "border-primary bg-primary/5" 
                : "border-border"
            )}
          >
            <Checkbox 
              id={doc.id}
              checked={selectedDocs.includes(doc.id)}
              onCheckedChange={() => toggleDoc(doc.id)}
            />
            <Label htmlFor={doc.id} className="flex-1 font-normal cursor-pointer">
              <span className="text-foreground">{doc.name}</span>
              {doc.type === 'id-confirmation' && (
                <span className="block text-xs text-muted-foreground">
                  Shows verification badge only, not the actual ID
                </span>
              )}
            </Label>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4 text-sm">
        <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-yellow-800">
          Only share documents with landlords you trust. You can revoke access anytime.
        </p>
      </div>

      <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
        <Button onClick={handleSave} className="flex-1">
          Save access
        </Button>
        {landlord.documentsShared.length > 0 && (
          <Button variant="outline" onClick={handleRevoke} className="text-destructive hover:text-destructive">
            Revoke all access
          </Button>
        )}
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </>
  )
}

function AccessStatusBadge({ status, count }: { status: DocumentAccessStatus; count?: number }) {
  const variants: Record<DocumentAccessStatus, { className: string; icon: React.ReactNode }> = {
    'no-access': { 
      className: 'bg-muted text-muted-foreground', 
      icon: <Lock className="h-3 w-3" /> 
    },
    'requested': { 
      className: 'bg-yellow-100 text-yellow-800', 
      icon: <AlertCircle className="h-3 w-3" /> 
    },
    'granted': { 
      className: 'bg-success/10 text-success', 
      icon: <Unlock className="h-3 w-3" /> 
    },
    'revoked': { 
      className: 'bg-destructive/10 text-destructive', 
      icon: <X className="h-3 w-3" /> 
    },
  }

  const { className, icon } = variants[status]

  return (
    <Badge variant="secondary" className={cn("gap-1", className)}>
      {icon}
      {status === 'granted' && count ? `${count} documents shared` : documentAccessStatusLabels[status]}
    </Badge>
  )
}

function LandlordAccessCard({ landlord }: { landlord: LandlordDocumentAccess }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-foreground">{landlord.landlordName}</h3>
              <Badge variant="outline" className="text-xs">
                {landlordRoleLabels[landlord.landlordRole]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{landlord.propertyDescription}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {landlord.propertyArea}
              </span>
              <span className="flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                {landlord.monthlyRent}
              </span>
            </div>
            <AccessStatusBadge 
              status={landlord.documentAccess} 
              count={landlord.documentsShared.length}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Manage access
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <ManageAccessModal landlord={landlord} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DocumentAccessPage() {
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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back link */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to dashboard
          </Link>
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Document access
          </h1>
          <p className="text-muted-foreground">
            Control who can see your private rental documents.
          </p>
        </div>

        {/* Privacy info card */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Your documents are private by default</p>
                <p className="text-muted-foreground">
                  You decide exactly which landlord can see which documents. You can revoke access anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Landlord list */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            Landlords & property managers ({mockLandlordDocumentAccess.length})
          </h2>
          
          {mockLandlordDocumentAccess.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No document requests yet</h3>
                <p className="text-sm text-muted-foreground">
                  When landlords request access to your documents, they will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            mockLandlordDocumentAccess.map((landlord) => (
              <LandlordAccessCard key={landlord.landlordId} landlord={landlord} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
