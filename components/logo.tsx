'use client'

import Link from 'next/link'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
}

export function Logo({ className = '', size = 'md', linkToHome = true }: LogoProps) {
  const sizes = {
    sm: { iconSize: 24, fontSize: 18, gap: 6 },
    md: { iconSize: 32, fontSize: 22, gap: 8 },
    lg: { iconSize: 44, fontSize: 30, gap: 10 },
  }

  const { iconSize, fontSize, gap } = sizes[size]

  const LogoContent = (
    <div className={`flex items-center ${className}`} style={{ gap }}>
      {/* House with heart icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* House outline */}
        <path
          d="M8 20L24 6L40 20V40C40 41.1 39.1 42 38 42H10C8.9 42 8 41.1 8 40V20Z"
          stroke="#C96F63"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Heart inside */}
        <path
          d="M24 32C24 32 17 27 17 23C17 20.5 18.8 19 21 19C22.3 19 23.4 19.6 24 20.5C24.6 19.6 25.7 19 27 19C29.2 19 31 20.5 31 23C31 27 24 32 24 32Z"
          stroke="#C96F63"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {/* Wordmark */}
      <span style={{ fontSize, fontWeight: 600, letterSpacing: '-0.02em' }}>
        <span className="text-foreground">Loft</span>
        <span style={{ color: '#C96F63' }}>me</span>
      </span>
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
