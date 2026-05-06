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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { FileText, Check } from 'lucide-react'
import { documentTypes } from '@/lib/mock-data'

interface RequestDocumentModalProps {
  renterName: string
}

export function RequestDocumentModal({ renterName }: RequestDocumentModalProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [note, setNote] = useState('')

  const toggleDoc = (doc: string) => {
    setSelectedDocs(prev => 
      prev.includes(doc) 
        ? prev.filter(d => d !== doc)
        : [...prev, doc]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setSelectedDocs([])
      setNote('')
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <FileText size={16} className="mr-2" />
          Request document access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Document request sent</h3>
            <p className="text-sm text-muted-foreground">
              The renter can approve or decline it.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request document access</DialogTitle>
              <DialogDescription>
                Private documents are shared only with renter permission. Explain which document you need and why.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-3">
                <Label>Select documents needed</Label>
                {documentTypes.map((doc) => (
                  <div key={doc} className="flex items-center space-x-2">
                    <Checkbox
                      id={doc}
                      checked={selectedDocs.includes(doc)}
                      onCheckedChange={() => toggleDoc(doc)}
                    />
                    <label
                      htmlFor={doc}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {doc}
                    </label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Add a short note</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Please explain why you need these documents..."
                  rows={3}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={selectedDocs.length === 0}
              >
                Send request
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
