'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  mockLandlordMessages, 
  mockLandlordDocumentAccess,
  mockRenterDocuments,
  landlordRoleLabels,
  reportReasons,
  type LandlordMessage
} from '@/lib/mock-data'
import { 
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Calendar,
  Wallet,
  Mail,
  Phone,
  ExternalLink,
  MessageSquare,
  Share2,
  HelpCircle,
  ThumbsDown,
  Flag,
  AlertTriangle,
  Check,
  Image as ImageIcon,
  FileText,
  Lock,
  Unlock
} from 'lucide-react'

function ReplyModal({ landlordName }: { landlordName: string }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [shareOptions, setShareOptions] = useState({
    sendMessage: true,
    shareEmail: false,
    sharePhone: false,
    shareDocuments: false
  })
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setShareOptions({
        sendMessage: true,
        shareEmail: false,
        sharePhone: false,
        shareDocuments: false
      })
      setMessage('')
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Reply to landlord
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Reply sent</h3>
            <p className="text-sm text-muted-foreground">
              Your message has been sent to {landlordName}.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reply to {landlordName}</DialogTitle>
              <DialogDescription>
                Your contact details are hidden by default. Choose how you want to reply.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="sendMessage" 
                    checked={shareOptions.sendMessage}
                    onCheckedChange={(checked) => 
                      setShareOptions(prev => ({ ...prev, sendMessage: checked === true }))
                    }
                  />
                  <Label htmlFor="sendMessage" className="font-normal">
                    Send message through Loftme
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="shareEmail" 
                    checked={shareOptions.shareEmail}
                    onCheckedChange={(checked) => 
                      setShareOptions(prev => ({ ...prev, shareEmail: checked === true }))
                    }
                  />
                  <Label htmlFor="shareEmail" className="font-normal">
                    Share my email
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="sharePhone" 
                    checked={shareOptions.sharePhone}
                    onCheckedChange={(checked) => 
                      setShareOptions(prev => ({ ...prev, sharePhone: checked === true }))
                    }
                  />
                  <Label htmlFor="sharePhone" className="font-normal">
                    Share my phone number
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="shareDocuments" 
                    checked={shareOptions.shareDocuments}
                    onCheckedChange={(checked) => 
                      setShareOptions(prev => ({ ...prev, shareDocuments: checked === true }))
                    }
                  />
                  <Label htmlFor="shareDocuments" className="font-normal">
                    Share selected documents
                  </Label>
                </div>
              </div>

              {shareOptions.sendMessage && (
                <div className="space-y-2">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hi ${landlordName}, thank you for reaching out...`}
                    rows={3}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="flex-1">
                  Send reply
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function ReportModal({ landlordName }: { landlordName: string }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setReason('')
      setDetails('')
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <Flag className="h-4 w-4 mr-2" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Report submitted</h3>
            <p className="text-sm text-muted-foreground">
              Thank you for helping keep Loftme safe.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Report suspicious message</DialogTitle>
              <DialogDescription>
                Report this message from {landlordName} if something seems wrong.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Reason for report</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportReasons.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Additional details (optional)</Label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe what seems suspicious..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} variant="destructive" className="flex-1" disabled={!reason}>
                  Submit report
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function DocumentSharingPanel({ messageId, landlordName }: { messageId: string; landlordName: string }) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [saved, setSaved] = useState(false)
  
  // Find existing access for this landlord
  const existingAccess = mockLandlordDocumentAccess.find(l => l.landlordId === messageId)
  const documentsShared = existingAccess?.documentsShared || []
  const hasAccess = documentsShared.length > 0

  const toggleDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const handleShare = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Share documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Choose which private documents this landlord can view.
        </p>
        
        {/* Current status */}
        <div className="flex items-center gap-2 text-sm">
          {hasAccess ? (
            <>
              <Unlock className="h-4 w-4 text-success" />
              <span className="text-success">{documentsShared.length} documents shared</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">No documents shared</span>
            </>
          )}
        </div>

        {saved ? (
          <div className="p-3 bg-success/10 rounded-lg text-center">
            <Check className="h-5 w-5 text-success mx-auto mb-1" />
            <p className="text-sm text-success font-medium">Access updated</p>
          </div>
        ) : (
          <div className="space-y-2">
            {mockRenterDocuments.slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`doc-${doc.id}`}
                  checked={selectedDocs.includes(doc.id) || documentsShared.includes(doc.id)}
                  onCheckedChange={() => toggleDoc(doc.id)}
                />
                <Label htmlFor={`doc-${doc.id}`} className="text-sm font-normal">
                  {doc.name}
                </Label>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={handleShare} className="flex-1">
            {hasAccess ? 'Update access' : 'Share selected'}
          </Button>
          {hasAccess && (
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              Revoke
            </Button>
          )}
        </div>

        <Button variant="link" size="sm" className="w-full text-xs p-0 h-auto" asChild>
          <Link href="/dashboard/documents">
            Manage all document access
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MessageDetailPage() {
  const params = useParams()
  const messageId = params.id as string
  
  const message = mockLandlordMessages.find(m => m.id === messageId)

  if (!message) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="font-semibold text-foreground mb-2">Message not found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This message may have been deleted or doesn&apos;t exist.
              </p>
              <Button asChild>
                <Link href="/dashboard/messages">Back to messages</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/dashboard/messages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to messages
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Property message from {message.landlordName}
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{message.landlordName}</CardTitle>
                    {message.landlordVerified && (
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <Badge variant="secondary">
                    {landlordRoleLabels[message.landlordRole]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Property info */}
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h3 className="font-semibold text-foreground">{message.propertyDescription}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {message.propertyArea}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wallet className="h-4 w-4" />
                      {message.monthlyRent}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Available {message.availableFrom}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
                  <p className="text-foreground leading-relaxed">{message.message}</p>
                </div>

                {/* Photos */}
                {message.photos.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <ImageIcon className="h-4 w-4" />
                      Apartment photos
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {message.photos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm"
                        >
                          Photo {index + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Listing link */}
                {message.listingLink && (
                  <a 
                    href={message.listingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View full listing
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Landlord contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Landlord contact details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                    {message.email}
                  </a>
                </div>
                {message.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${message.phone}`} className="text-primary hover:underline">
                      {message.phone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety card */}
            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Before sharing anything</h4>
                    <p className="text-sm text-muted-foreground">
                      Only share contact details or documents when you feel comfortable. Never send money before checking the property, contract, and landlord details.
                    </p>
                    <ReportModal landlordName={message.landlordName} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ReplyModal landlordName={message.landlordName} />
                
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share my contact details
                </Button>
                
                <Button variant="outline" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Request more info
                </Button>
                
                <Button variant="ghost" className="w-full text-muted-foreground">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Not interested
                </Button>
              </CardContent>
            </Card>

            {/* Document sharing panel */}
            <DocumentSharingPanel messageId={message.id} landlordName={message.landlordName} />

            <p className="text-xs text-center text-muted-foreground px-4">
              Your contact details remain private until you choose to share them.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
