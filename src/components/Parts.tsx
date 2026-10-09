import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { A } from '../assets'
import { INTRO, OUTRO, ROOMS, type Obj } from '../data'
import ThreeDObject from './ThreeDObject'
import Img from './Img'
import { CURATOR_NOTE, NOTES } from '../notes'

const ease = [0.22, 1, 0.36, 1] as const
export const Reveal = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12%' }} transition={{ duration: 1.3, delay, ease }}>{children}</motion.div>)
export const nb = (s: string) => s.replace(/ (\S+)$/, '\u00A0$1') // keeps the last word from hanging alone
export const Paras = ({ t, className = '' }: { t: string; className?: string }) => <>{t.split('\n\n').map((p, i) => <p key={i} className={`mt-4 first:mt-0 text-justify hyphens-auto ${className}`}>{nb(p)}</p>)}</>

export const Notes = ({ k }: { k?: string }) => {
  const n = k ? NOTES[k] : undefined
  const rows = [['Tool', n?.tool], ['Prompt', n?.prompt], ['What the AI got wrong', n?.flaw]].filter(r => r[1])
  if (!rows.length) return null
  return (
    <details className="mt-8 border-t border-current/20 pt-4 text-[13px]">
      <summary className="cursor-pointer text-[11px] uppercase tracking-[.22em] text-rust focus-visible:outline-2 focus-visible:outline-rust">Conservation notes</summary>
      <dl className="mt-4 space-y-3 opacity-85">{rows.map(([l, v]) => <div key={l}><dt className="text-[11px] uppercase tracking-[.18em] opacity-60">{l}</dt><dd className="mt-1 whitespace-pre-line">{v}</dd></div>)}</dl>
    </details>)
}

export const Plaque = ({ no, name, medium, title, children, dark, notes }: { no?: string; name?: string; medium: string; title: string; children: ReactNode; dark?: boolean; notes?: string }) => (
  <div>
    <p className="text-[11px] uppercase tracking-[.22em] text-rust">{[no, name].filter(Boolean).join(' · ')}</p>
    <p className={`mt-1 text-xs ${dark ? 'text-paper/60' : 'text-muted'}`}>{medium}</p>
    <h3 className="mt-4 font-display text-3xl leading-[1.1] md:text-4xl">{title}</h3>
    <div className={`mt-6 max-w-xl text-base leading-relaxed ${dark ? 'text-paper/80' : 'text-ink/85'}`}>{children}<Notes k={notes} /></div>
  </div>)

const SLIDES = [A.indomie, A.soto, A.royco, A.marinasi, A.lada, A.tea]
export function MuseumIntro() {
  const [k, setK] = useState(0)
  useEffect(() => { const t = setInterval(() => setK(x => (x + 1) % SLIDES.length), 6000); return () => clearInterval(t) }, [])
  return (<>
    <header className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink px-[6vw] pb-[9vh] text-paper">
      <AnimatePresence>
        <motion.img key={k} src={SLIDES[k]} alt="" aria-hidden initial={{ opacity: 0, scale: 1.2, filter: 'blur(18px)' }} animate={{ opacity: 0.6, scale: 1.04, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 6, ease }} className="absolute inset-0 h-full w-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />
      <p className="absolute left-[6vw] top-8 max-w-[16rem] text-[11px] uppercase tracking-[.3em] text-paper/70">A personal collection of things that do not stay.</p>
      <h1 className="relative font-display text-[clamp(4rem,15.5vw,16rem)] leading-[.8] tracking-tight">The Museum<br /><span className="italic text-paper/70">of</span> Transience</h1>
      <a href="#intro" className="relative mt-12 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[.25em] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-paper">Enter the collection <ArrowRight size={16} /></a>
    </header>
    <section id="intro" className="grid min-h-[110vh] place-items-center px-[6vw] py-[20vh]">
      <div className="max-w-xl space-y-8 font-display text-3xl leading-snug md:text-4xl">
        {INTRO.map((p, i) => <Reveal key={i} delay={0.1}><p className={i === 4 ? 'italic text-muted' : ''}>{p}</p></Reveal>)}</div>
    </section>
  </>)
}

export function RoomSection({ i, dark, children }: { i: number; dark?: boolean; children: ReactNode }) {
  const r = ROOMS[i]
  return (
    <section id={`room-${r.n}`} data-room={r.n} className={`relative overflow-hidden px-[6vw] py-[16vh] ${dark ? 'bg-ink text-paper' : ''}`}>
      <span aria-hidden className="pointer-events-none absolute -top-10 right-[3vw] select-none font-display text-[40vw] leading-none opacity-[.06]">{r.n}</span>
      <Reveal className="mb-[14vh] max-w-3xl">
        <p className="text-[11px] uppercase tracking-[.3em] text-rust">Room {r.n}</p>
        <h2 className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[.95]">{r.title}</h2>
        <p className={`mt-6 font-display text-2xl italic ${dark ? 'text-paper/60' : 'text-muted'}`}>{r.sub}</p>
      </Reveal>
      <div className="space-y-[18vh]">{children}</div>
    </section>)
}

