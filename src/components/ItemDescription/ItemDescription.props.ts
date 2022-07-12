import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface IItemDescription
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children?: ReactNode
  label: string
  value: string | number
}
