import { useRef, useState } from 'react'
import type { DemoShot, ProjectDemo } from '../data/types'
import { useLang } from '../lib/i18n'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function MissingSlot({ path, ratio }: { path: string; ratio: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line/80 bg-surface/40 p-4 text-center"
      style={{ aspectRatio: ratio }}
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
        asset manquant / missing
      </span>
      <span className="font-mono text-[0.6rem] text-faint">public/{path}</span>
    </div>
  )
}

function DemoVideo({
  src,
  poster,
  label,
  ratio,
  rounded,
  fit = 'cover',
}: {
  src: string
  poster: string
  label: string
  ratio: string
  rounded: string
  fit?: 'cover' | 'contain'
}) {
  const [failed, setFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  if (failed) return <MissingSlot path={src} ratio={ratio} />
  return (
    <div className={`relative h-full w-full ${rounded}`}>
      {!posterFailed && (
        <img src={asset(poster)} alt="" aria-hidden="true" className="hidden" onError={() => setPosterFailed(true)} />
      )}
      <video
        ref={videoRef}
        className={`h-full w-full bg-base ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${rounded}`}
        controls
        playsInline
        preload="metadata"
        poster={posterFailed ? undefined : asset(poster)}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={asset(src)} type="video/mp4" />
      </video>
      {!playing && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          aria-label={label}
          className="group absolute inset-0 z-10 flex items-center justify-center bg-base/30 transition-colors hover:bg-base/10"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/60 bg-base/70 text-accent backdrop-blur-sm transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}

function ShotGrid({ shots }: { shots: DemoShot[] }) {
  const { t } = useLang()
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {shots.map((shot) => (
        <ShotFigure key={shot.src} shot={shot} caption={t(shot.caption)} />
      ))}
    </div>
  )
}

function ShotFigure({ shot, caption }: { shot: DemoShot; caption: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure>
      {failed ? (
        <MissingSlot path={shot.src} ratio="16/10" />
      ) : (
        <img
          src={asset(shot.src)}
          alt={caption}
          loading="lazy"
          onError={() => setFailed(true)}
          className="hairline aspect-[16/10] w-full rounded-lg object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
        />
      )}
      <figcaption className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-faint">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function DemoShowcase({ demo }: { demo: ProjectDemo }) {
  const { t } = useLang()
  return (
    <div className="mt-14 border-t border-line pt-6">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <p className="t-label">{t(demo.title)}</p>
        <p className="font-mono text-[0.62rem] text-faint">{t(demo.note)}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* web portal — browser frame */}
        <div>
          <div className="glass overflow-hidden rounded-xl">
            <div className="flex items-center gap-2 border-b border-line bg-surface/70 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
              <span className="ml-3 flex-1 truncate rounded-md border border-line bg-base/70 px-3 py-1 font-mono text-[0.6rem] text-faint">
                medisuivi — portail médecin
              </span>
            </div>
            <div className="aspect-[16/9] bg-base">
              <DemoVideo
                src={demo.webVideo}
                poster={demo.webPoster}
                label={t(demo.webCaption)}
                ratio="16/9"
                rounded=""
              />
            </div>
          </div>
          <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
            {t(demo.webCaption)}
          </p>
          <ShotGrid shots={demo.webShots} />
        </div>

        {/* patient app — phone frame */}
        <div className="mx-auto w-full max-w-[280px]">
          <div className="glass rounded-[2.4rem] p-2.5">
            <div className="relative overflow-hidden rounded-[1.9rem] border border-line bg-base">
              <span
                className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-base"
                aria-hidden="true"
              />
              <div className="aspect-[780/1688]">
                <DemoVideo
                  src={demo.mobileVideo}
                  poster={demo.mobilePoster}
                  label={t(demo.mobileCaption)}
                  ratio="780/1688"
                  rounded=""
                  fit="contain"
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-widest text-accent">
            {t(demo.mobileCaption)}
          </p>
          <ShotGrid shots={demo.mobileShots} />
        </div>
      </div>
    </div>
  )
}
