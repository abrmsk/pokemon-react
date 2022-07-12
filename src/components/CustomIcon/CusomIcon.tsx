import React from 'react'

import './CusomIcon.scss'
import { ICusomIcon } from './CusomIconProps'

const GridForElements: React.FC<ICusomIcon> = ({ variant, disabled }) => {
  return (
    <div className="wrapperIcon icons">
      <div className={`custom icon ${variant} ${disabled ? 'disabled' : ''}`}>
        <span className="figure1 itemIcon"></span>
        <span className="figure2 itemIcon"></span>
        <span className="figure3 itemIcon"></span>
      </div>
    </div>
  )
}

export default GridForElements
