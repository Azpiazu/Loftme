'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  Copy, 
  RefreshCw, 
  Edit3, 
  MessageSquare,
  Mail,
  Phone,
  FileText,
  Check,
  Sparkles
} from 'lucide-react'

const generatedMessages = {
  landlordIntro: `Hi, I'm Sofia. I'm relocating from Spain to Budapest for work and looking for a furnished one-bedroom apartment from September. My budget is €900–1200/month, and I'm interested in District VI, VII or XIII. I've created a Loftme profile with my rental preferences and verification badges so you can quickly see that I'm a serious renter.`,
  whatsapp: `Hi, I'm Sofia. I'm moving to Budapest for work and I'm interested in your apartment. My budget is €900–1200, I can move in from September 1, and I'm looking for a 12+ month lease. Here is my Loftme profile: loftme.io/sofia-m`,
  emailSubject: `Rental application — Sofia M.`,
  emailBody: `Dear Landlord,

My name is Sofia and I'm relocating from Spain to Budapest for work. I'm looking for a furnished one-bedroom apartment from September 1, ideally in District VI, VII or XIII, with a budget of €900–1200/month.

I have created a Loftme profile where you can view my rental preferences and verification badges. Private documents are available only on request.

Best regards,
Sofia`,
  reliableTenant: `Sofia is relocating to Budapest for work and is looking for a stable long-term rental from September. She has a clear budget, preferred areas and lease timeline. Her profile includes verified contact details and employment information, with private documents available on request.`
}

export default function AIKitPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [messages, setMessages] = useState(generatedMessages)
  const [editingId, setEditingId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const regenerate = (id: keyof typeof generatedMessages) => {
    // In a real app, this would call an AI API
    // For demo, we just show the same message with a small variation
    setMessages(prev => ({
      ...prev,
      [id]: prev[id] + ' '
    }))
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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AI application kit</h1>
          </div>
          <p className="text-muted-foreground">
            Generate ready-to-send rental messages based on your Loftme profile.
          </p>
        </div>

        <Tabs defaultValue="landlord" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="landlord" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Intro</span>
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <Phone size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail size={16} />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Summary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="landlord">
            <MessageCard
              title="Landlord intro message"
              description="A friendly introduction to send when reaching out to landlords."
              content={messages.landlordIntro}
              id="landlordIntro"
              copiedId={copiedId}
              editingId={editingId}
              onCopy={copyToClipboard}
              onRegenerate={() => regenerate('landlordIntro')}
              onEdit={setEditingId}
              onSave={(text) => {
                setMessages(prev => ({ ...prev, landlordIntro: text }))
                setEditingId(null)
              }}
            />
          </TabsContent>

          <TabsContent value="whatsapp">
            <MessageCard
              title="WhatsApp message"
              description="A short message optimized for WhatsApp with your profile link."
              content={messages.whatsapp}
              id="whatsapp"
              copiedId={copiedId}
              editingId={editingId}
              onCopy={copyToClipboard}
              onRegenerate={() => regenerate('whatsapp')}
              onEdit={setEditingId}
              onSave={(text) => {
                setMessages(prev => ({ ...prev, whatsapp: text }))
                setEditingId(null)
              }}
            />
          </TabsContent>

          <TabsContent value="email">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Email template</CardTitle>
                <CardDescription>
                  A professional email to send as a rental application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject:</p>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-foreground font-medium">{messages.emailSubject}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Body:</p>
                  {editingId === 'email' ? (
                    <div className="space-y-2">
                      <Textarea
                        defaultValue={messages.emailBody}
                        rows={8}
                        className="font-mono text-sm"
                        id="email-edit"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => {
                            const textarea = document.getElementById('email-edit') as HTMLTextAreaElement
                            setMessages(prev => ({ ...prev, emailBody: textarea.value }))
                            setEditingId(null)
                          }}
                        >
                          Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                        {messages.emailBody}
                      </pre>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={() => copyToClipboard(`Subject: ${messages.emailSubject}\n\n${messages.emailBody}`, 'email')}
                  >
                    {copiedId === 'email' ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                    {copiedId === 'email' ? 'Copied!' : 'Copy all'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => regenerate('emailBody')}>
                    <RefreshCw size={16} className="mr-2" />
                    Regenerate
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId('email')}>
                    <Edit3 size={16} className="mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <MessageCard
              title="Reliable tenant summary"
              description="A third-person summary that positions you as a reliable renter."
              content={messages.reliableTenant}
              id="reliableTenant"
              copiedId={copiedId}
              editingId={editingId}
              onCopy={copyToClipboard}
              onRegenerate={() => regenerate('reliableTenant')}
              onEdit={setEditingId}
              onSave={(text) => {
                setMessages(prev => ({ ...prev, reliableTenant: text }))
                setEditingId(null)
              }}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            AI messages are a starting point. You can edit them before sending.
          </p>
        </div>
      </main>
    </div>
  )
}

function MessageCard({
  title,
  description,
  content,
  id,
  copiedId,
  editingId,
  onCopy,
  onRegenerate,
  onEdit,
  onSave
}: {
  title: string
  description: string
  content: string
  id: string
  copiedId: string | null
  editingId: string | null
  onCopy: (text: string, id: string) => void
  onRegenerate: () => void
  onEdit: (id: string | null) => void
  onSave: (text: string) => void
}) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {editingId === id ? (
          <div className="space-y-2">
            <Textarea
              defaultValue={content}
              rows={6}
              className="font-mono text-sm"
              id={`${id}-edit`}
            />
            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={() => {
                  const textarea = document.getElementById(`${id}-edit`) as HTMLTextAreaElement
                  onSave(textarea.value)
                }}
              >
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onEdit(null)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-foreground leading-relaxed">{content}</p>
          </div>
        )}
        {editingId !== id && (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => onCopy(content, id)}>
              {copiedId === id ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
              {copiedId === id ? 'Copied!' : 'Copy'}
            </Button>
            <Button size="sm" variant="outline" onClick={onRegenerate}>
              <RefreshCw size={16} className="mr-2" />
              Regenerate
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(id)}>
              <Edit3 size={16} className="mr-2" />
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
