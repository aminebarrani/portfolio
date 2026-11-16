export type Lang = 'fr' | 'en'

export type L = Record<Lang, string>

export interface SocialLink {
  label: string
  url: string
  kind: 'github' | 'linkedin' | 'email' | 'phone'
}

export interface Stat {
  value: number
  suffix?: string
  label: L
}

export interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
  kind: 'client' | 'gateway' | 'service' | 'ai' | 'data' | 'infra'
  description: L
}

export interface DiagramEdge {
  from: string
  to: string
  label?: L
  dashed?: boolean
}

export interface DemoShot {
  src: string
  caption: L
}

export interface ProjectDemo {
  title: L
  note: L
  webCaption: L
  mobileCaption: L
  webVideo: string
  mobileVideo: string
  webPoster: string
  mobilePoster: string
  webShots: DemoShot[]
  mobileShots: DemoShot[]
}

export interface Project {
  id: string
  index: string
  title: string
  tagline: L
  period: string
  stack: string[]
  repoUrl?: string
  isMain?: boolean
  problem: L
  role: L
  decisions: L[]
  outcomes: L[]
  demo?: ProjectDemo
  diagram?: { nodes: DiagramNode[]; edges: DiagramEdge[] }
}

export interface ExperienceEntry {
  id: string
  role: L
  company: string
  location: L
  period: string
  stack: string[]
  bullets: L[]
  repoUrl?: string
}

export interface SkillGroup {
  id: string
  title: L
  items: (string | L)[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: L
}

export interface SoftSkill {
  title: L
  detail: L
}

export interface Content {
  meta: {
    title: string
    description: L
    url: string
  }
  profile: {
    name: string
    firstName: string
    lastName: string
    initials: string
    location: L
    availability: L
    headline: L
    roles: L[]
    story: L
    socials: SocialLink[]
  }
  loader: {
    lines: L[]
    skip: L
  }
  nav: {
    items: { id: string; label: L }[]
    menu: L
    close: L
  }
  about: {
    sectionLabel: L
    title: L
    paragraphs: L[]
    stats: Stat[]
    photoAlt: L
  }
  projectsSection: {
    sectionLabel: L
    title: L
    intro: L
    viewCase: L
    back: L
    scrollHint: L
  }
  projects: Project[]
  experience: {
    sectionLabel: L
    title: L
    entries: ExperienceEntry[]
  }
  education: {
    sectionLabel: L
    school: string
    degree: L
    period: string
    detail: L
    modules: L
  }
  skills: {
    sectionLabel: L
    title: L
    intro: L
    groups: SkillGroup[]
    softSkillsTitle: L
    softSkills: SoftSkill[]
    spokenLanguages: L
    languages: { name: L; level: L }[]
  }
  certifications: {
    sectionLabel: L
    title: L
    items: Certification[]
  }
  contact: {
    sectionLabel: L
    title: L
    intro: L
    cta: L
    copied: L
    copy: L
  }
  footer: {
    builtWith: L
    rights: L
    backToTop: L
  }
  marquee: string[]
}
