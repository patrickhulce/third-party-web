import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import * as color from 'color'
import _ from 'lodash'
import * as thirdPartyWeb from 'third-party-web'
import * as d3plus from 'd3plus/build/d3plus.js'

const categories = _.uniq(thirdPartyWeb.entities.map(e => e.categories[0])).map((category, idx) => {
  return {
    id: category,
    displayName: _.startCase(category),
    color: color(`hsl(175, 75%, ${15 + idx * 5}%)`)
      .rgb()
      .string(),
  }
})

const data = thirdPartyWeb.entities.slice(0, 100).map(entity => {
  const category = categories.find(c => c.id === entity.categories[0])

  return {
    ...entity,
    id: entity.name,
    category: category.displayName,
    color: category.color,
  }
})

const tooltipConfig = {
  body: entity => `
Occurences: ${entity.totalOccurrences.toLocaleString()}<br />
Average Execution Time: ${entity.averageExecutionTime.toFixed(2)} ms
`,
}

function renderTreemap(viz, metric) {
  viz
    .sum(metric)
    .groupBy(['category', 'id'])
    .shapeConfig({
      fill: entity => entity.color,
      labelConfig: {
        fontSize: 8,
      },
    })
    .render()
}

function renderBarChart(viz, metric) {
  viz
    .x('id')
    .y(metric)
    .groupBy(['category', 'id'])
    .shapeConfig({
      fill: entity => entity.color,
      labelConfig: {
        fontSize: 8,
      },
    })
    .render()
}

const DataVisualizationD3 = vizType => ({metric, width, height}) => {
  const vizRef = useRef()
  const [viz, setViz] = useState(undefined)
  const [vizEl, setVizEl] = useState()

  useEffect(() => {
    if (vizRef.current === vizEl) return

    const newViz = vizType === 'treemap' ? new d3plus.Treemap() : new d3plus.BarChart()
    newViz.select(vizRef.current)
    setViz(newViz)
    setVizEl(vizRef.current)

    return () => {
      setViz(undefined)
      setVizEl(undefined)
    }
  }, [vizRef.current])

  useEffect(() => {
    if (!viz) return

    const vizWithDimensions = viz
      .width(width)
      .height(height)
      .tooltipConfig(tooltipConfig)
      .data(data)

    vizType === 'treemap'
      ? renderTreemap(vizWithDimensions, metric)
      : renderBarChart(vizWithDimensions, metric)
  })

  return (
    <>
      <div className="transparent-container" ref={vizRef} />
    </>
  )
}

DataVisualizationD3.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  metric: PropTypes.oneOf(['totalExecutionTime', 'averageExecutionTime', 'totalOccurrences'])
    .isRequired,
}

const TreemapViz = DataVisualizationD3('treemap')
const BarViz = DataVisualizationD3('barchart')

export default props => {
  return props.vizType === 'treemap' ? <TreemapViz {...props} /> : <BarViz {...props} />
}
