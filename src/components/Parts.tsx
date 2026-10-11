import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { A } from '../assets'
import { INTRO, OUTRO, PLAYLIST_ID, ROOMS, SIDES, TWELVE_SONGS, type Obj } from '../data'
import ThreeDObject from './ThreeDObject'
import Img from './Img'
import ObjectModal from './ObjectModal'
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
    <h3 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">{title}</h3>
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
      <div className="max-w-3xl space-y-8 font-display text-3xl leading-snug md:text-4xl text-center">
        {INTRO.map((p, i) => <Reveal key={i} delay={0.1}><p className={i === 2 ? 'italic text-muted' : ''}>{p}</p></Reveal>)}
        
        {/* ROOM PATHFINDER DILETAK KAN DI SINI */}
        <Reveal delay={0.2}>
          <RoomPathfinder />
        </Reveal>
      </div>
    </section>
  </>)
}

/* Roadmap: number + "Room I" + title form ONE clickable area per room.
   Room ids come from ROOMS, so they always match <section id="room-I"> etc.
   Pass `rooms` (e.g. ['I','IV']) to disable stops hidden by a filter. */
export function RoomPathfinder({ rooms }: { rooms?: string[] }) {
  const reduce = useReducedMotion()
  const go = (n: string) =>
    document.getElementById('room-' + n)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  return (
    <nav aria-label="Exhibition roadmap" className="w-full text-left">
      <ol className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {/* thin roadmap line: from the centre of stop 01 to the centre of stop 04 */}
        <span aria-hidden className="absolute left-5 top-5 hidden h-px bg-paper/30 lg:block" style={{ width: 'calc(75% + 1.125rem)' }} />
        {ROOMS.map((r, k) => {
          const off = !!rooms && !rooms.includes(r.n)
          return (
            <li key={r.n}>
              <button type="button" disabled={off} onClick={() => go(r.n)} aria-label={`Go to Room ${r.n}: ${r.title}`}
                className="group relative flex w-full flex-col items-start text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-paper disabled:cursor-not-allowed disabled:opacity-30">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-paper/50 bg-[#0A0A0A] font-display text-sm text-paper transition-colors duration-300 group-enabled:group-hover:border-paper group-enabled:group-hover:bg-paper group-enabled:group-hover:text-[#0A0A0A]">
                  {String(k + 1).padStart(2, '0')}
                </span>
                <span className="mt-4 text-[10px] uppercase tracking-[.22em] text-paper/60 transition-colors duration-300 group-enabled:group-hover:text-paper">Room {r.n}</span>
                <span className="mt-1 font-display text-xl leading-tight text-paper/90 transition-colors duration-300 group-enabled:group-hover:text-paper">{r.title}</span>
              </button>
            </li>)
        })}
      </ol>
    </nav>)
}

export function Intro() {
  return (
    <section id="intro" className="relative flex min-h-screen flex-col items-center justify-center bg-[#8C4331] px-6 py-20 text-center text-paper">
      <div className="max-w-2xl space-y-6 text-balance text-base opacity-90 sm:text-lg">
        <p>{INTRO[0]}</p>
        <p>{INTRO[1]}</p>
        <p className="font-medium">{INTRO[2]}</p>
      </div>
      <h1 className="my-10 font-display text-6xl italic tracking-tight sm:text-8xl md:text-9xl">Take your time.</h1>
      <div className="my-6 w-24 border-t border-paper/30" />
      <p className="max-w-xl text-balance text-sm leading-relaxed opacity-90 sm:text-base">{INTRO[3]}</p>
      <div className="mt-8 w-full max-w-5xl"><RoomPathfinder /></div>
    </section>)
}

export function RoomSection({ i, dark, children }: { i: number; dark?: boolean; children: ReactNode }) {
  const r = ROOMS[i]
  return (
    <section id={`room-${r.n}`} data-room={r.n} className={`relative scroll-mt-16 overflow-hidden px-[6vw] py-[16vh] ${dark ? 'bg-ink text-paper' : ''}`}>
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

declare global { interface Window { SpotifyIframeApi?: any; onSpotifyIframeApiReady?: (api: any) => void } }

export function SpotifySection({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState<number | null>(null)

  const side = (i: number) => (i < 6 ? 'A' : 'B')
  const pad = (i: number) => String(i + 1).padStart(2, '0')

  const pick = (i: number) => {
    setCurrentIndex(i)
    setOpen(i)
  }

  const currentSong = TWELVE_SONGS[currentIndex]
  // If a song has no spotifyId, show the whole playlist rather than silently playing a wrong track.
  const embedSrc = currentSong.spotifyId
    ? `https://open.spotify.com/embed/track/${currentSong.spotifyId}?utm_source=generator&theme=0`
    : `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`

  return (
    <div className="grid items-start gap-12 md:grid-cols-12 md:gap-x-12">
      {/* KOLOM KIRI: Narasi + Tracklist */}
      <div className="text-left md:col-span-6">
        <div className="mb-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-rust">
            SONIC MEMOIR
          </p>
          <p className="text-xs italic text-paper/60">
            A Sonic Journal of Displacement, 2026
          </p>
        </div>

        <h2 className="mb-4 font-display text-4xl text-paper">
          Twelve Songs, Twelve Months
        </h2>

        <div className="space-y-4 text-left text-[15px] leading-relaxed text-paper/80 hyphens-none">
          <p>
            Twelve songs for twelve months: the time I could not go home after first arriving in Korea. Each track holds a different kind of longing for my hometown. I made the playlist for dormitory solitude and late-night study, mixing Indonesian nostalgic melodies with quiet ambient sounds. It opens with Forget Jakarta and closes with Rehat, which means rest. Somewhere between the two, the songs became a way of measuring time. Press play to listen.
          </p>
          <p>
            Divided like a classic cassette tape, Side A (The Crossing) captures the initial months of arrival, navigating distance, and searching for familiarity. Side B (The Settling) reflects the quiet acceptance, finding a steady rhythm in daily life, and embracing moments of rest. Click on every title to know more about the song.
          </p>
        </div>

        {/* Tabel Daftar Lagu */}
        <div className="mt-10 border-t border-paper/10 pt-8">
          <p className="mb-4 text-[11px] uppercase tracking-[.25em] text-rust">
            Select Track (Click to Load Memory & Track)
          </p>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {(['A', 'B'] as const).map((s, n) => (
              <div key={s}>
                <p className="mb-3 text-[11px] uppercase tracking-[.25em] text-rust/80">
                  Side {s} · {SIDES[s]}
                </p>
                <ol>
                  {TWELVE_SONGS.slice(n * 6, n * 6 + 6).map((t, k) => {
                    const i = n * 6 + k
                    return (
                      <li key={i}>
                        <button
                          onClick={() => pick(i)}
                          aria-current={currentIndex === i ? 'true' : undefined}
                          className={`flex w-full items-baseline gap-3 border-b border-paper/10 py-2.5 text-left text-sm transition-all focus-visible:outline-2 focus-visible:outline-rust ${
                            currentIndex === i
                              ? 'bg-paper/10 pl-2 font-medium text-rust'
                              : 'text-paper/70 hover:text-paper hover:pl-1'
                          }`}
                        >
                          <span className="text-[11px] tabular-nums opacity-60">{pad(i)}</span>
                          <span className="truncate">{t.title}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KOLOM KANAN: Cassette Frame + Single Track Player */}
      <Reveal className="md:col-span-6">
        <div className="w-full max-w-xl space-y-4">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#3a2a22] bg-[#161210] p-5 shadow-2xl">
            <div className="rounded-xl bg-[#8C4331] px-6 py-4 text-center shadow-inner">
              <h3 className="font-display text-2xl text-[#EFE8DA]">Dormitory Solitude &amp; Late Night Study</h3>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[#EFE8DA]/80">
                SIDE {side(currentIndex)} · {SIDES[side(currentIndex)].toUpperCase()}
              </p>
            </div>

            <div aria-live="polite" className="mt-3 flex flex-col items-center justify-center rounded-full border border-[#3a2a22] bg-[#0A0A0A] px-6 py-3 text-center transition-all">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C0755A]">
                SIDE {side(currentIndex)} · TRACK {pad(currentIndex)} / 12
              </span>
              <span className="mt-0.5 font-display text-lg text-paper">{currentSong.title}</span>
              <span className="text-xs italic text-paper/60">{currentSong.artist}</span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#3a2a22]/80 bg-[#0A0A0A]">
              <iframe
                key={embedSrc}
                src={embedSrc}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="eager"
                title={`Spotify Player - ${currentSong.title}`}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <a
              href={`https://open.spotify.com/playlist/${PLAYLIST_ID}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-paper/60 hover:text-rust transition-colors focus-visible:outline-2 focus-visible:outline-rust"
            >
              Open Full Playlist on Spotify ↗
            </a>
          </div>
        </div>
      </Reveal>

      {/* POP-UP MODAL MEMORI PUITIS */}
      <AnimatePresence>
        {open !== null && (
          <ObjectModal label={`Song ${pad(open)}`} onClose={() => setOpen(null)}>
            <div className="mx-auto max-w-md py-8 text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C4331]">
                {TWELVE_SONGS[open].month} · Side {side(open)}, {SIDES[side(open)]}
              </p>
              <h3 className="mt-3 font-display text-4xl leading-tight">{TWELVE_SONGS[open].title}</h3>
              <p className="mt-2 text-sm italic opacity-70">{TWELVE_SONGS[open].artist}</p>
              <p className="mt-6 text-left text-[15px] leading-relaxed">
                {TWELVE_SONGS[open].note}
              </p>
            </div>
          </ObjectModal>
        )}
      </AnimatePresence>
    </div>
  )
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