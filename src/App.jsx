import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Galerie from './pages/Galerie'
import { SelectionProvider } from './composants/SelectionContext'
import { DicoProvider } from './composants/lang/Dico'

function App() {
  return (
    <DicoProvider>
    <SelectionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Galerie />} />
      </Routes>
    </SelectionProvider>
    </DicoProvider>
  )
}

export default App
