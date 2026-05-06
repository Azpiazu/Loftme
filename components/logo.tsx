'use client'

import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
  showSlogan?: boolean
}

export function Logo({ className = '', size = 'md', linkToHome = true, showSlogan = false }: LogoProps) {
  const sizes = {
    sm: { height: 32, width: 110 },
    md: { height: 40, width: 140 },
    lg: { height: 56, width: 195 },
  }

  const { height, width } = sizes[size]

  const LogoContent = (
    <div className={`flex flex-col ${className}`}>
      <Image
        src="/loftme-logo.svg"
        alt="Loftme"
        width={width}
        height={height}
        priority
      />
      {showSlogan && (
        <span className="text-[10px] text-foreground/70 tracking-wide mt-0.5">Built for trust</span>
      )}
    </div>
  )

  if (linkToHome) {
    return (
      <Link href="/" className="hover:opacity-80 transition-opacity">
        {LogoContent}
      </Link>
    )
  }

  return LogoContent
}
