import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)

export function useDico() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useDico must be used within a DicoProvider')
  return ctx
}