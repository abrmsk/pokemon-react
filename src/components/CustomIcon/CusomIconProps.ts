import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface ICusomIcon
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant: 'prev' | 'next'
  disabled: boolean
  children?: ReactNode
}
