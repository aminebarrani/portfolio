import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects onOpenProject={onOpenProject} />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