export function MuseumObject({ o, i }: { o: Obj; i: number }) {
  const right = i % 2 === 1
  const view = { once: true, margin: '-15%' } as const
  return (
    <article className="relative">
      <motion.div className={`overflow-hidden md:w-[72%] ${right ? 'md:ml-auto' : ''} ${o.glb ? 'bg-[#e6dfcf]' : ''}`}
        initial={{ clipPath: 'inset(14% 10% 14% 10%)', opacity: 0 }} whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }} viewport={view} transition={{ duration: 1.8, ease }}>
        {o.img
          ? <motion.div initial={{ scale: 1.14 }} whileInView={{ scale: 1 }} viewport={view} transition={{ duration: 2.4, ease }}><Img src={o.img} alt={`${o.title}, ${o.medium}`} className="block h-auto w-full" /></motion.div>
          : <ThreeDObject src={o.glb!} alt={o.title} />}
      </motion.div>
      <Reveal delay={0.3} className={`relative z-10 mt-6 bg-paper md:-mt-[8vw] md:w-[46%] md:p-10 ${right ? '' : 'md:ml-[50%]'}`}>
        <Plaque no={String(i + 1).padStart(2, '0')} medium={o.medium} title={o.title} notes={o.title}><Paras t={o.text} /></Plaque>
      </Reveal>
    </article>)
}

// Paired glitch images: static, desaturated channel-offset slices, no neon.
export function GlitchArtwork({ srcs }: { srcs: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {srcs.map((s, k) => (
        <figure key={s} className="bg-ink p-3 shadow-[0_24px_34px_-24px_rgba(31,28,24,.7)]">
          <div className="relative overflow-hidden">
            <img src={s} alt={`TikTok screenshot ${k + 1}, corrupted into glitch art`} loading="lazy" className="block w-full saturate-50" />
            <img src={s} alt="" aria-hidden className="absolute inset-0 w-full translate-x-2 opacity-60 mix-blend-multiply" style={{ clipPath: 'inset(32% 0 48% 0)' }} />
            <img src={s} alt="" aria-hidden className="absolute inset-0 w-full -translate-x-3 opacity-50 mix-blend-screen sepia" style={{ clipPath: 'inset(68% 0 14% 0)' }} />
          </div>
        </figure>))}
    </div>)
}

export function SpotifySection({ children }: { children: ReactNode }) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-12">
      <div className="md:col-span-5">{children}</div>
      <Reveal className="md:col-span-6 md:col-start-7">
        <iframe data-testid="embed-iframe" style={{ borderRadius: 12 }} title="Twelve Songs, Twelve Months, Spotify playlist"
          src="https://open.spotify.com/embed/playlist/5WgnnjciGyI7TqGd3oWr9T?utm_source=generator&si=19ea497c164a48ec"
          width="100%" height="352" frameBorder="0" allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
      </Reveal>
    </div>)
}

export function MuseumNavigation({ rooms }: { rooms: string[] }) {
  const [on, setOn] = useState('')
  useEffect(() => {
    // Active room = the one crossing 40% of the viewport height (rooms are taller than the screen, so a visibility ratio never works)
    const f = () => {
      let cur = ''
      document.querySelectorAll<HTMLElement>('[data-room]').forEach(el => { const r = el.getBoundingClientRect(); if (r.top <= innerHeight * 0.4 && r.bottom > innerHeight * 0.4) cur = el.dataset.room || '' })
      setOn(cur)
    }
    f(); addEventListener('scroll', f, { passive: true }); addEventListener('resize', f)
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f) }
  }, [rooms.join()])
  return (
    <nav aria-label="Rooms" className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 text-right mix-blend-difference md:right-5">
      {ROOMS.filter(r => rooms.includes(r.n)).map(r => <a key={r.n} href={`#room-${r.n}`} aria-label={`Room ${r.n}: ${r.title}`} aria-current={on === r.n ? 'location' : undefined} className={`font-display text-lg text-paper transition-opacity focus-visible:outline-2 focus-visible:outline-rust ${on === r.n ? 'opacity-100' : 'opacity-35 hover:opacity-80'}`}>{r.n}</a>)}
    </nav>)
}

export function MuseumOutro() {
  return (
    <footer className="grid min-h-screen place-items-center px-[6vw] py-[20vh] text-center">
      <div className="max-w-xl space-y-8 font-display text-2xl leading-snug md:text-3xl">
        {OUTRO.map((p, i) => <Reveal key={i}><p className={i === 0 ? '' : 'text-muted'}>{p}</p></Reveal>)}
        <Reveal><p className="pt-20 font-sans text-[11px] uppercase tracking-[.4em] text-ink">The Museum of Transience</p></Reveal>
      </div>
    </footer>)
}

export function CuratorNote() {
  if (!CURATOR_NOTE) return null
  return (
    <section className="grid place-items-center px-[6vw] py-[16vh]">
      <Reveal className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[.3em] text-rust">Curator&rsquo;s note</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">On making this with AI</h2>
        <div className="mt-8 text-[15px] text-paper/80"><Paras t={CURATOR_NOTE} /></div>
      </Reveal>
    </section>)
}
