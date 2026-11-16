import { content } from '../data/content'

export default function Marquee() {
  const items = content.marquee
  return (
    <div
      className="marquee relative overflow-hidden border-y border-line bg-surface/40 py-4"
      aria-hidden="true"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="marquee-track gap-10">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {item}
            <span className="text-accent/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
