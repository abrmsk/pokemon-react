import React, { HTMLAttributes, DetailedHTMLProps, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import './GridElements.scss'
import Pagination from '../Pagination/Pagination'
import PokeItem from '../PokeItem/PokeItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getArrayOffsets } from '../../common/functions/arrays'
import NavigationButtons from '../NavigationButtons/NavigationButtons'

interface IGridProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  titlePage: string
  data: string[]
}

const grid = {
  md: 3, // >= 900
  sm: 4, // >= 600
  xs: 12, // <= 599
  spacing: [1, 2, 1, 2, 2],
}

const GridElements: React.FC<IGridProps> = ({ titlePage, data }) => {
  const {
    params: { sort, perPage },
  } = useTypedSelector((state) => state.poke)

  const arrayOffset = getArrayOffsets(data, perPage)

  const [indexPage, setIndexPage] = useState<number>(0)

  useEffect(() => {
    if (indexPage !== 0 && indexPage > arrayOffset.length - 1) {
      setIndexPage(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, perPage])

  function prevPage() {
    if (indexPage === 0) return
    setIndexPage(indexPage - 1)
  }
  function nextPage() {
    if (indexPage >= arrayOffset.length - 1) return
    setIndexPage(indexPage + 1)
  }

  // const sortingData =
  //   sort === ''
  //     ? data
  //     : data.sort((a, b) => {
  //         const direct = sort === 'A - z' ? 1 : -1
  //         if (a > b) return direct
  //         if (a < b) return -direct
  //         return 0
  //       })

  // const sortingData = [...data]

  return (
    <>
      <div className="grid-wrapper">
        <h1 className="title-page">{titlePage}</h1>
        <Pagination arrayOffset={arrayOffset} indexPage={indexPage} setIndexPage={setIndexPage} />
        <Grid container spacing={grid.spacing}>
          {data
            .filter((name, i) => {
              const page = arrayOffset[indexPage]
              return i >= page && i < page + perPage
            })
            .map((name) => {
              return (
                <Grid key={name} item md={grid.md} sm={grid.sm} xs={grid.xs}>
                  <PokeItem name={name} />
                </Grid>
              )
            })}
        </Grid>
      </div>

      <NavigationButtons
        handlePrevPage={prevPage}
        handleNextPage={nextPage}
        disabledPrev={indexPage <= 0 ? null : 'prev'}
        disabledNext={indexPage >= arrayOffset.length - 1 ? null : 'next'}
      />
    </>
  )
}

export default GridElements
