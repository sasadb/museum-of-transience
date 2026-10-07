import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ObjectModal from './ObjectModal'
import Img from './Img'
// Add tickets later by appending to `tickets`. date/route are shown only when provided.
export type Ticket = { src: string; date?: string; route?: string }
const nudge = ['md:mt-0', 'md:mt-6', 'md:mt-2', 'md:mt-8', 'md:mt-1', 'md:mt-5']
export default function TicketArchive({ tickets, context }: { tickets: Ticket[]; context: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const t = open !== null ? tickets[open] : null
  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
        {tickets.map((x, i) => (
          <li key={x.src} className={nudge[i % nudge.length]}>
            <button onClick={() => setOpen(i)} aria-label={`Open train ticket ${i + 1} of ${tickets.length}`} className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust">
              <div className="aspect-[3/4] overflow-hidden bg-[#e4dccb] p-2 shadow-[0_6px_14px_-8px_rgba(31,28,24,.5)] transition duration-700 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
                <Img src={x.src} alt={`Train ticket ${i + 1}`} className="h-full w-full object-cover opacity-80 saturate-75 transition duration-700 group-hover:opacity-100 group-hover:saturate-100" />
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[.2em] text-muted">No. {String(i + 1).padStart(2, '0')} <span className="text-rust opacity-60 transition group-hover:opacity-100">· View</span></p>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {t && (
          <ObjectModal label={`Train ticket ${open! + 1}`} onClose={() => setOpen(null)}>
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
              <div className="relative"><img src={t.src} alt={`Train ticket ${open! + 1}, full image`} className="mx-auto max-h-[72vh] object-contain" />
                <span aria-hidden className="absolute bottom-6 right-2 -rotate-12 border-2 border-rust px-3 py-1 font-display text-2xl tracking-[.2em] text-rust opacity-70">USED</span></div>
              <div className="self-end text-sm text-muted"><p className="mb-3 text-[11px] uppercase tracking-[.2em]">Ticket {open! + 1} of {tickets.length}</p>
                {t.date && <p>Date: {t.date}</p>}{t.route && <p>Route: {t.route}</p>}<p className="mt-4">{context}</p></div>
            </div>
          </ObjectModal>
        )}
      </AnimatePresence>
    </>
  )
}
