import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Transition from '../composants/effects/Transition'
import Header from '../composants/layout/Header'
import { getInit } from '../config/config'
import { getSelectorType } from '../config/selectorConfig'
import { getHeroType } from '../config/heroConfig'
import { SelectionContext } from '../providers/SelectionContext'
import '../styles/shared.css'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { motionMode, viewMode, dataSource, reset } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')

  const SelectorComponent = (() => {
    try {
      return getSelectorType(getInit('selectorConfig'))?.component ?? null
    } catch {
      return null
    }
  })()
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

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    const ready = dataSource && (motionMode || viewMode)
    if (ready) {
      setStage('transition')
      setTimeout(() => {
        navigate('/galerie')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [motionMode, viewMode, dataSource, navigate])

  return (
    <>
      <Transition visible={stage === 'transition'} />
      <Header />
      <main className="main-layout">
        <div className="home-wrapper">
          <div className="home-inner">
            {HeroComponent && <HeroComponent {...heroProps} />}
          </div>
        </div>
        {SelectorComponent && <SelectorComponent />}
      </main>
    </>
  )
}