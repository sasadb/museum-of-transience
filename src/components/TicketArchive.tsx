import { motion, useReducedMotion } from 'framer-motion'
// Room II artwork: "Map of Unspoken Routes". File name kept so App.tsx imports stay the same.
// The outline is traced by hand from ~75 coastal coordinates (lon, lat): realistic, but not survey-accurate. For exact
// borders, paste a public-domain SVG outline path (e.g. Natural Earth / Wikimedia Commons) into OUTLINE_OVERRIDE (360x600 viewBox).
const OUTLINE_OVERRIDE = ''
type LL = [number, number]
const P = ([lon, lat]: LL): [number, number] => [(lon - 125.9) * 92, (38.75 - lat) * 105]
// Clockwise from the west end of the DMZ (Han River mouth): west coast, south coast, east coast, then the DMZ back west.
const COAST: LL[] = [[126.68, 37.78], [126.55, 37.72], [126.6, 37.6], [126.6, 37.47], [126.7, 37.38], [126.76, 37.3], [126.7, 37.2], [126.65, 37.1], [126.8, 37.0], [126.9, 36.92], [126.65, 36.98], [126.45, 36.97], [126.3, 36.93], [126.14, 36.82], [126.2, 36.65], [126.31, 36.52], [126.42, 36.6], [126.5, 36.5], [126.5, 36.35], [126.55, 36.1], [126.7, 36.0], [126.7, 35.92], [126.62, 35.82], [126.52, 35.68], [126.48, 35.58], [126.55, 35.4], [126.45, 35.25], [126.4, 35.0], [126.38, 34.82], [126.5, 34.65], [126.3, 34.55], [126.45, 34.3], [126.75, 34.45], [126.95, 34.5], [127.15, 34.48], [127.35, 34.45], [127.28, 34.65], [127.5, 34.8], [127.75, 34.7], [127.7, 34.92], [127.95, 34.95], [128.05, 34.9], [128.3, 34.88], [128.4, 34.85], [128.6, 35.0], [128.72, 35.08], [128.85, 35.05], [128.97, 35.04], [129.08, 35.05], [129.13, 35.15], [129.2, 35.18], [129.25, 35.3], [129.37, 35.5], [129.45, 35.7], [129.45, 35.8], [129.58, 36.07], [129.45, 36.2], [129.4, 36.4], [129.4, 36.95], [129.25, 37.35], [129.1, 37.52], [128.95, 37.75], [128.7, 38.0], [128.6, 38.2], [128.4, 38.5], [128.37, 38.6], [128.2, 38.5], [127.9, 38.33], [127.6, 38.3], [127.35, 38.3], [127.1, 38.2], [126.95, 38.0], [126.78, 37.9]]
const JEJU: LL[] = [[126.15, 33.45], [126.3, 33.52], [126.55, 33.55], [126.85, 33.52], [126.95, 33.45], [126.92, 33.3], [126.7, 33.23], [126.45, 33.22], [126.25, 33.3]]
const mid = (a: number[], b: number[]) => `${(a[0] + b[0]) / 2},${(a[1] + b[1]) / 2}`
const smooth = (ll: LL[]) => {
  const p = ll.map(P)
  return `M${mid(p[p.length - 1], p[0])}` + p.map((c, i) => `Q${c[0]},${c[1]} ${mid(c, p[(i + 1) % p.length])}`).join('') + 'Z'
}
const OUTLINE = OUTLINE_OVERRIDE || smooth(COAST)

