import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface INavigationButtonsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handlePrevPage: () => void
  handleNextPage: () => void
  disabledPrev: string | null
  disabledNext: string | null
}
