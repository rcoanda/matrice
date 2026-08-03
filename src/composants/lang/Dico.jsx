import { createContext, useContext, useState, useEffect } from 'react'
import { getInit } from '../../config/config'
import { getLangue } from '../../config/langConfig'

const LanguageContext = createContext(null)

const NAMESPACES = ['header', 'about', 'contact', 'gallery', 'backArrow', 'closeButton', 'loadingScreen']

export function DicoProvider({ children }) {
  const [lang, setLang] = useState(getInit('langConfig'))
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    document.documentElement.lang = getLangue(lang).codeHTML
  }, [lang])

  useEffect(() => {
    let cancelled = false
    async function load() {
      const results = await Promise.all(
        NAMESPACES.map(async (ns) => {
          const res = await fetch(`${getLangue(lang).path}/${ns}.json`)
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

export function useDico() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useDico must be used within a DicoProvider')
  return ctx
}
