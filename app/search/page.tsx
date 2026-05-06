'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrustBadgeList } from '@/components/trust-badge'
import { mockRenters, preferredAreaOptions, leaseLengthOptions } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { LandlordContactModal } from '@/components/landlord-contact-modal'
import { RequestDocumentModal } from '@/components/request-document-modal'
import { 
  Search,
  Filter,
  MapPin,
  Calendar,
  Wallet,
  Clock,
  Users,
  Dog,
  BadgeCheck,
  Eye,
  Lock,
  X,
  ChevronDown
} from 'lucide-react'

export default function LandlordSearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  )
}

function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-9 w-64 bg-muted animate-pulse rounded mb-2" />
          <div className="h-5 w-96 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-full bg-muted animate-pulse rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </main>
    </div>
  )
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    city: 'Budapest',
    budgetMin: '',
    budgetMax: '',
    moveIn: '',
    leaseLength: '',
    areas: [] as string[],
    pets: '',
    verified: false
  })

  // Read city from URL query params on mount
  useEffect(() => {
    const cityFromUrl = searchParams.get('city')
    if (cityFromUrl) {
      setFilters(prev => ({ ...prev, city: cityFromUrl }))
    }
  }, [searchParams])

  const toggleArea = (area: string) => {
    setFilters(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }))
  }

  const clearFilters = () => {
    setFilters({
      city: 'Budapest',
      budgetMin: '',
      budgetMax: '',
      moveIn: '',
      leaseLength: '',
      areas: [],
      pets: '',
      verified: false
    })
  }

  const activeFilterCount = [
    filters.budgetMin || filters.budgetMax,
    filters.moveIn,
    filters.leaseLength,
    filters.areas.length > 0,
    filters.pets,
    filters.verified
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search verified renters</h1>
          <p className="text-muted-foreground">
            Browse renter profiles from people actively looking for a home.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by city..." 
                className="pl-10"
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter size={16} className="mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown size={16} className={cn("ml-2 transition-transform", showFilters && "rotate-180")} />
            </Button>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.city && (
                <FilterChip label={filters.city} onRemove={() => setFilters(prev => ({ ...prev, city: '' }))} />
              )}
              {(filters.budgetMin || filters.budgetMax) && (
                <FilterChip 
                  label={`€${filters.budgetMin || '0'}–${filters.budgetMax || '∞'}`} 
                  onRemove={() => setFilters(prev => ({ ...prev, budgetMin: '', budgetMax: '' }))} 
                />
              )}
              {filters.leaseLength && (
                <FilterChip 
                  label={filters.leaseLength} 
                  onRemove={() => setFilters(prev => ({ ...prev, leaseLength: '' }))} 
                />
              )}
              {filters.areas.map(area => (
                <FilterChip key={area} label={area} onRemove={() => toggleArea(area)} />
              ))}
              {filters.pets && (
                <FilterChip 
                  label={filters.pets === 'no' ? 'No pets' : 'Has pets'} 
                  onRemove={() => setFilters(prev => ({ ...prev, pets: '' }))} 
                />
              )}
              {filters.verified && (
                <FilterChip 
                  label="ID verified" 
                  onRemove={() => setFilters(prev => ({ ...prev, verified: false }))} 
                />
              )}
              <button 
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Expanded Filters */}
          {showFilters && (
            <Card className="border-border/50">
              <CardContent className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Wallet size={14} /> Budget range
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.budgetMin}
                      onChange={(e) => setFilters(prev => ({ ...prev, budgetMin: e.target.value }))}
                    />
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.budgetMax}
                      onChange={(e) => setFilters(prev => ({ ...prev, budgetMax: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar size={14} /> Move-in date
                  </Label>
                  <Input 
                    type="date" 
                    value={filters.moveIn}
                    onChange={(e) => setFilters(prev => ({ ...prev, moveIn: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock size={14} /> Lease length
                  </Label>
                  <div className="flex flex-wrap gap-1">
                    {leaseLengthOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => setFilters(prev => ({ 
                          ...prev, 
                          leaseLength: prev.leaseLength === option ? '' : option 
                        }))}
                        className={cn(
                          'px-2 py-1 text-xs rounded-full border transition-colors',
                          filters.leaseLength === option
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Dog size={14} /> Pets
                  </Label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, pets: prev.pets === 'no' ? '' : 'no' }))}
                      className={cn(
                        'flex-1 px-3 py-2 text-xs rounded-lg border transition-colors',
                        filters.pets === 'no'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      No pets
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, pets: prev.pets === 'yes' ? '' : 'yes' }))}
                      className={cn(
                        'flex-1 px-3 py-2 text-xs rounded-lg border transition-colors',
                        filters.pets === 'yes'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      Has pets
                    </button>
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-4">
                  <Label className="flex items-center gap-2">
                    <MapPin size={14} /> Preferred areas
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {preferredAreaOptions.map(area => (
                      <button
                        key={area}
                        onClick={() => toggleArea(area)}
                        className={cn(
                          'px-3 py-1.5 text-sm rounded-full border transition-colors',
                          filters.areas.includes(area)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary'
                        )}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-4 flex items-center gap-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, verified: !prev.verified }))}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-colors',
                      filters.verified
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary'
                    )}
                  >
                    <BadgeCheck size={14} />
                    ID verified only
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {mockRenters.length} verified renters found
          </p>

          {mockRenters.map((renter) => (
            <RenterCard key={renter.id} renter={renter} />
          ))}
        </div>

        {/* Privacy Note */}
        <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Search verified renter profiles. Request access only when there is a real match. Contact details and private documents are hidden by default.
          </p>
        </div>
      </main>
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-primary/70">
        <X size={14} />
      </button>
    </span>
  )
}

function RenterCard({ renter }: { renter: typeof mockRenters[0] }) {
  return (
    <Card className="border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Avatar & Name */}
          <div className="flex items-start gap-4 lg:w-64">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-primary">
                {renter.firstName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {renter.firstName} {renter.lastName?.charAt(0)}.
              </h3>
              <p className="text-sm text-primary flex items-center gap-1">
                <BadgeCheck size={14} />
                Verified renter
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Profile {renter.profileStrength}% complete
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Relocating from {renter.currentCity} to {renter.movingToCity} for work.{' '}
              {renter.intro.split('.').slice(1).join('.')}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">{renter.budgetCurrency}{renter.budgetMin}–{renter.budgetMax}/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Move-in:</span>
                <span className="font-medium">{renter.moveInDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Lease:</span>
                <span className="font-medium">{renter.leaseLength}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Areas:</span>
                <span className="font-medium truncate">{renter.preferredAreas.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Occupants:</span>
                <span className="font-medium">{renter.occupants}</span>
              </div>
              <div className="flex items-center gap-2">
                <Dog size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Pets:</span>
                <span className="font-medium">{renter.pets ? 'Yes' : 'No'}</span>
              </div>
            </div>

            <TrustBadgeList badges={renter.badges} size="sm" />

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock size={12} />
              Contact details hidden by default
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-row lg:flex-col gap-2 lg:w-40">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={`/landlord/profile/${renter.id}`}>
                <Eye size={14} className="mr-2" />
                View profile
              </Link>
            </Button>
            <LandlordContactModal 
              renterName={renter.firstName} 
              trigger={<Button size="sm">Contact renter</Button>}
            />
            <RequestDocumentModal renterName={renter.firstName} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
