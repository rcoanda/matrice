import { NavLink } from 'react-router-dom'
import { useDico } from './lang/Dico'
import { getInit } from '../config/config'
import { getAllLangues, getLangue } from '../config/langConfig'
import '../styles/shared.css'
import '../styles/Header.css'

export default function Header() {
  const { t, lang, setLang } = useDico()

  const currentLang = lang || getInit('langConfig')
  const nextLangue = getAllLangues().find((l) => l.key !== currentLang)

  return (
    <header className="header">
      <div className="flex items-center justify-between">
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'header-link' : 'header-link-muted'}>
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
