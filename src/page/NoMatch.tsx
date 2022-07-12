import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createBrowserHistory } from 'history'

function NoMatch({ textInfo }: { textInfo?: string }) {
  const history = createBrowserHistory()
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '50vh',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {textInfo ? textInfo : 'Nothing to see here!'}
      </h2>
      <p>
        <Button
          variant="outlined"
          onClick={() => {
            if (textInfo) {
              history.back()
            } else {
              navigate('/')
            }
          }}
        >
          {textInfo ? 'Go to the back' : 'Go to the Home Page'}
        </Button>
      </p>
    </div>
  )
}

export default NoMatch
