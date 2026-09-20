import { useState, useEffect, useContext } from 'react'
import { useDico } from '../../providers/LanguageContext'
import { SelectionContext } from '../../providers/SelectionContext'
import { useTenant } from '../tenant/useTenant'

export function useHeader() {
  const { t, lang, setLang } = useDico()
  const { reset } = useContext(SelectionContext)
  const { langItems, langItem } = useTenant()
  const currentLang = lang || langItem?.key
  const [nextLangue, setNextLangue] = useState(null)

  useEffect(() => {
    setNextLangue(langItems?.find((l) => l.key !== currentLang) ?? null)
  }, [langItems, currentLang])

  return { t, setLang, reset, nextLangue }
}