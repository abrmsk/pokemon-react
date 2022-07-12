import React from 'react'
import GridElements from '../components/Grid/GridElements'
import { useTypedSelector } from '../hooks/useTypedSelector'
import NotFoundImage from './not_found.jpg'

const SearchPage: React.FC = () => {
  const { filter } = useTypedSelector((state) => state.poke)

  if (filter.length === 0) {
    return (
      <section className="search-page">
        <div className="grid-wrapper">
          <h1 className="title-page">Search Page</h1>
          <div
            style={{
              margin: '0 auto',
              marginTop: '40px',
              width: '200px',
              height: '200px',
            }}
          >
            <img src={NotFoundImage} title="not found" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="search-page">
      <GridElements titlePage="Search Page" data={filter} />
    </section>
  )
}

export default SearchPage
