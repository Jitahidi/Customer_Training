import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import request from './request.json'
import {COLUMNS} from './request_columns'
import './request_table.css'

export const RequestTable = () => {
  
  // const columns = useMemo(() => COLUMNS, [])
  // const data = useMemo(() => request, [])

  // const tableInstance = useTable({
  //   columns,
  //   data
  // })
  
  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = tableInstance

  return (
   
  )
}





 // <table {...getTableProps()}>
    //   <thead>
    //     {headerGroups.map((headerGroup) => (
    //       <tr {...headerGroup.getHeaderGroupProps()}> 
    //         {headerGroup.headers.map((column) => (
    //           <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    //           ))}
    //       </tr>
    //     ))}      
    //   </thead>
    //   <tbody {...getTableBodyProps()}>
    //     {rows.map((row) => {
    //       prepareRow(row)
    //       return (
    //         <tr {...row.getRowProps()}>
    //           {row.cells.map((cell) => {
    //             return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //           })}
    //         </tr>
    //       )})}
    //   </tbody>
    // </table>