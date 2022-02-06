import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import * as color from 'color'
import _ from 'lodash'
import * as thirdPartyWeb from 'third-party-web'
import * as d3plus from 'd3plus/build/d3plus.js'

type Category = {id: string; displayName: string; color: string}

const categories: Array<Category> = _.uniq(thirdPartyWeb.entities.map(e => e.categories[0])).map(
  (category, idx) => {
    return {
      id: category,
      displayName: _.startCase(category),
      color: color(`hsl(175, 75%, ${15 + idx * 5}%)`)
        .rgb()
        .string(),
    }
  }
)

type Data = thirdPartyWeb.IEntity & {id: string; category: string; color: string}

const data: Array<Data> = thirdPartyWeb.entities
  .filter(entity => entity.totalOccurrences)
  .sort((a, b) => b.totalExecutionTime - a.totalExecutionTime)
  .slice(0, 100)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(entity => {
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

function configureTreemap(viz, metric) {
  viz
    .sum(metric)
    .groupBy(['category', 'id'])
    .shapeConfig({
      fill: entity => entity.color,
      labelConfig: {
        fontSize: 8,
      },
    })
}

function configureBarChart(viz, metric) {
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
  const [hasRendered, setRendered] = useState(false)

  useEffect(() => {
    if (vizRef.current === vizEl) return

    let newViz
    if (vizType === 'treemap') {
      newViz = new d3plus.Treemap()
    } else {
      newViz = new d3plus.BarChart()
      const {_xAxis: xAxis, _yAxis: yAxis} = newViz
      xAxis._shapeConfig.labelConfig.fontColor = '#fff'
      xAxis._barConfig.stroke = '#fff'
      xAxis.tickSize(0)
      yAxis._gridConfig['stroke-width'] = 0
      yAxis._shapeConfig.labelConfig.fontColor = 'none'
      yAxis._barConfig.stroke = 'none'
      yAxis.tickSize(0)

      window.xAxis = xAxis
      window.yAxis = yAxis
    }

    window.viz = newViz

    newViz.legendConfig({shapeConfig: {labelConfig: {fontColor: '#fff', fontSize: 16}}})
    newViz.select(vizRef.current)

    if (width < 600) {
      newViz.legendConfig({width: 0, height: 0})
    }

    setViz(newViz)
    setVizEl(vizRef.current)
    setRendered(false)

    return () => {
      setViz(undefined)
      setVizEl(undefined)
      setRendered(false)
    }
  }, [vizRef.current])

  useEffect(() => {
    if (!viz) return

    viz
      .width(width)
      .height(height)
      .tooltipConfig(tooltipConfig)
      .data(data)

    vizType === 'treemap' ? configureTreemap(viz, metric) : configureBarChart(viz, metric)

    viz.render(() => setRendered(true))
  })

  return (
    <>
      <div className="transparent-container" ref={vizRef}>
        {hasRendered ? null : <div className="loader-ring" />}
      </div>
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
