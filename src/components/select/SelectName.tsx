import React from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import InputText from './InputText'
import { NamedAPIResource } from 'pokenode-ts'

const SelectName: React.FC = () => {
  const {
    pokes,
    params: { name: selectedName },
  } = useTypedSelector((store) => store.poke)
  const { setParamName } = useActions()
  const label = 'Name Search'

  if (!pokes) {
    return <InputText label={label} handleChange={(e) => setParamName(e.target.value)} />
  }

  return (
    <>
      <Autocomplete
        disablePortal
        size="small"
        className="nav-search-name"
        id="nav-search-name"
        freeSolo
        options={pokes}
        inputValue={selectedName}
        getOptionLabel={(option) => option.name}
        filterOptions={createFilterOptions({
          matchFrom: 'start',
          stringify: (option: NamedAPIResource) => option.name,
        })}
        onInputChange={(event, newInputValue) => setParamName(newInputValue)}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  )
}

export default SelectName