const C: Record<string, LL> = {
  seoul: [126.97, 37.53], chuncheon: [127.72, 37.86], daejeon: [127.39, 36.33], jeonju: [127.15, 35.82],
  busan: [129.05, 35.15], gyeongju: [129.21, 35.84], boryeong: [126.61, 36.33], gongju: [127.12, 36.46], buyeo: [126.91, 36.28], yeosu: [127.74, 34.76],
}
// [from, to, curve]. A reversed pair (Seoul to Daejeon, then Daejeon to Seoul) bends to the other side.
const ROUTES: [string, string, number][] = [
  ['seoul', 'daejeon', 0.14], ['daejeon', 'jeonju', 0.12], ['daejeon', 'seoul', 0.14], ['seoul', 'chuncheon', 0.15], ['daejeon', 'busan', 0.12],
  ['busan', 'gyeongju', 0.2], ['gyeongju', 'daejeon', 0.14], ['daejeon', 'boryeong', 0.2], ['daejeon', 'gongju', -0.3], ['daejeon', 'buyeo', 0.25],
  ['daejeon', 'yeosu', 0.13], ['yeosu', 'daejeon', 0.13],
]
type Lab = { t: string; dx: number; dy: number; a: 'start' | 'end' | 'middle' }
const LABELS: Record<string, Lab> = {
  seoul: { t: 'SEOUL / YONGSAN', dx: -7, dy: 3, a: 'end' }, chuncheon: { t: 'CHUNCHEON', dx: 7, dy: 3, a: 'start' },
  daejeon: { t: 'DAEJEON', dx: 8, dy: 3, a: 'start' }, jeonju: { t: 'JEONJU', dx: -7, dy: 3, a: 'end' },
  busan: { t: 'BUSAN', dx: 7, dy: 3, a: 'start' }, gyeongju: { t: 'GYEONGJU', dx: 7, dy: 3, a: 'start' },
  boryeong: { t: 'BORYEONG', dx: -7, dy: 3, a: 'end' }, gongju: { t: 'GONGJU', dx: 0, dy: -8, a: 'middle' }, buyeo: { t: 'BUYEO', dx: 0, dy: 14, a: 'middle' }, yeosu: { t: 'YEOSU EXPO', dx: 8, dy: 3, a: 'start' },
}
const path = ([a, b, k]: (typeof ROUTES)[number]) => {
  const [x1, y1] = P(C[a]), [x2, y2] = P(C[b])
  return `M${x1},${y1} Q${(x1 + x2) / 2 - (y2 - y1) * k},${(y1 + y2) / 2 + (x2 - x1) * k} ${x2},${y2}`
}

export default function TicketArchive() {
  const reduce = useReducedMotion()
  return (
    <figure className="bg-[radial-gradient(ellipse_at_50%_40%,#1c130f,#0A0A0A_72%)] p-4 md:p-8">
      <svg viewBox="0 0 360 600" role="img" aria-label={`Vector map of South Korea with ${ROUTES.length} glowing routes linking Daejeon with Seoul, Jeonju, Busan, Gyeongju, Chuncheon, Boryeong, Gongju, Buyeo and Yeosu Expo`} className="mx-auto h-auto max-h-[82vh] w-full">
        <defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5" /></filter></defs>
        <path d={OUTLINE} fill="#120e0c" stroke="#E9E2D4" strokeOpacity=".28" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={smooth(JEJU)} fill="#120e0c" stroke="#E9E2D4" strokeOpacity=".28" strokeWidth="1.2" strokeLinejoin="round" />
        {ROUTES.map((r, i) => (
          <g key={i}>
            <path d={path(r)} fill="none" stroke="#8C4331" strokeWidth="5" opacity=".6" filter="url(#glow)" />
            <motion.path id={`route-${i}`} d={path(r)} fill="none" stroke="#C0755A" strokeWidth="1.3" strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, delay: i * 0.25, ease: 'easeInOut' }} />
            {!reduce && <circle r="2.4" fill="#F6D5B5">
              <animateMotion dur={`${5 + (i % 5) * 1.1}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" calcMode="linear" keyPoints="0;1;0" keyTimes="0;0.5;1"><mpath href={`#route-${i}`} /></animateMotion>
            </circle>}
          </g>))}
        {Object.entries(C).map(([k, ll]) => {
          const [x, y] = P(ll), L = LABELS[k]
          return (
            <g key={k}>
              <circle cx={x} cy={y} r={k === 'daejeon' ? 4.6 : 3.2} fill="#0A0A0A" stroke="#E9E2D4" strokeWidth="1.4" />
              <text x={x + L.dx} y={y + L.dy} textAnchor={L.a} fontSize="8" letterSpacing=".9" fill={k === 'daejeon' ? '#F6D5B5' : '#E9E2D4'} fillOpacity={k === 'daejeon' ? 1 : 0.82}
                stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" paintOrder="stroke" className="font-sans">{L.t}</text>
            </g>)
        })}
      </svg>
    </figure>)
}
