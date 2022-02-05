import React, {useState} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import startCase from 'lodash/startCase'

const DataTable = ({entities, selectedEntity, onEntityClick}) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th style={{width: '50%'}}>Product</th>
          <th style={{width: '25%'}}>Category</th>
          <th style={{width: '25%'}}>Usage</th>
        </tr>
      </thead>
      <tbody>
        {entities.map(entity => (
          <tr
            key={`${entity.name} ${entity.domains.join(' ')}`}
            onClick={() => onEntityClick(entity)}
            className={classNames({
              'row-selected': selectedEntity === entity,
            })}
          >
            <td style={{width: '50%'}}>{entity.name}</td>
            <td style={{width: '25%'}}>{startCase(entity.categories[0])}</td>
            <td style={{width: '25%'}}>{entity.totalOccurrences.toLocaleString()}</td>
          </tr>
        ))}
        {entities.length === 0 ? (
          <tr>
            {' '}
            <td style={{width: '100%'}}>No matching results</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  )
}

export default DataTable
