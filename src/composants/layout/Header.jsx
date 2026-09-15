import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useDico } from '../../providers/DicoProvider'
import { SelectionContext } from '../../providers/SelectionProvider'
import { getInit, getInitList } from '../../config/config'
import '../../styles/shared.css'
import '../../styles/Header.css'

export default function Header() {
  const { t, lang, setLang } = useDico()
  const { reset } = useContext(SelectionContext)
  const currentLang = lang || getInit('langConfig')
  const [nextLangue, setNextLangue] = useState(null)

  useEffect(() => {
    getInitList('langConfig').then((list) => {
      setNextLangue(list.find((l) => l.key !== currentLang))
    })
  }, [currentLang])

  if (!nextLangue) return null

  return (
    <header className="header">
      <div className="flex items-center justify-between">
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'header-link' : 'header-link-muted'} onClick={reset}>
            {t('home', 'header')}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'header-link' : 'header-link-muted'}>
            {t('about', 'header')}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'header-link' : 'header-link-muted'}>
            {t('contact', 'header')}
          </NavLink>
        </nav>
        <button
          onClick={() => setLang(nextLangue.key)}
          className="lang-toggle"
          aria-label={t('langAriaLabel', 'header')}
        >
          {nextLangue.label}
        </button>
      </div>
    </header>
  )
}
