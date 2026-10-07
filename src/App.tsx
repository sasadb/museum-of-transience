import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { A } from './assets'
import { INTRO, OUTRO, ROOM1, ROOM4, ROOMS, SLOGANS, SPOTIFY, TICKETS, TIKTOK, TRAIN_MEDIUM, TRAIN_TEXT, TRAIN_TITLE, type Obj } from './data'
import FlipArtifact from './components/FlipArtifact'
import Img from './components/Img'
import ThreeDObject from './components/ThreeDObject'
import TicketArchive from './components/TicketArchive'
import { CuratorNote, GlitchArtwork, MuseumNavigation, Notes, Paras, Plaque, Reveal, SpotifySection } from './components/Parts'

const ease = [0.22, 1, 0.36, 1] as const
const SLIDES = [A.saleh, A.soto, A.tea, A.indomie, A.royco, A.marinasi, A.lada]

/* "What the machine saw": decorative detection boxes + connecting lines, drawn over the paintings.
   Positions and numbers are purely visual, they do not describe real data. */
const BX = [[38, 8, 20, 30, '0.1429'], [12, 44, 14, 20, '0.7443'], [68, 28, 12, 18, '1.4286'], [50, 62, 10, 16, '1.8671']] as const
function Traces({ show, seed = 0, src, fit = 'cover' }: { show: boolean; seed?: number; src?: string; fit?: 'cover' | 'contain' }) {
  const b = BX.map(([x, y, w, h, v]) => ({ x: (x + seed * 11) % (100 - w), y: (y + seed * 7) % (100 - h), w, h, v }))
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {b.slice(1).map((c, k) => (
          <motion.line key={k} x1={b[k].x + b[k].w / 2} y1={b[k].y + b[k].h / 2} x2={c.x + c.w / 2} y2={c.y + c.h / 2}
            stroke="#fff" strokeOpacity=".45" strokeWidth="1" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }} transition={{ duration: 1.6, delay: 0.6 + k * 0.3 }} />))}
      </svg>
      {b.map((c, k) => (
        <motion.div key={k} className="absolute overflow-hidden border border-white/70" initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 1, delay: k * 0.3 }}
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%` }}>
          {src && <img src={src} alt="" className={`absolute max-w-none ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
            style={{ width: `${10000 / c.w}%`, height: `${10000 / c.h}%`, left: `${(-c.x * 100) / c.w}%`, top: `${(-c.y * 100) / c.h}%`, filter: 'url(#pix)' }} />}
          <span className="absolute left-0 top-0 bg-black/60 px-1 text-[10px] text-white">{c.v}</span>
        </motion.div>))}
    </div>)
}

function Hero() {
  const [k, setK] = useState(0)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const a = setInterval(() => setK(x => (x + 1) % SLIDES.length), 7000)
    const b = setTimeout(() => setOn(true), 2200)
    return () => { clearInterval(a); clearTimeout(b) }
  }, [])
  return (
    <header className="relative min-h-screen overflow-hidden bg-black">
      <AnimatePresence>
        <motion.img key={k} src={SLIDES[k]} alt="" aria-hidden initial={{ opacity: 0, scale: 1.18, filter: 'blur(14px)' }} animate={{ opacity: 0.8, scale: 1.03, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 7, ease }} className="absolute inset-0 h-full w-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
      <Traces show={on} seed={k + 1} src={SLIDES[k]} fit="cover" />
      <p className="absolute left-[5vw] top-8 max-w-[15rem] text-[12px] leading-snug text-paper/80">A personal collection of things that do not stay.</p>
      <a href="#statement" className="absolute right-[5vw] top-6 inline-flex items-center gap-3 rounded-full border border-paper/60 px-8 py-3 font-display text-lg tracking-widest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">ENTER THE COLLECTION <ArrowRight size={16} /></a>
      <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 0.4, ease }}
        className="absolute bottom-[7vh] right-[5vw] text-right font-display text-[clamp(3.4rem,10.5vw,11.5rem)] leading-[.9]">The Museum<br />of Transience</motion.h1>
    </header>)
}

/* Intro text, exact and in order, on a solid rust field with a painting rising from the bottom. */
function Statement() {
  return (
    <section id="statement" className="relative flex flex-col bg-[#8C4331] pt-[18vh] text-center">
      <div className="mx-auto flex max-w-[900px] flex-col items-center px-8">
        <Reveal><p className="max-w-[420px] text-[15px] uppercase leading-[1.7] tracking-[.14em]">{INTRO[0]}</p></Reveal>
        <Reveal className="mt-14 max-w-[420px] space-y-6 text-[16px] font-light leading-[1.7]"><p>{INTRO[1]}</p><p>{INTRO[2]}</p><p>{INTRO[3]}</p></Reveal>
        <Reveal className="mt-10 font-script text-[clamp(3.5rem,11vw,8rem)] leading-none">{INTRO[4]}</Reveal>
      </div>
      <div className="relative mt-24">
        <Img src={A.saleh} alt="Tiger hunt, oil painting by Raden Saleh, before 1880" className="block h-[75vh] w-full object-cover object-top" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#8C4331] to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        <p className="absolute bottom-3 left-[5vw] z-10 max-w-[28rem] text-[10px] leading-snug text-paper/60">Background: &lsquo;Tijgerjacht&rsquo; (Tiger Hunt), Raden Saleh, before 1880. Collectie Wereldmuseum (NMvW, RV-3155-304), via Wikimedia Commons. Public domain.</p>
      </div>
    </section>)
}

