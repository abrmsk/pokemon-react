import { NamedAPIResource } from 'pokenode-ts'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IPropsPokeItem
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string
  children?: ReactNode
}
