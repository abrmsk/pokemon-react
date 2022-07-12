import React, { useState } from 'react'
import { Paper, IconButton, ClickAwayListener } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import FilterPanel from '../FlterPanel/FlterPanel'
import './Navigation.scss'

const Navigation: React.FC = () => {
  const [openFilterPanel, setOpenFilterPanel] = useState<boolean>(false)

  return (
    <nav className={`nav-container`}>
      <ClickAwayListener onClickAway={() => setOpenFilterPanel(false)}>
        <div className="wrapper">
          <Paper className="nav-paper-container">
            <div className="nav-link-home nav-element">
              <Link to="/">
                <IconButton type="submit" aria-label="home">
                  <HomeIcon titleAccess="home" />
                </IconButton>
              </Link>
            </div>

            <div className={`nav-button-filter nav-element ${openFilterPanel ? 'open' : 'close'}`}>
              <IconButton
                type="submit"
                aria-label="filter"
                onClick={() => {
                  setOpenFilterPanel(!openFilterPanel)
                }}
              >
                <SearchIcon titleAccess="search" />
              </IconButton>
            </div>

            <div className="nav-link-favorites nav-element">
              <Link to="/favorites">
                <Checkbox
                  aria-label="favorites"
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  title="favorites"
                />
              </Link>
            </div>
          </Paper>

          <FilterPanel
            className={`${openFilterPanel ? 'open-filter-panel' : 'close-filter-panel'}`}
            setOpenFilterPanel={setOpenFilterPanel}
          />
        </div>
      </ClickAwayListener>
    </nav>
  )
}

export default Navigation
