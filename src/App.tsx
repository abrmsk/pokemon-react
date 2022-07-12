import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import FavoritesPage from './page/FavoritesPage'
import NoMatch from './page/NoMatch'
import HomePage from './page/HomePage'
import DetalisPage from './page/DetalisPage'
import SearchPage from './page/SearchPage'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/pokemon/:id" element={<DetalisPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}
