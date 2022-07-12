import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface IPagination
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode
  arrayOffset: number[]
  indexPage: number
  goPage?: (iPage: number) => void
  setIndexPage?: React.Dispatch<React.SetStateAction<number>>
}
