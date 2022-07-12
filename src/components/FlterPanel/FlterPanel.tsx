import * as React from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import FilterIcon from '@mui/icons-material/FilterList'
import SelectName from '../select/SelectName'
import SelectStat from '../select/SelectStat'
import SelectType from '../select/SelectType'
import SelectPerPage from '../select/SelectPerPage'
import SelectSort from '../select/SelectSort'
import './FilterPanel.scss'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useEffect, useState } from 'react'
import { ClickAwayListener } from '@mui/material'
import { useActions } from '../../hooks/useActions'
import { IFilterPanelType } from './FilterPanelProps'
import { Link } from 'react-router-dom'
import InfoForFilterStat from '../InfoForFilterStat/InfoForFilterStat'

export default function FilterPanel({ className, setOpenFilterPanel }: IFilterPanelType) {
  const pokeState = useTypedSelector((state) => state.poke)
  const { loading, loadDataForFilter, loadDataForFilterProgress } = useTypedSelector(
    (state) => state.loading
  )

  // const loadDataForFilterProgress = 56
  // const loadDataForFilter = true

  const { filterFill } = useActions()
  const [showInfo, setShowInfo] = useState(false)
  const [path, setPath] = useState<string | null>(null)

  const { name, type, stat } = pokeState.params

  useEffect(() => {
    if (name === '' && stat.name === '' && type.length === 0) {
      setPath(null)
    }
    if (name !== '' || stat.name !== '' || type.length > 0) {
      setPath('/search')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, type])

  const hanlerClickFilterButton = () => {
    setOpenFilterPanel(false)
    filterFill(pokeState)
  }

  const ButtonFilter = (): JSX.Element => (
    <Button
      variant="contained"
      title="filter search"
      sx={{ width: '100%', height: '100%', boxShadow: 'none' }}
      onClick={hanlerClickFilterButton}
    >
      <FilterIcon />
    </Button>
  )
  const ButtonLinkFilter = ({ path }: { path: string }): JSX.Element => (
    <Link to={path}>
      <ButtonFilter />
    </Link>
  )

  return (
    <div className={`wrapper filter-panel-box animation ${className}`}>
      <Paper className="filter-panel-container grid">
        <div className="filter-element name">
          <SelectName />
        </div>

        <ClickAwayListener onClickAway={() => setShowInfo(false)}>
          <div
            className="filter-element stat"
            onClick={() => {
              if (!showInfo) setShowInfo(true)
            }}
          >
            <SelectStat disabled={loadDataForFilter} />

            {showInfo && loadDataForFilter && (
              <InfoForFilterStat hanlerClickInfoOk={() => setShowInfo(false)} />
            )}

            {loadDataForFilter && (
              <div className="loading-progressbar-container">
                <div
                  className="loading-progressbar"
                  style={{ width: `${loadDataForFilterProgress}%` }}
                ></div>
                <span className="loading-info">Loading: {loadDataForFilterProgress} %</span>
              </div>
            )}
          </div>
        </ClickAwayListener>

        <div className="filter-element type">
          <SelectType />
        </div>

        <div className="filter-element per-page">
          <SelectPerPage />
        </div>

        <div className="filter-element sort">
          <SelectSort />
        </div>

        <div className="filter-element button">
          {path ? <ButtonLinkFilter path={path} /> : <ButtonFilter />}
        </div>
      </Paper>
    </div>
  )
}
