//import DefaultLayout from '../layouts/Default'

import { graphql } from 'gatsby'
import React, { FunctionComponent, useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'
import TableHeader from '../components/table/TableHeader'
import { flattenToRows, Props } from './flattenToRows'

// Given a list of x, y, z regions in contentful
// When we navigate to the "where we work" page
// Then we should see the list of x, y, z regions displayed on the page

// Given the following regions and subregions
// | region   | subregions |
// | "France" | "Calais", "Dunkirk", "Paris" |
// | "Greece" | "Athens", "Chios", "Samos"   |
// | "British Isles" | "Scotland", "England", "Wales" |
// Then we should see the list displayed as
//  "France         Calais, Dunkirk, Paris"
//  "Greece         Athens, Chios, Samos"
//  "British Isles  Scotland, England, Wales"

// { France: [ Calais, Dunkirk, Paris ],  }

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  },
)

const COLUMNS = [
  {
    Header: 'Region Name',
    accessor: (row) => row.regionName,
  },
  {
    Header: 'Region Slug',
    accessor: (row) => row.regionSlug,
  },
  {
    Header: 'List of SubRegions',
    accessor: (row) => row.name,
  },
]

const RegionPage: FunctionComponent<Props> = ({ data }) => {
  // We must memoize the data for react-table to function properly
  const region = useMemo(() => flattenToRows(data), [data])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable(
    { columns: COLUMNS, data: region, initialState: { hiddenColumns: [] } },
    useSortBy,
  )

  return (
    <div>
      <header>
        <h1>Regions</h1>
      </header>
      <div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
      <section>
        <table>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader
                    canSort={column.canSort}
                    isSorted={column.isSorted}
                    isSortedDesc={column.isSortedDesc}
                    title={column.canSort ? 'Sort rows' : ''}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                  </TableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <footer></footer>
    </div>
  )
}

export default RegionPage

export const pageQuery = graphql`
  query RegionsWithSubRegions {
    allContentfulDataGeoRegionSubRegion {
      nodes {
        contentful_id
        name
        slug
        region {
          contentful_id
        }
      }
    }
    allContentfulDataGeoRegion {
      nodes {
        contentful_id
        name
        slug
      }
    }
  }
`
