import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

const SelectType = () => {
  const label = 'Types'
  const placeholder = 'Type'

  const {
    types: typeAll,
    params: { type: selectTypes },
  } = useTypedSelector((store) => store.poke)
  const { setParamType } = useActions()

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  if (!typeAll) return <div />

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      size="small"
      id="checkboxes-tags-demo"
      options={typeAll}
      value={selectTypes}
      getOptionLabel={(option) => option.name}
      onChange={(_, newVals) => setParamType(newVals)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  )
}

export default SelectType
