import React, {useEffect, useRef} from 'react'

import * as color from 'color'
import * as _ from 'lodash'
import * as thirdPartyWeb from 'third-party-web'
import * as d3plus from 'd3plus/build/d3plus.js'

const visualizations = {
  legend: undefined,
  treemap: undefined,
}

const categories = _.uniq(thirdPartyWeb.entities.map(e => e.categories[0])).map((category, idx) => {
  return {
    id: category,
    displayName: _.startCase(category),
    color: color(`hsl(175, 75%, ${15 + idx * 5}%)`)
      .rgb()
      .string(),
  }
})

const DataVisualizationD3 = ({width, height}) => {
  const treemapRef = useRef()
  const legendRef = useRef()
  useEffect(() => {
    visualizations.treemap = new d3plus.Treemap().select(treemapRef.current)
    visualizations.legend = new d3plus.Legend().select(legendRef.current)

    return () => {
      visualizations.treemap = undefined
      visualizations.legend = undefined
    }
  }, [treemapRef.current, legendRef.current])

  useEffect(() => {
    if (!visualizations.treemap) return

    visualizations.treemap
      .width(width)
      .height(height)
      .sum('totalExecutionTime')
      .groupBy(['category', 'id'])
      .shapeConfig({
        fill: d => d.color,
        labelConfig: {
          fontSize: 8,
        },
      })
      .tooltipConfig({
        body: entity => `
          Occurences: ${entity.totalOccurrences.toLocaleString()}<br />
          Average Execution Time: ${entity.averageExecutionTime.toFixed(2)} ms
        `,
      })
      .data(
        thirdPartyWeb.entities.slice(0, 100).map(entity => {
          const category = categories.find(c => c.id === entity.categories[0])

          return {
            ...entity,
            id: entity.name,
            category: category.displayName,
            color: category.color,
            value: entity.totalExecutionTime,
          }
        })
      )
      .render()
  })

  return (
    <>
      <div className="data-visualization__legend" ref={legendRef} />
      <div className="transparent-container" ref={treemapRef} />
    </>
  )
}

export default DataVisualizationD3
