import { HTMLAttributes, DetailedHTMLProps } from 'react'

export interface IFilterPanelType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setOpenFilterPanel: React.Dispatch<React.SetStateAction<boolean>>
}