const FILTERS = [['all', 'All Artifacts'], ['3d', '3D Models'], ['recon', 'Reconstructions']] as const
type F = (typeof FILTERS)[number][0]
const keep = (o: Obj, f: F) => f === 'all' || (f === '3d' ? !!o.glb : !!o.img)

function Bar({ f, setF, t, setT }: { f: F; setF: (f: F) => void; t: boolean; setT: (t: boolean) => void }) {
  const base = 'rounded-full border px-5 py-2 text-[12px] uppercase tracking-[.18em] focus-visible:outline-2 focus-visible:outline-rust '
  return (
    <div className="sticky top-0 z-30 -mx-[6vw] mb-16 flex flex-wrap items-center gap-2 bg-[#0A0A0A]/85 px-[6vw] py-4 backdrop-blur">
      {FILTERS.map(([k, l]) => <button key={k} aria-pressed={f === k} onClick={() => setF(k)} className={base + (f === k ? 'border-paper bg-paper text-ink' : 'border-paper/30 text-paper/70 hover:border-paper/70')}>{l}</button>)}
      <button aria-pressed={t} onClick={() => setT(!t)} className={base + 'ml-auto ' + (t ? 'border-rust text-rust' : 'border-paper/30 text-paper/70')}>{t ? 'Hide' : 'Show'} AI traces</button>
    </div>)
}

