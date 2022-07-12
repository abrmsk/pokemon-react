import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { LoadingActionTypes } from '../../types/loading'

import './ErrorMessageBox.scss'

interface TypeProps {
  text: string
}

const ErrorMessageBox: React.FC<TypeProps> = ({ text }) => {
  const dispatch = useDispatch()
  const handleCloseErrorWindowInfo = () => {
    dispatch({ type: LoadingActionTypes.SUCCESS })
  }

  return (
    <div className="layout-component-error-container">
      <span className="text">{text}</span>
      <span className="close-box">
        <Button className="close-btn" variant="text" onClick={handleCloseErrorWindowInfo}>
          x
        </Button>
      </span>
    </div>
  )
}

export default ErrorMessageBox
