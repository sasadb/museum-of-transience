import { useEffect, useRef, useState } from 'react'
const MV: any = 'model-viewer'
export default function ThreeDObject({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const on = () => setReady(true)
    el.addEventListener('load', on); return () => el.removeEventListener('load', on)
  }, [])
  return (
    <div className="relative h-[68vh] min-h-[360px] w-full">
      <MV ref={ref} src={src} alt={alt} camera-controls="" touch-action="pan-y" loading="lazy"
        shadow-intensity="0.7" exposure="0.95" tabindex="0" aria-label={`${alt}. 3D model. Drag to rotate, scroll or pinch to zoom.`}
        style={{ width: '100%', height: '100%', background: 'transparent', outline: 'none' }} />
      {!ready && <p className="pointer-events-none absolute inset-0 grid place-items-center text-xs tracking-widest text-muted">Unpacking the object…</p>}
      <p className="absolute bottom-0 w-full text-center text-[11px] uppercase tracking-[.22em] text-muted">Drag to inspect</p>
    </div>
  )
}
