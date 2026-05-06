'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  mockLandlordMessages, 
  landlordRoleLabels, 
  messageStatusLabels,
  type MessageStatus,
  type LandlordMessage
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft,
  Mail,
  BadgeCheck,
  MapPin,
  Calendar,
  Wallet,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Flag,
  Circle
} from 'lucide-react'

const statusTabs: { value: MessageStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'interested', label: 'Interested' },
  { value: 'waiting', label: 'Waiting for info' },
  { value: 'declined', label: 'Declined' },
  { value: 'reported', label: 'Reported' }
]

function getStatusColor(status: MessageStatus) {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'interested':
      return 'bg-green-100 text-green-800'
    case 'waiting':
      return 'bg-yellow-100 text-yellow-800'
    case 'declined':
      return 'bg-muted text-muted-foreground'
    case 'reported':
      return 'bg-red-100 text-red-800'
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

function MessageCard({ message }: { message: LandlordMessage }) {
  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      !message.read && "border-l-4 border-l-primary"
    )}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{message.landlordName}</h3>
                {message.landlordVerified && (
                  <BadgeCheck className="h-4 w-4 text-primary" />
                )}
                <span className="text-sm text-muted-foreground">
                  {landlordRoleLabels[message.landlordRole]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getStatusColor(message.status)}>
                  {messageStatusLabels[message.status]}
                </Badge>
                {!message.read && (
                  <Circle className="h-2 w-2 fill-primary text-primary" />
                )}
              </div>
            </div>

            {/* Property info */}
            <div>
              <p className="font-medium text-foreground">{message.propertyDescription}</p>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {message.propertyArea}
                </span>
                <span className="flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  {message.monthlyRent}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Available {message.availableFrom}
                </span>
              </div>
            </div>

            {/* Message preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {message.message}
            </p>

            {/* Photos indicator */}
            {message.photos.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ImageIcon className="h-3 w-3" />
                {message.photos.length} photo{message.photos.length > 1 ? 's' : ''} attached
              </div>
            )}

            {/* Contact info */}
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Mail className="h-3 w-3" />
                {message.email}
              </span>
              {message.phone && (
                <span className="text-muted-foreground">{message.phone}</span>
              )}
            </div>

            {/* Received date */}
            <p className="text-xs text-muted-foreground">
              Received {formatDate(message.receivedAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex md:flex-col gap-2 md:min-w-[140px]">
            <Button size="sm" asChild className="flex-1 md:flex-none">
              <Link href={`/dashboard/messages/${message.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View details
              </Link>
            </Button>
            {message.status !== 'reported' && message.status !== 'declined' && (
              <>
                <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Interested
                </Button>
                <Button size="sm" variant="ghost" className="flex-1 md:flex-none text-muted-foreground">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Decline
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<MessageStatus | 'all'>('all')
  
  const filteredMessages = activeTab === 'all' 
    ? mockLandlordMessages 
    : mockLandlordMessages.filter(m => m.status === activeTab)

  const newCount = mockLandlordMessages.filter(m => m.status === 'new').length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Landlord messages</h1>
            {newCount > 0 && (
              <Badge variant="default">{newCount} new</Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Review messages and property suggestions from landlords, agents, and property managers.
          </p>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
          {statusTabs.map((tab) => {
            const count = tab.value === 'all' 
              ? mockLandlordMessages.length 
              : mockLandlordMessages.filter(m => m.status === tab.value).length
            
            return (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.value)}
                className="relative"
              >
                {tab.label}
                {count > 0 && (
                  <span className={cn(
                    "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                    activeTab === tab.value 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                )}
              </Button>
            )
          })}
        </div>

        {/* Messages list */}
        {filteredMessages.length > 0 ? (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No messages</h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'all' 
                  ? "You haven't received any landlord messages yet."
                  : `No messages in "${messageStatusLabels[activeTab as MessageStatus]}".`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
