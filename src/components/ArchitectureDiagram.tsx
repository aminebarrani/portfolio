import { useState } from 'react'
import type { DiagramEdge, DiagramNode } from '../data/types'
import { useLang } from '../lib/i18n'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'

const VIEW_W = 1000
const VIEW_H = 560

const KIND_STYLE: Record<DiagramNode['kind'], { stroke: string; text: string; glow: string }> = {
  client: { stroke: '#22d3ee', text: '#f0f4f8', glow: 'rgba(34,211,238,0.14)' },
  gateway: { stroke: '#22d3ee', text: '#f0f4f8', glow: 'rgba(34,211,238,0.18)' },
  service: { stroke: '#3b4563', text: '#f0f4f8', glow: 'rgba(34,211,238,0.10)' },
  ai: { stroke: '#8b5cf6', text: '#ddd6fe', glow: 'rgba(139,92,246,0.16)' },
  data: { stroke: '#3b4563', text: '#94a3b8', glow: 'rgba(148,163,184,0.08)' },
  infra: { stroke: '#2a3350', text: '#94a3b8', glow: 'rgba(148,163,184,0.06)' },
}

function centerOf(n: DiagramNode) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 }
}

function Edge({
  edge,
  nodes,
  highlighted,
  reduced,
  label,
}: {
  edge: DiagramEdge
  nodes: Map<string, DiagramNode>
  highlighted: boolean
  reduced: boolean
  label?: string
}) {
  const a = nodes.get(edge.from)
  const b = nodes.get(edge.to)
  if (!a || !b) return null
  const { cx: x1, cy: y1 } = centerOf(a)
  const { cx: x2, cy: y2 } = centerOf(b)
  const stroke = highlighted ? '#22d3ee' : edge.dashed ? '#242c44' : '#2a3350'
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={highlighted ? 1.6 : 1.2} strokeOpacity={highlighted ? 0.9 : 0.8} />
      {!reduced && !edge.dashed && (
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          className="edge-flow"
          stroke={highlighted ? '#67e8f9' : '#22d3ee'}
          strokeWidth={1.6}
          strokeOpacity={highlighted ? 0.95 : 0.35}
          strokeLinecap="round"
        />
      )}
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 7}
          textAnchor="middle"
          fill={highlighted ? '#67e8f9' : '#55607a'}
          fontFamily="'JetBrains Mono', monospace"
          fontSize={10}
        >
          {label}
        </text>
      )}
    </g>
  )
}

export default function ArchitectureDiagram({
  nodes,
  edges,
}: {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}) {
  const { t } = useLang()
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState<string | null>(null)
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const activeNode = active ? nodeMap.get(active) ?? null : null

  return (
    <div className="relative">
      <div className="glass overflow-hidden rounded-2xl p-3 md:p-6">
        <div className="overflow-x-auto md:overflow-visible">
          <div className="relative min-w-[760px] md:min-w-0">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full"
          role="group"
          aria-label={t({ fr: 'Architecture de MediSuivi', en: 'MediSuivi architecture' })}
        >
          {edges.map((e, i) => (
            <Edge
              key={i}
              edge={e}
              nodes={nodeMap}
              reduced={reduced}
              label={e.label ? t(e.label) : undefined}
              highlighted={Boolean(active && (e.from === active || e.to === active))}
            />
          ))}

          {nodes.map((n) => {
            const style = KIND_STYLE[n.kind]
            const isActive = active === n.id
            const { cx, cy } = centerOf(n)
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.label} — ${t(n.description)}`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className="cursor-pointer outline-none"
              >
                {isActive && (
                  <rect
                    x={n.x - 5} y={n.y - 5} width={n.w + 10} height={n.h + 10} rx={14}
                    fill="none" stroke={style.stroke} strokeOpacity={0.45} strokeWidth={1}
                  />
                )}
                <rect
                  x={n.x} y={n.y} width={n.w} height={n.h} rx={10}
                  fill={isActive ? style.glow : '#0b0e17'}
                  stroke={style.stroke}
                  strokeOpacity={isActive ? 0.9 : n.kind === 'service' || n.kind === 'data' ? 0.45 : 0.6}
                  strokeWidth={1.2}
                />
                {(n.kind === 'ai' || n.kind === 'gateway') && !reduced && (
                  <circle cx={n.x + n.w - 12} cy={n.y + 12} r={3} fill={style.stroke} className="node-pulse" />
                )}
                <text
                  x={cx} y={cy}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={style.text}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize={n.label.length > 18 ? 12 : 13.5}
                >
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* tooltip */}
        {activeNode && (
          <div
            className="pointer-events-none absolute z-20 w-[min(78vw,340px)] -translate-x-1/2 rounded-xl border border-line bg-panel/95 p-4 shadow-2xl backdrop-blur-md"
            style={{
              left: `${((centerOf(activeNode).cx) / VIEW_W) * 100}%`,
              top: `${((activeNode.y - 12) / VIEW_H) * 100}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <p className="mb-1 font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: KIND_STYLE[activeNode.kind].stroke }}>
              {activeNode.label}
            </p>
            <p className="text-xs leading-relaxed text-muted">{t(activeNode.description)}</p>
          </div>
        )}
          </div>
        </div>
      </div>

      <p className="mt-2 text-center font-mono text-[0.6rem] uppercase tracking-widest text-faint md:hidden">
        {t({ fr: '← schéma à faire défiler →', en: '← scroll the diagram →' })}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.62rem] uppercase tracking-widest text-faint">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-sm border border-accent" />{t({ fr: 'Client / Passerelle', en: 'Client / Gateway' })}</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-sm border border-secondary" />{t({ fr: 'IA / LLM', en: 'AI / LLM' })}</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-sm border border-[#3b4563]" />{t({ fr: 'Service / Données', en: 'Service / Data' })}</span>
        <span className="flex items-center gap-2"><span className="h-px w-5 border-t border-dashed border-[#2a3350]" />{t({ fr: 'Infra (découverte, CI/CD)', en: 'Infra (discovery, CI/CD)' })}</span>
      </div>
    </div>
  )
}
