import { useState, useEffect } from 'react'
import { useTenant } from '../hooks/tenant/useTenant'
import { LanguageContext } from './LanguageContext'

const NAMESPACES = ['header', 'about', 'contact', 'gallery', 'backArrow', 'closeButton', 'nextArrow', 'loading']

export function DicoProvider({ children }) {
  const { langItems, langItem } = useTenant()
  const [lang, setLang] = useState(null)
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    if (lang === null && langItem) setLang(langItem.key)
  }, [lang, langItem])

  const currentItem = lang ? (langItems?.find((l) => l.key === lang) ?? null) : (langItem ?? null)

  useEffect(() => {
    if (!currentItem) return
    document.documentElement.lang = currentItem.codeHTML
  }, [currentItem])

  useEffect(() => {
    if (!currentItem) return
    let cancelled = false
    async function load() {
      const results = await Promise.all(
        NAMESPACES.map(async (ns) => {
          const res = await fetch(`${currentItem.path}/${ns}.json`)
          const data = await res.json()
          return { [ns]: data }
        })
      )
      if (!cancelled) setTranslations(Object.assign({}, ...results))
    }
    load()
    return () => { cancelled = true }
  }, [currentItem])

  const t = (key, namespace) => translations[namespace]?.[key] ?? key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
