import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.scss'
import { useActions } from '../hooks/useActions'
import Navigation from '../components/Navigation/Navigation'
import RingLoader from '../components/preloaders/RingLoader/RingLoader'
import { useTypedSelector } from '../hooks/useTypedSelector'
import ErrorMessageBox from '../components/ErrorMessageBox/ErrorMessageBox'

const Layout: React.FC = () => {
  const { fetchStartData } = useActions()
  const { loading, error } = useTypedSelector((state) => state.loading)

  useEffect(() => {
    fetchStartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="layout-component-container">
      {loading && <RingLoader />}
      {error && <ErrorMessageBox text={error} />}

      <Navigation />

      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
