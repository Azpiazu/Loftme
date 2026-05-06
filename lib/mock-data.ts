import type { BadgeType } from '@/components/trust-badge'

export interface RenterProfile {
  id: string
  firstName: string
  lastName?: string
  currentCity: string
  currentCountry: string
  movingToCity: string
  movingToCountry: string
  moveInDate: string
  budgetMin: number
  budgetMax: number
  budgetCurrency: string
  leaseLength: string
  apartmentType: string
  preferredAreas: string[]
  pets: boolean
  occupants: number
  furnished: boolean
  intro: string
  badges: BadgeType[]
  profileStrength: number
  shareLink: string
  email?: string
  phone?: string
  showEmail: boolean
  showPhone: boolean
  showFullName: boolean
  allowDocumentRequests: boolean
  showBadges: boolean
  profileActive: boolean
}

export const mockRenter: RenterProfile = {
  id: 'sofia-m',
  firstName: 'Sofia',
  lastName: 'M.',
  currentCity: 'Madrid',
  currentCountry: 'Spain',
  movingToCity: 'Budapest',
  movingToCountry: 'Hungary',
  moveInDate: 'September 1',
  budgetMin: 900,
  budgetMax: 1200,
  budgetCurrency: '€',
  leaseLength: '12+ months',
  apartmentType: 'Furnished 1-bedroom',
  preferredAreas: ['District VI', 'District VII', 'District XIII'],
  pets: false,
  occupants: 1,
  furnished: true,
  intro: 'I\'m relocating from Spain to Budapest for work and looking for a bright furnished apartment with good transport access.',
  badges: ['email-verified', 'phone-verified', 'id-verified', 'employment-added', 'documents-private'],
  profileStrength: 85,
  shareLink: 'loftme.io/sofia-m',
  email: 'sofia@example.com',
  phone: '+34 612 345 678',
  showEmail: false,
  showPhone: false,
  showFullName: true,
  allowDocumentRequests: true,
  showBadges: true,
  profileActive: true,
}

export const mockRenters: RenterProfile[] = [
  mockRenter,
  {
    id: 'alex-k',
    firstName: 'Alex',
    lastName: 'K.',
    currentCity: 'Berlin',
    currentCountry: 'Germany',
    movingToCity: 'Budapest',
    movingToCountry: 'Hungary',
    moveInDate: 'October 1',
    budgetMin: 800,
    budgetMax: 1100,
    budgetCurrency: '€',
    leaseLength: '6-12 months',
    apartmentType: 'Studio',
    preferredAreas: ['District V', 'District VII'],
    pets: false,
    occupants: 1,
    furnished: true,
    intro: 'Remote worker relocating to Budapest for a change of scenery. Looking for a quiet studio with good internet.',
    badges: ['email-verified', 'phone-verified', 'employment-added'],
    profileStrength: 70,
    shareLink: 'loftme.io/alex-k',
    showEmail: false,
    showPhone: false,
    showFullName: true,
    allowDocumentRequests: true,
    showBadges: true,
    profileActive: true,
  },
  {
    id: 'maria-l',
    firstName: 'Maria',
    lastName: 'L.',
    currentCity: 'Lisbon',
    currentCountry: 'Portugal',
    movingToCity: 'Budapest',
    movingToCountry: 'Hungary',
    moveInDate: 'September 15',
    budgetMin: 1000,
    budgetMax: 1400,
    budgetCurrency: '€',
    leaseLength: '12+ months',
    apartmentType: '2 bedrooms',
    preferredAreas: ['District XIII', 'Buda side'],
    pets: true,
    occupants: 2,
    furnished: false,
    intro: 'Moving to Budapest with my partner for work. We have a small, well-behaved cat. Looking for a spacious apartment.',
    badges: ['email-verified', 'phone-verified', 'id-verified', 'documents-private'],
    profileStrength: 75,
    shareLink: 'loftme.io/maria-l',
    showEmail: false,
    showPhone: false,
    showFullName: true,
    allowDocumentRequests: true,
    showBadges: true,
    profileActive: true,
  }
]

export const preferredAreaOptions = [
  'District V',
  'District VI',
  'District VII',
  'District VIII',
  'District XIII',
  'Buda side',
  'Near metro',
  'Flexible'
]

export const apartmentTypeOptions = [
  'Studio',
  '1 bedroom',
  '2 bedrooms',
  'Flexible'
]

export const leaseLengthOptions = [
  '3-6 months',
  '6-12 months',
  '12+ months',
  'Flexible'
]

export const documentTypes = [
  'Proof of employment',
  'Proof of income',
  'Student certificate',
  'Reference letter',
  'Other'
]
