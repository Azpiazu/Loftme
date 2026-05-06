'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MessageSquare, Check, Upload, X, Lock } from 'lucide-react'

interface LandlordContactModalProps {
  renterName: string
  trigger?: React.ReactNode
}

export function LandlordContactModal({ renterName, trigger }: LandlordContactModalProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    propertyArea: '',
    monthlyRent: '',
    availableFrom: '',
    message: '',
    listingLink: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setForm({
        name: '',
        role: '',
        email: '',
        phone: '',
        propertyArea: '',
        monthlyRent: '',
        availableFrom: '',
        message: '',
        listingLink: ''
      })
      setPhotos([])
    }, 2500)
  }

  const handlePhotoUpload = () => {
    // Mock photo upload - in production this would use a file input
    const mockPhotos = [
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200'
    ]
    setPhotos(prev => [...prev, ...mockPhotos].slice(0, 6))
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <MessageSquare size={16} className="mr-2" />
            Contact this renter
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Your message has been sent</h3>
            <p className="text-sm text-muted-foreground">
              The renter will contact you if interested.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Contact this renter</DialogTitle>
              <DialogDescription>
                Send a short message and share your property details. The renter will decide whether to reply.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Anna Kovács"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">I am a *</Label>
                  <Select
                    value={form.role}
                    onValueChange={(value) => setForm({ ...form, role: value })}
                    required
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private-landlord">Private landlord</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="property-manager">Property manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="anna@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+36..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyArea">Property area / address *</Label>
                <Input
                  id="propertyArea"
                  value={form.propertyArea}
                  onChange={(e) => setForm({ ...form, propertyArea: e.target.value })}
                  placeholder="District VI, near Oktogon"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly rent *</Label>
                  <Input
                    id="monthlyRent"
                    value={form.monthlyRent}
                    onChange={(e) => setForm({ ...form, monthlyRent: e.target.value })}
                    placeholder="€1,050/month"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableFrom">Available from *</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={form.availableFrom}
                    onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={`Hi ${renterName}, I have a furnished one-bedroom apartment in District VI that may match your profile. It is available from September and close to public transport.`}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Attach photos</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  {photos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative aspect-video bg-muted rounded overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                            Photo {index + 1}
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 w-5 h-5 bg-foreground/80 rounded-full flex items-center justify-center"
                          >
                            <X className="h-3 w-3 text-background" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePhotoUpload}
                    className="w-full"
                    disabled={photos.length >= 6}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload apartment photos
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Up to 6 photos
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="listingLink">Optional listing link</Label>
                <Input
                  id="listingLink"
                  type="url"
                  value={form.listingLink}
                  onChange={(e) => setForm({ ...form, listingLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <Button type="submit" className="w-full">
                Send to renter
              </Button>

              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" />
                The renter&apos;s contact details remain private unless they choose to reply.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
