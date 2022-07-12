import React from 'react'
import GridElements from '../components/Grid/GridElements'
import { useTypedSelector } from '../hooks/useTypedSelector'

const FavoritesPage: React.FC = () => {
  const { favorites } = useTypedSelector((state) => state.poke)

  if (favorites.length === 0) {
    return (
      <section className="search-page">
        <div className="grid-wrapper">
          <h1 className="title-page">Search Page</h1>
          <div
            style={{
              margin: '0 auto',
              marginTop: '40px',
              fontSize: '40px',
              fontFamily: 'cursive',
              color: '#b7b7b7',
              textAlign: 'center',
              width: '165px',
              lineHeight: '50px',
            }}
          >
            Nothing to see here...
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="favorite-page">
      <GridElements titlePage="Favorite Page" data={favorites} />
    </section>
  )
}

export default FavoritesPage
