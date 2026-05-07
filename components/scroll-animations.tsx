'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger'
  delay?: number
  duration?: number
  staggerDelay?: number
}

export function ScrollReveal({ 
  children, 
  className = '', 
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.1
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    
    // Initial state based on animation type
    const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
      fadeUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      slideLeft: {
        from: { opacity: 0, x: 100 },
        to: { opacity: 1, x: 0 }
      },
      slideRight: {
        from: { opacity: 0, x: -100 },
        to: { opacity: 1, x: 0 }
      },
      scale: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 }
      },
      stagger: {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 }
      }
    }

    const { from, to } = animations[animation]

    if (animation === 'stagger') {
      // Stagger animation for child elements only
      const childElements = element.children
      if (childElements.length > 0) {
        gsap.set(childElements, from)
        
        gsap.to(childElements, {
          ...to,
          duration,
          delay,
          stagger: staggerDelay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    } else {
      gsap.set(element, from)
      
      gsap.to(element, {
        ...to,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animation, delay, duration, staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.to(element, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({ children, className = '', tag: Tag = 'span' }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const text = element.textContent || ''
    
    // Split text into words
    const words = text.split(' ')
    element.innerHTML = words
      .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(' ')

    const innerSpans = element.querySelectorAll('span > span')
    
    gsap.set(innerSpans, { y: '100%' })

    gsap.to(innerSpans, {
      y: '0%',
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [children])

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  )
}

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    })
  }, [])

  return (
    <div 
      ref={ref} 
      className={`fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 ${className}`}
      style={{ transform: 'scaleX(0)' }}
    />
  )
}

interface PinSectionProps {
  children: ReactNode
  className?: string
  pinDuration?: number
}

export function PinSection({ children, className = '', pinDuration = 1 }: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: `+=${pinDuration * 100}%`,
      pin: true,
      pinSpacing: true
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [pinDuration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
