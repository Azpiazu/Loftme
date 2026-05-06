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

// Landlord contact request types
export type LandlordRole = 'private-landlord' | 'agent' | 'property-manager'
export type MessageStatus = 'new' | 'interested' | 'waiting' | 'declined' | 'reported'

export interface LandlordMessage {
  id: string
  landlordName: string
  landlordRole: LandlordRole
  landlordVerified: boolean
  email: string
  phone?: string
  propertyArea: string
  propertyDescription: string
  monthlyRent: string
  availableFrom: string
  message: string
  photos: string[]
  listingLink?: string
  status: MessageStatus
  receivedAt: string
  read: boolean
}

export const landlordRoleLabels: Record<LandlordRole, string> = {
  'private-landlord': 'Private landlord',
  'agent': 'Agent',
  'property-manager': 'Property manager'
}

export const messageStatusLabels: Record<MessageStatus, string> = {
  'new': 'New',
  'interested': 'Interested',
  'waiting': 'Waiting for info',
  'declined': 'Declined',
  'reported': 'Reported'
}

export const mockLandlordMessages: LandlordMessage[] = [
  {
    id: 'msg-1',
    landlordName: 'Anna Kovács',
    landlordRole: 'private-landlord',
    landlordVerified: true,
    email: 'anna.kovacs@example.com',
    phone: '+36 30 123 4567',
    propertyArea: 'District VI, near Oktogon',
    propertyDescription: 'Furnished 1-bedroom near Oktogon',
    monthlyRent: '€1,050/month',
    availableFrom: 'September 1, 2024',
    message: 'Hi Sofia, I have a furnished one-bedroom apartment in District VI that may match your profile. It is available from September and close to public transport. The apartment has a balcony and is very bright.',
    photos: ['/apartment-1.jpg', '/apartment-2.jpg', '/apartment-3.jpg'],
    listingLink: 'https://example.com/listing/12345',
    status: 'new',
    receivedAt: '2024-08-15T10:30:00Z',
    read: false
  },
  {
    id: 'msg-2',
    landlordName: 'Peter Nagy',
    landlordRole: 'agent',
    landlordVerified: true,
    email: 'peter.nagy@realestate.hu',
    phone: '+36 20 987 6543',
    propertyArea: 'District VII, Jewish Quarter',
    propertyDescription: 'Modern studio in the heart of Pest',
    monthlyRent: '€850/month',
    availableFrom: 'September 15, 2024',
    message: 'Hello Sofia, I represent several property owners in the Jewish Quarter. I have a newly renovated studio that might interest you. Great location with cafes and restaurants nearby.',
    photos: ['/studio-1.jpg', '/studio-2.jpg'],
    status: 'interested',
    receivedAt: '2024-08-14T14:20:00Z',
    read: true
  },
  {
    id: 'msg-3',
    landlordName: 'Maria Tóth',
    landlordRole: 'property-manager',
    landlordVerified: false,
    email: 'maria@pmbudapest.com',
    propertyArea: 'District XIII, near Westend',
    propertyDescription: 'Spacious 1-bedroom with parking',
    monthlyRent: '€1,200/month',
    availableFrom: 'October 1, 2024',
    message: 'Dear Sofia, We manage several residential properties in District XIII. I have a spacious one-bedroom apartment with underground parking available. The building has a gym and 24/7 security.',
    photos: ['/apt-xiii-1.jpg', '/apt-xiii-2.jpg', '/apt-xiii-3.jpg', '/apt-xiii-4.jpg'],
    status: 'waiting',
    receivedAt: '2024-08-13T09:15:00Z',
    read: true
  },
  {
    id: 'msg-4',
    landlordName: 'John Smith',
    landlordRole: 'private-landlord',
    landlordVerified: false,
    email: 'suspicious@fakemail.com',
    propertyArea: 'District V, Parliament view',
    propertyDescription: 'Luxury apartment with view',
    monthlyRent: '€500/month',
    availableFrom: 'Immediately',
    message: 'URGENT! Beautiful luxury apartment with Parliament view for only 500 EUR! Send deposit now to secure!',
    photos: [],
    status: 'reported',
    receivedAt: '2024-08-12T16:45:00Z',
    read: true
  }
]

export const reportReasons = [
  'Suspicious listing',
  'Asking for payment too early',
  'Fake-looking photos',
  'Wrong or unclear details',
  'Spam',
  'Other'
]

// Document access types
export type DocumentAccessStatus = 'no-access' | 'requested' | 'granted' | 'revoked'

export interface RenterDocument {
  id: string
  name: string
  type: 'employment' | 'income' | 'student' | 'reference' | 'id-confirmation' | 'other'
  uploadedAt: string
}

export interface LandlordDocumentAccess {
  landlordId: string
  landlordName: string
  landlordRole: LandlordRole
  propertyDescription: string
  propertyArea: string
  monthlyRent: string
  messageStatus: MessageStatus
  documentAccess: DocumentAccessStatus
  documentsShared: string[] // document IDs
  accessGrantedAt?: string
  accessRevokedAt?: string
}

export const mockRenterDocuments: RenterDocument[] = [
  { id: 'doc-1', name: 'Proof of employment', type: 'employment', uploadedAt: '2024-07-20' },
  { id: 'doc-2', name: 'Proof of income', type: 'income', uploadedAt: '2024-07-20' },
  { id: 'doc-3', name: 'Student certificate', type: 'student', uploadedAt: '2024-07-22' },
  { id: 'doc-4', name: 'Reference letter', type: 'reference', uploadedAt: '2024-07-25' },
  { id: 'doc-5', name: 'ID verification confirmation', type: 'id-confirmation', uploadedAt: '2024-07-18' },
]

export const mockLandlordDocumentAccess: LandlordDocumentAccess[] = [
  {
    landlordId: 'msg-1',
    landlordName: 'Anna Kovács',
    landlordRole: 'private-landlord',
    propertyDescription: 'Furnished 1-bedroom near Oktogon',
    propertyArea: 'District VI',
    monthlyRent: '€1,050/month',
    messageStatus: 'new',
    documentAccess: 'granted',
    documentsShared: ['doc-1', 'doc-2', 'doc-4'],
    accessGrantedAt: '2024-08-15'
  },
  {
    landlordId: 'msg-2',
    landlordName: 'Peter Nagy',
    landlordRole: 'agent',
    propertyDescription: 'Modern studio in the heart of Pest',
    propertyArea: 'District VII',
    monthlyRent: '€850/month',
    messageStatus: 'interested',
    documentAccess: 'no-access',
    documentsShared: []
  },
  {
    landlordId: 'msg-3',
    landlordName: 'Maria Tóth',
    landlordRole: 'property-manager',
    propertyDescription: 'Spacious 1-bedroom with parking',
    propertyArea: 'District XIII',
    monthlyRent: '€1,200/month',
    messageStatus: 'waiting',
    documentAccess: 'requested',
    documentsShared: []
  },
]

export const documentAccessStatusLabels: Record<DocumentAccessStatus, string> = {
  'no-access': 'No access',
  'requested': 'Access requested',
  'granted': 'Access granted',
  'revoked': 'Access revoked'
}
