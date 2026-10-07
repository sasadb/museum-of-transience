import { useState } from 'react'
// Shows the exact missing path on the page, so a wrong folder/filename is obvious.
export default function Img({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div role="img" aria-label={alt} className="grid aspect-[4/3] w-full place-items-center border border-dashed border-rust p-4 text-center text-xs text-rust">Image not found:<br />{src}</div>
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} />
}
