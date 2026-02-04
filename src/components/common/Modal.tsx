'use client'

import { ReactNode, useEffect, useCallback, HTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
}: ModalProps) {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleEscKey])

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-luxe-black/80 backdrop-blur-md"
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`
              relative w-full ${sizeStyles[size]}
              bg-luxe-charcoal border border-gold/20
              shadow-luxury overflow-hidden
            `}
          >
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10">
                {title && (
                  <h2 className="font-display text-xl text-cream tracking-wide">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 text-cream/60 hover:text-gold transition-colors ml-auto"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ModalContent({ children, className = '', ...props }: ModalContentProps) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ModalFooter({ children, className = '', ...props }: ModalFooterProps) {
  return (
    <div
      className={`
        flex items-center justify-end gap-4
        px-6 py-4 border-t border-gold/10
        bg-luxe-black/30
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export { Modal, ModalContent, ModalFooter }
