import { TrustBadgeList, BadgeType } from './trust-badge'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Calendar, Clock, Home, Users, Dog } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfilePreviewCardProps {
  name: string
  intro: string
  budget: string
  moveIn: string
  leaseLength: string
  preferredAreas: string[]
  pets: boolean
  occupants: number
  badges: BadgeType[]
  className?: string
  variant?: 'default' | 'compact'
}

export function ProfilePreviewCard({
  name,
  intro,
  budget,
  moveIn,
  leaseLength,
  preferredAreas,
  pets,
  occupants,
  badges,
  className,
  variant = 'default'
}: ProfilePreviewCardProps) {
  return (
    <Card className={cn('overflow-hidden shadow-lg border-border/50', className)}>
      <CardContent className={cn('p-6', variant === 'compact' && 'p-4')}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className={cn('font-semibold text-foreground', variant === 'default' ? 'text-xl' : 'text-lg')}>
              {name}
            </h3>
            <p className="text-sm text-primary font-medium">Verified renter</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">{name.charAt(0)}</span>
          </div>
        </div>

        {/* Intro */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{intro}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <DetailItem icon={<Home size={14} />} label="Budget" value={budget} />
          <DetailItem icon={<Calendar size={14} />} label="Move-in" value={moveIn} />
          <DetailItem icon={<Clock size={14} />} label="Lease" value={leaseLength} />
          <DetailItem icon={<Users size={14} />} label="Occupants" value={String(occupants)} />
          <DetailItem icon={<MapPin size={14} />} label="Areas" value={preferredAreas.join(', ')} className="col-span-2" />
          <DetailItem icon={<Dog size={14} />} label="Pets" value={pets ? 'Yes' : 'No'} />
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-border">
          <TrustBadgeList badges={badges} size="sm" />
        </div>
      </CardContent>
    </Card>
  )
}

function DetailItem({ 
  icon, 
  label, 
  value,
  className 
}: { 
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground truncate">{value}</p>
      </div>
    </div>
  )
}
