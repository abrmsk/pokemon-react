import React from 'react'
import GridElements from '../components/Grid/GridElements'
import { useTypedSelector } from '../hooks/useTypedSelector'

const HomePage: React.FC = () => {
  const { pokes } = useTypedSelector((state) => state.poke)

  return (
    <section className="home-page">
      <GridElements titlePage="Home Page" data={pokes.map((p) => p.name)} />
    </section>
  )
}

export default HomePage