function Item({ o, i, traces }: { o: Obj; i: number; traces: boolean }) {
  const no = String(i + 1).padStart(2, '0')
  const view = { once: true, margin: '-10%' } as const
  if (o.glb) return (
    <article className="grid items-center gap-10 md:grid-cols-12">
      <Reveal className={`bg-[#121110] md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}><ThreeDObject src={o.glb} alt={o.title} /></Reveal>
      <Reveal delay={0.2} className="md:col-span-5 md:px-6"><Plaque dark no={no} medium={o.medium} title={o.title} notes={o.title}><Paras t={o.text} /></Plaque></Reveal>
    </article>)
  return (
    <article>
      <Reveal>
        <div className="relative h-[min(86vh,62vw)] min-h-[320px] w-full overflow-hidden bg-[#0f0d0c]">
          <motion.div className="h-full w-full" initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={view} transition={{ duration: 2.6, ease }}>
            <Img src={o.img!} alt={`${o.title}, ${o.medium}`} className="h-full w-full object-contain" />
          </motion.div>
          <Traces show={traces} seed={i} src={o.img} fit="contain" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent" />
          <p className="absolute left-5 top-5 text-[11px] uppercase tracking-[.22em] text-paper/80">{no} · {o.medium}</p>
          <motion.h3 initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={view} transition={{ duration: 1.4, delay: 0.4, ease }}
            className="absolute bottom-4 right-5 max-w-[85%] text-right font-display text-[clamp(2.2rem,6.2vw,6.5rem)] leading-[.95]">{o.title}</motion.h3>
        </div>
      </Reveal>
      <div className="mt-6 max-w-[46ch] text-[13px] leading-relaxed text-paper/75 md:ml-[5vw]"><Paras t={o.text} /><Notes k={o.title} /></div>
    </article>)
}

function RoomHead({ i }: { i: number }) {
  const r = ROOMS[i]
  return (
    <Reveal className="mb-[10vh] max-w-4xl">
      <p className="text-[11px] uppercase tracking-[.3em] text-rust">Room {r.n}</p>
      <h2 className="mt-4 font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[.95]">{r.title}</h2>
      <p className="mt-6 font-display text-2xl italic text-paper/60">{r.sub}</p>
    </Reveal>)
}
const Room = ({ i, children, dark }: { i: number; children: React.ReactNode; dark?: boolean }) => (
  <section id={`room-${ROOMS[i].n}`} data-room={ROOMS[i].n} className={`px-[6vw] py-[14vh] ${dark ? 'bg-[#0e0c0b]' : ''}`}><RoomHead i={i} />{children}</section>)

function Gallery({ i, items, f, setF, t, setT }: { i: number; items: Obj[]; f: F; setF: (f: F) => void; t: boolean; setT: (t: boolean) => void }) {
  const shown = items.filter(o => keep(o, f))
  if (!shown.length) return null
  return <Room i={i}><Bar f={f} setF={setF} t={t} setT={setT} /><div className="space-y-[16vh]">{shown.map((o, k) => <Item key={o.title} o={o} i={k} traces={t} />)}</div></Room>
}

const Pair = ({ o, items }: { o: typeof SLOGANS; items: { label: string; alt: string; pair: string[]; aspect: string }[] }) => (
  <div className="grid items-center gap-12 md:grid-cols-12">
    <Reveal className="md:col-span-4"><Plaque dark name={o.name} medium={o.medium} title={o.title}><Paras t={o.text} /></Plaque></Reveal>
    <Reveal delay={0.2} className="grid gap-10 sm:grid-cols-2 md:col-span-8">
      {items.map(x => <FlipArtifact key={x.label} frontImage={x.pair[0]} backImage={x.pair[1]} altText={x.alt} label={x.label} aspect={x.aspect} />)}
    </Reveal>
  </div>)

const COMMONS = 'https://commons.wikimedia.org/wiki/File:Collectie_NMvWereldculturen,_RV-3155-304,_Olieverfschildering,_%27Tijgerjacht%27,_Raden_Saleh,_voor_1880.jpg'

export default function App() {
  const [f, setF] = useState<F>('all')
  const [t, setT] = useState(false)
  return (
    <>
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="pix" x="0" y="0"><feFlood x="4" y="4" width="2" height="2" /><feComposite width="10" height="10" /><feTile result="t" />
          <feComposite in="SourceGraphic" in2="t" operator="in" /><feMorphology operator="dilate" radius="5" /></filter>
      </svg>
      <MuseumNavigation />
      <Hero />
      <Statement />
      <Gallery i={0} items={ROOM1} f={f} setF={setF} t={t} setT={setT} />

      <Room i={1}>
        <div>
          <Reveal className="mb-12"><p className="text-xs text-paper/60">{TRAIN_MEDIUM}</p><h3 className="mt-2 font-display text-5xl md:text-6xl">{TRAIN_TITLE}</h3></Reveal>
          <TicketArchive tickets={A.trains.map(src => ({ src }))} context={TRAIN_TEXT[0]} />
          <Reveal className="mt-16 max-w-xl text-[15px] text-paper/80">{TRAIN_TEXT.map((p, k) => <p key={k} className="mt-4 first:mt-0">{p}</p>)}</Reveal>
        </div>
        <div className="mt-[16vh] grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4"><Plaque dark medium={TIKTOK.medium} title={TIKTOK.title} notes={TIKTOK.title}>{TIKTOK.text.map((p, k) => <p key={k} className="mt-4 first:mt-0">{p}</p>)}</Plaque></Reveal>
          <Reveal delay={0.2} className="md:col-span-8"><GlitchArtwork srcs={A.tiktok} /></Reveal>
        </div>
      </Room>

      <Room i={2} dark>
        <div className="space-y-[16vh]">
          <SpotifySection><Reveal><Plaque dark name={SPOTIFY.name} medium={SPOTIFY.medium} title={SPOTIFY.title}><Paras t={SPOTIFY.text} /></Plaque></Reveal></SpotifySection>
          <Pair o={SLOGANS} items={[{ label: 'Jaehyun Fancon slogan', alt: 'Jaehyun fancon slogan', pair: A.slogan.jaehyun, aspect: '3/4' }, { label: 'NCT DREAM slogan', alt: 'NCT DREAM encore slogan', pair: A.slogan.nct, aspect: '4/3' }]} />
          <Pair o={TICKETS} items={[{ label: 'Jaehyun Fancon ticket', alt: 'Jaehyun fancon ticket', pair: A.ticket.jaehyun, aspect: '4/3' }, { label: 'NCT DREAM ticket', alt: 'NCT DREAM encore ticket', pair: A.ticket.nct, aspect: '3/4' }]} />
        </div>
      </Room>

      <Gallery i={3} items={ROOM4} f={f} setF={setF} t={t} setT={setT} />
      <CuratorNote />
      <footer className="grid min-h-screen place-items-center px-[6vw] py-[20vh] text-center">
        <div className="max-w-xl space-y-8 font-display text-2xl leading-snug md:text-3xl">
          {OUTRO.map((p, k) => <Reveal key={k}><p className={k ? 'text-paper/60' : ''}>{p}</p></Reveal>)}
          <Reveal><p className="pt-20 font-sans text-[11px] uppercase tracking-[.4em]">The Museum of Transience</p></Reveal>
          <Reveal><p className="pt-10 font-sans text-[11px] leading-relaxed text-paper/50">Opening image: Raden Saleh, <i>Tijgerjacht</i>, before 1880. Collection NMvWereldculturen, RV-3155-304. Public domain,{' '}
            <a href={COMMONS} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-paper focus-visible:outline-2 focus-visible:outline-rust">via Wikimedia Commons</a>.</p></Reveal>
        </div>
      </footer>
    </>
  )
}
