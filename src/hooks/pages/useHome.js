import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInit } from '../../config/config'
import { getSelectorType } from '../../config/selectorConfig'
import { getHeroType } from '../../config/heroConfig'
import { getTransitionType } from '../../config/transitionConfig'
import { SelectionContext } from '../../providers/SelectionContext'

export function useHome() {
  const navigate = useNavigate()
  const { motion, view, data, reset } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')

  //selector
  const selectorProps = (() => {
    try {
      return getSelectorType(getInit('selectorConfig')) ?? null
    } catch {
      return null
    }
  })()
  const SelectorComponent = selectorProps?.component ?? null

  //hero
  const heroType = (() => {
    try {
      return getHeroType(getInit('heroConfig'))
    } catch {
      return null
    }
  })()
  const HeroComponent = heroType?.component ?? null
  const heroProps = heroType
    ? Object.fromEntries(Object.entries(heroType).filter(([k]) => k !== 'component' && k !== 'key'))
    : {}
  //transition
  const transitionType = (() => {
    try {
      return getTransitionType(getInit('transitionConfig')) ?? null
    } catch {
      return null
    }
  })()
  const TransitionComponent = transitionType?.component ?? null

  const transitionProps = { visible: stage === 'transition' }
  useEffect(() => {
    reset()
  }, [reset])

  //ready
  useEffect(() => {
    const ready = data && (motion || view)
    if (ready) {
      setStage('transition')
      setTimeout(() => {
        navigate('/galerie')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [motion, view, data, navigate])

  return {
    selectorProps,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  }
}