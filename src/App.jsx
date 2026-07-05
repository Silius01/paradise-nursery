import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import FireworksBackground from './components/FireworksBackground'
import SoundToggle from './components/SoundToggle'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <FireworksBackground />
      <ScrollToTop />
      <Nav />
      <SoundToggle />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
