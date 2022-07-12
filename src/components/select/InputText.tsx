import React from 'react'
import TextField from '@mui/material/TextField'

interface PropsInputText {
  label: string
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const InputText: React.FC<PropsInputText> = ({ label, handleChange }) => {
  return <TextField label={label} variant="outlined" size="small" onChange={handleChange} />
}

export default InputText
