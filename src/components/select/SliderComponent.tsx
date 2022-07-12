import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

interface TypeProps {
  value: number[]
  setValue: React.Dispatch<React.SetStateAction<number[]>>
}

function valuetext(value: number) {
  return `${value}°C`
}

const SliderComponent: React.FC<TypeProps> = ({ value: mimMaxValue, setValue: setMinMaxValue }) => {
  const [value, setValue] = React.useState(mimMaxValue)

  console.log('mimMaxValue: ', mimMaxValue)

  const handleChange = (event: Event, value: number | number[], activeThumb: number): void => {
    if (Array.isArray(value)) {
      setValue(value)
      // setMinMaxValue(value)
    }
  }

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={mimMaxValue[0]}
        max={mimMaxValue[1]}
      />
    </Box>
  )
}

export default SliderComponent
