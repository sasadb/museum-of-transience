import { useState } from 'react'
import { motion } from 'framer-motion'
type Props = { frontImage: string; backImage: string; altText: string; label: string; instruction?: string; aspect?: string }
export default function FlipArtifact({ frontImage, backImage, altText, label, instruction = 'Flip to view back', aspect = '3/4' }: Props) {
  const [back, setBack] = useState(false)
  const face = 'absolute inset-0 h-full w-full object-contain [backface-visibility:hidden] drop-shadow-[0_18px_22px_rgba(31,28,24,.25)]'
  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={() => setBack(b => !b)} aria-pressed={back}
        aria-label={`${label}. ${back ? 'Showing the back. Activate to flip back.' : 'Showing the front. Activate to view the back.'}`}
        style={{ aspectRatio: aspect }}
        className="w-full max-w-sm cursor-pointer [perspective:1500px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-rust">
        <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: back ? 180 : 0 }} transition={{ duration: 0.9, ease: [0.45, 0.05, 0.25, 1] }}>
          <img src={frontImage} alt={`${altText} (front)`} className={face} loading="lazy" />
          <img src={backImage} alt={`${altText} (back)`} className={`${face} [transform:rotateY(180deg)]`} loading="lazy" />
        </motion.div>
      </button>
      <p className="text-center text-xs text-muted">{label}</p>
      <p className="text-[11px] uppercase tracking-[.22em] text-rust" aria-hidden>{back ? 'Flip back' : instruction}</p>
    </div>
  )
}
