import React from 'react'

import './Pagination.scss'
import { IPagination } from './Pagination.props'
import { filterPagination } from '../../common/functions/arrays'

const Pagination: React.FC<IPagination> = ({ arrayOffset, indexPage, goPage, setIndexPage }) => {
  const handleGoPage = (indexPage: number) => {
    if (indexPage < 0) return

    if (goPage) {
      goPage(indexPage)
    } else if (setIndexPage) {
      setIndexPage(indexPage)
    }
  }

  return (
    <div className="paginate-container">
      <div className="paginate-numbers">
        {arrayOffset.length &&
          filterPagination(arrayOffset, indexPage).map((val, i) => {
            return (
              <span
                style={{ cursor: 'pointer' }}
                key={i}
                className={`nubber-page ${indexPage === val.value ? 'current' : ''}`}
                onClick={() => {
                  handleGoPage(val.value)
                }}
              >
                {val.value < 0 ? '...' : val.value + 1}
              </span>
            )
          })}
      </div>
    </div>
  )
}

export default Pagination
