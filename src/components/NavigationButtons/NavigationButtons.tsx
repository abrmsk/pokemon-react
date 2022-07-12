import { Button } from '@mui/material'
import React from 'react'
import CusomIcon from '../CustomIcon/CusomIcon'
import { INavigationButtonsProps } from './NavigationButtonsProps'
import './NavigationButtons.scss'

const NavigationButtons: React.FC<INavigationButtonsProps> = ({
  handlePrevPage,
  handleNextPage,
  disabledNext,
  disabledPrev,
}) => {
  return (
    <div className="button-section">
      <Button
        className="button prev"
        variant="text"
        onClick={handlePrevPage}
        disabled={!disabledPrev}
      >
        <CusomIcon variant="prev" disabled={!disabledPrev} />
      </Button>
      <Button
        className="button next"
        variant="text"
        onClick={handleNextPage}
        disabled={!disabledNext}
      >
        <CusomIcon variant="next" disabled={!disabledNext} />
      </Button>
    </div>
  )
}

export default NavigationButtons
