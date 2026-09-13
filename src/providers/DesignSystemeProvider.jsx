import { useEffect } from 'react'
import { getInit } from '../config/config'
import { getDesignSystem } from '../config/designSystemConfig'
import { buildCssStack, buildGoogleFontsUrl } from '../utils/designTokens'

export default function DesignSystemeProvider({ children }) {
  useEffect(() => {
    const ds = getDesignSystem(getInit('designSystemConfig'))
    const { style, dataset } = document.documentElement

    // meta -> attributs data-ds-* sur <html>
    dataset.dsId = ds.meta.id
    dataset.dsName = ds.meta.name
    dataset.dsDescription = ds.meta.description
    dataset.dsVersion = ds.meta.version
    dataset.dsTailwind = ds.meta.tailwind

    // colors -> tokens CSS natifs
    for (const [key, token] of Object.entries(ds.colors)) {
      style.setProperty(`--color-${key}`, token.value)
    }

    // font -> stacks complètes (fallbacks inclus) et poids
    style.setProperty('--font-heading', buildCssStack(ds.font.display))
    style.setProperty('--font-para', buildCssStack(ds.font.body))

    // radius
    style.setProperty('--radius-2xl', ds.radius.cards.value)
    style.setProperty('--radius-full', ds.radius.buttons.value)
    style.setProperty('--radius-xl', ds.radius.fields.value)

    // spacing (largeur max du conteneur, utilisée par max-w-6xl)
    style.setProperty('--container-6xl', ds.spacing.containerMaxWidth.value)

    // animations + motion -> variables pilotées par le config
    style.setProperty('--motion-marquee-duration', ds.motion.marqueeDuration.value)
    style.setProperty('--motion-marquee-timing', ds.animations.marquee.timing)
    style.setProperty('--motion-marquee-iteration', ds.animations.marquee.iteration)
    style.setProperty('--motion-blink-duration', ds.motion.blinkDuration.value)
    style.setProperty('--motion-blink-timing', ds.animations.cursorBlink.timing)
    style.setProperty('--motion-blink-iteration', ds.animations.cursorBlink.iteration)
    style.setProperty('--motion-flip-duration', ds.animations.cardFlip.duration)

    // accessibility -> sélection basée sur les tokens couleurs
    style.setProperty('--selection-bg', ds.colors.accent.value)
    style.setProperty('--selection-color', ds.colors.cream.value)

    // imports Google Fonts (display + body, dédupliqués)
    const urls = [
      ...new Set([buildGoogleFontsUrl(ds.font.display), buildGoogleFontsUrl(ds.font.body)].filter(Boolean)),
    ]
    for (const href of urls) {
      if (!document.head.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    }
  }, [])

  return children
}