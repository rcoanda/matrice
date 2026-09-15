import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Transition from '../composants/effects/Transition'
import Header from '../composants/layout/Header'
import { getInit } from '../config/config'
import { getSelectorType } from '../config/selectorConfig'
import { getHeroType } from '../config/heroConfig'
import { SelectionContext } from '../providers/SelectionProvider'
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
  const Hero = (() => {
    try {
      return getHeroType(getInit('heroConfig'))?.component ?? null
    } catch {
      return null
    }
  })()

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
            {Hero && <Hero />}
          </div>
        </div>
        {SelectorComponent && <SelectorComponent />}
      </main>
    </>
  )
}