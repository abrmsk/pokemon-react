import React from 'react'

import './InfoForFilterStat.scss'
import { IInfoForFilterStat } from './InfoForFilterStat.props'
import { Button } from '@mui/material'

const InfoForFilterStat: React.FC<IInfoForFilterStat> = ({ hanlerClickInfoOk }) => {
  return (
    <div className="info-filter-stat-container">
      <span>Please wait a moment, we are indexing the data for faster search processing.</span>
      <Button variant="text" onClick={hanlerClickInfoOk}>
        Ok
      </Button>
    </div>
  )
}

export default InfoForFilterStat
