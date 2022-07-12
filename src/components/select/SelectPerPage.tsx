import React from 'react'
import { useActions } from '../../hooks/useActions'
import { numberPerPage } from '../../types/poke'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const SelectPerPage: React.FC = () => {
  const {
    params: { perPage: selectedPerPage },
  } = useTypedSelector((store) => store.poke)
  const defaultPerPage = `${numberPerPage[0]}`
  const { setParamPerPage } = useActions()
  const optionValues = numberPerPage.map((pp) => `${pp}`)

  return (
    <Autocomplete
      id="number-per-page-setting"
      size="small"
      options={optionValues}
      value={`${selectedPerPage}`}
      inputValue={`${selectedPerPage}`}
      onChange={(_, newPerPage) => {
        const value = newPerPage && newPerPage !== '' ? newPerPage : defaultPerPage
        setParamPerPage(+value)
      }}
      renderInput={(params) => <TextField {...params} label="Per Page" />}
    />
  )
}

export default SelectPerPage
