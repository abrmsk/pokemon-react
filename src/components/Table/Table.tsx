import React from 'react'
import { PokemonStat, PokemonType } from 'pokenode-ts'
import './Table.scss'

interface ITableProps {
  stat?: PokemonStat[]
  type?: PokemonType[]
  color?: string
}

const TableComponent: React.FC<ITableProps> = ({ stat, type, color }): JSX.Element => {
  if (!stat && !type) return <></>

  return (
    <table className="table">
      <tr>
        <th colSpan={3} style={{ background: !!color ? color : '' }}>
          {!!stat ? 'Stats' : 'Types'}
        </th>
      </tr>
      <tr>
        <th>name</th>
        {!!stat ? (
          <>
            <th>base stat</th>
            <th>effort</th>
          </>
        ) : (
          <th>slot</th>
        )}
      </tr>
      {!!stat &&
        stat
          .sort((a, b) => (a.stat.name > b.stat.name ? 1 : -1))
          .map((value) => (
            <tr key={value.stat.name}>
              <td>{value.stat.name}</td>
              <td>{value.base_stat}</td>
              <td>{value.effort}</td>
            </tr>
          ))}
      {!!type &&
        type
          .sort((a, b) => (a.type.name > b.type.name ? 1 : -1))
          .map((value) => (
            <tr key={value.type.name}>
              <td>{value.type.name}</td>
              <td>{value.slot}</td>
            </tr>
          ))}
    </table>
  )
}

export default TableComponent
