import React from 'react'
import { useActions } from '../../hooks/useActions'
import { SortOrder, TypeSort } from '../../types/poke'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const SelectSort = () => {
  const {
    params: { sort: selectedTypeSort },
  } = useTypedSelector((store) => store.poke)
  const { setParamSort } = useActions()

  return (
    <Autocomplete
      id="number-sort-setting"
      size="small"
      value={selectedTypeSort}
      inputValue={selectedTypeSort}
      options={SortOrder}
      onChange={(_, newTypeSort) => {
        setParamSort((newTypeSort ? newTypeSort : SortOrder[0]) as TypeSort)
      }}
      renderInput={(params) => <TextField {...params} label="Sort" />}
    />
  )
}

export default SelectSort
