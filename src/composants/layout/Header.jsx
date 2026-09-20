import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useDico } from '../../providers/LanguageContext'
import { SelectionContext } from '../../providers/SelectionContext'
import { useTenant } from '../../hooks/tenant/useTenant'
import '../../styles/shared.css'
import '../../styles/Header.css'

export default function Header() {
  const { t, lang, setLang } = useDico()
  const { reset } = useContext(SelectionContext)
  const { langItems, langItem } = useTenant()
  const currentLang = lang || langItem?.key
  const [nextLangue, setNextLangue] = useState(null)

  useEffect(() => {
    setNextLangue(langItems?.find((l) => l.key !== currentLang) ?? null)
  }, [langItems, currentLang])

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
