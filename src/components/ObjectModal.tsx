import { useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
export default function ObjectModal({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'; addEventListener('keydown', k)
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', k) }
  }, [onClose])
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={label} onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-3 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <motion.div onClick={e => e.stopPropagation()} initial={{ y: 16 }} animate={{ y: 0 }} exit={{ y: 8 }} transition={{ duration: 0.7 }}
        className="relative max-h-[94vh] w-full max-w-5xl overflow-auto bg-paper p-5 text-ink md:p-10">
        <button autoFocus onClick={onClose} aria-label="Close" className="absolute right-3 top-3 p-2 focus-visible:outline-2 focus-visible:outline-rust"><X size={20} /></button>
        {children}
      </motion.div>
    </motion.div>
  )
}
