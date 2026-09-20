import { useState, useEffect } from 'react'
import { getKey, LANG } from '../registries/common/config'
import { getItem } from '../registries/langRegistry'
import { LanguageContext } from './LanguageContext'

const NAMESPACES = ['header', 'about', 'contact', 'gallery', 'backArrow', 'closeButton', 'nextArrow', 'loading']

export function DicoProvider({ children }) {
  const [lang, setLang] = useState(getKey(LANG))
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    document.documentElement.lang = getItem(lang).codeHTML
  }, [lang])

  useEffect(() => {
    let cancelled = false
    async function load() {
      const results = await Promise.all(
        NAMESPACES.map(async (ns) => {
          const res = await fetch(`${getItem(lang).path}/${ns}.json`)
          const data = await res.json()
          return { [ns]: data }
        })
      )
      if (!cancelled) setTranslations(Object.assign({}, ...results))
    }
    load()
    return () => { cancelled = true }
  }, [lang])

  const t = (key, namespace) => translations[namespace]?.[key] ?? key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
