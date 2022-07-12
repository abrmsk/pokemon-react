import React from 'react'

import './ItemDescription.scss'
import { IItemDescription } from './ItemDescription.props'

const ItemDescription: React.FC<IItemDescription> = ({ children, label, value }) => {
  const labl = (label[0].toUpperCase() + label.slice(1).toLowerCase()).replace(/_/gi, ' ')
  return (
    <span className="item-description">
      <span className="param">{labl}</span>
      <span className="value">{value}</span>
    </span>
  )
}

export default ItemDescription
