'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function HeroSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (query.trim()) {
      searchParams.set('city', query.trim())
    }
    router.push(`/search${searchParams.toString() ? `?${searchParams.toString()}` : ''}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by city (e.g. Budapest)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" size="icon" className="md:px-4 md:w-auto">
        <Search className="h-4 w-4 md:hidden" />
        <span className="hidden md:inline">Search renters</span>
      </Button>
    </form>
  )
}
