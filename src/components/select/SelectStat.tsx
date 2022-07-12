import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { Slider } from '@mui/material'
import './styleSelect.scss'

interface TypeProps {
  disabled: boolean
}
const SelectStat: React.FC<TypeProps> = ({ disabled }) => {
  const label = 'Stat'
  const { stats, dataStats: dataStats } = useTypedSelector((store) => store.poke)
  const { setParamStat, setError } = useActions()
  const { statsValueMinMax } = dataStats

  const [minMaxValue, setMinMaxValue] = useState<number[]>([0, 0])
  const [range, setRange] = useState<number[]>([0, 0])
  const [statName, setStatName] = useState<string>('')

  const handleChangeStatName = (_: any, newValue: any): void => {
    if (newValue) {
      try {
        const min = statsValueMinMax[newValue].min
        const max = statsValueMinMax[newValue].max
        setStatName(newValue)
        setMinMaxValue([min, max])
        setRange([min, max])

        setParamStat(newValue, min, max)
      } catch (e) {
        setError(`${newValue}: по такой статистике данных нет`)
      }
    } else {
      setStatName('')
      setMinMaxValue([0, 0])
      setRange([0])
      setParamStat('', 0, 0)
    }
  }

  const handleChangeSlider = (_: Event, value: number | number[]): void => {
    if (Array.isArray(value)) {
      setRange(value)
      setParamStat(statName, value[0], value[1])
    }
  }

  return (
    <>
      <Autocomplete
        disabled={disabled}
        disablePortal
        size="small"
        id="checkboxes-tags"
        value={statName}
        freeSolo
        options={stats.map((stat) => stat.name)}
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={handleChangeStatName}
      />
      <div className="slider-ranger-value-stat" style={{ height: '45px', marginTop: '5px' }}>
        <Slider
          disabled={minMaxValue[0] === 0 && minMaxValue[0] === 0}
          getAriaLabel={() => 'Temperature range'}
          value={range}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => `${value}`}
          min={minMaxValue[0]}
          max={minMaxValue[1]}
          // marks={[
          //   { value: range[0], label: `${range[0]}` },
          //   { value: range[1], label: `${range[1]}` },
          // ]}
        />
      </div>
    </>
  )
}

export default SelectStat
