import { useEffect } from 'react'
import { getKey } from '../config/config'
import { getDesign } from '../config/designConfig'
import { buildCssStack, buildGoogleFontsUrl } from '../utils/designTokens'

function setToken(style, name, value) {
  if (value !== null && value !== undefined) {
    style.setProperty(name, String(value))
  }
}

// Applique récursivement chaque token du design system en variable CSS --<group>-<key>
function applyGroup(style, prefix, node) {
  if (!node || typeof node !== 'object') return
  for (const [key, val] of Object.entries(node)) {
    const name = `${prefix}-${key}`
    if (val && typeof val === 'object') {
      if (Array.isArray(val)) {
        setToken(style, name, val.join(', '))
      } else if ('value' in val) {
        setToken(style, name, val.value)
      } else {
        applyGroup(style, name, val)
      }
    } else {
      setToken(style, name, val)
    }
  }
}

// Groupes déjà projetés explicitement (noms legacy) ci-dessous
const MAPPED_GROUPS = new Set(['meta', 'key', 'label', 'colors', 'font', 'typography', 'spacing', 'motion', 'animations'])

export default function DesignProvider({ children }) {
  useEffect(() => {
    const designItem = getDesign(getKey('designConfig'))
    const { style, dataset } = document.documentElement

    // meta -> attributs data-ds-* sur <html>
    dataset.dsId = designItem.meta.id
    dataset.dsName = designItem.meta.name
    dataset.dsDescription = designItem.meta.description
    dataset.dsVersion = designItem.meta.version
    dataset.dsTailwind = designItem.meta.tailwind

    // colors -> tokens CSS natifs
    for (const [key, token] of Object.entries(designItem.colors)) {
      style.setProperty(`--color-${key}`, token.value)
    }

    // font -> stacks complètes (fallbacks inclus) et poids
    style.setProperty('--font-heading', buildCssStack(designItem.font.display))
    style.setProperty('--font-para', buildCssStack(designItem.font.body))

    // typography -> échelle de tailles + letter-spacings
    for (const [key, token] of Object.entries(designItem.typography.sizes)) {
      style.setProperty(`--type-${key}`, token.value)
    }
    for (const [key, token] of Object.entries(designItem.typography.tracking)) {
      style.setProperty(`--tracking-${key}`, token.value)
    }

    // radius (noms legacy) + nouveau nommage générique --radius-<key>
    for (const [key, token] of Object.entries(designItem.radius)) {
      style.setProperty(`--radius-${key}`, token.value)
    }
    style.setProperty('--radius-2xl', designItem.radius.cards.value)
    style.setProperty('--radius-full', designItem.radius.buttons.value)
    style.setProperty('--radius-xl', designItem.radius.fields.value)

    // shadow (noms legacy) + nouveau nommage générique --shadow-<key>
    for (const [key, token] of Object.entries(designItem.shadow)) {
      style.setProperty(`--shadow-${key}`, token.value)
    }

    // spacing (largeur max du conteneur, utilisée par max-w-6xl)
    style.setProperty('--container-6xl', designItem.spacing.containerMaxWidth.value)

    // animations + motion -> variables pilotées par le config
    style.setProperty('--motion-marquee-duration', designItem.motion.marqueeDuration.value)
    style.setProperty('--motion-marquee-timing', designItem.animations.marquee.timing)
    style.setProperty('--motion-marquee-iteration', designItem.animations.marquee.iteration)
    style.setProperty('--motion-blink-duration', designItem.motion.blinkDuration.value)
    style.setProperty('--motion-blink-timing', designItem.animations.cursorBlink.timing)
    style.setProperty('--motion-blink-iteration', designItem.animations.cursorBlink.iteration)
    style.setProperty('--motion-flip-duration', designItem.animations.cardFlip.duration)
    style.setProperty('--motion-transition-duration', designItem.motion.transitionDuration.value)
    style.setProperty('--motion-slow-transition', designItem.motion.slowTransition.value)
    style.setProperty('--motion-ease-in-out-epic', designItem.motion.easeInOutEpic?.value || 'cubic-bezier(0.75, 0.25, 0.25, 0.75)')

    // accessibility -> sélection basée sur les tokens couleurs
    style.setProperty('--selection-bg', designItem.colors.accent.value)
    style.setProperty('--selection-color', designItem.colors.cream.value)

    // tout autre groupe de tokens (ex: grid, list) devient des variables CSS
    for (const [group, node] of Object.entries(designItem)) {
      if (MAPPED_GROUPS.has(group)) continue
      applyGroup(style, group, node)
    }

    // imports Google Fonts (display + body, dédupliqués)
    const urls = [
      ...new Set([buildGoogleFontsUrl(designItem.font.display), buildGoogleFontsUrl(designItem.font.body)].filter(Boolean)),
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