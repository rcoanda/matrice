import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Transition from '../composants/Transition'
import Header from '../composants/Header'
import { getInit } from '../config/config'
import { getAllViewModes } from '../config/viewConfig'
import { getAllDataSources } from '../config/dataConfig'
import { getSelectorType } from '../config/selectorConfig'
import { getHeroType } from '../config/heroConfig'
import { SelectionContext } from '../composants/SelectionContext'
import '../styles/shared.css'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { viewMode, setViewMode, dataSource, setDataSource } = useContext(SelectionContext)
  const [stage, setStage] = useState('idle')
  const Selector = getSelectorType(getInit('selectorConfig')).component
  const Hero = getHeroType(getInit('heroConfig')).component

  useEffect(() => {
    if (viewMode && dataSource) {
      setStage('transition')
      setTimeout(() => {
        navigate('/gallery')
      }, 1500)
    } else {
      setStage('idle')
    }
  }, [viewMode, dataSource, navigate])

  return (
    <>
      <Transition visible={stage === 'transition'} />
      <Header />
      <main className="main-layout">
        <div className="home-wrapper">
          <div className="home-inner">
            <Hero />
          </div>
        </div>
        <Selector
          viewModeOptions={getAllViewModes()}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          dataSourceOptions={getAllDataSources()}
          dataSource={dataSource}
          onDataSourceChange={setDataSource}
        />
      </main>
    </>
  )
}
