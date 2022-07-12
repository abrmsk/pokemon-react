import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface IInfoForFilterStat
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode
  hanlerClickInfoOk: () => void
}
