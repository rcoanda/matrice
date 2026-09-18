import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import { SelectionProvider } from './providers/SelectionProvider'
import { DicoProvider } from './providers/DicoProvider'
import DesignProvider from './providers/DesignProvider'

function App() {
  return (
    <DesignProvider>
      <DicoProvider>
        <SelectionProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/galerie" element={<Gallery />} />
          </Routes>
        </SelectionProvider>
      </DicoProvider>
    </DesignProvider>
  )
}

export default App
