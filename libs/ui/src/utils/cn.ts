import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Security: Sanitize class names to prevent CSS injection
const sanitizeClassName = (className: string): string => {
  // Remove potentially dangerous characters and patterns
  return className
    .replace(/[<>]/g, '') // Remove HTML characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions
    .trim()
}

// Performance: Memoized function for repeated class combinations
const classCache = new Map<string, string>()

/**
 * Utility for merging Tailwind CSS classes with clsx
 * Security: Sanitizes class names to prevent CSS injection
 * Performance: Caches results for better performance
 */
export function cn(...inputs: ClassValue[]): string {
  // Create cache key
  const cacheKey = JSON.stringify(inputs)
  
  // Check cache first for performance
  if (classCache.has(cacheKey)) {
    return classCache.get(cacheKey)!
  }

  // Process inputs with security sanitization
  const sanitizedInputs = inputs.map(input => {
    if (typeof input === 'string') {
      return sanitizeClassName(input)
    }
    if (Array.isArray(input)) {
      return input.map(item => typeof item === 'string' ? sanitizeClassName(item) : item)
    }
    if (typeof input === 'object' && input !== null) {
      const sanitizedObj: Record<string, any> = {}
      Object.entries(input).forEach(([key, value]) => {
        sanitizedObj[sanitizeClassName(key)] = value
      })
      return sanitizedObj
    }
    return input
  })

  const result = twMerge(clsx(sanitizedInputs))
  
  // Cache result (limit cache size for memory management)
  if (classCache.size < 1000) {
    classCache.set(cacheKey, result)
  }
  
  return result
}

// Clear cache function for testing or memory management
export function clearClassCache(): void {
  classCache.clear()
} 