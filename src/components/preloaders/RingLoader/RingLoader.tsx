// https://loading.io/css/
import React from 'react'
import './RingLoader.scss'

const RingLoader = () => {
  return (
    <div className="ring-loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default RingLoader
