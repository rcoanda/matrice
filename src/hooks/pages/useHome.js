import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKey } from '../../config/config'
import { getItem as getSelectorItem } from '../../config/selectorConfig'
import { getItem as getHeroItem } from '../../config/heroConfig'
import { getItem as getTransitionItem } from '../../config/transitionConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useHome() {
  const navigate = useNavigate()
  const { motionKey, viewKey, dataKey, reset } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')

  //selector
  const selectorItem = (() => {
    try {
      return getSelectorItem(getKey('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorItem?.component ?? null
  const selectorProps = selectorItem
    ? Object.fromEntries(Object.entries(selectorItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}

  //hero
  const heroItem = (() => {
    try {
      return getHeroItem(getKey('heroConfig'))
    } catch {
      return null
    }
  })()
  const HeroComponent = heroItem?.component ?? null
  const heroProps = heroItem
    ? Object.fromEntries(Object.entries(heroItem).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //transition
  const transitionItem = (() => {
    try {
      return getTransitionItem(getKey('transitionConfig')) ?? null
    } catch {
      return null
    }
  })()
  const TransitionComponent = transitionItem?.component ?? null

  const transitionProps = { visible: stage === 'transition' }
  useEffect(() => {
    reset()
  }, [reset])

  //ready
  useEffect(() => {
    const ready = dataKey && (motionKey || viewKey)
    if (ready) {
      setStage('transition')
      setTimeout(() => {
        navigate('/galerie')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [motionKey, viewKey, dataKey, navigate])

  return {
    selectorProps,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  }
}