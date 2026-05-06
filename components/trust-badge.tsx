import { 
  Mail, 
  Phone, 
  Shield, 
  Briefcase, 
  FileText,
  Check,
  Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type BadgeType = 
  | 'email-verified' 
  | 'phone-verified' 
  | 'id-verified' 
  | 'employment-added' 
  | 'documents-private'

interface TrustBadgeProps {
  type: BadgeType
  size?: 'sm' | 'md'
  showLabel?: boolean
  className?: string
}

const badgeConfig: Record<BadgeType, { icon: typeof Mail; label: string; color: string }> = {
  'email-verified': {
    icon: Mail,
    label: 'Email verified',
    color: 'text-success'
  },
  'phone-verified': {
    icon: Phone,
    label: 'Phone verified',
    color: 'text-success'
  },
  'id-verified': {
    icon: Shield,
    label: 'ID verified',
    color: 'text-success'
  },
  'employment-added': {
    icon: Briefcase,
    label: 'Employment added',
    color: 'text-success'
  },
  'documents-private': {
    icon: Lock,
    label: 'Documents private',
    color: 'text-muted-foreground'
  }
}

export function TrustBadge({ type, size = 'md', showLabel = true, className }: TrustBadgeProps) {
  const config = badgeConfig[type]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5'
  }
  
  const iconSizes = {
    sm: 12,
    md: 14
  }

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full bg-secondary/50',
        sizeClasses[size],
        className
      )}
    >
      <Icon size={iconSizes[size]} className={config.color} />
      {showLabel && (
        <span className="text-foreground/80">{config.label}</span>
      )}
    </span>
  )
}

export function TrustBadgeList({ 
  badges, 
  size = 'md',
  className 
}: { 
  badges: BadgeType[]
  size?: 'sm' | 'md'
  className?: string 
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {badges.map((badge) => (
        <TrustBadge key={badge} type={badge} size={size} />
      ))}
    </div>
  )
}
