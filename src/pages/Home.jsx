import Header from '../composants/layout/Header'
import { useHome } from '../hooks/pages/useHome'
import '../styles/shared.css'
import '../styles/Home.css'

export default function Home() {
  const {
    selectorItem,
    SelectorComponent,
    heroProps,
    HeroComponent,
    transitionProps,
    TransitionComponent,
  } = useHome()

  return (
    <>
      {TransitionComponent && <TransitionComponent {...transitionProps} />}
      <Header />
      <main className="main-layout">
        <div className="home-wrapper">
          <div className="home-inner">
            {HeroComponent && <HeroComponent {...heroProps} />}
          </div>
        </div>
        {SelectorComponent && <SelectorComponent {...selectorItem} />}
      </main>
    </>
  )
}