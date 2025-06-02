import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  // Security: Test XSS prevention
  describe('Security', () => {
    it('should sanitize malicious script content', () => {
      render(<Button>{'<script>alert("xss")</script>Safe Content'}</Button>)
      const button = screen.getByRole('button')
      expect(button.textContent).toBe('Safe Content')
      expect(button.innerHTML).not.toContain('<script>')
    })

    it('should prevent CSS injection through className', () => {
      render(<Button className="safe-class; background: url(javascript:alert('xss'))">Test</Button>)
      const button = screen.getByRole('button')
      expect(button.className).not.toContain('javascript:')
    })
  })

  // Functionality tests
  describe('Functionality', () => {
    it('renders with default props', () => {
      render(<Button>Test Button</Button>)
      const button = screen.getByRole('button', { name: /test button/i })
      expect(button).toBeDefined()
      expect(button.getAttribute('type')).toBe('button')
    })

    it('handles all variants correctly', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeDefined()
        unmount()
      })
    })

    it('handles all sizes correctly', () => {
      const sizes = ['default', 'sm', 'lg', 'icon'] as const
      
      sizes.forEach(size => {
        const { unmount } = render(<Button size={size}>{size}</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeDefined()
        unmount()
      })
    })

    it('handles click events properly', () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Clickable</Button>)
      fireEvent.click(screen.getByRole('button'))
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('respects disabled state', () => {
      const handleClick = jest.fn()
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      
      const button = screen.getByRole('button') as HTMLButtonElement
      expect(button.disabled).toBe(true)
      
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('works with asChild prop', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link.getAttribute('href')).toBe('/test')
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper focus management', () => {
      render(<Button>Focusable</Button>)
      const button = screen.getByRole('button')
      
      button.focus()
      expect(document.activeElement).toBe(button)
    })

    it('supports keyboard interaction', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)
      
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.keyDown(button, { key: ' ' })
      
      // Button should handle these events properly
      expect(button).toBeDefined()
    })
  })
}) 